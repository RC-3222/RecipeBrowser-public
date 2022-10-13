import CardGenerator from "./WorkPageView/CardGenerator.js";

 export default class WorkPageView {
    constructor(parent) {
        this.parent = parent;

        this.wpMainArea = document.createElement('div');

        this.cardGenerator = new CardGenerator(this)

        this._initHeader()

        this.recipeInfoArea = document.createElement('div')
        this.recipeInfoArea.className = 'recipe'

        this.cardGridArea = document.createElement('div')
        this.cardGridArea.className = 'card-grid'
    }

    _initHeader() {
        // левая часть navbar'а
        this.search = document.createElement('form')
        this.search.className = 'search'
        this.search.innerHTML = `
        <input class="search__input" type="text" name="search" placeholder="search" autocomplete="off">
        <button type="submit" class="search__submit">
              <svg class="search__icon">
                   <use href="./svg/rb-icons.svg#icon-search"></use>
              </svg>
        </button>
        `

        // правая часть navbar'а
        this.homeBtn = document.createElement('button')
        this.homeBtn.className = 'button button-home'
        this.homeBtn.innerHTML = `
                <svg class="button__icon">
                    <use href="./svg/rb-icons.svg#icon-home"></use>
                </svg>
        `

        this.bookmarksElem = document.createElement('div')
        this.bookmarksElem.className = 'bookmarks'

        const bookmarksListCont = document.createElement('div')
        bookmarksListCont.className = 'bookmarks__container'

        this.bookmarksElem.appendChild(bookmarksListCont)

        this.bookmarksElem.innerHTML = `
                <div class="bookmarks__container">
                    <h2 class="bookmarks__title">Bookmarks</h2>
                    <ul class="bookmarks__list">
                    
                    </ul>
                </div>

                <button class="button bookmarks__button">
                    <svg class="button__icon">
                        <use href="./svg/rb-icons.svg#icon-bookmarkslist"></use>
                    </svg>
                </button>
        `
    }

     _showGeneral() {
         this.parent.navHeaderLeftPart.appendChild(this.search)
         this.parent.navHeaderRightPart.appendChild(this.homeBtn)
         this.parent.navHeaderRightPart.appendChild(this.bookmarksElem)
         this.parent.rootElem.classList.add('sticky-nav')
     }

     reset() {
         this.recipeInfoArea.innerHTML = ''
         this.cardGridArea.innerHTML = ''
         this.wpMainArea.innerHTML = ''
     }

    handleUpdate() {
        this._showGeneral();
        if (this.parent.model.state.recipeName
            || this.parent.model.state.recipeID) {
            if (this.parent.model.wpModel.activeRecipeInfo) this._showRecipeInfo();
            else this._showNoRecipeInfo();
            return
        }
        if (this.parent.model.state.categoryName) {
            if (this.parent.model.wpModel.activeRecipes) this._showRecipes();
            else this._showNoRecipes();
            return
        }
        if (this.parent.model.wpModel.activeCategories) this._showCategories();
        else this._showNoCategories()
    }

     _genBookmarkButton(recipe) {
         return `
            <h2 class="recipe__bookmarking__title">Bookmarking</h2>
            ${this.parent.model.bookmarker.isRecipeBookmarked(recipe) ? `
            <p class="recipe__bookmarking__text">This recipe is already bookmarked</p>
            <button class="recipe__bookmarking__button btn--remove-bm">Remove Bookmark</button>
            ` : `
            <p class="recipe__bookmarking__text">This recipe is not bookmarked yet</p>
            <button class="recipe__bookmarking__button btn--add-bm">Add Bookmark</button>
            `}
        `
     }

     updateBookmarks() {
         if (this.parent.model.bookmarker.bookmarks.length === 0) {
             this.bookmarksElem.querySelector('.bookmarks__list').innerHTML = `<p class="bookmarks__list__warning">You have no bookmarks yet</p>`
             return
         }

         this.bookmarksElem.querySelector('.bookmarks__list').innerHTML = this.parent.model.bookmarker.bookmarks.map((bookmark) => {
             return `<li class="bookmarks__list__item" data-id="${bookmark.id}">${bookmark.title}</li>`
         }).join('')

         if (this.recipeInfoArea.innerHTML) this.recipeInfoArea.querySelector('.recipe__bookmarking').innerHTML = this._genBookmarkButton()
    }

    _showRecipeInfo() {
        const recipeInfoContainer = document.createElement('div')
        recipeInfoContainer.classList.add('wp-recipe-info')

        const recipe = this.parent.model.wpModel.activeRecipeInfo
        this.recipeInfoArea.innerHTML = `
            <div class="recipe__header">
                <img class="recipe__header__bg-img" src="${recipe.thumb}" alt="recipe-header-bg-img"/>
                <h2 class="recipe__header__title">${recipe.title}</h2>
            </div>
            <div class="recipe__description">
                <h2 class="recipe__description__title">Instructions</h2>
                <p class="recipe__description__text">${recipe.description}</p>
            </div>
            <div class="recipe__ingredients">
              <h2 class="recipe__ingredients__title">Ingredients</h2>
              
              <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map((ingr) => {
            return `<li class="recipe__ingredient">
                      <svg class="recipe__ingredient__icon">
                        <use href="./svg/rb-icons.svg#icon-check"></use>
                      </svg>
                      <p class="recipe__ingredient__text">
                      <span class="recipe__ingredient__text__title">${ingr.name}</span> - <span class="recipe__ingredient__text__measure">${ingr.measure}</span>
                      </p>
                    </li>
                    `
        }).join('')}
              </ul>
              
            </div>
            <div class="recipe__bookmarking">
                ${this._genBookmarkButton()}
            </div>
            ${(recipe.src || recipe.video) ? `
                <div class="recipe__links">
                    <h2 class="recipe__links__title">Related links</h2>
                    <div class="recipe__links__container">
                        ${recipe.video ? `<a target="_blank" href="${recipe.video}">Related Video</a>` : ''}
                        ${recipe.src ? `<a target="_blank" href="${recipe.src}">Recipe Source</a>` : ''}
                    </div>
                </div>
            ` : ''}
        `

        this.parent.mainArea.appendChild(this.recipeInfoArea);
    }

    _showRecipes() {
        this.cardGenerator.setDataArray(this.parent.model.wpModel.activeRecipes)
        this.cardGenerator.initRecipesLoading()

        this.parent.mainArea.appendChild(this.cardGridArea);
    }

    _showCategories() {
        this.cardGenerator.setDataArray(this.parent.model.wpModel.activeCategories)
        this.cardGenerator.initCategoriesLoading()

        this.parent.mainArea.appendChild(this.cardGridArea);
    }


    _showNoRecipeInfo() {
        this._showErrorMessage(
            'No Recipe Info',
            'Couldn\'t find any recipe info with your query. Please try something else.'
        )
    }

    _showNoRecipes() {
        this._showErrorMessage(
            'No Recipes',
            'Couldn\'t find any recipes in selected category. Please try another one.'
        )
    }

    _showNoCategories() {
        this._showErrorMessage(
            'No Categories',
            'Something went totally wrong... Please try again later.'
        )
    }

     _showErrorMessage (title, message) {
        const errorMarkup = `
        <div class="error">
            <h2 class="error__title">${title}</h2>
            <p class="error__text">${message}</p>
        </div>
        `;

        this.parent.mainArea.insertAdjacentHTML('beforeend',errorMarkup);

        navigator.vibrate([100,100,100])
         //this.parent.mainArea.insertAdjacentHTML(errorMarkup);
    }
}