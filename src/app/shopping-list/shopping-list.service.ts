import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
	ingredientsChangeEvent = new Subject<Ingredient[]>();
	editingSubject = new Subject<number>();

	private ingredients: Ingredient[] = [
  		new Ingredient("Tomatoes",2),
  		new Ingredient("Chipotles",3)
  	];
	
	constructor() {
		// code...
	}

	getIngredients(){
		return this.ingredients.slice();
	}

	getIngredient(index: number){
		return this.ingredients[index];
	}

	addIngredient(ingredient: Ingredient){
		this.ingredients.push(ingredient);
		this.ingredientsChangeEvent.next(this.ingredients.slice());

	}

	addIngredients(ingredients : Ingredient[]){
		this.ingredients.push(...ingredients);
		this.ingredientsChangeEvent.next(this.ingredients.slice());		
	}

	updateIngredient(index: number, newIngredient: Ingredient){
		this.ingredients[index] = newIngredient;
		this.ingredientsChangeEvent.next(this.ingredients.slice());
	}

	deleteIngredient(index: number){
		this.ingredients.splice(index, 1);
		this.ingredientsChangeEvent.next(this.ingredients.slice());
	}
}