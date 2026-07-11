import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../models/budget.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  //private apiUrl = 'http://localhost:8080/api/budgets';
  private apiUrl = `${environment.apiUrl}/api/budgets`;

  constructor(private http: HttpClient) {}

  getAllBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.apiUrl);
  }

  getBudgetById(id: number): Observable<Budget> {
    return this.http.get<Budget>(`${this.apiUrl}/${id}`);
  }

  getBudgetsByPeriod(period: string): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.apiUrl}/period/${period}`);
  }

  getBudgetsByCategory(categoryId: number): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  createBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(this.apiUrl, budget);
  }

  updateBudget(id: number, budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.apiUrl}/${id}`, budget);
  }

  deleteBudget(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
