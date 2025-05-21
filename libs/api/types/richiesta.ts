import { Categoria } from "./categorie";
import { Fornitore } from "./fornitore";
import { GLAccount } from "./gl-account";
import { PartiMacchina } from "./parti_macchina";

// TypeScript type for the `richieste` table
const richiestaStatoMapping = [
  { value: 1, label: "Creazione" },
  { value: 100, label: "Annullato" },
  { value: 15, label: "Rifiutato L1" },
  { value: 25, label: "Rifiutato L2" },
  { value: 90, label: "Accettato" },
  { value: 11, label: "Necessarie Informazioni L1" },
  { value: 21, label: "Necessarie Informazioni L2" },
  { value: 19, label: "Approvato L1" },
  { value: 29, label: "Approvato L2" },
  { value: 13, label: "Informazioni Fornite" },
  { value: 23, label: "Informazioni Fornite" },
  { value: 80, label: "Informazioni Fornite" },
  { value: 50, label: "Richiesta RDA in SAP" },
  { value: 55, label: "Inserita RDA in SAP" },
];

export interface CentroDiCosto {
  id: number;
  linea: string;
  full_cdc: string;
  tipo: string;
  numero: number | null;
}

export interface UserRequestqest {
  supertoken_uid: string;
  full_name: string;
  badge_no: number | null;
  email: string;
}

export interface CdCRda {
  cc: number;
  descrizione: string;
}

export interface Richiesta {
  id: number;
  totale_richiesta: number;
  rda_sap: string;
  data_creazione: Date; // ISO date string
  descrizione_breve: string;
  descrizione_lunga: string;
  id_cdc: number;
  id_gl_account: number;
  user_id_richiedente: string; // UUID
  user_id_rr: string | null;
  user_id_f: string | null;
  priorita: number;
  id_fornitore_desiderato: number;
  po: string | null;
  po_data: string | null; // ISO date string
  stato: number;
  data_intervento: Date | null; // ISO date string
  data_consegna: Date; // ISO date string
  centro_di_costo: CdCRda;
  gl_account: GLAccount;
  user_richiedente: UserRequestqest;
  user_rr: UserRequestqest | null;
  user_f: UserRequestqest | null;
  fornitore: Fornitore;
  id_dettaglio_richiesta: number;
  parte_macchina: PartiMacchina;
  categoria: Categoria;
  dettagli_richiesta: DettaglioRichiesta[];
  allegati: Allegato[];
  parte_macchina_link:ParteMacchinaNote

}

export interface ParteMacchinaNote{
  id: number;
  nota: string;
}

export interface NewRequest {
  descrizione_breve: string;
  descrizione_lunga: string;
  id_cdc: number;
  id_gl_account: number;
  priorita: number;
  id_fornitore_desiderato: number;
  data_intervento: Date;
  dettaglio_richiesta: DettaglioRichiesta;
}

export interface DettaglioRichiesta {
  id: number;
  codice: string;
  descrizione: string;
  uom: string; //unità di misura
  quantita: number;
  prezzo: number;
}

export interface Allegato {
  id: number;
  filename: string;
}

export const statoList = [
  { value: 1, label: "Creazione" },
  { value: 100, label: "Annullato" },
  { value: 15, label: "Rifiutato L1" },
  { value: 25, label: "Rifiutato L2" },
  { value: 90, label: "Accettato" },
  { value: 11, label: "Necessarie Informazioni L1" },
  { value: 21, label: "Necessarie Informazioni L2" },
  { value: 80, label: "Informazioni Fornite" },
  { value: 19, label: "Approvato L1" },
  { value: 29, label: "Approvato L2" },
  { value: 13, label: "Informazioni Fornite" }, // per rispondere a L1
  { value: 23, label: "Informazioni Fornite" }, // per rispondere a L2
  { value: 50, label: "Richiesta RDA in SAP" },
  { value: 55, label: "Inserita RDA in SAP" },
];

export const statoListMessage = [
  { value: "Creazione", label: "Creazione" },
  { value: "Annullato", label: "Annullata" },
  { value: "Rifiutato L1", label: "Rifiutato da" },
  { value: "Rifiutato L2", label: "Rifiutato da" },
  { value: "Accettato", label: "Accettato" },
  { value: "Necessarie Informazioni L1", label: "Necessarie Informazioni" },
  { value: "Necessarie Informazioni L2", label: "Necessarie Informazioni" },
  { value: "Informazioni Fornite", label: "Informazioni Fornite" },
  { value: "Approvato L1", label: "Autorizzato da" },
  { value: "Approvato L2", label: "Autorizzato da" },
];
