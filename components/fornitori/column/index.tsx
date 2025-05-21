// src/components/fornitori/columnsFornitori.tsx
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Button, Tooltip, Typography } from 'antd'
import { Fornitore } from '@/libs/api/types/fornitore'
import { setFormFields } from '@/libs/utils/table'
import { ColumnsType } from 'antd/es/table'

interface ColumnsFornitoriProps {
  modalEdit: { show: () => void }
  modalDelete: { show: () => void }
  setDeleteForm: (id: number) => void
  setEditForm: (id: number, vendor: string, fornitore: string) => void
}

export const columnsFornitori = ({
  modalEdit,
  modalDelete,
  setDeleteForm,
  setEditForm
}: ColumnsFornitoriProps): ColumnsType<Fornitore> => [
  {
    title: "Vendor",
    dataIndex: "vendor",
    sorter: (a, b) => {
      const nomeA = a.vendor ? a.vendor.toLowerCase() : 'zzzzzz';
      const nomeB = b.vendor ? b.vendor.toLowerCase() : 'zzzzzz';
      return nomeA.localeCompare(nomeB);
    },
    render: (text) => (
      <Typography.Paragraph className="m-0 font-semibold">
        {text}
      </Typography.Paragraph>
    ),
    width: "100%",
  },
  {
    title: "Fornitore",
    dataIndex: "fornitore",
    sorter: (a, b) => {
      const nomeA = a.fornitore ? a.fornitore.toLowerCase() : 'zzzzzz';
      const nomeB = b.fornitore ? b.fornitore.toLowerCase() : 'zzzzzz';
      return nomeA.localeCompare(nomeB);
    },
    render: (text) => (
      <Typography.Paragraph className="m-0 font-semibold">
        {text}
      </Typography.Paragraph>
    ),
    width: "100%",
  },
  {
    title: "Azioni",
    dataIndex: "",
    key: "x",
    render: (v, r) => (
      <>
        <Tooltip title="Modifica Fornitore" zIndex={1}>
          <Button
            style={{
              marginRight: "5px",
            }}
            icon={<PencilIcon width={20} color="black" />}
            onClick={()=>{
              modalEdit.show();
              setEditForm(r.id,r.vendor,r.fornitore);
            }}
          />
        </Tooltip>
        <Tooltip title="Elimina Fornitore" zIndex={1}>
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
  }
]
