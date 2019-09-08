import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'

import { Recipe } from '../recipes-model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
	recipeSelectedDetail: Recipe;
	id: number;

  	constructor(private recipeService : RecipeService, private activatedRoute: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(
				(params: Params) => {
					this.id = +params['id'];
					this.recipeSelectedDetail = this.recipeService.getRecipe(this.id);
				}
			);
	}

	addToShoppingList(){
		this.recipeService.addIngredientsShopping(this.recipeSelectedDetail.ingredients);
	}
	
	goToEdit(){
		this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
		//this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute});
	}

	deleteRecipe(){
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['recipes']);
	}

}
