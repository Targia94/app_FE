import { capitalize } from "@/libs/utils/string";
import { Layout as AppLayout, Form } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { CSSProperties, ReactNode, useCallback, useState } from "react";
import GrantPermission from "../auth/grant-permission";
import Body from "./components/body";
import MenuDrawer from "./components/drawer";
import Footer from "./components/footer";
import Header from "./components/header";
import { routes } from "./utils";
import { useModal } from "@/libs/hooks/useModal";
import ModalVersioning from "./components/modal/versioning";

interface ILayoutProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function Layout({ children, style, className }: ILayoutProps) {
  const [isOpen, setOpen] = useState(false);
  const showDrawer = useCallback(() => setOpen(true), []);
  const hideDrawer = useCallback(() => setOpen(false), []);

  const router = useRouter();

  const route = routes.find((item) => item.key === router.pathname);

  const hierarchy = router.asPath.split("/").filter(String);
  const pageTitle =
    route?.label ||
    capitalize(hierarchy[hierarchy.length - 1])
      .replace(/-/g, " ")
      .replace(/(\?.*|#.*)/g, "");

  const permissions = route?.permissions ?? [];

  const titleOutput = `Montarreda | ${pageTitle}`;

  const [versioningForm] = Form.useForm()


  const modalVersioning = useModal({
    handleOk: () => {
      modalVersioning.hide();
    },
    handleCancel: () => modalVersioning.hide(),
  });

  return (
    <>
      <Head>
        <title>{titleOutput}</title>
      </Head>

      <MenuDrawer isOpen={isOpen} hideDrawer={hideDrawer} />

      <AppLayout className="min-h-screen">
        <Header showDrawer={showDrawer} />
          <Body style={style} className={className}>
            {children}
          </Body>
        <Footer openModal={modalVersioning.show} />
      </AppLayout>


      <ModalVersioning modal={modalVersioning} />
    </>
  );
}
