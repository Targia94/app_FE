import { GLAccount } from '@/libs/api/types/gl-account'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Button, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'



export const columnsModalGLAccount : ColumnsType<GLAccount> = [
  /* {
    title: 'Cost Element',
    dataIndex: 'cost_element',
    sorter: (a, b) => {
      const nomeA = a.cost_element ? a.cost_element.toLowerCase() : 'zzzzzz'
      const nomeB = b.cost_element ? b.cost_element.toLowerCase() : 'zzzzzz'
      return nomeA.localeCompare(nomeB)
    },
    render: (text) => (
      <Typography.Paragraph className="m-0 font-semibold">
        {text}
      </Typography.Paragraph>
    ),
    width: '100%',
  },
  {
    title: 'Gruppo',
    dataIndex: 'gruppo',
    sorter: (a, b) => {
      const nomeA = a.gruppo ? a.gruppo.toLowerCase() : 'zzzzzz'
      const nomeB = b.gruppo ? b.gruppo.toLowerCase() : 'zzzzzz'
      return nomeA.localeCompare(nomeB)
    },
    render: (text) => (
      <Typography.Paragraph className="m-0 font-semibold">
        {text}
      </Typography.Paragraph>
    ),
    width: '100%',
  },
  {
    title: 'Sotto Gruppo',
    dataIndex: 'sotto_gruppo',
    sorter: (a, b) => {
      const nomeA = a.sotto_gruppo ? a.sotto_gruppo.toLowerCase() : 'zzzzzz'
      const nomeB = b.sotto_gruppo ? b.sotto_gruppo.toLowerCase() : 'zzzzzz'
      return nomeA.localeCompare(nomeB)
    },
    render: (text) => (
      <Typography.Paragraph className="m-0 font-semibold">
        {text}
      </Typography.Paragraph>
    ),
    width: '100%',
  }, */
  {
    title: 'Descrizione',
    dataIndex: 'descrizione',
    sorter: (a, b) => {
      const nomeA = a.descrizione ? a.descrizione.toLowerCase() : 'zzzzzz'
      const nomeB = b.descrizione ? b.descrizione.toLowerCase() : 'zzzzzz'
      return nomeA.localeCompare(nomeB)
    },
    render: (text) => (
      <Typography.Paragraph className="m-0 font-semibold">
        {text}
      </Typography.Paragraph>
    ),
    width: '100%',
  },
  /* {
    title: 'Const Element Descrizione',
    dataIndex: 'const_element_descr',
    sorter: (a, b) => {
      const nomeA = a.const_element_descr
        ? a.const_element_descr.toLowerCase()
        : 'zzzzzz'
      const nomeB = b.const_element_descr
        ? b.const_element_descr.toLowerCase()
        : 'zzzzzz'
      return nomeA.localeCompare(nomeB)
    },
    render: (text) => (
      <Typography.Paragraph className="m-0 font-semibold">
        {text}
      </Typography.Paragraph>
    ),
    width: '100%',
  } */
]
