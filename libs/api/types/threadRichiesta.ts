import { Allegato } from "./richiesta";

export interface ThreadRichieste {
    id: number; 
    data: Date ; 
    message: string; 
    user_id: string | null; 
    stato: "Accettato" | "Rifiutato" | "Necessarie Informazioni"; 
    id_richiesta: number ; 
    full_name: string;
    allegati: Allegato
  }
  