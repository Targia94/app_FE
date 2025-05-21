import { Report } from "@/libs/api/types/report";
import { UseModal } from "@/libs/hooks/useModal";
import { Button, Divider, Form, FormInstance, Input, Modal, Typography } from "antd";

interface IModalNewReportProps {
    modal: UseModal;
    form: FormInstance<any>;
}

export default function ModalNewReport({
    modal,
    form,
}: IModalNewReportProps) {
    const { isOpen, cta}= modal;



    return (
        <Modal
      maskClosable={false}
      closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Invia una segnalazione
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
                  Invia
                </Button>,
            ]}
            className="sm:[&_.ant-modal-content]:p-3"
        >
            <Divider />
            <Form<Report>
                form={form}
                name="create-cdc" 
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item<Report>
                    label="Oggetto"
                    name="subject"
                    rules={[{ required: true, message: "Inserisci L'oggetto della segnalazione" }]}
                >
                    <Input />
                </Form.Item>    
               
                <Form.Item<Report>
                    label=""
                    name="body"
                    rules={[{ required: true, message: "Inserisci la tua segnalazione" }]}
                >
                    <Input.TextArea rows={8} />
                </Form.Item>
            </Form>
        </Modal>
    )
}