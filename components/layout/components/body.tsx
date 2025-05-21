import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/libs/utils/classes";
import { Layout as AntdLayout } from "antd";

interface IBodyProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function Body({ children, className, style }: IBodyProps) {
  return (
    <AntdLayout.Content className="px-1 py-4 overflow-visible">
      <div
        style={style}
        className={cn("max-w-[92%] w-full mx-auto ", className)}
      >
        {children}
      </div>
    </AntdLayout.Content>
  );
}
