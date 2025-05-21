import { memo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Drawer, Menu } from "antd";
import { useSession } from "@/libs/hooks/useSession";
import { Route, routes } from "../utils";

interface IMenuDrawerProps {
  isOpen: boolean;
  hideDrawer: () => void;
}

function MenuDrawer({ isOpen, hideDrawer }: IMenuDrawerProps) {
  const router = useRouter();
  
  const goToPage = (props: { key: string }) => {
    if (!props.key.startsWith("/")) {
      return;
    }
    router.push(props.key);
  };

  const { data } = useSession();

  // Funzione ricorsiva per filtrare le rotte e i sottomenu
  const filterRoutes = (routesList: Route[]): Route[] => {
    return routesList
      .map((item): Route | null => {
        
        const filteredChildren = item.children ? filterRoutes(item.children) : [];
  
        
        const hasPermission = item.permissions
          ? item.permissions.some((role) => data.roles?.includes(role))
          : true;
  
        
        const isVisible = !item.hidden || filteredChildren.length > 0;
  
        
        if ((hasPermission && isVisible) || filteredChildren.length > 0) {
          return {
            ...item,
            children: filteredChildren.length > 0 ? filteredChildren : undefined,
          };
        }
  
        return null; 
      })
      .filter((item): item is Route => item !== null); 
  };
  
  
  

  const allowedRoutes = filterRoutes(routes);

  return (
    <Drawer
      open={isOpen}
      onClose={hideDrawer}
      placement="left"
      extra={<Image src="/logo.png" alt="Montarreda" width={389} height={152} />}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[router.asPath ?? "1"]}
        items={allowedRoutes}
        onClick={goToPage}
      />
    </Drawer>
  );
}

export default memo(MenuDrawer);
