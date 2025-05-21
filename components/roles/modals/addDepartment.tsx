import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Table,
  Typography,
  type TableColumnsType,
} from "antd";




import type { IModalProps } from "@/libs/hooks/useModal";

import { useMediaQuery } from "@/libs/hooks/useMediaQuery";

import { useMemo, useState } from "react";


import { useQuery } from "@tanstack/react-query";

import { assignUserDepratment, getDepartments, getDepartmentsToAdd } from "@/libs/api/methods/admin";

import { Department } from "@/libs/api/types/department";
import { debounce } from "@/libs/utils/optimization";




export default function ListDepartmentModal({ modal, form }: IModalProps) {
  const { isOpen, cta } = modal;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedCdc, setselectedCdc] = useState<Department[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [systemNtf, contextHolder] = notification.useNotification({
    stack: { threshold: 3 },
  });

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    newselectedUsers: Department[]
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setselectedCdc(newselectedUsers);

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
  const { status, data, refetch: refatchDepartment } = useQuery({
    queryKey: ["departmentAdd", searchTerm],
    queryFn: () => getDepartmentsToAdd({ supertoken_uid: form?.getFieldValue("userId"), ...(searchTerm && { name: searchTerm }) }),
    enabled: isOpen
  });
 

  /**
  * Send request
  */
  const handleSave = async () => {
    const cdcIds = selectedCdc.map(cdc => cdc.id);
    if (selectedCdc.length === 0) {
      systemNtf.warning({
        message: "Attenzione",
        description: "Seleziona almeno un Reparto.",
        placement: "top",
      });
      return;
    }
    try {
      await assignUserDepratment({ department_ids: cdcIds, supertoken_uid: form?.getFieldValue("userId"), role_id: form?.getFieldValue("roleId") });
      setSelectedRowKeys([]);
      refatchDepartment();
      setselectedCdc([]);
      cta.ok();
    } catch (error) {
      console.error('Failed to add cdc to user.', error);
      // setSelectedRowKeys([]);
      // setselectedUsers([]);
    }
  };

  /**
   * Table settings
   */

  const columns: TableColumnsType<Department> = [
    {
      title: "Nome",
      dataIndex: "name",
      sorter: (a, b) => {
        const nomeA = a.name ? a.name.toLowerCase() : 'zzzzzz';
        const nomeB = b.name ? b.name.toLowerCase() : 'zzzzzz';
        
        if (nomeA < nomeB) return -1;
        if (nomeA > nomeB) return 1;
        return 0;
      },
      render: (text) => (
        <>
          <Typography.Paragraph className="m-0 font-semibold">
            {text}
          </Typography.Paragraph>
        </>
      ),
      width: "100%",
    }

  ];

  return (
    <Modal
      maskClosable={false}
      closable={false}
            title={
        <Typography.Title level={2} className="mb-4">
          Reparti
        </Typography.Title>
      }
      centered

      open={isOpen}
      onCancel={cta.cancel}

      footer={false}
      className="sm:[&_.ant-modal-content]:p-3"
    >
      {contextHolder}
      <Divider />
      <div className="flex gap-2 items-center mb-4 mt-0 xs:flex-col xs:gap-4">
        <Input
          addonBefore={"Reparto"}
          placeholder={"Ricerca reparto"}
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
          Assegna Reparto
        </Button>
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
          name="userId"
          rules={[{ required: true, message: "Inserisci id" }]}
          hidden
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nome"
          name="roleId"
          rules={[{ required: true, message: "Inserisci id" }]}
          hidden
        >
          <Input />
        </Form.Item>

      </Form>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey={(data) => data.id}
        dataSource={data?.response || []}
        scroll={{ y: isMobile ? "40vh" : "70vh" }}
      />

    </Modal>
  );
}
