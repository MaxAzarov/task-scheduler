import { axiosInstance } from "../axios";

const CreateEvent = async ({
  types,
  startTime,
  endTime,
  subject,
  description,
}: {
  types: string[];
  startTime: string;
  endTime: string;
  subject: string;
  description: string;
}) => {
  const response = await axiosInstance.post(
    "/events/create",
    {
      types,
      startTime,
      endTime,
      subject,
      description,
    },
    {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("token") as string),
      },
    }
  );

  return response.data;
};

const GetAllEvents = async () => {
  const response = await axiosInstance.get("/events/", {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("token") as string),
    },
  });

  return response.data;
};

const SynchronizeCalendar = async () => {
  const response = await axiosInstance.get("/events/synchronize", {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("token") as string),
    },
  });
  return response.data;
};

const DeleteEvent = async (id: string) => {
  const response = await axiosInstance.delete(`/events/${id}`, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("token") as string),
    },
  });
  return response.data;
};

export { CreateEvent, GetAllEvents, SynchronizeCalendar, DeleteEvent };
