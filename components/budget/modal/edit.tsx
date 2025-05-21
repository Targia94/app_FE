import { UseModal } from "@/libs/hooks/useModal";
import { Button, DatePicker, Form, FormInstance, Input, InputNumber, Modal, Typography } from "antd";

interface IModalEditMonthProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading: boolean;
}

export default function ModalEditMonth({
    modal,
    form,
    loading
}: IModalEditMonthProps) {
    const { isOpen, cta } = modal;

    return (
        <Modal
            maskClosable={false}
            closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Modifica Mensilità
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
                    onClick={() => cta.ok({ ...form.getFieldsValue(), val0: form.getFieldValue('val0') || 0, val1: form.getFieldValue('val1') || 0, val2: form.getFieldValue('val2') || 0 })}
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
                    rules={[{ required: true, message: 'Inserisci un valore!' }]}
                    hidden
                >
                    <InputNumber style={{ width: '100%' }}  />
                </Form.Item>
                <Form.Item
                    label="Grafico"
                    name="graphic_id"
                    rules={[{ required: true, message: 'Inserisci un valore!' }]}
                    hidden
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="data"
                    name="data"
                    rules={[{ required: true, message: 'Inserisci un valore!' }]}
                    hidden
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Other"
                    name="val0"
                    rules={[{ required: false, message: 'Inserisci un valore!' }]}
                >
                    <InputNumber style={{ width: '100%' }}  min={0} defaultValue={0} addonAfter={"€"} />
                </Form.Item>

                <Form.Item
                    label="Contract"
                    name="val1"
                    rules={[{ required: false, message: 'Inserisci un valore!' }]}
                >
                    <InputNumber style={{ width: '100%' }}  min={0} defaultValue={0} addonAfter={"€"} />
                </Form.Item>
                <Form.Item
                    label="Spare"
                    name="val2"
                    rules={[{ required: false, message: 'Inserisci un valore!' }]}
                >
                    <InputNumber style={{ width: '100%' }}  min={0} defaultValue={0} addonAfter={"€"} />
                </Form.Item>
            </Form>
        </Modal>
    )
}