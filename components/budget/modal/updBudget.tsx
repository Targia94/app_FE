import { UseModal } from "@/libs/hooks/useModal";
import { Button, DatePicker, Divider, Form, FormInstance, Input, InputNumber, Modal, Select, Typography } from "antd";
const { RangePicker } = DatePicker;
interface IModalCreateSupplierProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading?: boolean;
}

export default function ModalUpdBudget({
    modal,
    form,
    loading
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
                        Aggiorna Budget
                    </Typography.Title>
                    <Divider />
                </>
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
                {...formItemLayout}
                form={form}
                variant={'filled'}
                style={{ maxWidth: 600 }}
                initialValues={{ variant: 'filled' }}
            >
                <Form.Item
                    label="Grafico"
                    name="graphic_id"
                    rules={[{ required: true, message: 'Seleziona un grafico!' }]}
                    hidden
                >
                    <Input style={{ width: '100%' }}  />
                </Form.Item>

                <Form.Item
                    label="Budget"
                    name="budget"
                    rules={[{ required: true, message: 'Inserisci un valore!' }]}
                >
                    <InputNumber style={{ width: '100%' }} min={0} defaultValue={0} addonAfter={"€"} />
                </Form.Item>


                {/* <Form.Item
                    label="Data"
                    name="data"
                    rules={[{ required: true, message: 'Inserisci un valore!' }]}
                >
                    <RangePicker picker="month" format="YYYY-MM"  />
                </Form.Item> */}


            </Form>
        </Modal >
    )
}