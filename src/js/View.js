import MainPageView from "./View/MainPageView.js";
import WorkPageView from "./View/WorkPageView.js";
import AudioPlayer from "./AudioPlayer/AudioPlayer.js";

/*
TODO: записывать как свойства только интерактивные элементы (для последующего навешивания контроллеров)
*/

export default class View {
    constructor(rootElem) {
        this.mpView = new MainPageView(this);
        this.wpView = new WorkPageView(this);
        this.audioPlayer = new AudioPlayer();

        this.rootElem = rootElem;

        this.navHeader = document.createElement('header');
        this.navHeader.classList.add('nav-wrapper')

        this.navHeaderLeftPart = document.createElement('div');
        this.navHeaderLeftPart.classList.add('nav-wrapper__left-part')

        this.navHeaderRightPart = document.createElement('div');
        this.navHeaderRightPart.classList.add('nav-wrapper__right-part')
        this.navHeader.appendChild(this.navHeaderLeftPart)
        this.navHeader.appendChild(this.navHeaderRightPart)

        this.mainArea = document.createElement('main');

        //this.enabled = true;
    }

    init(model) {
        this.model = model;
        this.showGeneral()
        this.wpView.updateBookmarks()
    }
    reset() {
        this._resetPage()
        this.mpView.reset()
        this.wpView.reset()
        this.audioPlayer.reset()
    }
    updateView() {
        this.reset();
        switch (this.model.state.pageName) {
            case 'Main':
                this.mainArea.classList.add('main-page')
                this.mpView.handleUpdate()
                break;
            case 'Work':
                this.mainArea.classList.add('work-page')
                this.wpView.handleUpdate()
                break;
            default:
                this.mainArea.classList.add('general-error-page')
                this.showNoSuchPageWarning()
        }
    }

    _clearNavbar() {
        this.navHeaderLeftPart.innerHTML = ``
        this.navHeaderRightPart.innerHTML = ``
    }

    _clearMainArea() {
        this.mainArea.innerHTML = ``
        this.mainArea.className = 'main-area'
    }

    _resetPage() {
        this._clearNavbar()
        this._clearMainArea()
    }

    showGeneral() {
        this.rootElem.innerHTML = ``
        //this.clearContainer(this.rootElem)

        this.rootElem.appendChild(this.navHeader);
        this.rootElem.appendChild(this.mainArea);
    }

    showNoSuchPageWarning() {
        /*
        TODO: Разработать отдельное отображение ошибки
        *  */
        //this._resetPage()
        this.audioPlayer.reset(true);
        this.audioPlayer.show(this.mainArea)

        //this.mainArea.insertAdjacentHTML('afterbegin','<h1>FuuBar</h1>');
    }
}