import { UseModal } from "@/libs/hooks/useModal";
import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

interface IModalModifyCdcProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading: boolean;
}

export default function ModalModifyCdcRda({
    modal,
    form,
    loading
}: IModalModifyCdcProps) {
    const { isOpen, cta}= modal;

    return (
        <Modal
      maskClosable={false}
      closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Modifica Centro di Costo
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
                name="modify-cdc"
                layout="vertical"
                autoComplete="true"
            >
                <Form.Item
                    label="Tipo Centro di Costo"
                    name="cc"
                    hidden
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Descrizione"
                    name="descrizione"
                    rules={[{ required: true, message: "Inserisci descrizione Centro di Costo" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}