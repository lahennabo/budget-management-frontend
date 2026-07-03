import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction, TransactionType } from '../models/transaction.model';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transaction-dialog',
  imports: [
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.scss'
})
export class TransactionDialogComponent {
  transactionForm!: FormGroup;
  transaction: Transaction;
  categories: Category[] = [];
  transactionTypes = Object.values(TransactionType);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction,
    private categoryService: CategoryService
  ) {
    this.transaction= { ...data };
    this.loadCategories();
  }

  ngOnInit(): void {
    // Exemple d'initialisation (adaptez selon vos champs)
    this.transactionForm = this.fb.group({
      description: [''],
      amount:'',
      date: [new Date()]
    });
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
    if (this.transaction.description && this.transaction.amount > 0 && this.transaction.category) {
      this.dialogRef.close(this.transaction);
    }
  }

//   onSubmit(): void {
//     if (this.transactionForm.valid) {
//       console.log(this.transactionForm.value);
//     }
//   }
}
