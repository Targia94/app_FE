import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

import type { UseModal } from "@/libs/hooks/useModal";

interface IModalDeleteRoleProps {
  modal: UseModal;
  form: FormInstance<any>;
}

export default function RemoveCdcModal({
  modal,
  form,
}: IModalDeleteRoleProps) {
  const { isOpen, cta } = modal;

  
  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <Typography.Title level={4} className="m-0">
          Disattiva Centro di Costo
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
          onClick={() => cta.ok(form.getFieldsValue())}
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
          name="id"
        >
          <Input />
        </Form.Item>
      </Form>

      <Typography.Paragraph className="m-0">
        Sei sicuro di voler disattivare il Centro di Costo?
      </Typography.Paragraph>
    </Modal>
  );
}
