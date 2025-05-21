
import GrantPermission from "@/components/auth/grant-permission";
import { Richiesta } from "@/libs/api/types/richiesta";
import { PrioritaOption } from "@/pages/dashboard/richieste/nuova-richiesta";
import { CheckCircleIcon, EyeIcon, PauseCircleIcon, QuestionMarkCircleIcon, XCircleIcon, ExclamationTriangleIcon, DocumentDuplicateIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Button, FormInstance, TableColumnsType, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import router from "next/router";


interface RichiesteStoryProps {
    modalEdit: { show: () => void }
    formEdit: FormInstance<any>;
    modalPrcEdit: { show: () => void }
    formPrcEdit: FormInstance<any>;
}


export const columns_richieste_prc_mobile = ({
    modalEdit,
    formEdit,
    modalPrcEdit,
    formPrcEdit
}: RichiesteStoryProps): TableColumnsType<Richiesta> => [
        {
            title: "ID",
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
            render: (text) => (
                <Typography.Paragraph className="m-0 font-semibold">
                    {text}
                </Typography.Paragraph>
            ),
            width: "7%",
        },
        {
            title: "Oggetto",
            dataIndex: "descrizione_breve",
            sorter: (a, b) => {
                const msgA = a.descrizione_breve?.toLowerCase() || "";
                const msgB = b.descrizione_breve?.toLowerCase() || "";
                return msgA.localeCompare(msgB);
            },
            render: (text, record) => {
                const { label, color } = getPrioritaDetails(record.priorita);
                return (
                    <>
                        <Typography.Paragraph className="m-0 font-semibold">
                            {text}
                        </Typography.Paragraph>
                        <div className="flex  gap-2 items-center text-center">
                            <ExclamationTriangleIcon color={color} width={24} />
                            <Typography.Paragraph className="m-0 font-semibold">
                                {label}
                            </Typography.Paragraph>
                        </div>
                    </>
                );
            },

            width: "20%",
        },

        {
            title: "Azioni",
            dataIndex: "",
            key: "actions",
            render: (_, record) => (
                <>
                    <Tooltip title="Visualizza" zIndex={1}>
                        <Button
                            style={{
                                marginRight: "5px",
                            }}
                            size="small"
                            icon={<EyeIcon width={20} color="black" />}
                            onClick={() =>
                                router.push(`/dashboard/richieste/${record.id}`)
                            }
                        />
                    </Tooltip>

                    <GrantPermission to={['supervisor', 'rda_L1']} >
                        <Tooltip title="Ricrea Rda" zIndex={1}>
                            <Button
                                style={{
                                    marginRight: "5px",
                                }}
                                size="small"
                                icon={<DocumentDuplicateIcon width={20} color="black" />}
                                onClick={() =>
                                    router.push(`/dashboard/richieste/nuova-richiesta?id=${record.id}`)
                                }
                            />
                        </Tooltip>
                    </GrantPermission>
                    <GrantPermission to={['rda_admin']} >
                        {record.stato === 90 &&
                            <Tooltip title="Modifica Data di Consegna" zIndex={1}>
                                <Button
                                    style={{
                                        marginRight: "5px",
                                    }}
                                    size="small"
                                    icon={<PencilIcon width={20} className="text-orange-500 stroke-orange-500" />}
                                    onClick={() => {
                                        modalEdit.show();
                                        formEdit.setFieldsValue({
                                            id: record.id,
                                            data_consegna: record.data_consegna
                                                ? dayjs(record.data_consegna)
                                                : null
                                        });
                                    }}
                                />
                            </Tooltip>
                        }
                    </GrantPermission>
                    <GrantPermission to={['rda_procurement']} >
                        {record.stato === 90 &&
                            <Tooltip title="Modifica Data di Consegna/PO" zIndex={1}>
                                <Button
                                    style={{
                                        marginRight: "5px",
                                    }}
                                    icon={<PencilIcon width={20} className="text-orange-500 stroke-orange-500" />}
                                    onClick={() => {
                                        modalPrcEdit.show();
                                        formPrcEdit.setFieldsValue({
                                            id: record.id,
                                            data_consegna: record.data_consegna
                                                ? dayjs(record.data_consegna)
                                                : null,
                                            po: record.po
                                        });
                                    }}
                                />
                            </Tooltip>
                        }
                    </GrantPermission>

                </>
            ),
            width: "10%",
        },
    ];

export const prioritaList: PrioritaOption[] = [
    { value: 1, label: "BASSA", color: "green" },
    { value: 2, label: "MEDIA", color: "gold" },
    { value: 3, label: "ALTA", color: "orange" },
    { value: 4, label: "URGENTE", color: "red" },
];

// Funzione di mappatura priorità
const getPrioritaDetails = (priorita: number): { label: string; color: string } => {
    const prioritaOption = prioritaList.find((option) => option.value === priorita);
    return {
        label: prioritaOption?.label || "N/A",
        color: prioritaOption?.color || "gray",
    };
};

// Icone per Stato
/* export const getStatoIcon = (stato: RichiestaStato) => {
    const approvatoStates = [
        "Accettato",
        "Approvato",
        "Approvato_rr",
        "Approvato_af_df"
    ];
    const rifiutatoStates = [
        "Rifiutato",
        "Rifiutato_rr",
        "Rifiutato_af_df"
    ];
    const necessarieInformazioniStates = [
        "Necessarie Informazioni",
        "Necessarie Informazioni_rr",
        "Necessarie Informazioni_af_df"
    ];

    if (approvatoStates.includes(stato)) {
        return <CheckCircleIcon color="green" width={24} />;
    }
    if (rifiutatoStates.includes(stato)) {
        return <XCircleIcon color="red" width={24} />;
    }
    if (necessarieInformazioniStates.includes(stato)) {
        return <QuestionMarkCircleIcon color="orange" width={24} />;
    }
    if (stato === "Creazione") {
        return <PauseCircleIcon color="gold" width={24} />;
    }
    return <PauseCircleIcon color="gray" width={24} />;
};
 */
