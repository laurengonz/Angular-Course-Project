import { Injectable, inject } from "@angular/core";

import { Recipe } from "./recipe.model";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, map, of, switchMap, take } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from "@ngrx/effects";

@Injectable({providedIn: 'root'})
export class RecipesResolver {
    constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

    resolveForwardRef(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Recipe[]> | Promise<Recipe[]> | Recipe[]{
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
                return recipesState.recipes;
            }),
            switchMap(recipes => {
                if(recipes.length === 0) {
                    this.store.dispatch(new RecipeActions.FetchRecipes());
                    return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
                } else {
                    return of(recipes);
                }
            })
        );
    }
}


export const RecipesResolverService: ResolveFn<Recipe[]> = (
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
) => {
    return inject(RecipesResolver).resolveForwardRef(route, state);
}