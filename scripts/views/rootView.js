import { ClickerView } from "./clickerView.js"
import { StoreView } from "./storeView.js"
import { ViewOperations } from "./viewOperations.js"

export class RootView {
    constructor() {
        this.constructSubViews()

        ViewOperations.addStyle('main.css')
    }

    constructSubViews() {
        this.clicker = new ClickerView()
        this.store = new StoreView()
    }
}