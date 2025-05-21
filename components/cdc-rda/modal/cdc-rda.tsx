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
  
  import { getCentersCost, getCentersCostRda } from "@/libs/api/methods/costCenter";
  import { useMediaQuery } from "@/libs/hooks/useMediaQuery";
  import { debounce } from "@/libs/utils/optimization";
  import { useEffect, useMemo, useState } from "react";
  import { useSession } from "@/libs/hooks/useSession";
  import { CdCRda } from "@/libs/api/types/richiesta";
  
  
  export default function ListCostCenterRda({ modal }: IModalProps) {
    const { isOpen, cta } = modal;
  
    
  
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<CdCRda[]>([]);
    const isMobile = useMediaQuery("(max-width: 768px)");
  
   
  
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
      newSelectedProducts: CdCRda[]
    ) => {
      setSelectedRowKeys(newSelectedRowKeys);
      setSelectedProducts(newSelectedProducts);
      cta.ok(newSelectedProducts);
    };
  
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    
  
    const {
        status,
        data,
        pagination,
        refetch: refetchCdc
      } = useQueryWithPagination({
        queryKey: ['cdc-rda',searchTerm],
        queryFn: getCentersCostRda,
        queryFnParams: {
          filters: [
            ...(searchTerm ? [{ key: "descrizione", value: searchTerm }] : [])
          ],
        },
        staleTime: DEFAULT_STALE_TIME
      })
  
    /**
     * Table settings
     */
  
    const columns: TableColumnsType<CdCRda> = [
  
      /* {
        title: "Linea",
        dataIndex: "cc",
        key: "linea",
        render: (text, record) => (
          <Typography.Paragraph className="m-0">
            {record.cc}
          </Typography.Paragraph>
        ),
        width: "100%",
      }, */
      {
        title: "Descrizione",
        dataIndex: "descrizione",
        key: "linea",
        sorter: (a, b) => {
          const nomeA = a.descrizione ? a.descrizione.toLowerCase() : 'zzzzzz'
          const nomeB = b.descrizione ? b.descrizione.toLowerCase() : 'zzzzzz'
          return nomeA.localeCompare(nomeB)
        }, 
        render: (text, record) => (
          <Typography.Paragraph className="m-0">
            {record.descrizione}
          </Typography.Paragraph>
        ),
        width: "100%",
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
  
  
        <Table
          columns={columns}
          rowSelection={{ type: "radio", ...rowSelection }}
          onRow={(record) => ({
            onClick: () => {
              const selectedRowKeys = [record.cc];
              const selectedProducts = [record];
              onSelectChange(selectedRowKeys, selectedProducts);
            },
          })}
          rowKey={(record) => record.cc}
          dataSource={data}
          loading={status == "pending"}
          pagination={formatPagination(pagination)}
          scroll={{ y: isMobile ? "30vh" : "45vh" }}
        />
      </Modal>
    );
  }
  