import { UseModal } from "@/libs/hooks/useModal";
import { Modal } from "antd";
import dayjs from "dayjs";
import ReleaseCard from "./realeaseCard";

interface IModalVersioningProps {
  modal: UseModal;
}

export default function ModalVersioning({ modal }: IModalVersioningProps) {
  const { isOpen, cta } = modal;

  
  return (
    <Modal
      maskClosable={true}
      closeIcon={false}
      open={isOpen}
      onCancel={cta.cancel}
      onOk={cta.ok}
      footer={false}
      className="sm:[&_.ant-modal-content]:p-3"
    >
    </Modal>
  );
}
