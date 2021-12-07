import { NextFunction, Request, Response } from "express";
import { Readable } from "stream";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { DATE_FORMAT, Services } from "../../../constants/services";
import { Integration, User, Event } from "../../../db/sequelize";
import connectionSchema from "../../../integrations/ConnectionSchema";
import getArrayFromStream from "../../../utils/getArrayFromStream";
import ApiError from "../../../error/apiError";
import { getKeyByValue } from "../../../utils/getKeyByValue";

export const SynchronizeCalendar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as User;

  try {
    const integrations: Integration[] = await Integration.findAll({
      where: {
        user_id: id,
      },
    });

    await Event.destroy({
      where: {
        user_id: id,
      },
    });

    async function* getAllEvents() {
      for (let i = 0; i < integrations.length; i++) {
        const events: any[] = [];
        const item = integrations[i];
        const key = getKeyByValue(item.type as any) as keyof typeof Services;

        const integration = await Integration.findOne({
          where: {
            user_id: id,
            type: item.type,
          },
        });

        let data: any = [];

        try {
          data = await getArrayFromStream(
            Readable.from(
              connectionSchema[key].getEvents(
                integration?.access_token as string,
                moment().format(DATE_FORMAT),
                moment().add(7, "d").format(DATE_FORMAT)
              )
            )
          );
        } catch (e) {
          let token;
          try {
            token = await connectionSchema[key].exchangeToken(
              item.refresh_token
            );
            console.log(
              "🚀 ~ file: controller.ts ~ line 108 ~ integrations.map ~ token",
              token
            );
          } catch (e: any) {
            console.log("e: ", e);
            return next(ApiError.badRequest("Internal error"));
          }

          try {
            data = await getArrayFromStream(
              Readable.from(
                connectionSchema[key].getEvents(
                  token?.data.access_token,
                  moment().format(DATE_FORMAT),
                  moment().add(7, "d").format(DATE_FORMAT)
                )
              )
            );
          } catch (e) {
            return next(ApiError.badRequest("Internal error"));
          }

          if (key === "microsoftCalendar") {
            await Integration.update(
              {
                access_token: token?.data.access_token,
                refresh_token: token?.data.refresh_token,
              },
              {
                where: {
                  user_id: id,
                },
              }
            );
          }
        }

        data.map((item: any) => {
          events.push(...item);
        });

        for (let i = 0; i < events.length; i++) {
          await Event.findOrCreate({
            where: {
              event_id: events[i].id,
              start_time: moment.utc(events[i].start.dateTime).valueOf(),
              end_time: moment.utc(events[i].end.dateTime).valueOf(),
            },
            defaults: {
              subject: events[i].subject,
              start_time: moment.utc(events[i].start.dateTime).valueOf(),
              end_time: moment.utc(events[i].end.dateTime).valueOf(),
              user_id: id,
              integration_id: integration?.id,
              body: "",
              event_id: events[i].id,
            },
          } as any);
        }

        yield events;
      }
    }

    let allEvents: any = [];
    for await (let events of getAllEvents()) {
      allEvents.push(...events);
    }

    return res.json(allEvents);
  } catch (e) {
    return next(ApiError.internal("Internal error"));
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as User;

  try {
    const events = await Event.findAll({
      where: {
        user_id: id,
      },
    });

    return res.json(events);
  } catch (e) {
    return next(ApiError.badRequest("Internal error"));
  }
};

export const CreateEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { types, startTime, endTime, subject, description } = req.body;
  const { id: userId } = req.user as User;

  try {
    const integrations: Integration[] = await Integration.findAll({
      where: {
        user_id: userId,
      },
    });

    if (types.length == 0) {
      const newEvent = new Event({
        subject: subject,
        start_time: moment(startTime).valueOf(),
        end_time: moment(endTime).valueOf(),
        user_id: userId,
        body: "",
        event_id: uuidv4(),
      } as any);

      await newEvent.save();
    }

    for (let i = 0; i < types.length; i++) {
      const item: keyof typeof Services = types[i];
      const { access_token, refresh_token, id } = integrations.find(
        (integration) => integration.type === Services[item]
      ) as Integration;

      try {
        const event: any = await connectionSchema[item].createEvent(
          access_token,
          {
            description,
            endTime,
            startTime,
            subject,
          }
        );

        const normalizedEvent = connectionSchema[item].normalize(event.data);

        const {
          end,
          id: eventId,
          start,
          subject: normalizedSubject,
        } = normalizedEvent;

        const newEvent = new Event({
          subject: normalizedSubject,
          start_time: moment(start.dateTime).valueOf(),
          end_time: moment(end.dateTime).valueOf(),
          user_id: userId,
          integration_id: id,
          body: "",
          event_id: eventId,
        } as any);

        await newEvent.save();
      } catch (e) {
        const token = await connectionSchema[item].exchangeToken(refresh_token);

        try {
          const event: any = await connectionSchema[item].createEvent(
            token?.data.access_token,
            {
              description,
              endTime,
              startTime,
              subject,
            }
          );

          const normalizedEvent = connectionSchema[item].normalize(event.data);

          const {
            end,
            id: eventId,
            start,
            subject: normalizedSubject,
          } = normalizedEvent;

          const newEvent = new Event({
            subject: normalizedSubject,
            start_time: moment.utc(start.dateTime).valueOf(),
            end_time: moment.utc(end.dateTime).valueOf(),
            user_id: userId,
            integration_id: id,
            body: "",
            event_id: eventId,
          } as any);

          await newEvent.save();
        } catch (e) {
          return next(ApiError.internal("Internal error"));
        }
      }
    }
    return res.json({ status: "ok" });
  } catch (e) {
    console.log("🚀 ~ file: controller.ts ~ line 265 ~ e", e);
    return next(ApiError.internal("Internal Error"));
  }
};

export const DeleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as User;

  const { eventId } = req.params;

  const event = await Event.findOne({
    where: {
      user_id: id,
      event_id: eventId,
    },
  });

  let integration;

  if (event?.integration_id) {
    integration = await Integration.findOne({
      where: {
        id: event?.integration_id,
      },
    });
  } else {
    await Event.destroy({
      where: {
        user_id: id,
        event_id: eventId,
      },
    });

    return res.json({ status: "ok" });
  }

  try {
    await Event.destroy({
      where: {
        user_id: id,
        event_id: eventId,
      },
    });
  } catch (e) {
    return next(ApiError.internal("Can not delete event "));
  }

  const key = getKeyByValue(integration?.type as any) as keyof typeof Services;
  try {
    await connectionSchema[key].deleteEvent({
      accessToken: integration?.access_token as string,
      eventId: event?.event_id as string,
    });
  } catch (e) {
    let token;
    try {
      token = await connectionSchema[key].exchangeToken(
        integration?.refresh_token as string
      );
      console.log(
        "🚀 ~ file: controller.ts ~ line 108 ~ integrations.map ~ token",
        token
      );
    } catch (e: any) {
      console.log("e: ", e.message);
      return next(ApiError.badRequest("Internal error"));
    }

    try {
      await connectionSchema[key].deleteEvent({
        accessToken: token.data?.access_token as string,
        eventId: eventId,
      });
    } catch (e: any) {
      return next(ApiError.badRequest("Internal error"));
    }
  }

  return res.json({ status: "ok" });
};
