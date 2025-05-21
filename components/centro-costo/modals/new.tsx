import { UseModal } from "@/libs/hooks/useModal";
import { Button, Form, FormInstance, Input, Modal, Typography } from "antd";

interface IModalCreateCdcProps {
    modal: UseModal;
    form: FormInstance<any>;
}

export default function ModalCreateCdc({
    modal,
    form,
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
                name="create-cdc"
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="Tipo Centro di Costo"
                    name="tipo"
                    rules={[{ required: true, message: "Inserisci tipologia Centro di Costo" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Linea "
                    name="linea"
                    rules={[{ required: true, message: "Inserisci linea" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}