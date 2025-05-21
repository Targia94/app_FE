import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

import type { UseModal } from "@/libs/hooks/useModal";

export type DeleteUserForm = {
  userId: string;
  roleId?: string;
};

interface IModalDeleteUserProps {
  modal: UseModal;
  form: FormInstance<any>;
}

export default function ModalDeleteUser({
  modal,
  form,
}: IModalDeleteUserProps) {
  const { isOpen, cta } = modal;

  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <Typography.Title level={4} className="m-0">
          Cancella Utente
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
        name="delete-user"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Nome"
          name="userId"
          rules={[{ required: true, message: "Inserisci id" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="id"
          name="roleId"
          rules={[{ required: true, message: "Inserisci id" }]}
        >
          <Input />
        </Form.Item>
      </Form>

      <Typography.Paragraph className="m-0">
        Sei sicuro di voler cancellare l&apos;Utente?
      </Typography.Paragraph>
    </Modal>
  );
}
