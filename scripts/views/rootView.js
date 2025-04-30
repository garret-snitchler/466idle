import { ClickerView } from "./clickerView.js"
import { StoreView } from "./storeView.js"
import { ViewOperations } from "./viewOperations.js"

export class RootView {
    constructor() {
        ViewOperations.addStyle('main.css')

        this.constructSubViews()
    }

    constructSubViews() {
        this.clicker = new ClickerView()
        this.store = new StoreView()
    }
}