import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';


import { Recipe } from './recipes-model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
	//recipeSelected = new EventEmitter<Recipe>();
  recipesChangedSubject = new Subject<Recipe[]>();

	recipes: Recipe[] = [
  		new Recipe(
  			'Frappucino',
  			'Delicius frappucino moke ',
  			'http://www.starbucks.com.pe/media/mocha-blanco-frappuccino-blended_tcm92-18629_w1024_n.png',
  			[new Ingredient('Milk',250),new Ingredient('Chocolate',35)])
  	];

    constructor(private slService: ShoppingListService){}

    getRecipe(index: number){
      return this.recipes[index];
    }

  	getRecipes(){
  		return this.recipes.slice();
  	}

    addIngredientsShopping(ingredients : Ingredient[]){
      this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChangedSubject.next(this.recipes.slice());
    };
    
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChangedSubject.next(this.recipes.slice());
    };

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChangedSubject.next(this.recipes.slice());
    }
}