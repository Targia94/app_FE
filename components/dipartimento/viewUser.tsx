import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
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
import { TrashIcon } from "@heroicons/react/24/outline";


export default function ListUserDepartmentModal({ modal, form }: IModalProps) {
  const { isOpen, cta } = modal;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [systemNtf, contextHolder] = notification.useNotification({
    stack: { threshold: 3 },
  });

  const handleRoleChange = (selectedOption: string) => {
    setSelectedFilter(selectedOption);
  };

  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setSearchTerm(value);
    }, 500);
  }, []);

  /**
   * Retrieve Location data
   */
  const { status, data, error, refetch: refetchCdc } = useQuery({
    queryKey: ["departmentUsers", searchTerm, selectedFilter],
    queryFn: () => getUserDepartment({ department_id: form?.getFieldValue("departmentId"), ...(searchTerm && { full_name: searchTerm }), ...(selectedFilter && { role: selectedFilter }) }),
    enabled: isOpen
  });

  /* 
    Remove Cdc
  */

  const handleDeny = async (values: any) => {
    await removeDepartmentUser(values);
    systemNtf.success({
      message: "Attenzione",
      description: "Utente rimosso con successo.",
      placement: "bottom",
    });
    await refetchCdc();
  };

  /**
   * Table settings
   */

  const columns: TableColumnsType<UserDepartment> = [
    {
      title: "Utente",
      dataIndex: "users",
      sorter: (a, b) => {
        const nomeA = a.users.full_name ? a.users.full_name.toLowerCase() : 'zzzzzz';
        const nomeB = b.users.full_name ? b.users.full_name.toLowerCase() : 'zzzzzz';

        if (nomeA < nomeB) return -1;
        if (nomeA > nomeB) return 1;
        return 0;
      },
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 ">
            {record.users.full_name}
          </Typography.Paragraph>
        </>
      ),
      width: "100%",
    },
    {
      title: "Ruolo",
      dataIndex: "role_id",
      render: (text, record) => (
        <>
          <Typography.Paragraph className="m-0 ">
            {record.role_id}
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
          onConfirm={() => handleDeny({ id: r.id, supertoken_uid3: r.supertoken_uid })}
          okText="Si"
          cancelText="No"
        >
          <Tooltip title="Rimuovi Utente" zIndex={1000}>
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
      title={
        <Typography.Title level={2} className="mb-4">
          Alternate/Spv Assegnati
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
      <Divider />
      <div className="flex gap-2 items-center mb-4 mt-0  xs:gap-4">
        <Input
          addonBefore={"Utente"}
          placeholder={"Ricerca utente"}
          allowClear
          size={!isMobile ? 'large' : 'middle'}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <Select
          defaultValue="Ruoli"
          size={!isMobile ? 'large' : 'middle'}
          style={{ width: "200px" }}
          onSelect={handleRoleChange}
          options={[
            { value: '', label: 'Tutti' },
            { value: 'supervisor', label: 'Supervisor' },
            { value: 'alternate', label: 'Alternate' },
          ]}
        />
      </div>
      <Form
        form={form}
        className="hidden"
        name="delete-user"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Nome"
          name="departmentId"
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
