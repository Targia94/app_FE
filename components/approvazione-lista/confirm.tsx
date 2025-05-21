import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

import type { UseModal } from "@/libs/hooks/useModal";
import { approveItem, changeStatus } from "@/libs/api/methods/order";
import router from "next/router";

interface IModalPartialApproveProps {
  modal: UseModal;
  product: any[] ;
  id: number;
}

export default function ModalPartialApprove({
  modal,
  product,
  id
}: IModalPartialApproveProps) {
  const { isOpen, cta } = modal;

  const handleApply = async ()=>{
    
        product.forEach((product) => {
            approveItem({
              id_ordine: id,
              codice: product.codice,
              approvato: 1,
            });
          });
          changeStatus({ id_ordine: id, status: "Approvato" });
          router.push(`/dashboard/prelievi-da-approvare?status=approve`);
    
  }

  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <Typography.Title level={4} className="m-0">
          Approvazione Parziale
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
          onClick={() => handleApply()}
        >
          Conferma
        </Button>,
      ]}
      className="sm:[&_.ant-modal-content]:p-3"
    >
      

      <Typography.Paragraph className="m-0">
        Sei sicuro di voler approvare {product.length} righe?
      </Typography.Paragraph>
    </Modal>
  );
}
