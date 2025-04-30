import { ViewOperations } from "./viewOperations.js"

export class StoreView{
    constructor() {
        this.sectionRoot = ViewOperations.getElement('#storeContainer')

        this.title = ViewOperations.createElement('h2')
        this.title.textContent = 'Store'

        this.sectionRoot.append(this.title)

        ViewOperations.addStyle('store.css')

        // These will eventually be populated by events passed from the controller
        this.buildPurchaseItem({ name: 'Clicker', price: 1, disabled: false })
        this.buildPurchaseItem({ name: 'Generator', price: 10, disabled: true })
    }

    // item: { name: string, price: number, disabled: bool }
    buildPurchaseItem(item) {
        let element = ViewOperations.createElement('button', 'storeElement')
        element.disabled = item.disabled
        element.id = item.name

        let itemDesc = ViewOperations.createElement('p', 'storeElementText')
        itemDesc.textContent = item.name

        let itemPrice = ViewOperations.createElement('p', 'storeElementText')
        itemPrice.textContent = item.price

        element.append(itemDesc, itemPrice)
        this.sectionRoot.append(element)
    }
}