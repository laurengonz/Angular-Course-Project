import { Injectable, inject } from "@angular/core";

import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { RecipeService } from "./recipe.service";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipesResolver {
    constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) {}

    resolveForwardRef(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Recipe[]> | Promise<Recipe[]> | Recipe[]{
        const recipes = this.recipesService.getRecipes(); 

        if(recipes.length === 0) { 
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}


export const RecipesResolverService: ResolveFn<Recipe[]> = (
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
) => {
    return inject(RecipesResolver).resolveForwardRef(route, state);
}