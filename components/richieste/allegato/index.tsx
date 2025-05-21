import React from "react";
import { Collapse, Typography, Col, Row, Empty } from "antd";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { Allegato } from "@/libs/api/types/richiesta";
import { urlAllegati } from "@/components/layout/components/header/profile";

interface AllegatoProps {
  data?: Allegato[];
}
export const extractFileName = (path: string): string => {
  const parts = path.split("/");
  return parts[parts.length - 1];
};
export default function AllegatoComponent({ data }: AllegatoProps) {
  // Funzione per estrarre solo il nome del file
  

  return (
    <Col xs={24} md={24}>
      <Typography.Paragraph>
        <Collapse
          size="small"
          items={[
            {
              key: "1",
              label: "Allegati",
              children: data?.length === 0 ? (
                <Empty description="Non ci sono allegati da scaricare" />
              ) : (
                <Row gutter={[16, 16]} justify="start">
                  {data?.map((allegato) => (
                    <Col key={allegato.id} xs={8} md={4} className="text-center">
                      <a
                        href={`${urlAllegati()}${allegato.filename}`}
                        download
                        className="flex flex-col items-center"
                      >
                        <DocumentArrowDownIcon
                          color="grey"
                          width={36}
                          className="hover:text-grey-700"
                        />
                        <Typography.Text className="text-xs font-semibold">
                          {extractFileName(allegato.filename)}
                        </Typography.Text>
                      </a>
                    </Col>
                  ))}
                </Row>
              ),
            },
          ]}
        />
      </Typography.Paragraph>
    </Col>
  );
}
