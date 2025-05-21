import { UseModal } from "@/libs/hooks/useModal";
import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";


interface IModalRdaSapProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading?: boolean;
}

export default function ModalRdaSap({
    modal,
    form,
    loading
}: IModalRdaSapProps) {
    const { isOpen, cta } = modal;

    return (
        <Modal
            maskClosable={false}
            closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Inserisci Rda in Sap
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
                name="information"
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="Id"
                    name="id"
                    rules={[{ required: true, message: "Inserisci l'elemento di costo" }]}
                    hidden
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="RDA SAP"
                    name="rda_sap"
                    rules={[{ required: true, message: "Inserisci rda sap." }]}
                >
                    <Input placeholder="Inserisci ..." />
                </Form.Item>
            </Form>
        </Modal>
    )
}