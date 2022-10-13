export default class MainPageModel {
    constructor(parent) {
        this.parent = parent;
    }

    resetActiveData() {
        // stuff
    }

    async handleUpdate() {
        this.parent.view?.updateView();
    }
}