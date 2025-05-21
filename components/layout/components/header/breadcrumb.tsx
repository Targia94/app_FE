import { useRouter } from "next/router";

import { Breadcrumb as AntdBreadcrumb } from "antd";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";

import { useMounted } from "@/libs/hooks/useMounted";
import { cn } from "@/libs/utils/classes";
import { capitalize } from "@/libs/utils/string";
import { routes } from "../../utils";

export default function Breadcrumb() {
  const router = useRouter();
  const mounted = useMounted();
  const loaded = router.isReady && mounted;

  const breadcrumbItems: ItemType[] = router.pathname
    .split("/")
    .filter(String)
    .map((value, index, array) => {
      const href = `/${array.slice(0, index + 1).join("/")}`;
      const route = routes.find((item) => item.key === href);

      return {
        title:
          route?.label ||
          capitalize(value)
            .replace(/-/g, " ")
            .replace(/(\?.*|#.*)/g, ""),
        ...(index !== array.length - 1 && { href }),
      };
    });

  return (
    <AntdBreadcrumb
      className={cn(
        !loaded && "invisible",
        "px-1 [&_li_a.ant-breadcrumb-link]:text-white-45 [&_li_a.ant-breadcrumb-link:hover]:text-white-88 [&_li.ant-breadcrumb-separator]:text-white-45 [&_li:last-child]:text-white-88"
      )}
      items={breadcrumbItems}
    />
  );
}
