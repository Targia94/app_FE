import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

import type { UseModal } from "@/libs/hooks/useModal";

interface IModalNewRoleProps {
  modal: UseModal;
  form: FormInstance<any>;
}

export default function ModalNewRole({ modal, form }: IModalNewRoleProps) {
  const { isOpen, cta } = modal;

  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <Typography.Title level={4} className="m-0">
          Nuovo Ruolo
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
          onClick={async () => {
            await form.validateFields();
            cta.ok(form.getFieldsValue());
          }}
        >
          Salva
        </Button>,
      ]}
      className="sm:[&_.ant-modal-content]:p-3"
    >
      <Form
        form={form}
        className="mt-5"
        name="new-role"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Nome"
          name="roleId"
          rules={[{ required: true, message: "Inserisci ruolo" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
