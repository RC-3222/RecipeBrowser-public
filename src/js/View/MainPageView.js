import AnimSystem from "./MainPageView/MainPageAnimSys/AnimSystem.js";

export default class MainPageView {
    constructor(parent) {
        this.parent = parent;

        this.startBtnAudio = new Audio(`./audio/fire.wav`);

        this._initNavMenu()

        this._initHeroSection()
        this._initFeaturesSection()
        this._initStartSection()
        this._initContactSection()

        this._initIntersectObserver()
        this._initAnimSystem()
        this._initCanvResizeObserver()
    }

    _initAnimSystem() {
        this.animSystem = new AnimSystem(this.canvElem.width, this.canvElem.height, this.ctx, 'fire');
    }

    _initCanvResizeObserver() {
        this.canvResizeObserver = new ResizeObserver(function (entries) {
            for (const entry of entries) {
                switch (entry.target) {
                    case this.canvContainer: {
                        const [{inlineSize: width, blockSize: height}] = entry.borderBoxSize;
                        this.canvElem.height = height;
                        this.canvElem.width = width;

                        this.animSystem.reset(this.canvElem.width, this.canvElem.height, this.ctx)
                        break;
                    }
                    default: {
                        console.log(entry.target)
                    }
                }
            }
        }.bind(this));
    }

    _initIntersectObserver() {
        this.intersectObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach((entry) => {
                    switch (entry.target) {
                        case this.heroSection: {
                            if (!entry.isIntersecting) this.parent.rootElem.classList.add("sticky-nav");
                            else this.parent.rootElem.classList.remove("sticky-nav");
                            break;
                        }
                        default: {
                            console.log(entry.target)
                        }
                    }
                })
            }.bind(this),
            {
                // In the viewport
                root: null,
                threshold: 0,
                rootMargin: "-15%",
            }
        );
    }

    reset() {
        this.intersectObserver.unobserve(this.heroSection)
        this.canvResizeObserver.unobserve(this.canvContainer)
        this.animSystem.stop()
        this.animSystem.resetActiveElement()
    }

    handleUpdate() {
        this.parent.navHeaderLeftPart.innerHTML = `<h1 class="logo">Recipe<span>Browser</span></h1>`
        this.parent.navHeaderRightPart.appendChild(this.menuContainer)

        this.parent.mainArea.appendChild(this.heroSection)
        this.parent.mainArea.appendChild(this.featuresSection)
        this.parent.mainArea.appendChild(this.startSection)
        this.parent.mainArea.appendChild(this.contactSection)

        this.intersectObserver.observe(this.heroSection);
        this.canvResizeObserver.observe(this.canvContainer)
        this.animSystem.start()
    }

    _initNavMenu() {
        this.menuContainer = document.createElement('div')
        this.menuContainer.classList.add('menu-container')

        const menu = document.createElement('nav')
        menu.classList.add('site-nav')

        this.linkList = document.createElement('ul')
        this.linkList.classList.add('site-nav__list')
        this.linkList.innerHTML = `
            <li class="site-nav__list__item"><a href="#" class="site-nav__link">Home</a></li>
            <li class="site-nav__list__item"><a href="#features" class="site-nav__link">Features</a></li>
            <li class="site-nav__list__item"><a href="#start" class="site-nav__link">Start</a></li>
            <li class="site-nav__list__item"><a href="#contact" class="site-nav__link">Contact</a></li>
        `
        menu.appendChild(this.linkList)

        this.toggleBtn = document.createElement('div')
        this.toggleBtn.classList.add('menu-toggle')
        this.toggleBtn.innerHTML = `<div class="hamburger"></div>`

        this.menuContainer.appendChild(menu)
        this.menuContainer.appendChild(this.toggleBtn)
    }
    _initHeroSection() {
        this.heroSection = document.createElement('section')
        this.heroSection.id = "hero"
        this.heroSection.classList.add('section','hero-section')
        this.heroSection.innerHTML = `
            <div class="hero-section__text-block">
                <div class="hero-section__text-block__container">
                    <h1 class="hero-section__text-block__title">Recipe Browser</h1>
                    <p class="hero-section__text-block__text">...a place to find your perfect recipe</p>
                    <button class="hero-section__text-block__button">TRY IT NOW</button>
                </div>
            </div>
            <div class="hero-section__background">
                <img src="./img/sect1bg.png" alt="hero-section-background-img" class="hero-section__background__img">
            </div>
        `
    }
    _initFeaturesSection() {
        this.featuresSection = document.createElement('section')
        this.featuresSection.id = "features"
        this.featuresSection.classList.add('section','features-section')
        this.featuresSection.innerHTML = `
            <h2 class="features-section__title">Features</h2>
            <div class="features-section__card-container">
                <div class="features-section__card">
                    <svg class="features-section__card__icon">
                        <use href="./svg/rb-icons.svg#icon-search"></use>
                    </svg>
                    <h3 class="features-section__card__title">Searching for Recipes</h3>
                    <p class="features-section__card__text">
                        Explore <strong>different categories of recipes</strong> or just search for
                        whatever you need using the <strong>search bar</strong>.
                    </p>
                </div>
                <div class="features-section__card">
                    <svg class="features-section__card__icon">
                        <use href="./svg/rb-icons.svg#icon-bookmarkslist"></use>
                    </svg>
                    <h3 class="features-section__card__title">Bookmarks</h3>
                    <p class="features-section__card__text">
                        Found something interesting, but can't cook it right now and want to come back later? No problem!
                        We have our own <strong>bookmarking system</strong> for such cases.
                    </p>
                </div>
                <div class="features-section__card">
                    <svg class="features-section__card__icon">
                        <use href="./svg/rb-icons.svg#icon-question"></use>
                    </svg>
                    <h3 class="features-section__card__title">
                        Getting Random Recipes
                    </h3>
                    <p class="features-section__card__text">
                        Choosing things may be hard sometimes.
                        If you don't want to search anything and just want a recipe to follow,
                        then the <strong>Almighty Random</strong> may be for you.
                    </p>
                </div>
            </div>
        `
    }
    _initStartSection() {
        this.startSection = document.createElement('section')
        this.startSection.id = "start"
        this.startSection.classList.add('section','start-section')

        const startSectionContainer = document.createElement('div')
        startSectionContainer.className = 'start-section-container'
        this.startSection.appendChild(startSectionContainer)

        this.canvContainer = document.createElement('div')
        this.canvContainer.className = 'start-section__canvas-cont'
        this.canvElem = document.createElement('canvas')
        this.canvElem.className = 'start-section__canvas'

        // установка начальных высоты и ширины (хотя изначально будет 0)
        const begCoords = this.canvContainer.getBoundingClientRect()
        this.canvElem.height = begCoords.height;
        this.canvElem.width = begCoords.width;
        this.ctx = this.canvElem.getContext('2d')

        this.canvContainer.appendChild(this.canvElem)
        startSectionContainer.appendChild(this.canvContainer)

        startSectionContainer.insertAdjacentHTML('beforeend',`
                <div class="start-section__info">
                    <h2 class="start-section__info__title">2 Ways to Get Started</h2>
                    <p class="start-section__info__text">
                        <strong>Regular</strong> - if you want to start with a list of available categories
                    </p>
                    <p class="start-section__info__text">
                        <strong>Random</strong> - if you want to get some totally random recipe
                    </p>
                </div>
        `)

        const buttonCont = document.createElement('div')
        buttonCont.className = 'start-section__button-container'
        this.startBtnReg = document.createElement('button')
        this.startBtnReg.classList.add('start-section__button','button-regular')
        this.startBtnReg.innerText = 'REGULAR'
        this.startBtnRand = document.createElement('button')
        this.startBtnRand.classList.add('start-section__button','button-random')
        this.startBtnRand.innerText = 'RANDOM'
        buttonCont.appendChild(this.startBtnReg)
        buttonCont.appendChild(this.startBtnRand)

        startSectionContainer.appendChild(buttonCont)
    }
    _initContactSection() {
        this.contactSection = document.createElement('section')
        this.contactSection.id = "contact"
        this.contactSection.classList.add('section','contacts-section')
        this.contactSection.innerHTML = `
            <div class="contacts-section__info">
                <h2 class="contacts-section__info__title">Contacts</h2>
                <p class="contacts-section__info__text">In case you want to contact (or learn more about) The Dev for some reason, here are the links:</p>
            </div>
            <div class="contacts-section__link-container">
                <a class="contacts-section__link" target="_blank" href="https://www.linkedin.com/in/alexander-baranov-19023322b/">LinkedIn</a>
                <a class="contacts-section__link" target="_blank" href="https://github.com/RC-3222">Github</a>
            </div>
        `
    }
}