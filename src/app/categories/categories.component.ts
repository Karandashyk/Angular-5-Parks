import { Component, OnInit, Inject} from '@angular/core';
import { ICategory } from '../_models/index';
import { CategoryService } from '../_services/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  moduleId: module.id,
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss']
})

export class CategoriesComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  categories: ICategory[] = [];


  ngOnInit() {
    this.getCategories();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCategories();
    });
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id)
      .subscribe(() => { this.getCategories(); });
  }

}




@Component({
  templateUrl: 'dialog/add-category-dialog.html',
  styleUrls: ['dialog/add-category-dialog.scss']
})
export class AddCategoryDialogComponent {

  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  category: ICategory = {
    name: '',
    description: ''
  };

  addCategory(category: ICategory): void {
    this.categoryService.addCategory(category)
      .subscribe( () => {
        this.dialogRef.close();
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
