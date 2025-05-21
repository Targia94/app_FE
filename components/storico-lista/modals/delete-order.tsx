import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

import type { UseModal } from "@/libs/hooks/useModal";
import { Ordine } from "@/libs/api/types/order";

interface IModalDeleteOrderProps {
  modal: UseModal;
  form: FormInstance<Ordine>;
  isLoading: boolean;
}

export default function ModalDeleteOrder({
  modal,
  form,
  isLoading
}: IModalDeleteOrderProps) {
  const { isOpen, cta } = modal;

  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <Typography.Title level={4} className="m-0">
          Cancella Richiesta di Prelievo
        </Typography.Title>
      }
      open={isOpen}
      onCancel={cta.cancel}
      onOk={cta.ok}
      footer={[
        <Button key="cancel" onClick={cta.cancel} disabled={isLoading}>
          Annulla
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={() => cta.ok(form.getFieldsValue())}
          loading={isLoading}
        >
          Conferma
        </Button>,
      ]}
      className="sm:[&_.ant-modal-content]:p-3"
    >
      <Form
        form={form}
        className="hidden"
        name="delete-order"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="ID"
          name="id_ordine"
          rules={[{ required: true, message: "Inserisci id" }]}
        >
          <Input  />
        </Form.Item>
      </Form>

      <Typography.Paragraph className="m-0">
        Sei sicuro di voler cancellare la richiesta di prelievo {form.getFieldValue("id_ordine")}?
      </Typography.Paragraph>
    </Modal>
  );
}
