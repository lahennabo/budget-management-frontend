import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Budget } from '../models/budget.model';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-dialog',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule],
  templateUrl: './budget-dialog.component.html',
  styleUrls: ['./budget-dialog.component.scss']
})
export class BudgetDialogComponent {
  budget: Budget;
  categories: Category[] = [];

  constructor(
    public dialogRef: MatDialogRef<BudgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Budget,
    private categoryService: CategoryService
  ) {
    this.budget = { ...data };
    console.log(">>> this.budget+++ : ");console.log(this.budget);console.log("------------------------------");
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.budget.name && this.budget.limitAmount > 0 && this.budget.period) {
      console.log(">>> this.budget : ");console.log(this.budget);
      this.dialogRef.close(this.budget);
    }
  }
}
