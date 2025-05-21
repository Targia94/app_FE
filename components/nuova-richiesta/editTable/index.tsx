import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Divider, Form, Input, InputNumber, Popconfirm, Select, Table, Tooltip } from "antd";
import { DocumentDuplicateIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

// Opzioni per Unità di Misura
export const optionsUnitaMisura = [
    { label: "a corpo", value: "a corpo" },
    { label: "FUSTO", value: "FUSTO" },
    { label: "KG", value: "KG" },
    { label: "L", value: "L" },
    { label: "M", value: "M" },
    { label: "MC", value: "MC" },
    { label: "MQ", value: "MQ" },
    { label: "PZ", value: "PZ" },
];

const EditableContext = React.createContext<any | null>(null);

interface Item {
    key: string;
    nome: string;
    prezzo: number;
    unitaMisura: string;
    quantita: number;
    codice: string;
}

interface EditableRowProps {
    index: number;
}

// Riga editabile
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}
// Cella editabile aggiornata con gestione del blur
const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<any>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: "" }); // Mantiene il valore attuale (anche vuoto)
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            handleSave({ ...record, ...values });
            setEditing(false);
        } catch (errInfo) {
            console.log("Errore durante il salvataggio:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={
                    dataIndex === "codice"
                        ? [] // Il codice può essere vuoto
                        : [{ required: true, message: `${title} è obbligatorio.` }]
                }
            >
                {dataIndex === "unitaMisura" ? (
                    <Select
                        ref={inputRef}
                        onBlur={save}
                        onChange={save}
                        options={optionsUnitaMisura}
                        style={{ width: "100%" }}
                    />
                ) : dataIndex === "prezzo" || dataIndex === "quantita" ? (
                    <InputNumber
                        ref={inputRef}
                        onPressEnter={save}
                        onBlur={save}
                        style={{ width: "100%" }}
                    />
                ) : (
                    <Input
                        ref={inputRef}
                        onPressEnter={save}
                        onBlur={save}
                        style={{ width: "100%" }}
                    />
                )}
            </Form.Item>
        ) : (
            <div
                style={{ paddingInlineEnd: 24, minHeight: 24, cursor: "pointer" }}
                onClick={toggleEdit}
            >
                {record[dataIndex] !== undefined && record[dataIndex] !== "" ? (
                    dataIndex === "prezzo"  ? (
                        <>{new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(record[dataIndex]))}</>
                    ) : (
                        record[dataIndex]
                    )
                ) : (
                    <span style={{ color: "gray", fontStyle: "italic" }}>Clicca per modificare</span>
                )}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

interface DataType {
    key: number;
    codice: string;
    descrizione: string;
    prezzo: number;
    unitaMisura: string;
    quantita: number;
    parziale: number;
}

interface EditTableNewRequestProps {
    onUpdateDetails: (details: Array<{
        codice: string;
        descrizione: string;
        uom: string;
        quantita: number;
        prezzo: number;
    }>) => void;
    details?: Array<{
        codice: string;
        descrizione: string;
        uom: string;
        quantita: number;
        prezzo: number;
    }>;
}


// Componente della tabella
const EditTableNewRequest: React.FC<EditTableNewRequestProps> = ({ onUpdateDetails, details = [] }) => {
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (details.length > 0) {
            setDataSource(
                details.map((item, index) => ({
                    key: index + 1,
                    codice: item.codice,
                    descrizione: item.descrizione,
                    prezzo: item.prezzo,
                    unitaMisura: item.uom,
                    quantita: item.quantita,
                    parziale: item.prezzo * item.quantita,
                }))
            );
            setCount(details.length + 1);
        }
    }, [details]);

    const updateParent = (newData: DataType[]) => {
        const records = newData.map(({ codice, descrizione, prezzo, unitaMisura, quantita }) => ({
            codice,
            descrizione,
            prezzo,
            uom: unitaMisura,
            quantita,
        }));
        onUpdateDetails(records);
    };

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter(item => item.key !== key);
        setDataSource(newData);
        updateParent(newData);
    };

    const handleAdd = () => {
        const newData: DataType = {
            key: count,
            codice: "",
            descrizione: "",
            prezzo: 0,
            unitaMisura: "",
            quantita: 1,
            parziale: 0,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
        updateParent([...dataSource, newData]);
    };

    const handleSave = (row: DataType) => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        if (index > -1) {
            newData[index] = { ...row, parziale: row.prezzo * row.quantita };
            setDataSource(newData);
        }
        updateParent(newData);
    };

    const handleDuplicate = (record: DataType) => {
        const newKey = count;
        const duplicatedRow = { ...record, key: newKey };
        setDataSource([...dataSource, duplicatedRow]);
        setCount(count + 1);
        updateParent([...dataSource, duplicatedRow]);
    };

    const columns = [
        {
            title: "Codice",
            dataIndex: "codice",
            editable: true,
            width: 110,
        },
        {
            title: "Descrizione",
            dataIndex: "descrizione",
            editable: true,
            width: 150,
        },
        {
            title: "Unità di Misura",
            dataIndex: "unitaMisura",
            editable: true,
            width: 110,
        },
        {
            title: "Quantità",
            dataIndex: "quantita",
            editable: true,
            width: 80,
        },
        {
            title: "EUR/UOM",
            dataIndex: "prezzo",
            editable: true,
            render: (_: any, record: DataType) => (
                <div>{new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(record.prezzo)}</div>
            ),
            width: 100,
        },
        {
            title: "Parziale",
            dataIndex: "parziale",
            editable: false,
            render: (_: any, record: DataType) => (
                <div>{new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((record.prezzo * record.quantita))}</div>
            ),
            width: 100,
        },
        {
            title: "",
            dataIndex: "operation",
            render: (_: any, record: DataType) => (
                <div className="flex gap-2">
                    <Tooltip title="Duplica riga">
                        <Button
                            icon={<DocumentDuplicateIcon width={20} />}
                            onClick={() => handleDuplicate(record)}
                        />
                    </Tooltip>
                    <Popconfirm title="Sei sicuro di voler eliminare?" onConfirm={() => handleDelete(record.key)}>
                        <Button icon={<TrashIcon width={20} className="text-red-500 stroke-red-500" />} danger />
                    </Popconfirm>
                </div>
            ),
            width: 100,
        },
    ];

    const components = {
        body: { row: EditableRow, cell: EditableCell },
    };
    const mappedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col h-full gap-1">
                <div className="flex justify-end">
                    <Tooltip title="Aggiungi riga">
                        <Button onClick={handleAdd} type="primary" icon={<PlusIcon width={20} />} />
                    </Tooltip>
                </div>
                <Table<DataType>
                    size="small"
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={dataSource}
                    columns={mappedColumns}
                    pagination={false}
                    scroll={{ y: 230 }}
                />
            </div>
            {dataSource.length > 0 && (
                <div className="flex flex-col">
                    <Divider />
                    <div className="h-[5%] flex justify-end">
                        <h4>Totale: {new Intl.NumberFormat("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(dataSource.reduce((tot, item) => tot + item.parziale, 0))} €</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditTableNewRequest;
