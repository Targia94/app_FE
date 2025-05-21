import { Richiesta } from "@/libs/api/types/richiesta";
import { PrioritaOption } from "@/pages/dashboard/richieste/nuova-richiesta";

import { Button, TableColumnsType, Tooltip, Typography } from "antd";
import router from "next/router";
import { getStatoIcon } from "./richieste.rr.column";
import { getStatoLabel } from ".";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ColumnRichiesteProps {
}

export const columns_richieste_mobile = ({
  
}: ColumnRichiesteProps): TableColumnsType<Richiesta> => [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      render: (text) => (
        <Typography.Paragraph className="m-0 font-semibold">
          {text}
        </Typography.Paragraph>
      ),
      width: "8%",
    },/* 
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
    }, */
    /* {
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
    }, */
    {
      title: "Stato",
      dataIndex: "stato",
      sorter: (a, b) => a.stato-b.stato,
      render: (text) => (
        <Tooltip title={text}>
          <div className="flex  gap-2 items-center ">
            {getStatoIcon(text )}
            <Typography.Paragraph className="m-0 font-semibold">
              {getStatoLabel(text)}
            </Typography.Paragraph>
          </div>
        </Tooltip>
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
export const getPrioritaDetails = (priorita?: number): { label: string; color: string } => {
  const prioritaOption = prioritaList.find((option) => option.value === priorita);
  return {
    label: prioritaOption?.label || "N/A",
    color: prioritaOption?.color || "gray",
  };
};


