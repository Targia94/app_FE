import { ProductDataDb } from "./product";

export interface Ordine  {
    id_ordine: number;
    data_creazione: string;
    data_approvazione: string | null;
    data_prelievo: string | null;
    data_consegna: string | null;
    stato_ordine: string;
    note: string | null;
    linea_centro_costo: string | null;
    tipo_centro_costo: string | null;
    articoli: ProductDataDb[];
    nome_utente_creazione: string;
    nome_utente_approvazione: string;
    nome_utente_prelievo: string;
    nome_utente_consegna: string;
    parziale: number;
    stock_out: boolean;
    id_centro_costo: number;
    supervisor: string;
  };

  