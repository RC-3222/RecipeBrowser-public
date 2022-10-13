import APIRequester from "./APIDataGetting/APIRequester.js";

import Category from "./Data/Category.js";
import Recipe from "./Data/Recipe.js";
import RecipeInfo from "./Data/RecipeInfo.js";


export default class APIWorker {
    constructor(apiKey = '1') {
        this.apiRequester = new APIRequester(apiKey);
    }

    async getCategories() {
        try {
            const {categories} = await this.apiRequester.reqCategoriesData();
            return categories?.length > 0 ? categories.map(this._genCategory) : null;
        } catch (e) {
            throw (e);
        }
    }

    async getRecipes(categoryName) {
        try {
            const {meals} = await this.apiRequester.reqRecipesData(categoryName);
            return meals ? meals.map(this._genRecipe) : null;
        } catch (e) {
            throw (e);
        }
    }

    async getRecipeInfoByID(recipeID) {
        try {
            const {meals} = await this.apiRequester.reqRecipeInfoDataByID(recipeID);
            return meals ? this._genRecipeInfo(meals[0]) : null;
        } catch (e) {
            throw (e)
        }
    }
    /*
    *  */
    async getRecipeInfoByName(recipeName) {
        try {
            const {meals} = await this.apiRequester.reqRecipeInfoDataByName(recipeName);
            return meals ? this._genRecipeInfo(meals[0]) : null;
        } catch (e) {
            throw (e)
        }
    }
    async getRecipeInfoRandom() {
        try {
            const {meals} = await this.apiRequester.reqRecipeInfoDataRandom();
            return meals ? this._genRecipeInfo(meals[0]) : null;
        } catch (e) {
            throw (e)
        }
    }

    _genCategory(category) {
        return new Category(
            category['strCategory'],
            category['strCategoryDescription'].replace(/\[[0-9a-zA-Z]+\]/g,''),
            category['strCategoryThumb'],
        )
    }
    _genRecipe(meal) {
        return new Recipe(
            meal['strMeal'],
            meal['strMealThumb'],
            meal['idMeal'],
        )
    }

    _genRecipeInfo(meal) {
        const mealData = {
            title: meal['strMeal'],
            thumb: meal['strMealThumb'],
            id: meal['idMeal'],
            description: meal['strInstructions'],
            video: meal['strYoutube'],
            ingredients: [],
            src: meal['strSource'],
        }

        for (let i = 1; i <=20; i++) {
            if (meal[`strIngredient${i}`] && meal[`strMeasure${i}`])
                mealData.ingredients.push(
                    {
                        name: meal[`strIngredient${i}`],
                        measure: meal[`strMeasure${i}`]
                    }
                );
            else
                break;
        }

        return new RecipeInfo(mealData)
    }
}