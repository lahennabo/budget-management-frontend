import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../services/category.service';
import { BudgetService } from '../services/budget.service';
import { Transaction, TransactionType } from '../models/transaction.model';
import { Category } from '../models/category.model';
import { Budget } from '../models/budget.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatProgressSpinnerModule, MatTableModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];
  budgets: Budget[] = [];
  totalIncome = 0;        // Total revenus
  totalExpenses = 0;      // Total depenses
  balance = 0;
  loading = true;

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private budgetService: BudgetService,
    private cdr: ChangeDetectorRef    // inection de Gestionnaire de Détection des Changements
  ) {}

  ngOnInit(): void {
    console.log(">>> Debut ngOnInit >>>>>>>>>>>>>>> avec this.loading : " + this.loading);
    this.loadData();
    console.log(">>> Fin ngOnInit >>>>>>>>>>>>>>> avec this.loading : " + this.loading);
  }

  loadData(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.transactionService.getAllTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        console.log(">>> transactions : {}", transactions);
        this.transactions = transactions;
        this.calculateTotals();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error loading transactions:', error);
        this.loading = false;
        this.transactions = [];
        this.cdr.detectChanges();
      }
    });

    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.budgetService.getAllBudgets().subscribe((budgets: Budget[]) => {
      this.budgets = budgets;
      this.cdr.detectChanges();
      console.log(">>> this.budgets : {}", this.budgets);
      console.log(">>> this.budgets.length : {}", this.budgets.length);
    });
  }

  calculateTotals(): void {
    this.totalIncome = this.transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);

    this.totalExpenses = this.transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    this.balance = this.totalIncome - this.totalExpenses;
  }
}


// import { Component, OnInit } from '@angular/core';
// import { TransactionService } from '../services/transaction.service';
// import { CategoryService } from '../services/category.service';
// import { BudgetService } from '../services/budget.service';
// import { Transaction, TransactionType } from '../models/transaction.model';
// import { Category } from '../models/category.model';
// import { Budget } from '../models/budget.model';
// import { MatCardModule } from '@angular/material/card';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatTableModule } from '@angular/material/table';
// import { CommonModule } from '@angular/common';
//
// @Component({
//   selector: 'app-dashboard',
//   imports: [MatCardModule, MatProgressSpinnerModule, MatTableModule, CommonModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   transactions: Transaction[] = [];
//   categories: Category[] = [];
//   budgets: Budget[] = [];
//   totalIncome = 0;
//   totalExpenses = 0;
//   balance = 0;
//   loading = true;
//
//   constructor(
//     private transactionService: TransactionService,
//     private categoryService: CategoryService,
//     private budgetService: BudgetService
//   ) {}
//
//   ngOnInit(): void {
//     this.loadData();
//   }
//
//   loadData(): void {
//     this.loading = true;
//
//     this.transactionService.getAllTransactions().subscribe((transactions: Transaction[]) => {
//       this.transactions = transactions;
//       this.calculateTotals();
//       this.loading = false;
//     });
//
//     this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
//       this.categories = categories;
//     });
//
//     this.budgetService.getAllBudgets().subscribe((budgets: Budget[]) => {
//       this.budgets = budgets;
//     });
//   }
//
//   calculateTotals(): void {
//     this.totalIncome = this.transactions
//       .filter(t => t.type === TransactionType.INCOME)
//       .reduce((sum, t) => sum + t.amount, 0);
//
//     this.totalExpenses = this.transactions
//       .filter(t => t.type === TransactionType.EXPENSE)
//       .reduce((sum, t) => sum + t.amount, 0);
//
//     this.balance = this.totalIncome - this.totalExpenses;
//   }
// }
