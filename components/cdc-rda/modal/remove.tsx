import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

import type { UseModal } from "@/libs/hooks/useModal";

interface IModalDeleteRoleProps {
  modal: UseModal;
  form: FormInstance<any>;
  loading: boolean;
}

export default function RemoveCdcRdaModal({
  modal,
  form,
  loading
}: IModalDeleteRoleProps) {
  const { isOpen, cta } = modal;

  
  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <Typography.Title level={4} className="m-0">
          Rimuovi Centro di Costo
        </Typography.Title>
      }
      open={isOpen}
      onCancel={cta.cancel}
      onOk={cta.ok}
      footer={[
        <Button key="cancel" onClick={cta.cancel} disabled={loading}>
          Cancella
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={() => cta.ok(form.getFieldsValue())}
          loading={loading}
        >
          Conferma
        </Button>,
      ]}
      className="sm:[&_.ant-modal-content]:p-3"
    >
      <Form
        form={form}
        className="hidden"
        name="delete-role"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Id"
          name="cc"
        >
          <Input />
        </Form.Item>
      </Form>

      <Typography.Paragraph className="m-0">
       { `Sei sicuro di voler eliminare il Centro di Costo ${form.getFieldValue("cc")}?`}
      </Typography.Paragraph>
    </Modal>
  );
}
