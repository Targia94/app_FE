import {
    Button,
    Divider,
    Input,
    Modal,
    notification,
    Radio,
    Table,
    Typography,
    type TableColumnsType,
  } from "antd";
  
  

  
import type { IModalProps } from "@/libs/hooks/useModal";
  
import { useMediaQuery } from "@/libs/hooks/useMediaQuery";

import {  useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { CentriCosto } from "@/libs/api/types/costCenter";
import { assignCdcDepratment, getCdc } from "@/libs/api/methods/admin";
import { useRouter } from "next/router";
import { debounce } from "@/libs/utils/optimization";



  
  export default function ListCdcModal({ modal }: IModalProps) {
    const { isOpen, cta } = modal;
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedCdc, setselectedCdc] = useState<CentriCosto[]>([]);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [systemNtf, contextHolder] = notification.useNotification({
      stack: { threshold: 3 },
    });

    const id = router.query.departmentId

    const onSelectChange = (
        newSelectedRowKeys: React.Key[],
        newselectedUsers: CentriCosto[]
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
    const { status, data, error } = useQuery({
        queryKey: ["cdcs",  searchTerm,selectedFilter],
        queryFn: () => getCdc({ department_id: id, ...(searchTerm && {linea: searchTerm}), ...(selectedFilter&& {tipo: selectedFilter}) }),
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
            description: "Seleziona almeno un Centro di Costo.",
            placement: "top",
          });
          return;
        }
        try {
            await assignCdcDepratment({ cdc_ids:cdcIds, department_id2: Number(id) });         
            setSelectedRowKeys([]);
            setselectedCdc([]);
            cta.ok();          
            } catch (error) {
            console.error('Failed to add cdc to department.', error);
            // setSelectedRowKeys([]);
            // setselectedUsers([]);
            }
        };

    /**
     * Table settings
     */
  
    const columns: TableColumnsType<CentriCosto> = [
      {
        title: "Centro di Costo",
        dataIndex: "linea",
        sorter: (a, b) => {
          const lineaA = a.linea ? a.linea.toLowerCase() : 'zzzzzz';
          const lineaB = b.linea ? b.linea.toLowerCase() : 'zzzzzz';
          
          if (lineaA < lineaB) return -1;
          if (lineaA > lineaB) return 1;
          return 0;
        },
        render: (text, record) => (
          <>
            <Typography.Paragraph className="m-0 font-semibold">
              {text} {record.tipo}
            </Typography.Paragraph>
          </>
        ),
        width: "100%",
      }
        
      ];
    
      return (
        <Modal
        title={           
              <Typography.Title level={2} className="mb-4">
                Centri di Costo
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

            <div className="flex gap-2 justify-end mb-4">
            <Input
              addonBefore="Linea"
              placeholder="Ricerca Linea"
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
            <Radio value={""} className="sm:mb-2">Tutti</Radio>            
            <Radio value={"Meccanico"} className="sm:mb-2">Meccanico</Radio>           
            <Radio value={"Elettrico"} className="sm:mb-2">Elettrico</Radio>            
            <Radio value={"Produzione"} className="sm:mb-2">Produzione</Radio>            
          </Radio.Group>
          {/* <div className="flex gap-2 items-center mb-4 mt-0 xs:flex-col xs:gap-4">
        <Input
          addonBefore={"Utente"}
          placeholder={"Ricerca l'utente"}
          allowClear
          size={!isMobile ? 'large' : 'middle'}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        
      </div> */}
            
            <div className="flex gap-2 justify-end mb-5" >
            <Button key="cancel" onClick={cta.cancel}>
                Cancella
            </Button>
            <Button
                key="save"
                type="primary"
                onClick={handleSave}
            >
                Aggiungi Centro di Costo
            </Button>
            </div>
           
            <Table
              rowSelection={{preserveSelectedRowKeys: true,...rowSelection}}
              columns={columns}
              rowKey={(data)=> data.id}
              dataSource={data?.response}
              scroll={{ y: isMobile ? "40vh" : "50vh" }}
              pagination= {false}
            />
            
        </Modal>
      );
  }
  