import {Controller} from "./scripts/controller.js"
import {Model} from "./scripts/model.js"
import {RootView} from "./scripts/views/rootView.js"

const app =  new Controller(new Model(), new RootView())