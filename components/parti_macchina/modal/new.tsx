import { UseModal } from "@/libs/hooks/useModal";
import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

interface IModalCreateSupplierProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading: boolean;
}

export default function ModalCreateParteMacchina({
    modal,
    form,
    loading
}: IModalCreateSupplierProps) {
    const { isOpen, cta}= modal;

    return (
        <Modal
      maskClosable={false}
      closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Inserisci un nuova parte macchina
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
                autoComplete="off"
            >
                <Form.Item
                    label="Linea"
                    name="linea"
                    rules={[{ required: true, message: "Inserisci la linea." }]}
                >
                    <Input showCount maxLength={512} />
                </Form.Item>
                <Form.Item
                    label="Descrizione"
                    name="descrizione"
                    rules={[{ required: true, message: "Inserisci la descrizione." }]}
                >
                    <Input showCount maxLength={512} />
                </Form.Item>
            </Form>
        </Modal>
    )
}