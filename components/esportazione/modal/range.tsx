import { UseModal } from "@/libs/hooks/useModal";
import { Button, Form, FormInstance, DatePicker, Modal, Typography } from "antd";
import itIT from "antd/es/locale/it_IT";


const { RangePicker } = DatePicker;

interface IModalGlAccountProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading?: boolean;
}

export default function ModalDataRange({
    modal,
    form,
    loading
}: IModalGlAccountProps) {
    const { isOpen, cta } = modal;

    return (
        <Modal
      maskClosable={false}
      closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Inserisci range data
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
                    onClick={() => {
                        const values = form.getFieldsValue();
                        const [data_da, data_a] = values.range_date || []; // Estrai le date
                        cta.ok({
                          data_da: data_da?.format("YYYY-MM-DD"),
                          data_a: data_a?.format("YYYY-MM-DD"),
                        });
                      }}
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
                name="create-gl-account"
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="Intervallo di Data"
                    name="range_date"
                    rules={[{ required: true, message: "Inserisci l'elemento di costo" }]}
                >
                    <RangePicker  />
                </Form.Item>
            </Form>
        </Modal>
    )
}