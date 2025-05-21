import { CopyHistoryPlot, HistoryPlot } from "@/libs/api/types/budget";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Button, Popconfirm, TableColumnsType, Tooltip, Typography } from "antd";
import dayjs from "dayjs";

interface ColumnsCategorieProps {
  modalEdit: { show: () => void }
  setEditForm: (id: number, val0: number, val1: number, val2: number, data: string, graphic_id: number) => void
  reject: (id: number) => void;
  copyRow: (item:HistoryPlot)=> void
}

export const columnsHistory = ({
  modalEdit,
  setEditForm,
  reject,
  copyRow
}: ColumnsCategorieProps): TableColumnsType<HistoryPlot> => [
    {
      title: "Data",
      dataIndex: "data",
      sorter: (a, b) => dayjs(a.data).unix() - dayjs(b.data).unix(),
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 font-semibold">
            {text}
          </Typography.Paragraph>
        </>
      ),
      width: "80%",
    },
    {
      title: "Other",
      dataIndex: "val0",
      sorter: (a, b) => a.val0 - b.val0,
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 font-semibold">
          {new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(text)} €
          </Typography.Paragraph>
        </>
      ),
      width: "80%",
    },
    {
      title: "Contract",
      dataIndex: "val1",
      sorter: (a, b) => a.val1 - b.val1,
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 font-semibold">
          {new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(text)} €
          </Typography.Paragraph>
        </>
      ),
      width: "80%",
    },
    {
      title: "Spare",
      dataIndex: "val2",
      sorter: (a, b) => a.val2 - b.val2,
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 font-semibold">
          {new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(text)} €
          </Typography.Paragraph>
        </>
      ),
      width: "80%",
    },
    {
      title: "Azioni",
      dataIndex: "",
      key: "x",
      render: (v, r, i) => (
        <div className="flex gap-1">
          <Popconfirm
            title="Duplica riga"
            description="Confermi?"
            okText="Si"
            cancelText="No"
            onConfirm={() => copyRow(r)}
          >
            <Tooltip title="Duplica" zIndex={1}>
              <Button
                style={{ marginRight: "5px" }}
                icon={<DocumentDuplicateIcon width={20}  />}
              />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Modifica Mensilità" zIndex={1}>
            <Button
              style={{
                marginRight: "5px",
              }}
              icon={<PencilIcon width={20} className="text-orange-500 stroke-orange-500" />}
              onClick={() => {
                modalEdit.show();
                setEditForm(r.id, r.val0, r.val1, r.val2, r.data, r.graphic_id)
              }}
            />
          </Tooltip>
          <Popconfirm
            title="Elimina"
            description="Confermi?"
            okText="Si"
            cancelText="No"
            onConfirm={() => reject(r.id)}
          >
            <Tooltip title="Rifiuta" zIndex={1}>
              <Button
                style={{ marginRight: "5px" }}
                icon={<TrashIcon width={20} className="text-red-500 stroke-red-500" />}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
      width: "30%",
    },

  ];