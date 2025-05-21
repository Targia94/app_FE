import { Richiesta } from "@/libs/api/types/richiesta";
import { useMediaQuery } from "@/libs/hooks/useMediaQuery";
import { Card, Typography, Divider, Col, Row, Input, Table, Button, Form, notification, Tag, Descriptions } from "antd";
import { columns_dettagli_richiesta, columns_dettagli_richiesta_mobile } from "../column/dettagli_richiesta.column";
import AllegatoComponent from "../allegato";
import { useSession } from "@/libs/hooks/useSession";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { getPrioritaDetails } from "../column/richieste.mobile";
import { useState } from "react";

interface InfoRequestProcurementPage {
    data?: Richiesta;
    emailInviata: boolean;
    setEmailInviata: (val: boolean) => void
}

export default function InfoRequestProcurementPage({ data, emailInviata, setEmailInviata }: InfoRequestProcurementPage) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [loading, setLoading] = useState(false)
    /* const [emailInviata, setEmailInviata] = useState(false); */

    const { data: session } = useSession();
    const { label: prioritaLabel, color: prioritaColor } = getPrioritaDetails(data?.priorita);


    const totale =
        data?.dettagli_richiesta?.reduce(
            (acc, item) => acc + (item.prezzo * item.quantita),
            0
        ) ?? 0;

    const convertTextToLinks = (text: string) => {
        return text.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
    };

    return (
        <Card title={
            <div className="flex justify-between">
                <div className="flex gap-5">
                    {data?.descrizione_breve}
                    <div className="flex gap-2 items-center text-center">
                        <ExclamationTriangleIcon color={prioritaColor} width={24} />
                        <Typography.Paragraph className="m-0 font-semibold">
                            {prioritaLabel}
                        </Typography.Paragraph>
                    </div>
                </div>
                <div className="flex gap-4 items-center ">
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
                        <div className="font-medium">Data Intervento:</div>
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
                            value={totale > 0 ? `${new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totale)} €` : "Non specificata"}
                            className="w-full text-right"
                        />

                    </Typography.Paragraph>
                </Col>

                {/* Centro di Costo */}
                <Col xs={24} md={8}>
                    <Typography.Paragraph>
                        <div className="font-medium">Centro di Costo:</div>
                        <Input
                            readOnly
                            value={`${data?.centro_di_costo.cc}`}
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
                            value={session.roles?.includes('rda_procurement') ? data?.gl_account?.cost_element : data?.gl_account?.const_element_descr}
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

                {/* Categoria */}
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



                {/* ParteMacchina */}
                {/* <Col xs={24} md={8}>
                    <Typography.Paragraph>
                        <div className="font-medium">Parte Macchina:</div>
                        <Input
                            readOnly
                            value={data?.parte_macchina.descrizione || "Non specificata"}
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

                {/* Data PO */}

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

                {/* Data consegna */}
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

                {/* Tabella record */}
                <Col xs={24} md={24}>
                    <Table
                        size={isMobile ? "small": "middle"}
                        columns={isMobile ? columns_dettagli_richiesta_mobile : columns_dettagli_richiesta}
                        rowKey={(data) => data?.codice}
                        dataSource={data?.dettagli_richiesta}
                        scroll={{ y: isMobile ? "40vh" : "70vh" }}
                        pagination={false}
                    />
                </Col>
                {/* Totale */}
                <Col xs={{ span: 24, offset: 0 }} md={{ span: 8, offset: 16 }}>
                    <Typography.Paragraph>
                        <div className="font-medium">Totale:</div>

                        <Input
                            readOnly
                            value={totale > 0 ? `${new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totale)} €` : "Non specificata"}
                            className="w-full text-right"
                        />

                    </Typography.Paragraph>
                </Col>

                {/* Descrizione Lunga */}
                <Col xs={24} md={24}>
                    <Typography.Paragraph>
                        <div className="font-medium">Descrizione Lunga:</div>
                        <div
                            className="w-full"
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
