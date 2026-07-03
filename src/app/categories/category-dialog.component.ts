import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {
  category: Category;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    // On clone les données et on force une couleur par défaut valide si elle est vide
    this.category = {
      ...data,
      color: data?.color || '#000000'
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.category.name && this.category.color) {
      this.dialogRef.close(this.category);
    }
  }
}


// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Category } from '../models/category.model';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { FormsModule } from '@angular/forms';
//
// @Component({
//   selector: 'app-category-dialog',
//   standalone: true,
//   imports: [MatDialogModule, MatInputModule, MatButtonModule, FormsModule],
//   templateUrl: './category-dialog.component.html',
//   styleUrls: ['./category-dialog.component.scss']
// })
// export class CategoryDialogComponent {
//   category: Category;
//
//   constructor(
//     public dialogRef: MatDialogRef<CategoryDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: Category
//   ) {
//     this.category = { ...data };
//   }
//
//   onCancel(): void {
//     this.dialogRef.close();
//   }
//
//   onSave(): void {
//     if (this.category.name && this.category.color) {
//       this.dialogRef.close(this.category);
//     }
//   }
// }
