"use client";

import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { useMediaQuery } from "@/libs/hooks/useMediaQuery";

export interface DataItem {
    data: string;
    tipo_contratto: string;
    importo: number;
}



interface GraphicProps {
    data?: DataItem[];
    upperLimit?: number;
    tabState: string;
    loading: boolean;
}

const Graphic: React.FC<GraphicProps> = ({ data,
    upperLimit,
    tabState,
    loading
}) => {




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
    



    // ✅ Calcoliamo la somma mensile con il tipo corretto per TypeScript
    const groupedData = (data || []).reduce<{ [key: string]: number }>((acc, rec) => {
        acc[rec.data] = (acc[rec.data] || 0) + rec.importo;
        return acc;
    }, {}) || {};

    const annotations: any[] = [];

    Object.entries(groupedData).forEach(([month, totalValue], index) => {
        annotations.push({
            key: `annotation-${index}`,
            type: 'text',
            data: [month, totalValue],
            style: {
                text: `${new Intl.NumberFormat("it-IT").format(totalValue)} `, // Formattato in Euro
                textBaseline: 'bottom',
                position: 'top',
                textAlign: "center",
                fontWeight: "bold",
            },
            xField: 'data',
            yField: 'importo',

            tooltip: false,
        });
    });



    const upperLimitAnnotation = {
        type: "lineY",
        yField: upperLimit,
        style: { stroke: "#F4664A", strokeOpacity: 1, lineWidth: 3 },
        label: {
            text: `${new Intl.NumberFormat("it-IT").format(Number(upperLimit))} `,
            position: 'right',
            dx: -10,
            style: { textBaseline: 'bottom' },
        },

    };

    if (tabState == "1") {
        annotations.push(upperLimitAnnotation);
    }



    const isMobile = useMediaQuery("(max-width: 768px)");

    const getChartSize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pixelRatio = window.devicePixelRatio || 1;

        // Regoliamo un fattore di scala per migliorare la visualizzazione su dispositivi ad alta risoluzione
        const scaleFactor = pixelRatio > 2 ? 0.85 : pixelRatio > 1.5 ? 0.9 : 1;

        return {
            width: Math.floor(
                (width < 576 ? 400 :   // XS - Smartphone piccolo
                    width < 768 ? 600 :   // SM - Smartphone medio
                        width < 992 ? 900 :   // MD - Tablet e Laptop piccolo
                            width < 1200 ? 1200 : // LG - Laptop grande
                                width < 1600 ? 1400 : // XL - Monitor Full HD
                                    1600) * scaleFactor   // 2XL - Monitor 4K e UltraWide
            ),
            height: Math.floor(
                (height < 600 ? 350 :   // XS - Mobile piccolo
                    height < 800 ? 500 :   // SM - Tablet
                        height < 1000 ? 600 :  // MD - Laptop
                            height < 1200 ? 700 :  // LG - Monitor HD
                                800) * scaleFactor      // 2XL - 4K e UltraWide
            ),
        };
    };

    const [chartSize, setChartSize] = useState(getChartSize());

    useEffect(() => {
        const handleResize = () => setChartSize(getChartSize());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    console.log(data?.length)

    // ✅ Configurazione corretta
    const config = {
        data: data,
        xField: 'data',
        yField: 'importo',
        annotations, // permette far inserie la somma di tutte le parti sopra la colonna
        label: {//proprietà per le scritte all'interno di ogni blocco 
            text: (importo: any) => {
                return `${new Intl.NumberFormat("it-IT").format(importo.importo)} `;
            },
            position: 'bottom',

        },
        axis: {
            y: {
                label: false, // ✅ Nasconde le etichette dell'asse Y
                grid: null,   // ❌ Rimuove la griglia verticale (opzionale)
                line: null,   // ❌ Rimuove la linea dell'asse Y (opzionale)
                tickLine: null, // ❌ Rimuove le tacche sull'asse Y (opzionale)
            }
        },
        scale: {
            y: {
                tickInterval: 10000,
            },

        },
        style: {
            /* maxWidth: 100, */
            fill: (record: { tipo_contratto: string }) => colorMap[record.tipo_contratto] || colorMap["Default"],

        },
        containerStyle: {
            display: "flex",
            justifyContent: "center",
            width: "100%"
        },
       
        interaction: {
            tooltip: tabState==="1"? false : {
                render: (_e: any, { title, items }: any) => {

                    return (
                        <div>
                            <h4>{title}</h4>
                            {(items || []).map((item: { name: any; color: any; value: any; }) => {
                                const { name, value } = item;
                                return (
                                    <>
                                        <div className="flex justify-between gap-3">
                                            <div>
                                                <span
                                                    style={{
                                                        display: 'inline-block',
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: '50%',
                                                        backgroundColor: colorMap[name] || colorMap["Default"],
                                                        marginRight: 6,
                                                    }}
                                                ></span>
                                                <span>
                                                    {name}
                                                </span>
                                            </div>
                                            <b>{value ? `${value} €` : 'N/A'}</b>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    );
                },

            },
        },
        colorField: "tipo_contratto",
        color: (record: { tipo_contratto: string }) => { colorMap[record.tipo_contratto] || colorMap["Default"] }, // Usa la mappa colori
        legend: false,
        /* legend: {
            color: {
                position: "top", // ✅ Legenda sotto al grafico
                layout: "horizontal", // ✅ Disposizione orizzontale
                selected: false, // ✅ Disabilita il filtro sulla legenda
                maxRows: 1, // ✅ Mostra solo una riga di legenda
                itemMarkerFill: (name: any) => { return colorMap[name.id] || colorMap["Default"] }, // ✅ Usa i colori personalizzati per i marker
                itemMarkerSize: 20, // ✅ Dimensione del marker
                itemLabelText: (name: any) => name.id, // ✅ Testo della legenda
            },
        }, */
        stack: true, //permette di sovrapporre le colonne 

        animate: { enter: { type: 'growInY' } },


    };


    return (
        <div className="flex justify-center" >
            <Column
                {...(!isMobile && { width: chartSize.width, height: chartSize.height })}
                autoFit={isMobile}
                loading={loading}
                key={tabState}
                {...(isMobile ? {} : { sizeField: "100" })}
                {...config}
            />
        </div >
    );
};

export default Graphic;
