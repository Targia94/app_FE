export interface PartiMacchina {
  id: number;
  linea: string;
  descrizione: string;
}

export interface NotePartiMacchina {
  id_parte_macchina: number;
  note: Nota[];
}

export interface Nota {
  id_parte_macchina_link: number;
  nota: string;
}

export interface NotaDescrizione {
  descrizione: string;
}

export interface ParteMacchina {
  id_parte_macchina: number;
  linea: string;
  descrizioni: NotaDescrizione[];
}
