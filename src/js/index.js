import Model from "./Model.js";
import View from "./View.js";
import Controller from "./Controller.js";
import '../scss/style.scss'

const rootElem = document.getElementById('app')

const model = new Model()
const view = new View(rootElem)
const controller = new Controller()

// сначала инициализация model
model.init(view)
// затем инициализация view
// (с очиской корневого элемента и генерацией основных)
view.init(model)
// затем инициализация controller
controller.init(model, view)
