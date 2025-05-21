import { DettaglioRichiesta } from "@/libs/api/types/richiesta";
import { TableColumnsType, Typography } from "antd";

export const columns_dettagli_richiesta: TableColumnsType<DettaglioRichiesta> = [
    {
        title: "Codice",
        dataIndex: "codice",
        sorter: (a, b) => {
            const msgA = a.codice?.toLowerCase() || "";
            const msgB = b.codice?.toLowerCase() || "";
            return msgA.localeCompare(msgB);
        },
        render: (text) => (
            <Typography.Paragraph className="m-0 font-semibold">
                {text}
            </Typography.Paragraph>
        ),
        width: "15%",
    },
    {
        title: "Descrizione",
        dataIndex: "descrizione",
        sorter: (a, b) => {
            const msgA = a.descrizione?.toLowerCase() || "";
            const msgB = b.descrizione?.toLowerCase() || "";
            return msgA.localeCompare(msgB);
        },
        render: (text) => (
            <Typography.Paragraph className="m-0 font-semibold">
                {text}
            </Typography.Paragraph>
        ),
        width: "25%",
    },
    {
        title: "Unità Misura",
        dataIndex: "uom",
        sorter: (a, b) => {
            const msgA = a.uom?.toLowerCase() || "";
            const msgB = b.uom?.toLowerCase() || "";
            return msgA.localeCompare(msgB);
        },
        render: (text) => (
            <Typography.Paragraph className="m-0 font-semibold">
                {text}
            </Typography.Paragraph>
        ),
        width: "15%",
    },
    {
        title: "UOM",
        dataIndex: "quantita",
        sorter: (a, b) => a.quantita - b.quantita,
        render: (text) => (
            <Typography.Paragraph className="m-0 font-semibold">
                {text}
            </Typography.Paragraph>
        ),
        width: "15%",
    },
    {
      title: "EUR/UOM",
      dataIndex: "prezzo",
      sorter: (a, b) => a.prezzo - b.prezzo,
      render: (text, r) => (
        <Typography.Paragraph className="m-0 font-semibold">
          {new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(r.prezzo)} €
        </Typography.Paragraph>
      ),
      width: "15%",
    },
    {
        title: "Parziale",
        dataIndex: "parziale",
        sorter: (a, b) => (a.prezzo*a.quantita) - (b.prezzo*b.quantita),
        render: (text, r) => (
          <Typography.Paragraph className="m-0 font-semibold">
            {new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((r.prezzo*r.quantita))} €
          </Typography.Paragraph>
        ),
        width: "15%",
      },
    
    
];

export const columns_dettagli_richiesta_mobile: TableColumnsType<DettaglioRichiesta> = [
    {
        title: "Codice",
        dataIndex: "codice",
        sorter: (a, b) => {
            const msgA = a.codice?.toLowerCase() || "";
            const msgB = b.codice?.toLowerCase() || "";
            return msgA.localeCompare(msgB);
        },
        render: (text,record) => (
            <>
            <Typography.Paragraph className="m-0 font-semibold">
                {text}
            </Typography.Paragraph>
            {/* <Typography.Paragraph className="m-0 font-semibold">
                {record.descrizione}
            </Typography.Paragraph> */}
            </>
        ),
        width: "30%",
    },
    /* {
        title: "Descrizione",
        dataIndex: "descrizione",
        sorter: (a, b) => {
            const msgA = a.descrizione?.toLowerCase() || "";
            const msgB = b.descrizione?.toLowerCase() || "";
            return msgA.localeCompare(msgB);
        },
        render: (text) => (
            <Typography.Paragraph className="m-0 font-semibold">
                {text}
            </Typography.Paragraph>
        ),
        width: "25%",
    }, */
    {
      title: "Prezzo",
      dataIndex: "prezzo",
      sorter: (a, b) => a.prezzo - b.prezzo,
      render: (text, r) => (
        <Typography.Paragraph className="m-0 font-semibold">
          {new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(r.prezzo)} €
        </Typography.Paragraph>
      ),
      width: "30%",
    },
    {
        title: "Quantità e Uom",
        dataIndex: "uom",
        sorter: (a, b) => {
            const msgA = a.uom?.toLowerCase() || "";
            const msgB = b.uom?.toLowerCase() || "";
            return msgA.localeCompare(msgB);
        },
        render: (text,record) => (
            <Typography.Paragraph className="m-0 font-semibold">
                {record.quantita} {text}
            </Typography.Paragraph>
        ),
        width: "30%",
    },
    /* {
        title: "Quantità",
        dataIndex: "quantita",
        sorter: (a, b) => a.quantita - b.quantita,
        render: (text) => (
            <Typography.Paragraph className="m-0 font-semibold">
                {text}
            </Typography.Paragraph>
        ),
        width: "10%",
    }, */
];
