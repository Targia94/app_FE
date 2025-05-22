import GrantPermission from "@/components/auth/grant-permission";
import RenderImages from "@/components/cerca-materiale/productImages";
import RenderPDFButton from "@/components/cerca-materiale/productPdf";
import Layout from "@/components/layout";
import { productState } from "@/global-states/product";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { PlusIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Col,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
  notification,
} from "antd";

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

export default function AnagraficaMagazzinoPage() {
  const [, setProductState] = useRecoilState(productState);
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("descrizione");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

//   const isMobile = useMediaQuery("(max-width: 768px)");
  const [systemNtf, contextHolder] = notification.useNotification({
    stack: { threshold: 3 },
  });

  const handleLocationChange = (selectedOption: string) => {
    setSelectedFilter(selectedOption);
  };

  const columnsDesktop = [
    {
      title: "Codice",
      dataIndex: "codice",
      key: "codice",
      render: (text, record) => (
        <Typography.Title level={5} className="m-0">
          {text}
        </Typography.Title>
      ),
      width: "50%",
    },
    {
      title:
        selectedFilter === "descrizione_lunga" ? "Descrizione" : "Testo breve",
      dataIndex: "descrizione",
      key: "descrizione",
      render: (text) => (
        <Typography.Paragraph className="m-0">{text}</Typography.Paragraph>
      ),
      width: "100%",
    },
    {
      title: "UM",
      dataIndex: "umo",
      key: "umo",
      render: (text) => (
        <Typography.Paragraph className="m-0">{text}</Typography.Paragraph>
      ),
      width: "60px",
      hidden: selectedFilter === "descrizione_lunga" && true,
    },
    {
      title: "Stock",
      dataIndex: "saldo",
      key: "saldo",
      render: (text) => (
        <Typography.Paragraph className="m-0">{text}</Typography.Paragraph>
      ),
      width: "70px",
      hidden: selectedFilter === "descrizione_lunga" && true,
    },
    {
      title: "Ubicazione",
      dataIndex: "ubicazione",
      key: "ubicazione",
      render: (text) => (
        <Typography.Paragraph className="m-0 text-nowrap">
          {text}
        </Typography.Paragraph>
      ),
      width: "105px",
      hidden: selectedFilter === "descrizione_lunga" && true,
    },
  ];

  const columnsMobile = [
    {
      title: "Codice e descrizione",
      dataIndex: "codice",
      key: "codice",
      render: (text, record) => (
        <>
          <Typography.Title level={5} className="m-0">
            {text}
          </Typography.Title>
          <Typography.Paragraph className="m-0">
            {record.descrizione}
          </Typography.Paragraph>
        </>
      ),
      width: "100%",
    },
  ];

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    newSelectedProducts: any[]
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedProducts(newSelectedProducts);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleNavigateToOrder = () => {
    if (selectedProducts.length === 0) {
      systemNtf.warning({
        message: "Attenzione",
        description: "Seleziona almeno un prodotto.",
        placement: "top",
      });
      return;
    }
    setProductState(selectedProducts);
    router.push({
      pathname: "/dashboard/preleva-materiali",
    });
  };

  return (
    <Layout>
      {contextHolder}
      <div className="flex gap-2 justify-between items-center mb-5">
        <Typography.Title level={3} className="m-0">
          Stock Magazzino Ricambi
        </Typography.Title>
      </div>

      <Divider orientation="right" orientationMargin="0">
        <Input
          addonBefore={"Ultimo Aggiorn."}
          size={"small"}
          value={"N/A"}
          className="w-56"
          readOnly
        />
      </Divider>

      <div className="flex gap-2 items-center mb-4 mt-0 xs:flex-col xs:gap-4">
        <Space.Compact
        //   size={isMobile ? "middle" : "large"}
          className="w-full sm:flex sm:flex-col sm:gap-2"
        >
          <Input
            addonBefore={
              selectedFilter === "descrizione" ? "CODICE" : "DESCRIZIONE"
            }
            placeholder={getPlaceholder(selectedFilter)}
            onChange={(e) => {}}
            value={""}
          />
        </Space.Compact>

        <GrantPermission to={["supervisor", "admin"]}>
          <div className="flex justify-end xs:self-end">
            <Button type="primary" onClick={handleNavigateToOrder}>
              <PlusIcon width={20} />
              <ShoppingCartIcon width={20} />
            </Button>
          </div>
        </GrantPermission>
      </div>

      <Table
        // columns={!isMobile ? columnsDesktop : columnsMobile}
        // size={isMobile ? "small" : "large"}
        rowSelection={rowSelection}
        rowKey={(record) => record.codice}
        dataSource={[]}
      />
    </Layout>
  );
}
