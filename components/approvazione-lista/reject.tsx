import { Button,  Modal, Typography } from "antd";

import type { UseModal } from "@/libs/hooks/useModal";
import {  changeStatus } from "@/libs/api/methods/order";
import router from "next/router";

interface IModalRejectProps {
  modal: UseModal;
  id: number;
}

export default function ModalReject({
  modal,
  
  id
}: IModalRejectProps) {
  const { isOpen, cta } = modal;

  /* Riggetta */
  const handleDenie = () => {
    changeStatus({ id_ordine: id, status: "Rifiutato" });
    router.push(`/dashboard/prelievi-da-approvare?status=reject`);
  };

  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <Typography.Title level={4} className="m-0">
          Rifiuta richiesta di prelievo
        </Typography.Title>
      }
      open={isOpen}
      onCancel={cta.cancel}
      onOk={cta.ok}
      footer={[
        <Button key="cancel" onClick={cta.cancel}>
          Cancella
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={() => handleDenie()}
        >
          Conferma
        </Button>,
      ]}
      className="sm:[&_.ant-modal-content]:p-3"
    >
      

      <Typography.Paragraph className="m-0">
        Sei sicuro di voler rifiutare totalmente la richiesta?
      </Typography.Paragraph>
    </Modal>
  );
}
