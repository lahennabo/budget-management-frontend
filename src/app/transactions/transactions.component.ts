import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../services/category.service';
import { Transaction, TransactionType } from '../models/transaction.model';
import { Category } from '../models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from './transaction-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs'; // Ajouté pour optimiser le chargement simultané

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];
  loading = true;
  displayedColumns: string[] = ['description', 'amount', 'type', 'category', 'date', 'actions'];

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.cdr.detectChanges();

    // Utilisation de forkJoin pour attendre la résolution des deux requêtes API en même temps
    forkJoin({
      transactions: this.transactionService.getAllTransactions(),
      categories: this.categoryService.getAllCategories()
    }).subscribe({
      next: (result) => {
        this.transactions = result.transactions || [];
        this.categories = result.categories || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error loading data:', error);
        this.loading = false;
        this.transactions = [];
        this.cdr.detectChanges();
      }
    });
  }

  openDialog(transaction?: Transaction): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '500px',
      data: transaction || { description: '', amount: 0, type: TransactionType.EXPENSE, date: new Date().toISOString().split('T')[0], category: null }
    });

    dialogRef.afterClosed().subscribe((result: Transaction) => {
      if (result) {
        if (result.id) {
          this.transactionService.updateTransaction(result.id, result).subscribe(() => this.loadData());
        } else {
          this.transactionService.createTransaction(result).subscribe(() => this.loadData());
        }
      }
    });
  }

  deleteTransaction(id: number): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe(() => this.loadData());
    }
  }

  // Amélioration : Typage plus flexible pour l'id et sécurité renforcée
  getCategoryName(categoryId: number | any): string {
    if (!categoryId) return 'Unknown';
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }
}


// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { TransactionService } from '../services/transaction.service';
// import { CategoryService } from '../services/category.service';
// import { Transaction, TransactionType } from '../models/transaction.model';
// import { Category } from '../models/category.model';
// import { MatDialog } from '@angular/material/dialog';
// import { TransactionDialogComponent } from './transaction-dialog.component';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTableModule } from '@angular/material/table';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { CommonModule } from '@angular/common';
//
// @Component({
//   selector: 'app-transactions',
//   standalone: true,
//   imports: [MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatProgressSpinnerModule, CommonModule],
//   templateUrl: './transactions.component.html',
//   styleUrls: ['./transactions.component.scss']
// })
// export class TransactionsComponent implements OnInit {
//   transactions: Transaction[] = [];
//   categories: Category[] = [];
//   loading = true;
//   displayedColumns: string[] = ['description', 'amount', 'type', 'category', 'date', 'actions'];
//
//   constructor(
//     private transactionService: TransactionService,
//     private categoryService: CategoryService,
//     private dialog: MatDialog,
//     private cdr: ChangeDetectorRef
//   ) {}
//
//   ngOnInit(): void {
//     this.loadData();
//   }
//
//   loadData(): void {
//     this.loading = true;
//     this.cdr.detectChanges();
//
//     this.transactionService.getAllTransactions().subscribe({
//       next: (transactions: Transaction[]) => {
//         this.transactions = transactions;
//         this.loading = false;
//         this.cdr.detectChanges();
//       },
//       error: (error: any) => {
//         console.error('Error loading transactions:', error);
//         this.loading = false;
//         this.transactions = [];
//         this.cdr.detectChanges();
//       }
//     });
//
//     this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
//       this.categories = categories;
//     });
//   }
//
//   openDialog(transaction?: Transaction): void {
//     const dialogRef = this.dialog.open(TransactionDialogComponent, {
//       width: '500px',
//       data: transaction || { description: '', amount: 0, type: TransactionType.EXPENSE, date: new Date().toISOString().split('T')[0], category: null }
//     });
//
//     dialogRef.afterClosed().subscribe((result: Transaction) => {
//
//       if (result) {
//         if (result.id) {
//           this.transactionService.updateTransaction(result.id, result).subscribe(() => this.loadData());
//         } else {
//           this.transactionService.createTransaction(result).subscribe(() => this.loadData());
//         }
//       }
//     });
//   }
//
//   deleteTransaction(id: number): void {
//     if (confirm('Are you sure you want to delete this transaction?')) {
//       this.transactionService.deleteTransaction(id).subscribe(() => this.loadData());
//     }
//   }
//
//   getCategoryName(categoryId: number): string {
//     const category = this.categories.find(c => c.id === categoryId);
//     return category ? category.name : 'Unknown';
//   }
// }
