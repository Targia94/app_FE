import { Button, Form, FormInstance, Input, Modal, Spin, Typography } from "antd";

import type { UseModal } from "@/libs/hooks/useModal";

export type NewUserForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface IModalNewUserProps {
  modal: UseModal;
  form: FormInstance<any>;
  loading: boolean;
}

export default function ModalNewUser({ modal, form, loading }: IModalNewUserProps) {
  const { isOpen, cta } = modal;

  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <Typography.Title level={4} className="m-0">
          Nuovo Utente
        </Typography.Title>
      }
      open={isOpen}
      onCancel={cta.cancel}
      onOk={cta.ok}
      footer={[
        <Button key="cancel" disabled={loading} onClick={cta.cancel}>
          Cancella
        </Button>,
        <Button
          key="save"
          type="primary"
          disabled={loading}
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
            <Spin spinning={loading}>
      <Form
        form={form}
        className="mt-5"
        name="new-user"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item<NewUserForm>
          label="Nome e cognome"
          name="fullName"
          rules={[{ required: true, message: "Inserisci il nome completo" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<NewUserForm>
          label="E-mail"
          name="email"
          rules={[{ required: true, message: "Inserisci email" }]}
        >
          <Input />
        </Form.Item>

        <Typography.Paragraph className="m-0 opacity-60 text-center">
            {`Dopo aver creato l'utente, verrà inviata un'email di reset password all'indirizzo specificato.` }
          </Typography.Paragraph>

      </Form>
      </Spin>
    </Modal>
  );
}
