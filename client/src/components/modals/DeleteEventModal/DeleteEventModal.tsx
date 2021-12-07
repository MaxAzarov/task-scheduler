import React, { useCallback } from "react";
import { Modal, Typography, Button } from "antd";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { EventsAPI } from "../../api/events";
import { DATE_FORMAT_API } from "../../constants";

const { Text } = Typography;

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  event: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    link?: string;
  };
  getAllEvents: () => Promise<void>;
}

const DeleteEventModal = ({
  isVisible,
  setIsVisible,
  event,
  getAllEvents,
}: Props): JSX.Element => {
  const { title, start, end, link, id } = event;
  const handleCancel = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const handleOk = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const handleDelete = useCallback(async () => {
    try {
      await EventsAPI.DeleteEvent(id);
      setIsVisible(false);
      getAllEvents();
    } catch (e) {
      alert(e);
    }
  }, [id, setIsVisible, getAllEvents]);

  return (
    <Modal
      title="Event"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="create-event-modal"
    >
      <div>
        <Text italic>Subject: </Text>
        <Text>{title}</Text>
      </div>
      <div>
        <Text italic>Start: </Text>
        <Text>{moment(start).format(DATE_FORMAT_API)}</Text>
      </div>

      <div>
        <Text italic>End: </Text>
        <Text>{moment(end).format(DATE_FORMAT_API)}</Text>
      </div>

      <Button type="primary" icon={<DeleteOutlined />} onClick={handleDelete}>
        Delete event
      </Button>
      {link && (
        <div>
          <Text italic>Link: </Text>

          <Text>
            <a href={link}> Link</a>
          </Text>
        </div>
      )}
    </Modal>
  );
};

export default DeleteEventModal;
