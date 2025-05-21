import { useQueryWithPagination } from "@/libs/api/hooks/useQueryWithPagination";
import { getGlAccounts } from "@/libs/api/methods/gl-account";
import { GLAccount } from "@/libs/api/types/gl-account";
import { DEFAULT_STALE_TIME } from "@/libs/api/utils/constants";
import { useDebounce } from "@/libs/hooks/useDebounce";
import { UseModal } from "@/libs/hooks/useModal";
import { Button, DatePicker, Form, FormInstance, Input, Modal, Select, Typography } from "antd";
import { useEffect, useState } from "react";

interface IModalEditPartiMacchinaProps {
    modal: UseModal;
    form: FormInstance<any>;
    loading: boolean;
}

export default function ModalEditAdminRichiesta({
    modal,
    form,
    loading
}: IModalEditPartiMacchinaProps) {
    const { isOpen, cta } = modal;

    /**
        * Debounce
        */
    const [glAccountSearchTerm, setGlAccountSearchTerm, debouncedGlAccountSearchTerm] = useDebounce("");

    const { status: statusglAccount, data: glAccount, pagination } = useQueryWithPagination({
        queryKey: ["gl-account-change-request", debouncedGlAccountSearchTerm],
        queryFn: getGlAccounts,
        queryFnParams: {
            filters: [
                ...(debouncedGlAccountSearchTerm ? [{ key: "descrizione", value: debouncedGlAccountSearchTerm }] : [])
            ],
        },
        staleTime: DEFAULT_STALE_TIME,
        avoidPrefetch: true,
        defaultLimit: 200,
    });

    // Stato per l'opzione selezionata
    const [selectedGl, setSelectedGl] = useState<Number>();

    /**
     * Effetto per pre-selezionare il valore se id_gl_account è già nel form
     */
    useEffect(() => {
        if (glAccount) {
            const selected = glAccount.find((item: GLAccount) => item.id === form.getFieldValue("id_gl_account"));
            if (selected) {
                setSelectedGl(selected.id);
            }
        }
    }, [glAccount, form]);

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
            >
                <Form.Item
                    label="ID"
                    name="id"
                    hidden
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="GL"
                    name="id_gl_account"
                    rules={[{ required: true, message: "Seleziona una GL" }]}
                >
                    <Select
                        showSearch
                        placeholder="Seleziona GL"
                        value={selectedGl ? selectedGl : undefined}
                        onSearch={setGlAccountSearchTerm}
                        onChange={(value) => {
                            const selected = glAccount?.find((item: GLAccount) => item.id === value);
                            setSelectedGl(selected?.id);
                            form.setFieldsValue({ id_gl_account: value });
                        }}
                        filterOption={false} // Usa il debounce per la ricerca
                        loading={statusglAccount === "pending"}
                    >
                        {glAccount
                            ?.slice() 
                            .sort((a, b) => a.descrizione.localeCompare(b.descrizione)) 
                            .map((item: GLAccount) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.descrizione}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Data Consegna "
                    name="data_consegna"
                    rules={[{ required: true, message: "Inserisci data di consegna" }]}
                >
                    <DatePicker className="w-full" />
                </Form.Item>
            </Form>
        </Modal>
    )
}