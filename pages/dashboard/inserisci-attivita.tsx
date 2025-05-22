import { useRouter } from "next/router";
import {
  Form,
  DatePicker,
  Card,
  Col,
  Row,
  Typography,
  Input,
  Button,
  Space,
  Divider,
  Select,
  Spin,
} from "antd";
import { useState } from "react";
import Layout from "@/components/layout";

const { Option } = Select;

export default function InserisciRichiestaPage() {
  
  return (
    <Layout>
      <div className="flex justify-start items-center mb-5">
        <Typography.Title level={3} className="m-0">
          Nuova Attività
        </Typography.Title>
      </div>
      <Divider />
      <div>
        <Form.Item
          label="Data Attività"
          name="data_attivita"
          rules={[
            {
              required: true,
              message: "Seleziona una data attività",
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD" // Imposta il formato della data
            className="w-full"
            size="small"
          />
        </Form.Item>
      </div>
      <Row gutter={[16, 16]} style={{ height: "100%" }}>
        {/* Colonna di sinistra */}
        <Col xs={24} md={12}>
          <Card
            hoverable
            className="flex flex-col content-between h-full"
            style={{ height: "100%" }}
          >
            <Form layout="vertical" autoComplete="off">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Commessa"
                    name="commessa"
                    rules={[
                      { required: true, message: "Inserisci la commessa" },
                    ]}
                  >
                    <Select>
                      <Option value="MOOV">MOOV</Option>
                      <Option value="OLIE">OLIE</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Pagamento"
                    name="pagamento"
                    rules={[
                      {
                        required: true,
                        message: "Seleziona un pagamento",
                      },
                    ]}
                  >
                    <Select placeholder="Seleziona un pagamento">
                      <Option value="Contanti">Contanti</Option>
                      <Option value="Assegno">Assegno</Option>
                      <Option value="Bonifico">Bonifico</Option>
                      <Option value="Pag. Negozio">Pag. Negozio</Option>
                      <Option value="Finanziamento">Finanziamento</Option>
                      <Option value="Sospeso">Sospeso</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* Cliente e contratto */}
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Cliente"
                    name="cliente"
                    rules={[
                      {
                        required: true,
                        message: "Inserisci il cliente",
                      },
                    ]}
                  >
                    <Input placeholder="Contratto" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Contratto"
                    name="contratto"
                    rules={[
                      { required: true, message: "Inserisci il contratto" },
                    ]}
                  >
                    <Input placeholder="Contratto" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Saldo e Extra Consegna */}
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Saldo"
                    name="saldo"
                    rules={[{ required: true, message: "Inserisci il saldo" }]}
                  >
                    <Input placeholder="Saldo" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Extra Consegna" name="extra_consegna">
                    <Input placeholder="Extra Consegna" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Bottone di invio */}
              <Form.Item>
                <Button type="primary" block htmlType="submit">
                  Invia Attività
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
