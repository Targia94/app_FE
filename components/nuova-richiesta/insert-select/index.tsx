import React, { useRef, useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space, message } from "antd";
import type { InputRef } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getNoteParteMacchina, insertNotaParteMacchina } from "@/libs/api/methods/partiMacchina";
import type { Nota } from "@/libs/api/types/parti_macchina";

interface InsertSelectProps {
  id_parte?: number;
  disable?: boolean;
  value?: number;
  onChange?: (value: number) => void;
}

export default function InsertSelect({ id_parte, disable, value, onChange }: InsertSelectProps) {
  const [items, setItems] = useState<Nota[]>([]); 
  const [name, setName] = useState<string>(""); 
  const inputRef = useRef<InputRef>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Recupera le note della parte macchina
  const { status,data: noteData, refetch } = useQuery({
    queryKey: ["note", id_parte],
    queryFn: () => getNoteParteMacchina({ id_parte }),
    enabled: !!id_parte, 
  });

  // Aggiorna lo stato con i dati recuperati
  useEffect(() => {
    if (noteData?.response?.note) {
      const noteList = noteData.response.note.map(
        (item: { id_parte_macchina_link: number; nota: string }) => ({
          id_parte_macchina_link: item.id_parte_macchina_link,
          nota: item.nota,
        })
      );
      setItems(noteList);
    }
  }, [noteData]);

  // Gestisce il cambiamento del nome
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // Aggiunge una nuova nota e seleziona automaticamente
  const addItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      message.error("Scrivi la nota.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await insertNotaParteMacchina({
        id_parte_macchina: id_parte,
        nota: name,
      });
      setName("");
      refetch();

      // Seleziona automaticamente la nuova nota
      const newItem = { id_parte_macchina_link: response.response.id, nota: name };
      setItems((prev) => [...prev, newItem]);
      if (onChange) onChange(newItem.id_parte_macchina_link);

      message.success("Nota aggiunta con successo");
    } catch (error) {
      message.error("Errore durante l'inserimento della nota");
    } finally {
      setIsLoading(false)
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      loading={status=="pending"}
      disabled={!id_parte } 
      placeholder="Seleziona Nota"
      value={value} 
      onChange={onChange}
      dropdownStyle={{
        maxHeight: 150,
        overflow: "auto",
      }}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              disabled={isLoading}
              placeholder="Aggiungi Nota"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
              maxLength={512} 
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem} loading={isLoading} />
          </Space>
        </>
      )}
      options={items.map((item) => ({
        label: item.nota, 
        value: item.id_parte_macchina_link, 
      }))}
    />
  );
}
