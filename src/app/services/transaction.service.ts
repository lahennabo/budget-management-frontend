import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransactionType } from '../models/transaction.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  //private apiUrl = 'http://localhost:8080/api/transactions';
  private apiUrl = `${environment.apiUrl}/api/transactions`;

  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  getTransactionsByCategory(categoryId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  getTransactionsByType(type: TransactionType): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/type/${type}`);
  }

  getTransactionsByDateRange(startDate: string, endDate: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/date-range?startDate=${startDate}&endDate=${endDate}`);
  }

  getTotalByTypeAndCategory(categoryId: number, type: TransactionType): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/summary/category/${categoryId}?type=${type}`);
  }

  getTotalByTypeAndDateRange(type: TransactionType, startDate: string, endDate: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/summary/date-range?type=${type}&startDate=${startDate}&endDate=${endDate}`);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {

    // On construit l'objet EXACTEMENT comme le DTO Java l'attend
    const transactionDto = {
        id: transaction.id,
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.date,
        notes: transaction.notes,
        categoryId: transaction.category ? transaction.category.id : null // Extraction de l'ID ici
    };
    console.log(">>> dans service.createTransaction avec transactionDto : ", transactionDto);
    return this.http.post<Transaction>(this.apiUrl, transactionDto);
  }

  updateTransaction(id: number, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, transaction);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
