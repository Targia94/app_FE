import { UseModal } from "@/libs/hooks/useModal";
import { Button, Form, FormInstance, Input, InputNumber, Modal, Select, Typography } from "antd";
import { optionsUnitaMisura } from "../editTable";
import { useRef } from "react";

interface IModalCreateSupplierProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading: boolean;
}

export default function ModalAddRow({
    modal,
    form,
    loading
}: IModalCreateSupplierProps) {
    const { isOpen, cta } = modal;
    const inputRef = useRef<any>(null);

    return (
        <Modal
            maskClosable={false}
            closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Inserisci nuova riga
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
                name="create-cdc"
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="Codice"
                    name="codice"
                   
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Descrizione"
                    name="descrizione"
                    rules={[{ required: true, message: "Inserisci la descrizione" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Unità di misura "
                    name="uom"
                    rules={[{ required: true, message: "Inserisci il nome del fornitore" }]}
                >
                    <Select
                        ref={inputRef}
                        
                        options={optionsUnitaMisura}
                        placeholder="Seleziona unità di misura"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item
                    label="Quantità "
                    name="quantita"
                    rules={[{ required: true, message: "Inserisci il nome del fornitore" }]}
                >
                    <InputNumber
                        placeholder={""}
                    />
                </Form.Item>
                <Form.Item
                    label="EUR/UOM "
                    name="prezzo"
                    rules={[{ required: true, message: "Inserisci il nome del fornitore" }]}
                >
                    <InputNumber
                        placeholder={""}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}