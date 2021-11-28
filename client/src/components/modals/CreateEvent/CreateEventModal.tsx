import { Input, Modal, DatePicker, Typography } from "antd";
import { useCallback, useState } from "react";
import { stringOrDate } from "react-big-calendar";
import moment, { Moment } from "moment";
import classnames from "classnames";

import "./CreateEventModal.scss";
import { EventsAPI } from "../../api/events";
import GoogleIcon from "../../common/Icons/GoogleIcon/GoogleIcon";
import MicrosoftIcon from "../../common/Icons/MicrosoftIcon/MicrosoftIcon";
import { map } from "ramda";
import { DATE_FORMAT_API } from "../../constants";
import { Services } from "../../types";

function getKeyByValue(value: string) {
  return Object.keys(Services).find(
    (key) => Services[key as "googleCalendar" | "microsoftCalendar"] === value
  );
}

function getIconFromType(type: Services) {
  switch (type) {
    case Services.googleCalendar:
      return GoogleIcon;

    case Services.microsoftCalendar:
      return MicrosoftIcon;
  }
}

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  availableIntegrations: { type: Services }[];
  dateRange: {
    start: stringOrDate;
    end: stringOrDate;
  };
  getAllEvents: () => Promise<void>;
}

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const CreateEvent = ({
  isVisible,
  setIsVisible,
  dateRange,
  availableIntegrations,
  getAllEvents,
}: Props): JSX.Element => {
  const [eventName, setEventName] = useState<string>("");
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(
    []
  );
  const [description, setDescription] = useState<string>("");
  const [range, setRange] = useState<{
    start: Moment;
    end: Moment;
  }>({
    start: moment(),
    end: moment(),
  });

  const addOrRemoveIntegration = useCallback(
    (type) => {
      if (selectedIntegrations.includes(type)) {
        setSelectedIntegrations((prev) => prev.filter((i) => i !== type));
      } else {
        setSelectedIntegrations((prev) => [...prev, type]);
      }
    },
    [selectedIntegrations]
  );

  const handleOk = useCallback(async () => {
    console.log("setSelectedIntegrations: ", selectedIntegrations);
    await EventsAPI.CreateEvent({
      subject: eventName,
      description,
      startTime: range.start.format(DATE_FORMAT_API),
      endTime: range.end.format(DATE_FORMAT_API),
      types: map(getKeyByValue, selectedIntegrations) as any,
    });
    setIsVisible(false);
    await getAllEvents();
  }, [
    setIsVisible,
    range.end,
    range.start,
    description,
    eventName,
    getAllEvents,
    selectedIntegrations,
  ]);

  const handleCancel = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  return (
    <Modal
      title="Create event"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="create-event-modal"
    >
      <Input
        placeholder="Event name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        className="create-event-modal__name"
      />

      <TextArea
        rows={4}
        placeholder="description"
        className="create-event-modal__description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <RangePicker
        showTime
        defaultValue={[
          moment(dateRange.start, DATE_FORMAT_API),
          moment(dateRange.end, DATE_FORMAT_API),
        ]}
        onChange={([start, end]: any) =>
          setRange({
            start: start,
            end: end,
          })
        }
        className="create-event-modal__rangepicker"
      />

      <div>
        <Text italic> Available integrations:</Text>
      </div>

      <div className="create-event-modal__integrations">
        {availableIntegrations.map((item) => {
          const Icon = getIconFromType(item.type);
          return (
            <div
              key={item.type}
              className={classnames({
                "create-event-modal__item": true,
                "create-event-modal--active-item":
                  selectedIntegrations.includes(item.type),
              })}
              onClick={() => addOrRemoveIntegration(item.type)}
            >
              <Icon />
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
export default CreateEvent;
