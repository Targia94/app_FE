import { UseModal } from "@/libs/hooks/useModal";
import { Button, DatePicker, Form, FormInstance, Input, Modal, Popconfirm, Typography } from "antd";

interface IModalEditRichiestaProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading: boolean;
    crono?: boolean;
}

export default function ModalEditRichiesta({
    modal,
    form,
    loading,
    crono
}: IModalEditRichiestaProps) {
    const { isOpen, cta } = modal;

    const handleOk = async () => {
        try {
            const values = await form.validateFields(); // Validate form before submit
            cta.ok(values);
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    return (
        <Modal
            maskClosable={false}
            closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Inserisci
                </Typography.Title>
            }
            open={isOpen}
            onCancel={cta.cancel}
            className="sm:[&_.ant-modal-content]:p-3"
            footer={[
                <Button key="cancel" onClick={cta.cancel} disabled={loading}>
                    Cancella
                </Button>,
                (!crono ? 
                <Popconfirm
                    key="save"
                    title="Accetta Richiesta"
                    description="Confermi?"
                    okText="Si"
                    cancelText="No"
                    cancelButtonProps={{ disabled: loading }}
                    onConfirm={handleOk} // Ensure validation
                >
                    <Button type="primary" loading={loading}>
                        Salva
                    </Button>
                </Popconfirm> :
                 <Button type="primary" loading={loading} onClick={handleOk}>
                 Salva
             </Button>    
            ),
            ]}
        >
            <Form
                form={form}
                name="edit-richiesta"
                layout="vertical"
            >
                <Form.Item label="ID" name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="PO"
                    name="po"
                    rules={[{ required: true, message: "Inserisci PO" },{ min: 10, message: "Usare  10 caratteri" },]}
                >
                    <Input minLength={10} maxLength={10} showCount />
                </Form.Item>
                <Form.Item
                    label="Data Consegna"
                    name="data_consegna"
                    rules={[{ required: true, message: "Inserisci data di consegna" }]}
                >
                    <DatePicker className="w-full" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
