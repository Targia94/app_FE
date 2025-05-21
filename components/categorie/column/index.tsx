import { Categoria } from "@/libs/api/types/categorie";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Button, TableColumnsType, Tooltip, Typography } from "antd";

interface ColumnsCategorieProps {
  modalEdit: { show: () => void }
  modalDelete: { show: () => void }
  setEditForm: (id: number, descrizione: string) => void
  setDeleteForm: (id: number) => void
}

export const columnsCategorie=({
  modalEdit,
  modalDelete,
  setDeleteForm,
  setEditForm
}:ColumnsCategorieProps): TableColumnsType<Categoria> => [
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
      title: "Descrizione",
      dataIndex: "descrizione",
      sorter: (a, b) => {
        const nomeA = a.descrizione ? a.descrizione.toLowerCase() : 'zzzzzz';
        const nomeB = b.descrizione ? b.descrizione.toLowerCase() : 'zzzzzz';

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
          <Tooltip title="Modifica Categoria" zIndex={1}>
            <Button
              style={{
                marginRight: "5px",
              }}
              icon={<PencilIcon width={20} color="black" />}
              onClick={() => {
                modalEdit.show();
                setEditForm(r.id,r.descrizione)
              }}
            />
          </Tooltip>
          <Tooltip title="Elimina Categoria" zIndex={1}>
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