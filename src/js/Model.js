import MainPageModel from "./Model/PageModels/MainPageModel.js";
import WorkPageModel from "./Model/PageModels/WorkPageModel.js";
import APIWorker from "./Model/APIWorker.js";
import BookmarkWorker from "./Model/BookmarkWorker.js";

export default class Model {
    constructor() {
        this.mpModel = new MainPageModel(this);
        this.wpModel = new WorkPageModel(this);

        // для API будет использован тестовый ключ по умолчанию ('1')
        this.apiWorker = new APIWorker();
        this.bookmarker = new BookmarkWorker(this);

        this.state = null;
    }

    init(view) {
        this.view = view;
    }

    async setActiveState(newState) {
        //this.view?.clearContainer(this.view.mainArea)
        try {
            this.state = newState;
            await this._updateData()
        } catch (e) {
            throw e
        }
    }

    resetModel() {
        this.mpModel.resetActiveData()
        this.wpModel.resetActiveData()
    }
    async _updateData() {
        this.resetModel()

        try {
            switch (this.state.pageName) {
                case 'Main':
                    await this.mpModel.handleUpdate();
                    break;
                case 'Work':
                    await this.wpModel.handleUpdate();
                    break;
                default:
                    // во view в данном случае также сработает default case, что сгенерирует несуществующую
                    this.view?.updateView();
            }
        } catch (e) {
            throw e
        }
    }
}