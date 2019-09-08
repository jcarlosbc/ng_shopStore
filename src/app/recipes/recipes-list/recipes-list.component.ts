import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';



import { Recipe } from '../recipes-model';
import { RecipeService } from '../recipe.service'

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes : Recipe[];
  susbscription: Subscription;

  
  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.susbscription = this.recipeService.recipesChangedSubject.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  goToNew(){
  	this.router.navigate(['new'], {relativeTo: this.activatedRoute})
  }

  ngOnDestroy(){
    this.susbscription.unsubscribe();
  }

}
