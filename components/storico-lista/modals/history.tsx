import { Input, Modal, Space, Table, TableColumnsType, Typography } from "antd";

import { Ordine } from "@/libs/api/types/order";
import type { ProductDataDb } from "@/libs/api/types/product";
import { useMediaQuery } from "@/libs/hooks/useMediaQuery";
import type { UseModal } from "@/libs/hooks/useModal";
import { formatDate } from "@/libs/utils/date";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Item from "antd/es/list/Item";

interface IModalHistoryListProps {
  modal: UseModal;
  productsData?: any;
  orderData?: Ordine;
}

export default function ModalHistoryList({
  modal,
  orderData,
}: IModalHistoryListProps) {
  const { isOpen, cta } = modal;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const articles = orderData?.articoli;

  const columnsDesktop: TableColumnsType<ProductDataDb> = [
    {
      title: "Codice",
      dataIndex: "codice",
      key: "codice",
      render: (text) => (
        <Typography.Title level={5} className="m-0">
          {text}
        </Typography.Title>
      ),
      width: "170px",
    },
    {
      title: "Descrizione",
      dataIndex: "descrizione",
      key: "descrizione",
      render: (text) => (
        <Typography.Paragraph className="m-0">{text}</Typography.Paragraph>
      ),
      width: "calc(100% - 170px)",
    },
    {
      title: "UM",
      dataIndex: "umo",
      key: "umo",
      render: (text) => (
        <Typography.Paragraph className="m-0">{text}</Typography.Paragraph>
      ),
      width: "170px",
    },
    {
      title: orderData?.stato_ordine === "Prelevato" ? "Quantità Richiesta" : "Quantità",
      dataIndex: "da_prelevare",
      key: "da_prelevare",
      render: (text) => (
        <Typography.Paragraph className="m-0">{text}</Typography.Paragraph>
      ),
      width: "100px",
    },
    {
      title: "Quantità Prelevata",
      dataIndex: "prelevata",
      key: "prelevata",
      render: (text) => (
        <Typography.Paragraph className="m-0">{text}</Typography.Paragraph>
      ),
      width: "100px",
      hidden: orderData?.stato_ordine !== "Prelevato" && true
    },
    {
      title: "Approvato",
      dataIndex: "approvato",
      key: "approvato",
      render: (text) =>
        text == 1 ? (
          <CheckIcon width={20} color="green" />
        ) : (
          <XMarkIcon width={20} color="red" />
        ),
      width: "100px",
      align: "center",
      hidden: (orderData?.stato_ordine=="Creazione"||orderData?.stato_ordine=="Prelevato" ) && true
    },
  ];
  const columnsMobile: TableColumnsType<ProductDataDb> = [
    {
      title: "Codice",
      dataIndex: "codice",
      key: "codice",
      render: (text) => (
        <Typography.Title level={5} className="m-0">
          {text}
        </Typography.Title>
      ),
      width: "100px",
      
    },
    {
      title: "Quantità",
      dataIndex: "da_prelevare",
      key: "da_prelevare",
      render: (text) => (
        <Typography.Paragraph className="m-0">{text}</Typography.Paragraph>
      ),
      width: "60px",
      align: "center"
    },
    {
      title: "Approvato",
      dataIndex: "approvato",
      key: "approvato",
      render: (text) =>
        text == 1 ? (
          <CheckIcon width={20} color="green" />
        ) : (
          <XMarkIcon width={20} color="red" />
        ),
      width: "60px",
      align: "center",
      hidden: (orderData?.stato_ordine=="Creazione"||orderData?.stato_ordine=="Prelevato" ) && true
    },
  ];
  const stato = () => {
    if (orderData?.stato_ordine === "Approvato" && orderData.parziale == 0) {
      return "Approvato"
    } else if (orderData?.stato_ordine === "Approvato" && orderData.parziale == 1) {
      return "Approvato Parzialmente"
    } else if (orderData?.stato_ordine === "Prelevato" && orderData.stock_out == true) {
      return "Prelevato Parzialmente"
    } else {
      return orderData?.stato_ordine
    }
  }
  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <div className="flex justify-between mr-3 sm:justify-normal sm:gap-10">
          <Typography.Title level={4} className="m-0">
            Ordine n°: {orderData?.id_ordine}
          </Typography.Title>
          <Typography.Title level={4} className="mt-0">
            Stato:
            {orderData?.stato_ordine == "Creazione"
              ? "Da Approvare"
              : stato()}
          </Typography.Title>
        </div>
      }
      centered
      width={isMobile ? 400 : 1000}
      open={isOpen}
      onCancel={cta.cancel}
      onOk={cta.ok}
      footer={false}
      className="sm:[&_.ant-modal-content]:p-3"
    >

      <Space direction="vertical" style={{ marginBottom: 20 }}>
        <Typography.Paragraph className="mb-0">
          Centro di Costo:
        </Typography.Paragraph>
        <Input
          placeholder="Seleziona Centro di costo"
          value={
            orderData?.linea_centro_costo + " " + orderData?.tipo_centro_costo
          }
          disabled={true}
          size="middle"
        />
      </Space>
      <Typography.Paragraph>
        <div>Richiedente:</div>
        <Input
          disabled
          value={orderData?.nome_utente_creazione}
          className="w-auto"
        />
      </Typography.Paragraph>
      <Table
        size={isMobile ? "small" : "large"}
        dataSource={articles}
        rowKey={(record) => record.codice}
        columns={!isMobile ? columnsDesktop : columnsMobile}
        expandable={
          isMobile
            ? {
              expandedRowRender: (record) => (
                <ul>
                  <li className="m-0">
                    Descrizione: <b>{record.descrizione}</b>
                  </li>
                  <li className="m-0">
                    UMO: <b>{record.umo}</b>
                  </li>
                </ul>
              ),
              expandRowByClick: true,
              columnWidth: "20px"
            }
            : {}
        }
        scroll={{ y: isMobile ? "30vh" : "45vh" }}
      />
      <div className="flex mb-5 gap-3">
        <div>Note:</div>
        <Input.TextArea
          rows={4}
          value={
            ` ${orderData?.stock_out === true
              ? orderData.articoli
                .filter((item) => item.prelevata < item.da_prelevare)
                .map((item) => `${item.codice}: Stock Out`) 
                .join('\n ')
              : ""
            }\n${orderData?.note ?? ""}`
          }
          readOnly
        />
      </div>
      <div className="flex gap-10">
        <Typography.Paragraph>
          <div>Data:</div>
          <Input
            disabled={true}
            value={
              orderData?.data_creazione
                ? formatDate(orderData?.data_creazione)
                : "N/A"
            }
          />
        </Typography.Paragraph>
      </div>
    </Modal>
  );
}
