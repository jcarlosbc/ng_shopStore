import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[];
  private igChangeSub: Subscription;
  test: String;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChangeEvent.subscribe(
        (ingredientes : Ingredient[]) =>{
          this.ingredients = ingredientes;
        }
      );
  }

  onEditItem(index: number){
    this.slService.editingSubject.next(index);
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }


  
}
