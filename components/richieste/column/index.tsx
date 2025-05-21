import { Richiesta, statoList } from "@/libs/api/types/richiesta";
import { PrioritaOption } from "@/pages/dashboard/richieste/nuova-richiesta";
import { Button, TableColumnsType, Tooltip, Typography } from "antd";
import router from "next/router";
import { getStatoIcon } from "./richieste.rr.column";
import { ExclamationTriangleIcon, EyeIcon, NoSymbolIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import GrantPermission from "@/components/auth/grant-permission";

interface ColumnRichiesteProps {
  userId: string;
  modalAnnulla: { show: () => void };
  setAnnullaForm: (id: number) => void;
  modalUpd: { show: () => void };
  setUpdForm: (id: number) => void;
}

export const columns_richieste = ({
  userId,
  modalAnnulla,
  modalUpd,
  setAnnullaForm,
  setUpdForm
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
      width: "5%",
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
          <div className="flex  gap-2 items-center ">
            {getStatoIcon(text)}
            <Typography.Paragraph className="m-0 font-semibold">
              {getStatoLabel(text)}
            </Typography.Paragraph>
          </div>
        </Tooltip>
      ),
      width: "15%",
    },
    /* {
      title: "Utente Richiedente",
      dataIndex: "user_id_rr",
      sorter: (a, b) => a.user_rr.full_name.localeCompare(b.user_rr.full_name),
      render: (text, r) => (
        <Typography.Paragraph className="m-0 font-semibold">
          {r.user_rr?.full_name}
        </Typography.Paragraph>
      ),
      width: "25%",
    }, */
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
      width: "20%",
    },

    {
      title: "PO",
      dataIndex: "po",
      sorter: (a, b) => {
        const msgA = a.po?.toLowerCase() || "";
        const msgB = b.po?.toLowerCase() || "";
        return msgA.localeCompare(msgB);
      },
      render: (text) => (
        <Typography.Paragraph className="m-0 font-semibold">
          {text || "N/A"}
        </Typography.Paragraph>
      ),
      width: "20%",
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
          <GrantPermission to={['rda_spv']} >
          {(record.stato ===50) &&
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
          {(userId== record.user_id_richiedente && record.stato !== 90 && record.stato !== 100) &&
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

export const getStatoLabel = (stato: number): string => {
  const statoOption = statoList.find((option) => option.value === stato);
  return statoOption?.label || "N/A";
};
