import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { PaperClipIcon } from '@heroicons/react/16/solid';
import { getPdfUrl } from '@/libs/utils/fileChecker';


interface RenderPDFButtonProps {
  codice: string;
}

const RenderPDFButton: React.FC<RenderPDFButtonProps> = ({ codice }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPdfUrl = async () => {
      const url = await getPdfUrl(codice);
      setPdfUrl(url);
    };
    fetchPdfUrl();
  }, [codice]);

  if (!pdfUrl) {
    return null;
  }

  return (
    <Button
      className="flex items-center"
      type="link"
      onClick={() => {
        window.open(pdfUrl);
      }}
    >
      <PaperClipIcon width={20} color="black" />
    </Button>
  );
};

export default RenderPDFButton;
