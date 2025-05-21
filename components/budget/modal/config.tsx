import { UseModal } from "@/libs/hooks/useModal";
import { Button, DatePicker, Divider, Form, FormInstance, Input, InputNumber, Modal, Select, Typography } from "antd";
const { RangePicker } = DatePicker;

interface IModalCreateSupplierProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading?: boolean;
}

export default function ModalConfigBudget({
    modal,
    form,
    loading,
}: IModalCreateSupplierProps) {
    const { isOpen, cta } = modal;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    return (
        <Modal
            maskClosable={false}
            closable={false}
            title={
                <>
                    <Typography.Title level={4} className="m-0">
                        Inserisci Mensilità
                    </Typography.Title>
                    <Divider />
                </>
            }
            open={isOpen}
            onCancel={cta.cancel}
            onOk={() => cta.ok({ ...form.getFieldsValue(), val0: form.getFieldValue('val0') || 0, val1: form.getFieldValue('val1') || 0, val2: form.getFieldValue('val2') || 0 })}
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
                {...formItemLayout}
                form={form}
                variant={'filled'}
                style={{ maxWidth: 600 }}
                initialValues={{ variant: 'filled', val0: 0, val1: 0, val2: 0 }}
            >
                {/* <Form.Item
                    label="Grafico"
                    name="graphic_id"
                    rules={[{ required: true, message: 'Seleziona un grafico!' }]}
                >
                    <Input style={{ width: '100%' }}  />
                </Form.Item> */}

                <Form.Item
                    label="Data"
                    name="data"
                    rules={[{ required: true, message: 'Seleziona una mensilità!' }]}
                >
                    <DatePicker picker="month" />
                </Form.Item>

                <Form.Item
                    label="Other"
                    name="val0"
                    rules={[{ required: false }]}
                >
                    <InputNumber style={{ width: '100%' }} min={0} defaultValue={0} addonAfter={"€"} />
                </Form.Item>

                <Form.Item
                    label="Contract"
                    name="val1"
                    rules={[{ required: false }]}
                >
                    <InputNumber style={{ width: '100%' }} min={0} defaultValue={0} addonAfter={"€"} />
                </Form.Item>
                <Form.Item
                    label="Spare"
                    name="val2"
                    rules={[{ required: false }]}
                >
                    <InputNumber style={{ width: '100%' }} min={0} defaultValue={0} addonAfter={"€"} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
