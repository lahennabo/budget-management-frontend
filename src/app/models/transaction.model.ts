import { Category } from './category.model';

export enum TransactionType {
  INCOME = 'REVENUS',    //INCOME
  EXPENSE = 'DÉPENSES'   //EXPENSE
}

export interface Transaction {
  id?: number;date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  notes?: string;
}
