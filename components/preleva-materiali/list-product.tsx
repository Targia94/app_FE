import {
  Button,
  Divider,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Typography,
  type TableColumnsType,
} from "antd";

import {
  formatPagination,
  useQueryWithPagination,
} from "@/libs/api/hooks/useQueryWithPagination";
import { DEFAULT_STALE_TIME } from "@/libs/api/utils/constants";

import type { ProductDataDb } from "@/libs/api/types/product";

import { getManyProductsAPI } from "@/libs/api/methods/product";
import { useMediaQuery } from "@/libs/hooks/useMediaQuery";
import type { IModalProps } from "@/libs/hooks/useModal";
import { cn } from "@/libs/utils/classes";
import { debounce } from "@/libs/utils/optimization";
import { locationList } from "@/shared-data/location";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { productState } from "@/global-states/product";

function getPlaceholder(selectedFilter: string) {
  switch (selectedFilter) {
    case "descrizione":
      return "Cerca testo breve";
    case "descrizione_lunga":
      return "Cerca descrizione";
    default:
      return "Inserisci ricerca";
  }
}

interface ListProductProps extends IModalProps {
  selectedProducts: ProductDataDb[] | [];
}

export default function ListProduct({
  modal,
  selectedProducts,
}: ListProductProps) {
  const { isOpen, cta } = modal;

  

  const [searchCode, setSearchCode] = useState('');
  const [selectedFilter, setSelectedFilter] = useState("descrizione");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedProductsLocal, setSelectedProductsLocal] = useState<ProductDataDb[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  /* test */

  const [productsRecoil, setProductState] = useRecoilState<ProductDataDb[]>(productState)
  useEffect(() => {
    if (productsRecoil) {
      setSelectedProductsLocal(productsRecoil);
    }
  }, [productsRecoil]);

  /**
   * Debounce
   */
  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setSearchTerm(value);
    }, 500);
  }, []);

  const debouncedSearchCode = useMemo(() => {
    return debounce((value: string) => {
      setSearchCode(value);
    }, 500);
  }, []);

  /**
   * Retrieve Location data
   */
  useEffect(() => {
    
    if (selectedProducts.length >= 0) {
      setSelectedProductsLocal((prevSelectedProducts) => {
        const uniqueProducts = [
          ...prevSelectedProducts,
          ...selectedProducts,
        ].filter(
          (value, index, self) =>
            value &&
            self.findIndex((t) => t && t.codice === value.codice) === index
        );
        setSelectedRowKeys(uniqueProducts.map((product) => product.codice));
        
        return uniqueProducts;
      });
    }
  }, [selectedProducts]);


  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    newSelectedProducts: ProductDataDb[]
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedProductsLocal((prevSelectedProducts) => {
      const uniqueProducts = [
        ...prevSelectedProducts,
        ...newSelectedProducts,
      ].filter(
        (value, index, self) =>
          value &&
          self.findIndex((t) => t && t.codice === value.codice) === index
      );
      return uniqueProducts;
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { status, data, error, pagination } = useQueryWithPagination({
    queryKey: ["product",  selectedFilter, searchTerm,searchCode],
    queryFn: getManyProductsAPI,
    queryFnParams: {
      filters: [
        ...searchTerm ?   (searchTerm.includes('*')
          ? searchTerm.split('*').map((term) => ({ key: selectedFilter, value: term.trim() }))
          : [{ key: selectedFilter, value: searchTerm }]) : [],
        ...(searchCode ? [{ key: 'codice', value: `BR${searchCode}` }] : [])
      ],
    },
    staleTime: DEFAULT_STALE_TIME,
  });

  const handleLocationChange = (selectedOption: string) => {
    setSelectedFilter(selectedOption);
  };

  /**
   * Table settings
   */
  const columnsDesktop: TableColumnsType<ProductDataDb> = [
    {
      title: "Codice",
      dataIndex: "codice",
      key: "codice",
      render: (text) => (
        <Typography.Title level={5} className="m-0">
          {text}
        </Typography.Title>
      ),
      width: "20%",
    },
    {
      title:
        selectedFilter === "descrizione_lunga" ? "Descrizione" : "Testo breve",
      dataIndex:
        selectedFilter === "descrizione_lunga"
          ? "descrizione_lunga"
          : "descrizione",
      key: "descrizione",
      render: (text) => (
        <Typography.Paragraph className="m-0">{text}</Typography.Paragraph>
      ),
      width: "40%",
    },
    {
      title: "Ubicazione",
      dataIndex: "ubicazione",
      key: "ubicazione",
      render: (text) => (
        <Typography.Paragraph className="m-0">{text}</Typography.Paragraph>
      ),
      width: "170px",
    },
  ];

  const columnsMobile: TableColumnsType<ProductDataDb> = [
    {
      title: "Codice",
      dataIndex: "codice",
      key: "codice",
      render: (text) => (
        <Typography.Title level={5} className="m-0">
          {text}
        </Typography.Title>
      ),
      width: "120px",
    },
    {
      title:
        selectedFilter === "descrizione_lunga" ? "Descrizione" : "Testo breve",
      dataIndex:
        selectedFilter === "descrizione_lunga"
          ? "descrizione_lunga"
          : "descrizione",
      key: "descrizione",
      render: (text) => (
        <Typography.Paragraph className="m-0">{text}</Typography.Paragraph>
      ),
      width: "130px",
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={cta.cancel}
      onOk={() => cta.ok(selectedProductsLocal)}
      className={cn("sm:[&_.ant-modal-content]:p-3", !isMobile && "w-3/4")}
      centered
      footer={false}
      closeIcon={false}
    >
      <div className="flex">
        <Typography.Title level={3} className="m-0">
          Materiale Magazzino Ricambi
        </Typography.Title>
      </div>

      <Divider orientation="right" orientationMargin="0">
        <div className="flex gap-2">
          <Button key="cancel" onClick={cta.cancel}>
            Cancella
          </Button>
          <Button
            key="save"
            type="primary"
            onClick={() => cta.ok(selectedProductsLocal)}
          >
            Aggiungi Materiale
          </Button>
        </div>
      </Divider>

      <div className="flex gap-2 justify-end mb-4">
      <Space.Compact size={isMobile ? "middle":"large"} className='w-full sm:flex sm:flex-col sm:gap-2'>
        <Space.Compact size={isMobile ? "middle":"large"} className='w-full' >
          <Input
            addonBefore="CODICE"
            value="BR"          
            className={!isMobile ? 'w-40': 'w-48'} 
            readOnly
            disabled={selectedFilter=="descrizione_lunga"? true: false}
          />
          <Input            
            placeholder='Cerca codice'
            onChange={(e) => debouncedSearchCode(e.target.value)}
            disabled={selectedFilter=="descrizione_lunga"? true: false}
          />
        </Space.Compact>
              
          <Input 
            addonBefore={
              <Select  
                defaultValue={selectedFilter} 
                options={[
                  { value: 'descrizione', label: 'TESTO BREVE' },
                  { value: 'descrizione_lunga', label: 'PO TXT' }
                ]}
                onSelect={handleLocationChange} />}
                placeholder={getPlaceholder(selectedFilter)}
                onChange={(e) => debouncedSearch(e.target.value)}
            />
      </Space.Compact>
      </div>

      <Table
        columns={!isMobile ? columnsDesktop : columnsMobile}
        size={isMobile ? "small" : "large"}
        rowSelection={{ preserveSelectedRowKeys: true, ...rowSelection, columnWidth:"25px" }}
        rowKey={(record) => record.codice}
        dataSource={data}
        loading={status === "pending"}
        expandable={
          isMobile
            ? {
                expandedRowRender: (record) => (
                  <ul>
                    <li className="m-0">
                      {selectedFilter === "descrizione_lunga" ? (
                        <p>
                          Testo breve: <b>{record.descrizione}</b>
                        </p>
                      ) : (
                        <p>
                          Descrizione: <b>{record.descrizione_lunga}</b>
                        </p>
                      )}
                    </li>
                    <li className="m-0">
                      Ubicazione: <b>{record.ubicazione}</b>
                    </li>
                  </ul>
                ),
                expandRowByClick: true,
                columnWidth:"25px"
              }
            : {
                expandedRowRender: (record) => (
                  <ul>
                    <li className="m-0">
                      {selectedFilter === "descrizione_lunga" ? (
                        <p>
                          Testo breve: <b>{record.descrizione}</b>
                        </p>
                      ) : (
                        <p>
                          Descrizione: <b>{record.descrizione_lunga}</b>
                        </p>
                      )}
                    </li>
                  </ul>
                ),
                expandRowByClick: true,
              }
        }
        pagination={formatPagination(pagination)}
        scroll={{ y: isMobile ? "30vh" : "45vh" }}
      />
    </Modal>
  );
}
