export interface ProductDataDb {
  matchPercentage: number;
  id:string;
  barcode:string;
  codice: string,
  descrizione: string,
  umo: string,
  saldo: number,
  da_prelevare: number,
  ubicazione: string,
  saldo_min: number,
  saldo_max: number,
  quantity?: number,
  descrizione_lunga: string,
  ultimo_aggiornamento: string,
  approvato: number
  id_ordine: number,
  prelevata: number
}

export interface PotxtProductDataDb {
  codice: string,
  descrizione: string,
  id_ordine: number,
}
