import {
    Button,
    Divider,
    Input,
    Layout,
    Modal,
    notification,
    Popconfirm,
    Radio,
    Table,
    Tooltip,
    Typography,
    type TableColumnsType,
  } from "antd";
  
  
  
  
  import type { IModalProps } from "@/libs/hooks/useModal";
  
  import { useMediaQuery } from "@/libs/hooks/useMediaQuery";
  import { debounce } from "@/libs/utils/optimization";
  import { useMemo, useState } from "react";
  
  import { useRouter } from "next/router";
  import { UserT } from "@/libs/api/types/user";
  import { useQuery, useQueryClient } from "@tanstack/react-query";
  import { addRoleToUserAPI, getUserRda, getUsersExceptRolesAPI, getUsersRolesAPI, getUserToAddRda, removeUserToRda } from "@/libs/api/methods/admin";
import { TrashIcon } from "@heroicons/react/24/outline";
  
  export interface AddSupervisorToL1 extends IModalProps{
    parentId: string
  }
  
  
  export default function ListUsersL1({ modal, parentId }: AddSupervisorToL1) {
    const { isOpen, cta } = modal;
  
    const [searchTerm, setSearchTerm] = useState('');
    const isMobile = useMediaQuery("(max-width: 768px)");
    
    const [systemNtf, contextHolder] = notification.useNotification({
      stack: { threshold: 3 },
    });
  
    const queryClient = useQueryClient()
  
  
    const debouncedSearch = useMemo(() => {
      return debounce((value: string) => {
        setSearchTerm(value);
      }, 500);
    }, []);
    /**
     * Retrieve Location data
     */
    const { status, data, error, refetch } = useQuery({
      queryKey: ["usersL1",parentId, searchTerm],
      queryFn: () => getUserRda(({ parentId, name: searchTerm  })),
      enabled: isOpen
    });
  

    /* remove usere */
  
    const handleDeny = async (values: any) => {
        await removeUserToRda(values);
        systemNtf.success({
          message: "Attenzione",
          description: "Utente rimosso con successo.",
          placement: "bottom",
        });
        await refetch();
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
        title: "Azioni",
        dataIndex: "",
        key: "x",
        align: "center",
        render: (v, r, i) => (
          <Popconfirm
            overlayClassName="[&_.ant-popconfirm-title]:text-lg [&_.anticon-exclamation-circle]:text-lg [&_.anticon-exclamation-circle]:mt-1.5"
            title="Rimuovi Utente."
            description="Confermi?"
            onConfirm={() => handleDeny({ parentId: parentId, childId: r.supertoken_uid })}
            okText="Si"
            cancelText="No"
          >
            <Tooltip title="Rimuovi Utente" zIndex={1000}>
              <Button
                
                icon={<TrashIcon width={20} color="red" />}
              />
            </Tooltip>
          </Popconfirm>
        ),
        width: "40%",
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
            Chiudi
          </Button>
        </div>
        <Table
          columns={columns}
          rowKey={(data) => data.supertoken_uid}
          dataSource={data?.response.users || []}
          scroll={{ y: isMobile ? "40vh" : "70vh" }}
        />
  
      </Modal>
    );
  }
  