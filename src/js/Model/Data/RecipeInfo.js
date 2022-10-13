export default class RecipeInfo {
    constructor(mealData) {
        this.title = mealData.title;
        this.thumb = mealData.thumb;
        this.description = mealData.description;
        this.id = mealData.id;
        this.ingredients = mealData.ingredients;  // массив, формируемый
        this.video = mealData.video // ссылка на видео (чаще всего на youtube)
        this.src = mealData.src
    }
}