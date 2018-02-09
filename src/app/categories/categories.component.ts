import { Component, OnInit, Inject} from '@angular/core';
import { ICategory } from '../_models/index';
import { CategoryService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss']
})

export class CategoriesComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
  ) {}

  category = '';
  categories: ICategory[] = [];


  ngOnInit() {
    this.getCategories();
  }

  addCategory(category: string): void {
    this.categoryService.addCategory(category)
      .subscribe( () => {
        this.getCategories();
        this.category = '';
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
