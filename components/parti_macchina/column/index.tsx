import { PartiMacchina } from "@/libs/api/types/parti_macchina";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Button, TableColumnsType, Tooltip, Typography } from "antd";

interface ColumnsPartiMacchinaProps {
  modalEdit: { show: () => void }
  modalDelete: { show: () => void }
  setDeleteForm: (id: number) => void
  setEditForm: (id: number, linea: string, descrizione: string) => void
}

export const columnsPartiMacchina = ({
  modalEdit,
  modalDelete,
  setDeleteForm,
  setEditForm
}: ColumnsPartiMacchinaProps): TableColumnsType<PartiMacchina> => [
    {
      title: "ID",
      dataIndex: "id",

      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 font-semibold">
            {text}
          </Typography.Paragraph>
        </>
      ),
      width: "100%",
    },
    {
      title: "Linea",
      dataIndex: "linea",
      sorter: (a, b) => {
        const nomeA = a.linea ? a.linea.toLowerCase() : "zzzzzz";
        const nomeB = b.linea ? b.linea.toLowerCase() : "zzzzzz";

        if (nomeA < nomeB) return -1;
        if (nomeA > nomeB) return 1;
        return 0;
      },
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 font-semibold">
            {text}
          </Typography.Paragraph>
        </>
      ),
      width: "100%",
    },
    {
      title: "Descrizione",
      dataIndex: "descrizione",
      sorter: (a, b) => {
        const nomeA = a.descrizione ? a.descrizione.toLowerCase() : "zzzzzz";
        const nomeB = b.descrizione ? b.descrizione.toLowerCase() : "zzzzzz";

        if (nomeA < nomeB) return -1;
        if (nomeA > nomeB) return 1;
        return 0;
      },
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 font-semibold">
            {text}
          </Typography.Paragraph>
        </>
      ),
      width: "100%",
    },
    {
      title: "Azioni",
      dataIndex: "",
      key: "x",
      render: (v, r, i) => (
        <>
          <Tooltip title="Modifica Parte Macchina" zIndex={1}>
            <Button
              style={{
                marginRight: "5px",
              }}
              icon={<PencilIcon width={20} color="black" />}
              onClick={()=>{
                modalEdit.show();
                setEditForm(r.id,r.linea,r.descrizione);
              }}
            />
          </Tooltip>
          <Tooltip title="Elimina Parte Macchina" zIndex={1}>
            <Button
              style={{ backgroundColor: "red" }}
              icon={<TrashIcon width={20} className="text-white stroke-white" />}
              onClick={() => {
                modalDelete.show()
                setDeleteForm(r.id)
              }}
            />
          </Tooltip>
        </>
      ),
      width: "105px",
    },
  ];
