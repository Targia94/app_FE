import { Richiesta } from "@/libs/api/types/richiesta";
import { useMediaQuery } from "@/libs/hooks/useMediaQuery";
import { Card, Typography,  Col, Row, Input, Table,  Tag } from "antd";
import { columns_dettagli_richiesta, columns_dettagli_richiesta_mobile } from "../column/dettagli_richiesta.column";
import AllegatoComponent from "../allegato";
import { useSession } from "@/libs/hooks/useSession";
import GrantPermission from "@/components/auth/grant-permission";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { getPrioritaDetails } from "../column/richieste.mobile";

interface InfoRequestProps {
  data?: Richiesta;
}

export default function InfoRequestPage({ data }: InfoRequestProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data: session } = useSession();


  const { label: prioritaLabel, color: prioritaColor } = getPrioritaDetails(data?.priorita);

  const convertTextToLinks = (text: string) => {
    return text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  };

  return (
    <Card title={
      <div className="flex justify-between sm:flex-col-reverse">
        <div className="flex gap-5 sm:flex-col">
          {data?.descrizione_breve}
          <div className="flex gap-2 items-center text-center sm:justify-end">
            <ExclamationTriangleIcon color={prioritaColor} width={24} />
            <Typography.Paragraph className="m-0 font-semibold">
              {prioritaLabel}
            </Typography.Paragraph>
          </div>
        </div>
        <div className="flex gap-4 items-center sm:justify-end ">
          {data?.rda_sap &&
            <Typography.Paragraph className="flex items-center m-0 gap-1">
              <div className="font-medium">rif. PR:</div>
              <Tag color="green">{data.rda_sap}</Tag>
            </Typography.Paragraph>
          }
          <div className="font-light">
            {data?.data_creazione
              ? new Date(data.data_creazione).toLocaleDateString("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              : "N/A"}
          </div>
        </div>
      </div>
    }
      className="h-[100%] overflow-y-auto"
    >
      <Row gutter={[16, 16]}>

        {/* Data Intervento */}
        <Col xs={24} md={8}>
          <Typography.Paragraph>
            <div className="font-medium">Data Consegna:</div>
            <Input
              readOnly
              value={
                data?.data_intervento
                  ? new Date(data?.data_intervento).toLocaleDateString("it-IT", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  : "Non specificata"
              }
              className="w-full"
            />
          </Typography.Paragraph>
        </Col>

        {/* Richiedente */}
        <Col xs={24} md={8}>
          <Typography.Paragraph>
            <div className="font-medium">Richiedente:</div>
            <Input
              readOnly
              value={`${data?.user_richiedente?.full_name}`}
              className="w-full"
            />
          </Typography.Paragraph>
        </Col>

        {/* Totale */}
        <Col xs={24} md={8}>
          <Typography.Paragraph>
            <div className="font-medium">Totale:</div>
            <Input
              readOnly
              value={
                data?.dettagli_richiesta?.length
                  ? `${new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data.dettagli_richiesta.reduce((acc, item) => acc + (item.prezzo * item.quantita), 0))} €`
                  : "Non specificata"
              }
              className="w-full "

            />
          </Typography.Paragraph>
        </Col>

        {/* Centro di Costo */}
        <Col xs={24} md={8}>
          <Typography.Paragraph>
            <div className="font-medium">Centro di Costo:</div>
            <Input
              readOnly
              value={data?.centro_di_costo.descrizione || "N/A"}
              className="w-full"
            />
          </Typography.Paragraph>
        </Col>

        {/* GL Account */}
        <Col xs={24} md={8}>
          <Typography.Paragraph>
            <div className="font-medium">GL Account:</div>

            <Input
              readOnly
              value={session.roles?.includes('rda_procurement') ? data?.gl_account?.cost_element : data?.gl_account?.descrizione}
              className="w-full"
            />
          </Typography.Paragraph>
        </Col>



        {/* Fornitore */}
        <Col xs={24} md={8}>
          <Typography.Paragraph>
            <div className="font-medium">Fornitore Desiderato:</div>
            <Input
              readOnly
              value={data?.fornitore?.fornitore || "Non specificato"}
              className="w-full"
            />
          </Typography.Paragraph>
        </Col>

        {/* Stato */}
        {/* <Col xs={24} md={8}>
          <Typography.Paragraph>
            <div>Stato:</div>
            <Input readOnly value={data?.stato} className="w-full" />
          </Typography.Paragraph>
        </Col> */}

        {/* Priorità */}
        {/* <Col xs={24} md={8}>
          <Typography.Paragraph>
            <div className="font-medium">Priorità:</div>
            <Input
              readOnly
              value={prioritaLabel}
              className="w-full"
            />
          </Typography.Paragraph>
        </Col> */}


        {/* PO */}
        <Col xs={24} md={8}>
          <Typography.Paragraph>
            <div className="font-medium">PO:</div>
            <Input
              readOnly
              value={data?.po || "Non specificato"}
              className="w-full"
            />
          </Typography.Paragraph>
        </Col>

        {/* ParteMacchina */}
        <Col xs={24} md={8}>
          <Typography.Paragraph>
            <div className="font-medium">Parte Macchina:</div>
            <Input
              readOnly
              value={data?.parte_macchina ? data.parte_macchina_link.id ? `${data?.parte_macchina.linea} \\ ${data?.parte_macchina.descrizione} \\ ${data.parte_macchina_link.nota}` : `${data?.parte_macchina.linea} \\ ${data?.parte_macchina.descrizione}` : "Non specificata"}
              className="w-full"
            />
          </Typography.Paragraph>
        </Col>

        {/* ParteMacchina */}
        <Col xs={24} md={8}>
          <Typography.Paragraph>
            <div className="font-medium">Categoria:</div>
            <Input
              readOnly
              value={data?.categoria.descrizione || "Non specificata"}
              className="w-full"
            />
          </Typography.Paragraph>
        </Col>


        {/* Data PO */}
        <GrantPermission to={['rda_procurement']}>
          <Col xs={24} md={8}>
            <Typography.Paragraph>
              <div className="font-medium">Data PO:</div>
              <Input
                readOnly
                value={
                  data?.po_data
                    ? new Date(data?.po_data).toLocaleDateString("it-IT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    : "Non specificata"
                }
                className="w-full"
              />
            </Typography.Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Typography.Paragraph>
              <div className="font-medium">Data Consegna:</div>
              <Input
                readOnly
                value={
                  data?.data_consegna
                    ? new Date(data?.data_consegna).toLocaleDateString("it-IT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    : "Non specificata"
                }
                className="w-full"
              />
            </Typography.Paragraph>
          </Col>
        </GrantPermission>
        <Col xs={24} md={24}>
          <Table
            size={isMobile ? "small": "middle"}
            columns={isMobile ? columns_dettagli_richiesta_mobile : columns_dettagli_richiesta}
            rowKey={(data) => data?.id}
            dataSource={data?.dettagli_richiesta}
            expandable={
              isMobile
                ? {
                  expandedRowRender: (record) => (
                    <ul>
                      <li className='m-0'>
                        Descrizione: <b>{record.descrizione}</b>
                      </li>
                    </ul>
                  ),
                  expandRowByClick: true,
                  columnWidth: "17px"
                }
                : {}
            }
            scroll={{ y: isMobile ? '30vh' : '45vh' }}
            pagination={false}
          />
        </Col>
        {/* Totale */}
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 8, offset: 16 }}>
          <Typography.Paragraph>
            <div className="font-medium">Totale:</div>
            <Input
              readOnly
              value={
                data?.dettagli_richiesta?.length
                  ? `${new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data.dettagli_richiesta.reduce((acc, item) => acc + (item.prezzo * item.quantita), 0))} €`
                  : "Non specificata"
              }
              className="w-full text-right"

            />
          </Typography.Paragraph>
        </Col>

        {/* Descrizione Lunga */}
        <Col xs={24} md={24}>
          <Typography.Paragraph>
            <div className="font-medium mb-2">Descrizione Lunga:</div>
            <div
              style={{
                background: "#ffffff",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#d9d9d9",
                minHeight: "100px",
                maxHeight: "200px",
                overflowY: "auto",
                padding: "8px",
                fontSize: "14px",
                lineHeight: "1.5",
                fontFamily: "Arial, sans-serif",
                borderRadius: "6px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                cursor: "text",
              }}
              dangerouslySetInnerHTML={{ __html: convertTextToLinks(String(data?.descrizione_lunga || "")) }}
            />
          </Typography.Paragraph>
        </Col>

        {/* Allegati */}

        <AllegatoComponent data={data?.allegati} />

      </Row>
    </Card>
  );
}
