export default class MainPageController {
    constructor(parent) {
        this.parent = parent;
    }


    async _randomStartHandler() {
        try {
            const recipeInfo = await this.parent.model.apiWorker.getRecipeInfoRandom();
            this.parent.model.wpModel.initRecipeInfo(recipeInfo);
            this.parent.router.switchToWorkRecipePageByID(recipeInfo.id);
        } catch (e) {
            console.error(e);
            navigator.vibrate([100,100])
            this.parent.enabled = true;
        }
    }

    _standardStartHandler() {
        this.parent.router.switchToWorkPage()
    }

    _heroSectionHandler(event) {
        if (!event.target.classList.contains('hero-section__text-block__button')) return;

        this._standardStartHandler()
    }

    _startSectionHandler(event) {
        if (!event.target.classList.contains('start-section__button')) return;

        this.parent.view.mpView.startBtnAudio.play().catch((err=>console.error(err)))
    }

    _navListHandler(event) {
        if (!event.target.classList.contains('site-nav__link')) return;

        event.preventDefault();
        const href = event.target.getAttribute('href')

        if (href === '#') window.scrollTo({top: 0, behavior: "smooth"})
        else {
            this.parent.view.rootElem.querySelector(href).scrollIntoView({
                block: "start",
                inline: "nearest",
                behavior: "smooth"
            })
        }

        // закрытие меню, если было открыто
        this.parent.view.mpView.menuContainer.classList.remove('open')
    }

    _navToggleHandler(event) {
        this.parent.view.mpView.menuContainer.classList.toggle('open')
    }

    takeControl() {
        this.parent.view.mpView.linkList.addEventListener('click',this._navListHandler.bind(this));
        this.parent.view.mpView.heroSection.addEventListener('click',this._heroSectionHandler.bind(this));

        this.parent.view.mpView.startSection.addEventListener('click',this._startSectionHandler.bind(this));
        this.parent.view.mpView.startBtnReg.addEventListener('click',this._standardStartHandler.bind(this))
        this.parent.view.mpView.startBtnRand.addEventListener('click',this._randomStartHandler.bind(this))

        this.parent.view.mpView.toggleBtn.addEventListener('click',this._navToggleHandler.bind(this));

        [
            this.parent.view.mpView.startBtnRand,
            this.parent.view.mpView.startBtnReg,
        ].forEach((button) => {
            button.addEventListener('mouseenter', function (event) {
                this.parent.view.mpView.animSystem.setActiveElement(event.target)
            }.bind(this))
            button.addEventListener('mouseleave', function () {
                this.parent.view.mpView.animSystem.resetActiveElement()
            }.bind(this))
        })

    }
}