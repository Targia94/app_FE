import type { AppProps } from "next/app";

import { ConfigProvider } from "antd";

import { themeConfig } from "./config";

const withTheme = <P extends AppProps>(
  BaseComponent: React.ComponentType<P>
): React.FC<P> => {
  const ThemedComponent: React.FC<P> = (props) => {
    return (
      <ConfigProvider  theme={themeConfig}>
        <BaseComponent {...props} />
      </ConfigProvider>
    );
  };

  return ThemedComponent;
};

export default withTheme;
