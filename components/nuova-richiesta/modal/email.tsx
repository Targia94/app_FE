import { UseModal } from "@/libs/hooks/useModal";
import { Button, Form, FormInstance, Modal, Select, Typography } from "antd";
import { useState } from "react";

interface IModalCreateSupplierProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading: boolean;
    role_rda: { email: string; full_name: string; supertoken_uid: string }[];
}

export default function ModalChooseEmail({
    modal,
    form,
    loading,
    role_rda
}: IModalCreateSupplierProps) {
    const { isOpen, cta } = modal;
    const [selectedL1, setSelectedL1] = useState<{ email: string; supertoken_uid: string } | null>(null);


    return (
        <Modal
            maskClosable={false}
            closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Scegli L1 a cui inviare la mail
                </Typography.Title>
            }
            open={isOpen}
            onCancel={cta.cancel}
            className="sm:[&_.ant-modal-content]:p-3"
            footer={[
                <Button key="cancel" onClick={cta.cancel} disabled={loading}>
                    Cancella
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    onClick={() => selectedL1 && cta.ok(selectedL1.email, selectedL1.supertoken_uid)}
                    disabled={loading || !selectedL1}
                    loading={loading}
                >
                    Conferma
                </Button>,
            ]}
        >
            <Form
                form={form}
                name="email"
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="L1"
                    rules={[{ required: true, message: "Seleziona un L1" }]}
                >
                    <Select
                        onChange={(value) => {
                            const selected = role_rda.find(r => r.email === value);
                            if (selected) setSelectedL1({ email: selected.email, supertoken_uid: selected.supertoken_uid });
                        }}
                        value={selectedL1?.email}
                        placeholder="Seleziona un L1"
                    >
                        {role_rda.map((supervisore) => (
                            <Select.Option key={supervisore.email} value={supervisore.email}>
                                {supervisore.full_name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}
