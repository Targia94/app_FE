import { UseModal } from "@/libs/hooks/useModal";
import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

interface IModalGlAccountProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading: boolean;
}

export default function ModalCreateGlAccount({
    modal,
    form,
    loading
}: IModalGlAccountProps) {
    const { isOpen, cta } = modal;

    return (
        <Modal
      maskClosable={false}
      closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Inserisci un nuovo Gl-Account
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
                    disabled={loading}
                    loading={loading}
                >
                    Conferma
                </Button>,
            ]}
            className="sm:[&_.ant-modal-content]:p-3"
        >
            <Form
                form={form}
                name="create-gl-account"
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="Cost Element"
                    name="cost_element"
                    rules={[{ required: true, message: "Inserisci l'elemento di costo" }]}
                >
                    <Input maxLength={512} showCount />
                </Form.Item>

                <Form.Item
                    label="Gruppo"
                    name="gruppo"
                    rules={[{ required: true, message: "Inserisci il gruppo" }]}
                >
                    <Input maxLength={512} showCount />
                </Form.Item>

                <Form.Item
                    label="Sotto Gruppo"
                    name="sotto_gruppo"
                    rules={[{ required: true, message: "Inserisci il sotto-gruppo" }]}
                >
                    <Input maxLength={512} showCount />
                </Form.Item>

                <Form.Item
                    label="Descrizione"
                    name="descrizione"
                    rules={[{ required: true, message: "Inserisci la descrizione" }]}
                >
                    <Input maxLength={512} showCount />
                </Form.Item>

                <Form.Item
                    label="Constant Element Descrizione"
                    name="const_element_descr"
                    rules={[{ required: true, message: "Inserisci la descrizione dell'elemento costante" }]}
                >
                    <Input maxLength={512} showCount />
                </Form.Item>
            </Form>
        </Modal>
    )
}