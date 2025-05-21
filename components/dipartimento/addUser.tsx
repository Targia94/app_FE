import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Typography,
  type TableColumnsType,
} from "antd";

import type { IModalProps } from "@/libs/hooks/useModal";

import { useMediaQuery } from "@/libs/hooks/useMediaQuery";

import { useMemo, useState } from "react";

import { UserT } from "@/libs/api/types/user";
import { useQuery } from "@tanstack/react-query";
import { assignUser, getUserToAdd } from "@/libs/api/methods/admin";
import { debounce } from "@/libs/utils/optimization";




export default function ListUsersToAdd({ modal, form }: IModalProps) {
  const { isOpen, cta } = modal;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedUsers, setselectedUsers] = useState<UserT[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");



  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    newselectedUsers: UserT[]
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setselectedUsers(newselectedUsers);

  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };


  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setSearchTerm(value);
    }, 500);
  }, []);
  /**
   * Retrieve Location data
   */
  const { status, data, error } = useQuery({
    queryKey: ["usersAddDep",searchTerm],
    queryFn: () => getUserToAdd({ department_id2: form?.getFieldValue("id"),  ...(searchTerm && { name: searchTerm }) }),
    enabled: isOpen
  });


  /**
 * Send request
 */
  const handleSave = async () => {

    try {
      for (const user of selectedUsers) {
        await assignUser({
          department_id: form?.getFieldValue("id"),
          supertoken_uids: user.supertoken_uid,
          role_id: user.roles,
        });
      }

      setSelectedRowKeys([]);
      setselectedUsers([]);
      cta.ok();
    } catch (error) {
      console.error('Failed to add users to group', error);
      // setSelectedRowKeys([]);
      // setselectedUsers([]);
    }
  };

  /**
   * Table settings
   */

  const columns: TableColumnsType<UserT> = [
    {
      title: "Utente",
      dataIndex: "full_name",
      sorter: (a, b) => {
        const nomeA = a.full_name ? a.full_name.toLowerCase() : 'zzzzzz';
        const nomeB = b.full_name ? b.full_name.toLowerCase() : 'zzzzzz';
        
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
      title: "Email",
      dataIndex: "email",
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
      title: "Ruolo",
      dataIndex: "roles",
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 font-semibold">
            {text}
          </Typography.Paragraph>
        </>
      ),
      width: "100%",
    },

  ];

  const columnsMobile: TableColumnsType<UserT> = [
    {
      title: "Utente ed Email",
      dataIndex: "full_name",
      sorter: (a, b) => {
        const nomeA = a.full_name ? a.full_name.toLowerCase() : 'zzzzzz';
        const nomeB = b.full_name ? b.full_name.toLowerCase() : 'zzzzzz';
        
        if (nomeA < nomeB) return -1;
        if (nomeA > nomeB) return 1;
        return 0;
      },
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 font-semibold">
            {text}
          </Typography.Paragraph>
          <Typography.Paragraph className="m-0 ">
            {record.email}
          </Typography.Paragraph>
        </>
      ),
      width: "70%",
    },
    {
      title: "Ruolo",
      dataIndex: "roles",
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 font-semibold">
            {text}
          </Typography.Paragraph>
        </>
      ),
      width: "50%",
    },

  ];

  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <Typography.Title level={2} className="mb-4">
          Supervisori
        </Typography.Title>
      }
      centered
      width={1000}
      open={isOpen}
      onCancel={cta.cancel}
      onOk={handleSave}
      footer={false}
      className="sm:[&_.ant-modal-content]:p-3"
    >
      <div className="flex gap-2 items-center mb-4 mt-0 xs:flex-col xs:gap-4">
        <Input
          addonBefore={"Utente"}
          placeholder={"Ricerca l'utente"}
          allowClear
          size={!isMobile ? 'large' : 'middle'}
          onChange={(e) => debouncedSearch(e.target.value)}
        />

      </div>

      <div className="flex gap-2 justify-end mb-5" >
        <Button key="cancel" onClick={cta.cancel}>
          Cancella
        </Button>
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
        >
          Aggiungi Utente
        </Button>
      </div>

      <Form
        form={form}
        className="mt-5"
        name="new-role"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Id"
          name="id"
          hidden
        >
          <Input />
        </Form.Item>
      </Form>

      <Table
        rowSelection={{ preserveSelectedRowKeys: true, ...rowSelection }}
        columns={isMobile ? columnsMobile : columns}
        rowKey={(data) => data.supertoken_uid}
        dataSource={data?.response || []}
        scroll={{ y: isMobile ? "40vh" : "70vh" }}
      />

    </Modal>
  );
}
