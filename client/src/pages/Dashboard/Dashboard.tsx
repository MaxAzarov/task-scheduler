import { useCallback, useEffect, useState } from "react";
import {
  Calendar,
  Views,
  momentLocalizer,
  SlotInfo,
  stringOrDate,
  DateLocalizer,
} from "react-big-calendar";
import moment from "moment";
import { map } from "ramda";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import CreateEvent from "../../components/modals/CreateEvent/CreateEventModal";
import InfoEventModal from "../../components/modals/DeleteEventModal/DeleteEventModal";
import { UserAPI } from "../../components/api/user";
import { EventsAPI } from "../../components/api/events";
import { CalendarEvent, DbEvent, Event } from "../../components/types";
import "./Dashboard.scss";

const { Text } = Typography;
const localizer: DateLocalizer = momentLocalizer(moment);

const normalizeDbEvents = (events: DbEvent[]): CalendarEvent[] => {
  return map(
    (item) => ({
      id: item.event_id,
      title: item.subject,
      start: moment.utc(item.start_time).toDate(),
      end: moment.utc(item.end_time).toDate(),
    }),
    events
  );
};

const normalizeEvents = (events: Event[]): CalendarEvent[] => {
  return map(
    (item) => ({
      id: item.id,
      title: item.subject,
      start: moment.utc(item.start.dateTime).toDate(),
      end: moment.utc(item.end.dateTime).toDate(),
      link: item.link,
    }),
    events
  );
};

const Dashboard = (): JSX.Element => {
  const [isOpenModal, setIsModalOpen] = useState<boolean>(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [availableIntegrations, setAvailableIntegrations] = useState([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [activeEvent, setActiveEvent] = useState<CalendarEvent>({
    id: "",
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const [dateRange, setDataRange] = useState<{
    start: stringOrDate;
    end: stringOrDate;
  }>({
    start: new Date(),
    end: new Date(),
  });

  const syncronizeCalendar = useCallback(async () => {
    const data: Event[] = await EventsAPI.SynchronizeCalendar();

    setEvents(normalizeEvents(data));
  }, []);

  const handleSelect = useCallback(
    ({ start, end }: SlotInfo) => {
      setIsModalOpen(true);

      setDataRange({ start, end });
    },
    [setIsModalOpen]
  );

  const getAllEvents = async () => {
    try {
      const events: DbEvent[] = await EventsAPI.GetAllEvents();
      setEvents(normalizeDbEvents(events));
    } catch (e) {
      alert("Can't take events");
    }
  };

  useEffect(() => {
    async function getAvailableIntegrations() {
      const integrations = await UserAPI.getAvailableIntegrations();
      setAvailableIntegrations(integrations);
    }

    Promise.all([getAllEvents(), getAvailableIntegrations()]);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__navigation">
        <div>
          <Link to="/">
            <Text>Login</Text>
          </Link>
        </div>

        <div>
          <Link to="/register">
            <Text>Register</Text>
          </Link>
        </div>
      </div>
      <div className="dashboard__calendar">
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          defaultView={Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={(event) => {
            setActiveEvent(event);
            setIsInfoModalOpen(true);
          }}
          onSelectSlot={handleSelect}
          views={["day", "agenda", "week"]}
        />
      </div>

      <div className="dashboard__options">
        <Button size={"large"} onClick={syncronizeCalendar}>
          Synchronize calendar
        </Button>
      </div>
      <CreateEvent
        isVisible={isOpenModal}
        setIsVisible={setIsModalOpen}
        dateRange={dateRange}
        availableIntegrations={availableIntegrations}
        getAllEvents={getAllEvents}
      />

      <InfoEventModal
        isVisible={isInfoModalOpen}
        event={activeEvent}
        setIsVisible={setIsInfoModalOpen}
        getAllEvents={getAllEvents}
      />
    </div>
  );
};
export default Dashboard;
