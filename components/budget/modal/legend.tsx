import LegendGraphic from "@/components/utils/legend";
import { Legend } from "@/libs/api/types/gl-account";
import { UseModal } from "@/libs/hooks/useModal";
import { Button, Modal, Typography } from "antd";


interface IModalLegendProps {
    modal: UseModal;
    loading?: boolean;
    data?: Legend;
}
const colorMap: { [key: string]: string } = {
    Contract: "#FFD700",  // Giallo
    Other: "#00CFFF",     // Celeste
    "Other Exp": "#00CFFF", // Celeste per entrambi
    Spare: "#28A745",     // Verde
    Default: "blue",      // Colore di fallback

    // Nuove voci con colori assegnati
    Infermeria: "#FF5733",           // Arancione scuro
    Facchinaggio: "#A569BD",         // Viola
    Noleggi: "#3498DB",              // Azzurro
    Trasporto: "#2ECC71",            // Verde chiaro
    Housekeeping: "#F39C12",         // Giallo arancio
    Cancelleria: "#D35400",          // Arancione forte
    MISCELLANEOUS: "#7F8C8D",        // Grigio
    Tool: "#8E44AD",                 // Viola scuro
    "Affitto magazzini": "#1ABC9C",  // Verde acqua
    Laboratorio: "#E74C3C",          // Rosso chiaro
    Smaltimento: "#95A5A6",          // Grigio chiaro
    "Pests Control": "#C0392B",      // Rosso scuro
    Mobili: "#E67E22",               // Arancione
    "Trattamenti chimici": "#16A085", // Verde petrolio
    Viaggio: "#2980B9",              // Blu medio
};

export default function ModalLegend({
    modal,
    loading,
    data
}: IModalLegendProps) {
    const { isOpen, cta } = modal;

    return (
        <Modal
            maskClosable={false}
            closable={false}
            title={
                <Typography.Title level={4} className="m-0">
                    Legenda
                </Typography.Title>
            }
            open={isOpen}
            onCancel={cta.cancel}
            onOk={cta.ok}
            footer={[
                <Button key="cancel" onClick={cta.cancel} disabled={loading}>
                    Cancella
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    onClick={() => cta.ok()}
                    disabled={loading}
                    loading={loading}
                >
                    Chiudi
                </Button>,
            ]}
            className="sm:[&_.ant-modal-content]:p-3"
        >
            {/* Contenuto dinamico con le leggende */}
            <div className="grid grid-cols-2 gap-3">
                {data?.sotto_gruppi.map((group) => (
                    <LegendGraphic
                        key={group}
                        color={colorMap[group] || colorMap["Default"]} // Usa il colore mappato o il default
                        size={20}
                        label={group}
                    />
                ))}
            </div>
        </Modal>
    );
}
