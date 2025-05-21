export interface HistoryPlot {
    id:number;
    data: string;
    val0: number;
    val1: number;
    val2: number;
    
    graphic_id: number
}
export interface CopyHistoryPlot {
    
    data: string;
    val0: number;
    val1: number;
    val2: number;
    
    graphic_id: number
}

export interface Budget{
    id: number;
    nome:string;
    tipo: string;
    budget: number
}