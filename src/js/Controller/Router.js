export default class Router {
    constructor(parent) {
        this.parent = parent;
        this._initRouter();
    }
    _initRouter() {
        ['load','hashchange'].forEach((evType)=>{
            window.addEventListener(evType,this.switchToStateFromURLHash.bind(this))
        })
    }
    async switchToStateFromURLHash() {
        // отключение контроллера на время смены состояния
        //this.parent.enabled = false

        const SPAState = this._getSPAState();
        await this.parent.model.setActiveState(SPAState).catch((e)=>console.error(e));

        // включение после смены состояния
        //console.log('восстановление контроллера...');
        //this.parent.enabled = true
    }

    _getSPAState() {
        const URLHash = window.location.hash;
        const stateJSON = decodeURIComponent(URLHash.slice(1));

        return (stateJSON !== "") ? JSON.parse(stateJSON) : {pageName: 'Main'};
    }

    // обработчики для кнопок (для навигации)
    switchToMainPage() {
        this._switchToState({pageName: 'Main'});
    }
    switchToWorkPage() {
        this._switchToState({pageName: 'Work'});
    }
    switchToSecretErrorPage() {
        this._switchToState({pageName: 'hmfstrn4'});
    }
    switchToWorkRecipePageByID(recipeID) {
        this._switchToState({pageName: 'Work', recipeID: recipeID});
    }
    switchToWorkRecipePageByName(recipeName) {
        this._switchToState({pageName: 'Work', recipeName: recipeName});
    }
    switchToWorkCategoryPage(categoryName) {
        this._switchToState({pageName: 'Work', categoryName: categoryName});
    }
    _switchToState(newState) {
        location.hash = encodeURIComponent(JSON.stringify(newState));
    }
}