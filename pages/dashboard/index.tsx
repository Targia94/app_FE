import { useRouter } from "next/router";

import { Badge, Card, Col, Divider, Row, Typography } from "antd";

import GrantPermission from "@/components/auth/grant-permission";
import Layout from "@/components/layout";
import {
  ArrowDownTrayIcon,
  BookOpenIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { FileSyncOutlined } from "@ant-design/icons";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <Layout>
      <div className="flex gap-2 justify-between items-center mb-5">
        <Typography.Title level={3} className="m-0">
          Home
        </Typography.Title>
      </div>

      <Divider />
      <div>
        <Row gutter={[48, 48]} style={{ height: "100%" }}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }}>
            <Card
              hoverable
              className="bg-jindalBlue items-center justify-center h-full"
              onClick={() => router.push(`/dashboard/cerca-materiale`)}
            >
              <Typography.Title
                level={4}
                className="m-0 text-white flex gap-3 justify-center items-center text-center"
              >
                <FileSyncOutlined style={{ fontSize: "30px" }} />
                {/* <MagnifyingGlassIcon width={30} /> */}
                Timbrature
              </Typography.Title>
            </Card>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }}>
            <Card
              hoverable
              className="bg-jindalBlue items-center justify-center h-full"
              onClick={() => router.push(`/dashboard/inserisci-attivita`)}
            >
              <Typography.Title
                level={4}
                className="m-0 text-white flex gap-3 justify-center items-center text-center"
              >
                <DocumentPlusIcon width={30} />
                Attività
              </Typography.Title>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }}>
            <Card
              hoverable
              className="bg-jindalBlue items-center justify-center h-full"
              onClick={() => router.push(`/dashboard/preleva-dal-magazzino`)}
            >
              <Typography.Title
                level={4}
                className="m-0 text-white flex gap-3 justify-center items-center text-center"
              >
                <ArrowDownTrayIcon width={30} />
                Esportazione
              </Typography.Title>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
