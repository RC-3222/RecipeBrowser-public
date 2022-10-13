export default class CardGenerator {
    constructor(parent) {
        this.parent = parent
        this.lastCardObserver = new IntersectionObserver((entries) => {
            const entry = entries.slice(-1)[0]
            if (entry.intersectionRatio <= 0) {
                return;
            }
            this._loaderFunc()
            this.lastCardObserver.unobserve(entry.target)
        });

        this.cardsToLoad = 10;
        this._loaderFunc = null;

        this.lastCard = null
        this.notAllShown = true
    }
    initCategoriesLoading() {
        this.notAllShown = true
        this._loaderFunc = this._showCategories
        this._loaderFunc()
    }
    initRecipesLoading() {
        this.notAllShown = true
        this._loaderFunc = this._showRecipes
        this._loaderFunc()
    }
    setDataArray(dataArray) {
        this.dataArray = [...dataArray].sort((a,b)=> a.title.localeCompare(b.title))
    }

    _showCategories() {
        if (this.lastCard) {
            this.lastCard = null
        }
        let categories;
        if (this.dataArray.length > this.cardsToLoad) {
            categories = this.dataArray.splice(0,this.cardsToLoad)
        }
        else {
            categories = this.dataArray
            this.notAllShown = false
        }

        categories.forEach((category,ind,arr)=>{
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('card','category-card');

            const categoryThumbCont = document.createElement('div');
            categoryThumbCont.className = 'card__thumb';

            const loadingStuff = document.createElement('div');
            loadingStuff.innerHTML = `
            <svg>
                <use href="./svg/rb-icons.svg#icon-loader"></use>
            </svg>
            `;
            loadingStuff.className = "spinner";

            categoryThumbCont.appendChild(loadingStuff)

            createImg(category.thumb).then(thumbImg=>{
                categoryThumbCont.innerHTML = ""
                categoryThumbCont.appendChild(thumbImg);
            })

            const categoryTextCont = document.createElement('div');
            categoryTextCont.className = "card__info"
            categoryTextCont.innerHTML = `
            <h2 class="card__info__title">${category.title}</h2>
            <button class="card__info__button category-btn" value="${category.title}">Explore</button>
            `

            categoryCard.appendChild(categoryThumbCont);
            categoryCard.appendChild(categoryTextCont);

            this.parent.cardGridArea.appendChild(categoryCard);

            if(ind === arr.length - 1 && this.notAllShown) {
                this.lastCard = categoryCard
                this.lastCardObserver.observe(this.lastCard)
            }
        })
    }

    _showRecipes() {
        if (this.lastCard) {
            this.lastCard = null
        }

        let recipes;
        if (this.dataArray.length > this.cardsToLoad) {
            recipes = this.dataArray.splice(0,this.cardsToLoad)
            console.log(recipes)
        }
        else {
            recipes = this.dataArray
            this.notAllShown = false
        }

        recipes.forEach((recipe, ind, arr)=>{

            const recipeCard = document.createElement('div');
            recipeCard.classList.add('card','recipe-card');

            const recipeThumbCont = document.createElement('div');
            recipeThumbCont.className = 'card__thumb';

            const loadingStuff = document.createElement('div');
            loadingStuff.innerHTML = `
            <svg>
                <use href="./svg/rb-icons.svg#icon-loader"></use>
            </svg>
            `;
            loadingStuff.className = "spinner";

            recipeThumbCont.appendChild(loadingStuff)

            createImg(recipe.thumb).then(thumbImg=>{
                recipeThumbCont.innerHTML = ""
                recipeThumbCont.appendChild(thumbImg);
            })

            const recipeTextCont = document.createElement('div');
            recipeTextCont.className = "card__info"
            recipeTextCont.innerHTML = `
                <h2 class="card__info__title">${recipe.title}</h2>
                <button class="card__info__button recipe-btn" value="${recipe.id}">Read More</button>
            `

            recipeCard.appendChild(recipeThumbCont);
            recipeCard.appendChild(recipeTextCont);

            this.parent.cardGridArea.appendChild(recipeCard);

            if(ind === arr.length - 1 && this.notAllShown) {
                //console.log('observing new stuff...');
                //console.log(this.lastCard);
                this.lastCard = recipeCard
                this.lastCardObserver.observe(this.lastCard)
            }
        })
    }
}


function createImg (imgPath) {
        return new Promise((resolve, reject) => {
            const imgElement = document.createElement('img');
            imgElement.className = 'card__thumb__img';
            imgElement.src = imgPath;
            imgElement.alt = 'meal-thumb-image';

            imgElement.addEventListener('load', ()=>resolve(imgElement));
            imgElement.addEventListener('error', ()=>reject(new Error(`Error while loading an image`)));
        })
    }
