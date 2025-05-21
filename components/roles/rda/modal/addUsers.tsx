import {
  Button,
  Divider,
  Input,
  Layout,
  Modal,
  notification,
  Radio,
  Table,
  Typography,
  type TableColumnsType,
} from "antd";




import type { IModalProps } from "@/libs/hooks/useModal";

import { useMediaQuery } from "@/libs/hooks/useMediaQuery";
import { debounce } from "@/libs/utils/optimization";
import { useMemo, useState } from "react";

import { useRouter } from "next/router";
import { UserT } from "@/libs/api/types/user";
import { useQuery } from "@tanstack/react-query";
import { addRoleToUserAPI, addSupervisorToL1, getUsersExceptRolesAPI, getUsersRolesAPI, getUserToAddRda } from "@/libs/api/methods/admin";

export interface AddSupervisorToL1 extends IModalProps{
  parentId: string
}


export default function ListUsersToL1({ modal, parentId }: AddSupervisorToL1) {
  const { isOpen, cta } = modal;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedUsers, setselectedUsers] = useState<UserT[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const [systemNtf, contextHolder] = notification.useNotification({
    stack: { threshold: 3 },
  });

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
    queryKey: ["usersToAddRda",parentId, searchTerm],
    queryFn: () => getUserToAddRda(({ parentId, name: searchTerm })),
    enabled: isOpen
  });


  /**
 * Send request
 */
  const handleSave = async () => {
    const userIds = selectedUsers.map(user => user.supertoken_uid);
    if (selectedUsers.length === 0) {
      systemNtf.warning({
        message: "Attenzione",
        description: "Seleziona almeno un Utente.",
        placement: "top",
      });
      return;
    }
    try {
      for (const userId of userIds) {
        await addSupervisorToL1({ parentId,childId:userId });
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

  ];

  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <Typography.Title level={2} className="mb-4">
          Utenti
        </Typography.Title>
      }
      centered

      open={isOpen}
      onCancel={cta.cancel}
      onOk={handleSave}
      footer={false}
      className="sm:[&_.ant-modal-content]:p-3"
    >
      {contextHolder}
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
      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey={(data) => data.supertoken_uid}
        dataSource={data?.response.users || []}
        scroll={{ y: isMobile ? "40vh" : "70vh" }}
      />

    </Modal>
  );
}
