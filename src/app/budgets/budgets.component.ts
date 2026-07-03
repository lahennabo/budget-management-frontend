import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { CategoryService } from '../services/category.service';
import { Budget } from '../models/budget.model';
import { Category } from '../models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { BudgetDialogComponent } from './budget-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = [];
  categories: Category[] = [];
  loading = true;
  displayedColumns: string[] = ['name', 'limitAmount', 'period', 'category', 'actions'];

  constructor(
    private budgetService: BudgetService,
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

    this.budgetService.getAllBudgets().subscribe({
      next: (budgets: Budget[]) => {
        this.budgets = budgets;
        this.loading = false;
        this.cdr.detectChanges();
        console.log(">>> budgets recu de getAllBudgets()*** : ");console.log(budgets);
      },
      error: (error: any) => {
        console.error('Error loading budgets:', error);
        this.loading = false;
        this.budgets = [];
        this.cdr.detectChanges();
      }
    });

    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  openDialog(budget?: Budget): void {
    const dialogRef = this.dialog.open(BudgetDialogComponent, {
      width: '500px',
      data: budget || { name: '', limitAmount: 0, period: new Date().toISOString().slice(0, 7), category: null }
    });
/*
  id?: number;
  name: string;
  limitAmount: number;
  period: string;
  categoryId: number;
  categoryName: string;
*/
    dialogRef.afterClosed().subscribe((result: Budget) => {
      console.log(">>> result.limitAmount = " + result.limitAmount);
      console.log(">>> result.name = " + result.name);
      console.log(">>> result.period = " + result.period);
      console.log(">>> result.categoryId = " + result.categoryId);
      console.log(">>> result.categoryName = " + result.categoryName);
//       result.categoryId = 3;
//       result.categoryName = "Transport";
//       result.name = "Budget Transport";
//       result.limitAmount = 1500;
//       result.period = "2026-07";
      if (result) {
        if (result.id) {
          console.log(">>> dans if (result.id) >>>> avec result = ");console.log(result);
          this.budgetService.updateBudget(result.id, result).subscribe(() => this.loadData());
        } else {
          console.log(">>> dans else if (result.id) >>>> avec result = ");console.log(result);
          this.budgetService.createBudget(result).subscribe(() => this.loadData());
        }
      }
    });
  }

  deleteBudget(id: number): void {
    if (confirm('Are you sure you want to delete this budget?')) {
      this.budgetService.deleteBudget(id).subscribe(() => this.loadData());
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'None';
  }
}


// import { Component, OnInit } from '@angular/core';
// import { BudgetService } from '../services/budget.service';
// import { CategoryService } from '../services/category.service';
// import { Budget } from '../models/budget.model';
// import { Category } from '../models/category.model';
// import { MatDialog } from '@angular/material/dialog';
// import { BudgetDialogComponent } from './budget-dialog.component';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTableModule } from '@angular/material/table';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { CommonModule } from '@angular/common';
//
// @Component({
//   selector: 'app-budgets',
//   standalone: true,
//   imports: [MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatProgressSpinnerModule, CommonModule],
//   templateUrl: './budgets.component.html',
//   styleUrls: ['./budgets.component.scss']
// })
// export class BudgetsComponent implements OnInit {
//   budgets: Budget[] = [];
//   categories: Category[] = [];
//   loading = true;
//   displayedColumns: string[] = ['name', 'limitAmount', 'period', 'category', 'actions'];
//
//   constructor(
//     private budgetService: BudgetService,
//     private categoryService: CategoryService,
//     private dialog: MatDialog
//   ) {}
//
//   ngOnInit(): void {
//     this.loadData();
//   }
//
//   loadData(): void {
//     this.loading = true;
//
//     this.budgetService.getAllBudgets().subscribe((budgets: Budget[]) => {
//       this.budgets = budgets;
//       this.loading = false;
//     });
//
//     this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
//       this.categories = categories;
//     });
//   }
//
//   openDialog(budget?: Budget): void {
//     const dialogRef = this.dialog.open(BudgetDialogComponent, {
//       width: '500px',
//       data: budget || { name: '', limitAmount: 0, period: new Date().toISOString().slice(0, 7), category: null }
//     });
//
//     dialogRef.afterClosed().subscribe((result: Budget) => {
//       if (result) {
//         if (result.id) {
//           this.budgetService.updateBudget(result.id, result).subscribe(() => this.loadData());
//         } else {
//           this.budgetService.createBudget(result).subscribe(() => this.loadData());
//         }
//       }
//     });
//   }
//
//   deleteBudget(id: number): void {
//     if (confirm('Are you sure you want to delete this budget?')) {
//       this.budgetService.deleteBudget(id).subscribe(() => this.loadData());
//     }
//   }
//
//   getCategoryName(categoryId: number): string {
//     const category = this.categories.find(c => c.id === categoryId);
//     return category ? category.name : 'None';
//   }
// }
