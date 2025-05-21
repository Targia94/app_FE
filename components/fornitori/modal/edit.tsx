import { UseModal } from "@/libs/hooks/useModal";
import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

interface IModalEditSupplierProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading: boolean;
}

export default function ModalEditSupplier({
    modal,
    form,
    loading
}: IModalEditSupplierProps) {
    const { isOpen, cta}= modal;

    return (
        <Modal
      maskClosable={false}
      closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Modifica Fornitore
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
                name="create-cdc"
                layout="vertical"
            >
                <Form.Item
                    label="ID"
                    name="id"
                    hidden
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Vendor"
                    name="vendor"
                    rules={[{ required: true, message: "Inserisci il vendor" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Fornitore "
                    name="fornitore"
                    rules={[{ required: true, message: "Inserisci il nome del fornitore" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}