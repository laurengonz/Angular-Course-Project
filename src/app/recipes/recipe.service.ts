import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) {
    }

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         "Spaghetti", 
    //         "Yummy spaghetti recipe", 
    //         "https://www.cuisineathome.com/review/wp-content/uploads/2023/01/secrets-to-spaghetti-cuisine.jpg",
    //         [
    //             new Ingredient('Noodles', 1),
    //             new Ingredient('Marinara Sauce', 2)
    //         ]),
    //     new Recipe(
    //         "In-N-Out Burger", 
    //         "Best burger in California", 
    //         "https://www.discoverlosangeles.com/sites/default/files/styles/hero/public/media/activities/in-n-out-double-double-animal-style_1.jpg?itok=vaNogZtd",
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Patty', 4)
    //         ])
    // ];
    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    AddIngredientsToShopping(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}