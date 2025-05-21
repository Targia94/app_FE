
import { Layout as AntdLayout, Button } from "antd";

interface FooterProps {
  openModal: () => void;
}

export default function Footer({ openModal }: FooterProps) {



  return (
    <AntdLayout.Footer className="py-7 px-1">
      <div className="max-w-[92%] w-full mx-auto text-center text-xs gap-1">
        <span className="underline cursor-pointer" onClick={openModal}>
          Versione 2.0.0
        </span>
          <span> - Created by Brain SRL ©{new Date().getFullYear()}</span>
      </div>
    </AntdLayout.Footer>
  );
}
