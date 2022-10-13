export default class WorkPageModel {
    constructor(parent) {
        this.parent = parent;
        this.isRecipeLoaded = false;
    }

    // для инициализации рецептов извне (чтобы не пришлось их перезагружать
    initRecipeInfo(recipeInfo) {
        this.activeRecipeInfo = recipeInfo;
        this.isRecipeLoaded = true;
    }

    async handleUpdate() {
        if (this.parent.state.recipeID) {
            return await this._handleRecipeInfoUpdateByID();
        }
        if (this.parent.state.recipeName) {
            return await this._handleRecipeInfoUpdateByName();
        }
        if (this.parent.state.categoryName) {
            return await this._handleRecipesUpdate();
        }
        return await this._handleCategoriesUpdate();
    }

    resetActiveData() {
        // чтобы не сбрасывать уже загруженный рецепт
        if (!this.isRecipeLoaded) this.activeRecipeInfo = null;
        else this.isRecipeLoaded = false; // или сбос статуса, если всё же рецепт уже был загружен

        this.activeRecipes = null;
        // чтобы не сбрасывать уже загруженный рецепт
        this.activeCategories = null;
    }

    async _handleRecipeInfoUpdateByID() {
        try {
            if (!this.activeRecipeInfo)
                this.activeRecipeInfo = await this.parent.apiWorker.getRecipeInfoByID(this.parent.state.recipeID);
            this.parent.view?.updateView();
        } catch (e) {
            this.activeRecipeInfo = null
            console.error(e)
        }
    }

    async _handleRecipeInfoUpdateByName() {
        try {
            this.activeRecipeInfo = await this.parent.apiWorker.getRecipeInfoByName(this.parent.state.recipeName);
            this.parent.view?.updateView();
        } catch (e) {
            this.activeRecipeInfo = null
            console.error(e)
        }
    }

    async _handleRecipesUpdate() {
        try {
            this.activeRecipes = await this.parent.apiWorker.getRecipes(this.parent.state.categoryName);
            this.parent.view?.updateView();
        } catch (e) {
            this.activeRecipes = null
            console.error(e)
        }
    }

    async _handleCategoriesUpdate() {
        try {
            this.activeCategories = await this.parent.apiWorker.getCategories();
            this.parent.view?.updateView();
        } catch (e) {
            this.activeCategories = null
            console.error(e)
        }
    }
}