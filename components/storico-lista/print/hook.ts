import { Ordine } from "@/libs/api/types/order";
import { useCallback } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface PrintProps {
  data: Ordine[];
}

export function useExportXLSX({ data }: PrintProps) {
  const downloadXLSX = useCallback(
    async (fileName = `export_${new Date().toLocaleDateString("it")}`) => {
      // Creazione di una nuova cartella di lavoro
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Ordini");

      // Aggiunta delle intestazioni
      worksheet.columns = [
        { header: "ID", key: "id", width: 15 },
        { header: "CDC", key: "cdc", width: 20 },
        { header: "RICHIEDENTE", key: "richiedente", width: 20 },
        { header: "CREATO", key: "creato", width: 15 },
        { header: "APPROVATO", key: "approvato", width: 15 },
        { header: "STATO", key: "stato", width: 15 },
      ];

      // Popolamento dei dati
      data.forEach((order) => {
        worksheet.addRow({
          id: order.id_ordine || "",
          cdc: `${order.linea_centro_costo || ""}${order.tipo_centro_costo || ""}`,
          richiedente: order.nome_utente_creazione || "",
          creato: order.data_creazione
            ? new Date(order.data_creazione).toLocaleDateString("it")
            : "",
          approvato: order.data_approvazione
            ? new Date(order.data_approvazione).toLocaleDateString("it")
            : "",
          stato: order.stato_ordine || "",
        });
      });

      // Salva il file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, `${fileName}.xlsx`);
    },
    [data]
  );

  return { downloadXLSX };
}
