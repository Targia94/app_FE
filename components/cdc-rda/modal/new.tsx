import { UseModal } from "@/libs/hooks/useModal";
import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

interface IModalCreateCdcProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading: boolean;
}

export default function ModalCreateCdcRda({
    modal,
    form,
    loading
}: IModalCreateCdcProps) {
    const { isOpen, cta}= modal;

    return (
        <Modal
      maskClosable={false}
      closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Inserisci un nuovo Centro di Costo
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
                name="create-cdc-rda"
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="Linea Centro di Costo"
                    name="cc"
                    rules={[{ required: true, message: "Inserisci linea" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Descrizione "
                    name="descrizione"
                    rules={[{ required: true, message: "Inserisci descrizione" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}