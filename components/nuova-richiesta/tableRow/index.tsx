import React, { useEffect, useState } from "react";
import { Button, Divider, Popconfirm, Table, Typography, Form } from "antd";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/libs/hooks/useModal";
import ModalAddRow from "../modal/newRow.mobile";
import { useMediaQuery } from "@/libs/hooks/useMediaQuery";

interface DataType {
  key: number;
  codice: string;
  descrizione: string;
  quantita: number;
  uom: string;
  prezzo: number;
}

interface TableModalProps {
  onUpdateDetails: (details: Array<any>) => void;
  details?: Array<{ codice: string; descrizione: string; quantita: number; uom: string; prezzo: number }>;
}

const Table_Modal: React.FC<TableModalProps> = ({ onUpdateDetails, details = [] }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const modalNew = useModal({
    handleOk: async () => {
      try {
        setLoading(true);
        const values = await form.validateFields();
        handleAddRow(values);
      } catch (error) {
        console.error("Validation failed:", error);
      } finally {
        setLoading(false);
      }
    },
    handleCancel: () => modalNew.hide(),
  });

  /** Sincronizza `dataSource` con `details` quando cambia */
  useEffect(() => {
    if (details.length > 0) {
      setDataSource(
        details.map((item, index) => ({
          key: index + 1, // Assicura un key univoco
          codice: item.codice,
          descrizione: item.descrizione,
          quantita: item.quantita,
          uom: item.uom,
          prezzo: item.prezzo,
        }))
      );
      setCount(details.length + 1);
    }
  }, [details]);

  const updateParent = (updatedData: DataType[]) => {
    const formattedDetails = updatedData.map(({ codice, descrizione, quantita, uom, prezzo }) => ({
      codice,
      descrizione,
      quantita,
      uom,
      prezzo,
    }));
    onUpdateDetails(formattedDetails);
  };

  const handleAddRow = (values: any) => {
    const newRow: DataType = {
      key: count,
      codice: values.codice,
      descrizione: values.descrizione,
      quantita: values.quantita,
      uom: values.uom,
      prezzo: values.prezzo,
    };
    const newData = [...dataSource, newRow];
    setDataSource(newData);
    setCount(count + 1);
    updateParent(newData);
    form.resetFields();
    modalNew.hide();
  };

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    updateParent(newData);
  };

  const columns = [
    {
      title: "Codice Desc.",
      dataIndex: "codice",
      render: (_: any, record: DataType) => (
        <div>
          <Typography.Text strong>{record.codice}</Typography.Text>
          {/* <br />
          <Typography.Text>{record.descrizione}</Typography.Text> */}
        </div>
      ),
    },
    {
      title: "Quantità UOM x Prezzo",
      dataIndex: "quantita",
      render: (_: any, record: DataType) => (
        <div>
          <Typography.Text>{record.quantita} </Typography.Text>
          <Typography.Text>{record.uom}</Typography.Text>
          <Typography.Text> x {record.prezzo.toFixed(2)}</Typography.Text>
        </div>
      ),
      width:90
    },
    {
      title: "Parziale",
      dataIndex: "prezzo",
      render: (prezzo: number, record: DataType) => <Typography.Text>{new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((record.prezzo*record.quantita))} €</Typography.Text>,
      width: 70
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_: any, record: DataType) => (
        <Popconfirm title="Sei sicuro di voler eliminare?" onConfirm={() => handleDelete(record.key)}>
          <Button size="small" icon={<TrashIcon width={20} className="text-red-500 stroke-red-500" />} danger />
        </Popconfirm>
      ),
      width: 35,
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={modalNew.show}>
          Aggiungi Riga
        </Button>
      </div>
      <Table
        size="small"
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="key"
        expandable={
          isMobile
            ? {
              expandedRowRender: (record) => (
                <ul>
                  <li className='m-0'>
                    Descrizione: <b>{record.descrizione}</b>
                  </li>                      
                </ul>
              ),
              expandRowByClick: true,
              columnWidth: "22px"
            }
            : {}
        }
        scroll={{ y:  '30vh'  }}
        
      />
      {dataSource.length > 0 && (
        <>
          <Divider />
          <Typography.Text strong className="flex justify-end">
            Totale: {new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(dataSource.reduce((acc, item) => acc + (item.prezzo * item.quantita), 0))} €
          </Typography.Text>
        </>
      )}

      {/* Modale per aggiungere riga */}
      <ModalAddRow modal={modalNew} form={form} loading={loading} />
    </div>
  );
};

export default Table_Modal;
