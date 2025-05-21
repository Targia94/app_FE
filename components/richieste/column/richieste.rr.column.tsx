import GrantPermission from "@/components/auth/grant-permission";
import { Richiesta } from "@/libs/api/types/richiesta";
import { PrioritaOption } from "@/pages/dashboard/richieste/nuova-richiesta";
import { CheckCircleIcon, EyeIcon, PauseCircleIcon, PencilIcon, QuestionMarkCircleIcon, TrashIcon, XCircleIcon, ExclamationTriangleIcon, CheckIcon, XMarkIcon, NoSymbolIcon, ExclamationCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button, Popconfirm, TableColumnsType, Tooltip, Typography } from "antd";
import router from "next/router";
import { getStatoLabel } from ".";

interface ColumnsRichiesteRRProps {

    handleApprove: (id: number) => void;
    reject: (id: number) => void;
    roles: string[];
    userId: string;
    loading: boolean;
    modalAnnulla: { show: () => void };
    setAnnullaForm: (id: number) => void;
    modalUpd: { show: () => void };
    setUpdForm: (id: number) => void;
}



export const columns_richieste_rr = ({
    handleApprove,
    reject,
    roles,
    loading,
    modalAnnulla,
    setAnnullaForm,
    modalUpd,
    userId,
    setUpdForm
}: ColumnsRichiesteRRProps): TableColumnsType<Richiesta> => [
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
            width: "10%",
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
                    {record.gl_account.sotto_gruppo}
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
            title: "Totale ",
            dataIndex: "totale_richiesta",
            sorter: (a, b) => a.totale_richiesta - b.totale_richiesta,
            render: (text) => (
                <Typography.Paragraph className="m-0 font-semibold">
                    {new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(text)} €
                </Typography.Paragraph>
            ),
            width: "10%",
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
                    {userId== record.user_id_richiedente &&
                    <GrantPermission to={['rda_L1','rda_spv']} >
                        {(record.stato === 50) &&
                            <Tooltip title="Inserisci Rda Sap" zIndex={1}>
                                <Button
                                    style={{
                                        marginRight: "5px",
                                    }}
                                    icon={<PencilSquareIcon width={20} className="text-orange-500 stroke-orange-500" />}
                                    onClick={() => {
                                        modalUpd.show()
                                        setUpdForm(record.id)
                                    }}
                                />
                            </Tooltip>
                        }
                    </GrantPermission>
                    }
                    {(record.stato !== 90 && record.stato !== 100 && record.user_id_richiedente === userId) &&
                        <Tooltip title="Annulla Richiesta" zIndex={1}>
                            <Button
                                style={{
                                    marginRight: "5px",
                                }}
                                icon={<NoSymbolIcon width={20} className="text-red-500 stroke-red-500" />}
                                onClick={() => {
                                    modalAnnulla.show()
                                    setAnnullaForm(record.id)
                                }}
                                danger
                            />
                        </Tooltip>
                    }

                    <GrantPermission to={[ "rda_L1", "rda_L2"]}>
                        {(
                            // Controllo per il ruolo rr
                            ((record.stato === 1 || record.stato === 13) &&
                                roles.includes("rda_L1")) ||

                            // Controllo per il ruolo af/df
                            ((record.stato === 19 || record.stato === 23) &&
                                roles.includes("rda_L2"))
                        ) && (
                                <>
                                    <Popconfirm
                                        title="Approva Richiesta"
                                        description="Confermi?"
                                        okText="Si"
                                        cancelText="No"
                                        cancelButtonProps={{ disabled: loading }}
                                        onConfirm={() => handleApprove(record.id)}
                                    >
                                        <Tooltip title="Approva" zIndex={1}>
                                            <Button
                                                style={{ marginRight: "5px" }}
                                                icon={<CheckIcon width={20} className="text-green-500 stroke-green-500" />}
                                            />
                                        </Tooltip>
                                    </Popconfirm>

                                    {/* <Tooltip title="Richiedi Info" zIndex={1}>
                                        <Button
                                            style={{ marginRight: "5px" }}
                                            icon={<QuestionMarkCircleIcon width={20} color="orange" />}
                                            onClick={() => {
                                                modalSendMessage.show();
                                                setSelectedRequest(record);
                                            }}
                                        />
                                    </Tooltip> */}

                                    <Popconfirm
                                        title="Rifiuta Richiesta"
                                        description="Confermi?"
                                        okText="Si"
                                        cancelText="No"
                                        cancelButtonProps={{ disabled: loading }}
                                        onConfirm={() => reject(record.id)}
                                    >
                                        <Tooltip title="Rifiuta" zIndex={1}>
                                            <Button
                                                style={{ marginRight: "5px" }}
                                                icon={<XMarkIcon width={20} className="text-red-500 stroke-red-500" />}
                                            />
                                        </Tooltip>
                                    </Popconfirm>
                                </>
                            )}
                    </GrantPermission>


                </>
            ),
            width: "20%",
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
export const getStatoIcon = (stato: number) => {
    const approvatoValues = [90, 19, 29]; // Accettato, Approvato_L1, Approvato_L2
    const rifiutatoValues = [15, 25]; // Rifiutato_L1, Rifiutato_L2
    const necessarieInformazioniValues = [11, 21, 50]; // Necessarie Informazioni L1 e L2
    const creazioneValue = 1;
    const annullatoValue = 100;
    const infoFornite = [13, 23, 80, 55];


    if (approvatoValues.includes(stato)) {
        return <CheckCircleIcon color="green" width={24} />;
    }
    if (rifiutatoValues.includes(stato)) {
        return <XCircleIcon color="red" width={24} />;
    }
    if (necessarieInformazioniValues.includes(stato)) {
        return <QuestionMarkCircleIcon color="orange" width={24} />;
    }
    if (infoFornite.includes(stato)) {
        return <ExclamationCircleIcon color="orange" width={24} />;
    }
    if (stato === creazioneValue) {
        return <PauseCircleIcon color="gold" width={24} />;
    }
    if (stato === annullatoValue) {
        return <NoSymbolIcon color="red" width={24} />;
    }

    return <PauseCircleIcon color="gray" width={24} />;
};

