
import { Richiesta } from "@/libs/api/types/richiesta";
import { PrioritaOption } from "@/pages/dashboard/richieste/nuova-richiesta";
import { EyeIcon, ExclamationTriangleIcon, DocumentDuplicateIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Button, FormInstance, TableColumnsType, Tooltip, Typography } from "antd";
import router from "next/router";
import { getStatoLabel } from ".";
import { getStatoIcon } from "./richieste.rr.column";
import GrantPermission from "@/components/auth/grant-permission";
import dayjs from "dayjs";

interface RichiesteStoryProps {
    modalEdit: { show: () => void }
    formEdit: FormInstance<any>;
    modalPrcEdit: { show: () => void }
    formPrcEdit: FormInstance<any>;
}



export const columns_richieste_prc = ({
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
            width: "5%",
        },
        {
            title: "Oggetto",
            dataIndex: "descrizione_breve",
            sorter: (a, b) => {
                const msgA = a.descrizione_breve?.toLowerCase() || "";
                const msgB = b.descrizione_breve?.toLowerCase() || "";
                return msgA.localeCompare(msgB);
            },
            render: (text) => (
                <Typography.Paragraph className="m-0 font-semibold">
                    {text}
                </Typography.Paragraph>
            ),
            width: "20%",
        },
        
        {
            title: "Priorità",
            dataIndex: "priorita",
            sorter: (a, b) => a.priorita - b.priorita,
            render: (text) => {
                const { label, color } = getPrioritaDetails(text);
                return (
                    <Tooltip title={label}>
                        <div className="flex  gap-2 items-center text-center">
                            <ExclamationTriangleIcon color={color} width={24} />
                            <Typography.Paragraph className="m-0 font-semibold">
                                {label}
                            </Typography.Paragraph>
                        </div>
                    </Tooltip>
                );
            },
            width: "17%",
        },
        {
            title: "Gruppo",
            dataIndex: "gruppo",
            sorter: (a, b) => {
              const msgA = a.gl_account.gruppo?.toLowerCase() || "";
              const msgB = b.gl_account.gruppo?.toLowerCase() || "";
              return msgA.localeCompare(msgB);
            },
            render: (text,record) => (        
                  <Typography.Paragraph className="m-0 font-semibold">
                    {record.gl_account.gruppo}
                  </Typography.Paragraph>
            ),
            width: "15%",
          },
        {
            title: "Sottogruppo",
            dataIndex: "gl_account",
            sorter: (a, b) => {
              const msgA = a.gl_account.sotto_gruppo?.toLowerCase() || "";
              const msgB = b.gl_account.sotto_gruppo?.toLowerCase() || "";
              return msgA.localeCompare(msgB);
            },
            render: (text,record) => (        
                  <Typography.Paragraph className="m-0 font-semibold">
                    {record?.gl_account?.sotto_gruppo || "N/A"}
                  </Typography.Paragraph>
            ),
            width: "15%",
          },
        {
            title: "Richiedente",
            dataIndex: "user_id_rr",
            sorter: (a, b) => {
                const nameA = a?.user_richiedente?.full_name || "";
                const nameB = b?.user_richiedente?.full_name || "";
                return nameA.localeCompare(nameB);
            },
            render: (text, r) => (
                <Typography.Paragraph className="m-0 font-semibold">
                    {r.user_richiedente?.full_name}
                </Typography.Paragraph>
            ),
            width: "15%",
        },
        {
            title: "Data Richiesta",
            dataIndex: "data_creazione",
            sorter: (a, b) => new Date(a.data_creazione).getTime() - new Date(b.data_creazione).getTime(),
            render: (text) => (
                <Typography.Paragraph className="m-0 font-semibold">
                    {new Date(text).toLocaleDateString("it-IT")}
                </Typography.Paragraph>
            ),
            width: "15%",
        },
        {
            title: "Stato",
            dataIndex: "stato",
            sorter: (a, b) => a.stato - b.stato,
            render: (text) => (
                <Tooltip title={getStatoLabel(text)}>
                    <div className="flex  gap-1 items-center ">
                        {getStatoIcon(text)}
                        <Typography.Paragraph className="m-0 font-semibold">
                            {getStatoLabel(text)}
                        </Typography.Paragraph>
                    </div>
                </Tooltip>
            ),
            width: "20%",
        },
        {
            title: "PR",
            dataIndex: "rda_sap",
            sorter: (a, b) => {
              const msgA = a.po?.toLowerCase() || "";
              const msgB = b.po?.toLowerCase() || "";
              return msgA.localeCompare(msgB);
            },
            render: (text,record) => (
              <Typography.Paragraph className="m-0 font-semibold">
                {record.rda_sap || "N/A"}
              </Typography.Paragraph>
            ),
            width: "13%",
          },
        {
            title: "Po",
            dataIndex: "po",
            sorter: (a, b) => {
                const nameA = a.po || "";
                const nameB = b.po || "";
                return nameA.localeCompare(nameB);
            },
            render: (text) => (
                <Typography.Paragraph className="m-0 font-semibold">
                    {text}
                </Typography.Paragraph>
            ),
            width: "15%",
        },
        {
            title: "Data Consegna",
            dataIndex: "data_consegna",
            sorter: (a, b) => new Date(a.data_consegna).getTime() - new Date(b.data_consegna).getTime(),
            render: (text) => (
                <Typography.Paragraph className="m-0 font-semibold">
                    {new Date(text).toLocaleDateString("it-IT")}
                </Typography.Paragraph>
            ),
            width: "15%",
        },
        {
            title: "Totale ",
            dataIndex: "totale_richiesta",
            sorter: (a, b) => a.totale_richiesta - b.totale_richiesta,
            render: (text) => (
                <Typography.Paragraph className="m-0 font-semibold">
                    {new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(text)} €
                </Typography.Paragraph>
            ),
            width: "15%",
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
                            icon={<EyeIcon width={20} color="black" />}
                            onClick={() =>
                                router.push(`/dashboard/richieste/${record.id}`)
                            }
                        />
                    </Tooltip>
                    <GrantPermission to={['rda_spv', 'rda_L1']} >
                        <Tooltip title="Ricrea Rda" zIndex={1}>
                            <Button
                                style={{
                                    marginRight: "5px",
                                }}
                                icon={<DocumentDuplicateIcon width={20} color="black" />}
                                onClick={() =>
                                    router.push(`/dashboard/richieste/nuova-richiesta?id=${record.id}`)
                                }
                            />
                        </Tooltip>
                    </GrantPermission>
                    <GrantPermission to={['rda_admin']} >
                        {record.stato === 90 &&
                            <Tooltip title="Modifica Data di Consegna/GL-Account" zIndex={1}>
                                <Button
                                    style={{
                                        marginRight: "5px",
                                    }}
                                    icon={<PencilIcon width={20} className="text-orange-500 stroke-orange-500" />}
                                    onClick={() => {
                                        modalEdit.show();
                                        formEdit.setFieldsValue({
                                            id: record.id,
                                            data_consegna: record.data_consegna
                                                ? dayjs(record.data_consegna)
                                                : null,
                                            id_gl_account: record.id_gl_account
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
            width: "15%",
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
}; */

