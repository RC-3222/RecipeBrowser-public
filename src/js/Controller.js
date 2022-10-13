import MainPageController from "./Controller/PageControllers/MainPageController.js";
import WorkPageController from "./Controller/PageControllers/WorkPageController.js";
import Router from "./Controller/Router.js";

export default class Controller {
    constructor() {
        this.router = new Router(this);
        this.mpController = new MainPageController(this);
        this.wpController = new WorkPageController(this);

        this.enabled = true;

        this.pressedN = false;
        this.pressedC = false;
    }

    init(model,view) {
        this.model = model;
        this.view = view;

        this.takeControl()
        //this.router.switchToStateFromURLHash().catch(e=>console.error(e))
    }


    _handleKeydown(event) {
        switch (event.keyCode) {
            case 78: {
                this.pressedN = true;
                break
            }
            case 67: {
                this.pressedC = true;
                break
            }
            case 77: {
                if (this.pressedN && this.model.state.pageName !== 'Main') {
                    this.router.switchToMainPage()
                }
                else if (this.pressedC) {
                    this.view.rootElem.querySelectorAll('.open')?.forEach((menu)=>menu.classList.remove('open'))
                }
                break
            }
            case 87: {
                if (this.pressedN && this.model.state.pageName !== 'Work')
                    this.router.switchToWorkPage()
                break
            }
            case 83: {
                if (this.pressedN && this.model.state.pageName === 'Main')
                    this.router.switchToSecretErrorPage()
                break
            }
            default: {
                //console.log(event.keyCode)
            }
        }
    }

    _handleKeyup(event) {
        switch (event.keyCode) {
            case 78: {
                this.pressedN = false;
                break
            }
            case 67: {
                this.pressedC = false;
                break
            }
            default: {
                //console.log(event.keyCode)
            }
        }
    }

    takeControl() {
        this.mpController.takeControl();
        this.wpController.takeControl();

        window.addEventListener('keyup', this._handleKeyup.bind(this))
        window.addEventListener('keydown', this._handleKeydown.bind(this))

    }
}