export default class WorkPageController {
    constructor(parent) {
        this.parent = parent;
    }

    _bookmarkListHandler(event) {
        if (event.target.classList.contains('bookmarks__list__item')) {
            this.parent.view.wpView.bookmarksElem.classList.remove('open')
            const recipeID = event.target.dataset.id
            this.parent.router.switchToWorkRecipePageByID(recipeID)
            return
        }
        if (event.target.closest('.bookmarks__button')) {
            this.parent.view.wpView.bookmarksElem.classList.toggle('open')
            return
        }
    }

    _homeBtnHandler(event) {
        this.parent.router.switchToMainPage()
    }

    _cardGridHandler (event) {
        if (event.target.classList.contains('category-btn')) {
            const categoryName = event.target.value;
            this.parent.router.switchToWorkCategoryPage(categoryName)
            return;
        }

        if (event.target.classList.contains('recipe-btn')) {
            const recipeID = event.target.value;
            this.parent.router.switchToWorkRecipePageByID(recipeID)
            return;
        }
    }

    _searchHandler (event) {
        event.preventDefault()

        const input = event.target.querySelector('.search__input')

        const value = input.value

        // вибрация при пустом вводе
        if (!value) {
            navigator.vibrate(200)
            return;
        }

        input.value = ''

        this.parent.router.switchToWorkRecipePageByName(value)
    }

    _recipeInfoHandler (event) {
        if (event.target.classList.contains('btn--remove-bm')) {
            this.parent.model.bookmarker.deleteBookmark(this.parent.model.wpModel.activeRecipeInfo.id)
            return
        }
        if (event.target.classList.contains('btn--add-bm')) {
            this.parent.model.bookmarker.addBookmark(
                this.parent.model.wpModel.activeRecipeInfo.id,
                this.parent.model.wpModel.activeRecipeInfo.title
            )
            return
        }
    }

    // сообщение в случае, если пользователь начал вводить поисковой запрос, но внезапно решил уйти
    _beforeUnloadHandler(event) {
        const searchInputValue = this.parent.view.wpView.search.querySelector('.search__input').value
        if (searchInputValue) event.returnValue = 'Are you sure you want to leave?'
    }

    takeControl() {
        this.parent.view.wpView.bookmarksElem.addEventListener('click', this._bookmarkListHandler.bind(this))
        this.parent.view.wpView.homeBtn.addEventListener('click', this._homeBtnHandler.bind(this))
        this.parent.view.wpView.cardGridArea.addEventListener('click', this._cardGridHandler.bind(this))
        this.parent.view.wpView.recipeInfoArea.addEventListener('click', this._recipeInfoHandler.bind(this))
        this.parent.view.wpView.search.addEventListener('submit', this._searchHandler.bind(this))

        window.addEventListener('beforeunload',this._beforeUnloadHandler.bind(this))
    }
}

