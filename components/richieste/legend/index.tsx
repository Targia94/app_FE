import { Row, Col, Typography } from "antd";
import { CheckCircleIcon, PauseCircleIcon, QuestionMarkCircleIcon, XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const legendaPopoverContent = (
  <div className="w-[250px] p-4"> 
    <Row gutter={[24, 24]}>
      {/* Colonna Stati */}
      <Col span={12}>
        <Typography.Title level={5}>Stati:</Typography.Title>
        <Row align="middle" justify="start" gutter={8}>
          <Col flex="24px">
            <PauseCircleIcon color="gold" width={24} />
          </Col>
          <Col>
            <Typography.Text>Creazione</Typography.Text>
          </Col>
        </Row>
        <Row align="middle" justify="start" gutter={8}>
          <Col flex="24px">
            <CheckCircleIcon color="green" width={24} />
          </Col>
          <Col>
            <Typography.Text>Accettato</Typography.Text>
          </Col>
        </Row>
        <Row align="middle" justify="start" gutter={8}>
          <Col flex="24px">
            <XCircleIcon color="red" width={24} />
          </Col>
          <Col>
            <Typography.Text>Rifiutato</Typography.Text>
          </Col>
        </Row>
        <Row align="middle" justify="start" gutter={8}>
          <Col flex="24px">
            <QuestionMarkCircleIcon color="orange" width={24} />
          </Col>
          <Col>
            <Typography.Text>Info</Typography.Text>
          </Col>
        </Row>
      </Col>

      {/* Colonna Priorità */}
      <Col span={12}>
        <Typography.Title level={5}>Priorità:</Typography.Title>
        <Row align="middle" justify="start" gutter={8}>
          <Col flex="24px">
            <ExclamationTriangleIcon color="green" width={24} />
          </Col>
          <Col>
            <Typography.Text>Bassa</Typography.Text>
          </Col>
        </Row>
        <Row align="middle" justify="start" gutter={8}>
          <Col flex="24px">
            <ExclamationTriangleIcon color="gold" width={24} />
          </Col>
          <Col>
            <Typography.Text>Media</Typography.Text>
          </Col>
        </Row>
        <Row align="middle" justify="start" gutter={8}>
          <Col flex="24px">
            <ExclamationTriangleIcon color="orange" width={24} />
          </Col>
          <Col>
            <Typography.Text>Alta</Typography.Text>
          </Col>
        </Row>
        <Row align="middle" justify="start" gutter={8}>
          <Col flex="24px">
            <ExclamationTriangleIcon color="red" width={24} />
          </Col>
          <Col>
            <Typography.Text>Urgente</Typography.Text>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

export default legendaPopoverContent;
