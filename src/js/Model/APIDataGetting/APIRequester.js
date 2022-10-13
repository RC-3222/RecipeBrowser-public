export default class APIRequester {
    constructor(apikey) {
        this.apiKey = apikey;
        // stuff
    }

    async reqCategoriesData() {
        try {
            const url = `https://www.themealdb.com/api/json/v1/${this.apiKey}/categories.php`;
            const errorMessage = `Error while requesting categories data`;

            return await this._getJSON(url,errorMessage);
        } catch (e) {
            throw (e)
        }
    }

    async reqRecipesData(categoryName) {
        try {
            const url = `https://www.themealdb.com/api/json/v1/${this.apiKey}/filter.php?c=${categoryName}`;
            const errorMessage = `Error while requesting recipes data by category`;

            return await this._getJSON(url,errorMessage);
        } catch (e) {
            throw (e)
        }
    }

    async reqRecipeInfoDataByID(recipeID) {
        try {
            const url = `https://www.themealdb.com/api/json/v1/${this.apiKey}/lookup.php?i=${recipeID}`;
            const errorMessage = `Error while requesting recipe info data by id`;

            return await this._getJSON(url,errorMessage);
        } catch (e) {
            throw (e)
        }
    }

    async reqRecipeInfoDataByName(recipeName) {
        try {
            const url = `https://www.themealdb.com/api/json/v1/${this.apiKey}/search.php?s=${recipeName}`;
            const errorMessage = `Error while requesting recipe info data by name`;

            return await this._getJSON(url,errorMessage);
        } catch (e) {
            throw (e)
        }
    }

    async reqRecipeInfoDataRandom() {
        try {
            const url = `https://www.themealdb.com/api/json/v1/${this.apiKey}/random.php`;
            const errorMessage = `Error while requesting random recipe info data`;

            return await this._getJSON(url,errorMessage);
        } catch (e) {
            throw (e)
        }
    }

    async _getJSON(url, errorMessage) {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(errorMessage + ` (status ${response.status})`)
        else
            return await response.json()
    }
}