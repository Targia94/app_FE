
import { Richiesta } from "@/libs/api/types/richiesta";
import { PrioritaOption } from "@/pages/dashboard/richieste/nuova-richiesta";
import {
    CheckCircleIcon, EyeIcon, PauseCircleIcon, QuestionMarkCircleIcon,
    XCircleIcon, ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { Button, TableColumnsType, Tooltip, Typography } from "antd";
import router from "next/router";
import { getStatoIcon } from "./richieste.rr.column";
import { getStatoLabel } from ".";

interface ColumnsRichiesteRRProps {

}



export const columns_richieste_rr_mobile = ({

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
            width: "7%",
        },
        {
            title: "Oggetto & Stato",
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
                        <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-col sm:items-start ">
                            
                            <div key="Priorità" className="flex items-center gap-1 shrink-0">
                                <ExclamationTriangleIcon color={color} width={20} />
                                <Typography.Paragraph key="Oggetto" className="m-0 font-semibold flex-1 min-w-0">
                                {text}
                            </Typography.Paragraph>
                            </div>
                            <div key="Stato" className="flex items-center gap-1 shrink-0">
                                {getStatoIcon(record.stato )}
                                <Typography.Paragraph className="m-0 font-medium text-xs whitespace-nowrap">
                                    {getStatoLabel(record.stato)}
                                </Typography.Paragraph>
                            </div>
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

                </>
            ),
            width: "8%",
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


