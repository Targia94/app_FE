import {
  Button,
  Divider,
  Form,
  Input,
  Layout,
  Modal,
  notification,
  Popconfirm,
  Radio,
  Select,
  Table,
  Tooltip,
  Typography,
  type TableColumnsType,
} from "antd";




import type { IModalProps } from "@/libs/hooks/useModal";

import { useMediaQuery } from "@/libs/hooks/useMediaQuery";
import { useQuery } from "@tanstack/react-query";
import { getUserDepartment, removeDepartmentUser } from "@/libs/api/methods/admin";

import { UserDepartment } from "@/libs/api/types/userDepartment";
import { useMemo, useState } from "react";
import { debounce } from "@/libs/utils/optimization";
import { useSession } from "@/libs/hooks/useSession";
import { TrashIcon } from "@heroicons/react/24/outline";




export default function ListDepartmentUserModal({ modal, form }: IModalProps) {
  const { isOpen, cta } = modal;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [searchTerm, setSearchTerm] = useState('');
  const [systemNtf, contextHolder] = notification.useNotification({
    stack: { threshold: 3 },
  });

  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setSearchTerm(value);
    }, 500);
  }, []);

  /**
   * Retrieve Location data
   */
  const { status, data , error, refetch: refetchCdc } = useQuery({
    queryKey: ["departmentUser", searchTerm],
    queryFn: () => getUserDepartment({ supertoken_uid2: form?.getFieldValue("userId"), ...(searchTerm && { name: searchTerm }), role: form?.getFieldValue("roleId") }),
    enabled: isOpen
  });

  /* 
    Remove Cdc
  */

  const handleDeny = async (id: number) => {
    await removeDepartmentUser({ id: id });
    systemNtf.success({
      message: "Attenzione",
      description: "Reparto rimosso con successo.",
      placement: "bottom",
    });
    await refetchCdc();
  };

  /**
   * Table settings
   */

  const columns: TableColumnsType<UserDepartment> = [
    {
      title: "Reparto",
      dataIndex: "departments",
      sorter: (a, b) => {
        const nomeA = a.departments.name ? a.departments.name.toLowerCase() : 'zzzzzz';
        const nomeB = b.departments.name ? b.departments.name.toLowerCase() : 'zzzzzz';

        if (nomeA < nomeB) return -1;
        if (nomeA > nomeB) return 1;
        return 0;
      },
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 ">
            {record.departments.name}
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
          title="Rimuovi Reparto."
          description="Confermi?"
          onConfirm={() => handleDeny(r.id)}
          okText="Si"
          cancelText="No"
        >
          <Tooltip title="Rimuovi Reparto" zIndex={1000}>
            <Button
              style={{ backgroundColor: "red" }}
              icon={<TrashIcon width={20} className="text-white stroke-white" />}
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
          Reparti Assegnati
        </Typography.Title>
      }
      centered
      open={isOpen}
      onCancel={cta.cancel}
      footer={false}
      width={1000}
      className="sm:[&_.ant-modal-content]:p-3"
    >
      {contextHolder}
      <div className="flex gap-2 items-center mb-4 mt-0 xs:flex-col xs:gap-4">
        <Input
          addonBefore={"Reparto"}
          placeholder={"Ricerca reparto"}
          allowClear
          size={!isMobile ? 'large' : 'middle'}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        
      </div>
      <Divider />
      <Form
        form={form}
        className="hidden"
        name="delete-user"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Nome"
          name="userId"
          rules={[{ required: true, message: "Inserisci id" }]}
          hidden
        >
          <Input />
        </Form.Item>
      </Form>
      <Table
        size="large"
        columns={columns}
        rowKey={(data) => data.id}
        dataSource={data?.response}
        loading={status === 'pending'}
        scroll={{ y: isMobile ? "40vh" : "70vh" }}
      />

    </Modal>
  );
}
