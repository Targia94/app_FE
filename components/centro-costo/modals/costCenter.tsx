import {
  Divider,
  Input,
  Modal,
  Radio,
  Table,
  Typography,
  type TableColumnsType,
} from "antd";

import {
  formatPagination,
  useQueryWithPagination,
} from "@/libs/api/hooks/useQueryWithPagination";
import { DEFAULT_STALE_TIME } from "@/libs/api/utils/constants";

import type { IModalProps } from "@/libs/hooks/useModal";

import { getCentersCost } from "@/libs/api/methods/costCenter";
import { CentriCosto } from "@/libs/api/types/costCenter";
import { useMediaQuery } from "@/libs/hooks/useMediaQuery";
import { debounce } from "@/libs/utils/optimization";
import { useEffect, useMemo, useState } from "react";
import GrantPermission from "@/components/auth/grant-permission";
import { useSession } from "@/libs/hooks/useSession";

const ruolo = (i?: string[])=>{
  if(i && i[0]=="operatore_produzione"){
    return "Produzione"
  } else if(i && i[0]=="operatore_meccanico"){
    return "Meccanico"
  }else if (i && i[0]=="operatore_elettrico"){
    return "Elettrico"
  } else 
  return ""
}

export default function ListCostCenter({ modal }: IModalProps) {
  const { isOpen, cta } = modal;

  const { data: user} = useSession();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<CentriCosto[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setSelectedFilter(ruolo(user.roles));
  }, [user.roles]);

  /**
   * Debounce
   */
  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setSearchTerm(value);
    }, 500);
  }, []);

  /**
   * Retrieve Location data
   */

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    newSelectedProducts: CentriCosto[]
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedProducts(newSelectedProducts);
    cta.ok(newSelectedProducts);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  

  const { status, data, error, pagination } = useQueryWithPagination({
    queryKey: ["centerCost",  selectedFilter, searchTerm],
    queryFn: getCentersCost,
    queryFnParams: {
      filters: [
        ...(searchTerm ? [{ key: "full_cdc", value: searchTerm }] : []),
        ...(selectedFilter.length
          ? [{ key: "tipo", value: selectedFilter }]
          : []),
      ],
      
    },
    staleTime: DEFAULT_STALE_TIME,
  });

  /**
   * Table settings
   */

  const columns: TableColumnsType<CentriCosto> = [
    {
      title: "Centro di Costo",
      dataIndex: "linea" ,
      key: "linea",
      render: (text, record) => (
        <Typography.Paragraph className="m-0">
          {record.linea} {record.tipo}
        </Typography.Paragraph>
      ),
      width: "",
    },
  ];

  return (
    <Modal
      open={isOpen}
      centered
      onCancel={cta.cancel}
      footer={[]}
      className="sm:[&_.ant-modal-content]:p-3"
    >
      <div className="flex gap-2 justify-between items-center mb-5">
        <Typography.Title level={3} className="m-0">
          Centri di Costo
        </Typography.Title>
      </div>

      <Divider />

      <div className="flex gap-2 justify-end mb-4">
        <Input
          placeholder="Ricerca Centro di Costo"
          allowClear
          size={!isMobile ? "large" : "middle"}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      <Radio.Group
        className="flex flex-wrap justify-around mb-4 sm:justify-between"
        onChange={(e) => setSelectedFilter(e.target.value)}
        value={selectedFilter}
        
      >
        <GrantPermission to={[ "admin", "ptl"]}>
        <Radio value={""} className="sm:mb-2">Tutti</Radio>
        </GrantPermission>
        <GrantPermission to={[ "operatore_meccanico","operatore_ovm","admin","ptl"]}>
        <Radio value={"Meccanico"} className="sm:mb-2">Meccanico</Radio>
        </GrantPermission>
        <GrantPermission to={[ "operatore_elettrico","admin","ptl"]}>
        <Radio value={"Elettrico"} className="sm:mb-2">Elettrico</Radio>
        </GrantPermission>
        <GrantPermission to={[ "operatore_produzione","operatore_ovm","admin","ptl"]}>
        <Radio value={"Produzione"} className="sm:mb-2">Produzione</Radio>
        </GrantPermission>
      </Radio.Group>

      <Table
        columns={columns}
        rowSelection={{ type: "radio", ...rowSelection }}
        onRow={(record) => ({
          onClick: () => {
            const selectedRowKeys = [record.id];
            const selectedProducts = [record];
            onSelectChange(selectedRowKeys, selectedProducts);
          },
        })}
        rowKey={(record) => record.id}
        dataSource={data}
        loading={status == "pending"}
        pagination={formatPagination(pagination)}
        scroll={{ y: isMobile ? "30vh" : "45vh" }}
      />
    </Modal>
  );
}
