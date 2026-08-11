export interface TableColumn {
  name: string;
  type: string;
  nullable: boolean;
  key: 'PK' | 'FK' | 'UK' | 'IDX' | '';
  extra?: string;
  comment?: string;
}

export interface TableRelation {
  fromTable: string;
  fromCol: string;
  toTable: string;
  toCol: string;
  type: '1:1' | '1:N' | 'N:M';
}

export interface TableDefinition {
  name: string;
  description: string;
  primaryKey: string;
  foreignKeys: string[];
  uniqueKeys: string[];
  indexes: string[];
  columns: TableColumn[];
}

export interface TaxResult {
  nilai_pembayaran: number;
  dpp: number;
  ppn: number;
  pph21: number;
  pph22: number;
  pph23_jasa: number;
  pph23_makan: number;
  total_pajak: number;
  nilai_bersih: number;
}
