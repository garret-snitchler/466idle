import { ViewOperations } from "./viewOperations.js"

export class StoreView{
    constructor() {
        this.sectionRoot = ViewOperations.getElement('#storeContainer')

        this.title = ViewOperations.createElement('h2')
        this.title.textContent = 'Store'

        this.sectionRoot.append(this.title)

        ViewOperations.addStyle('store.css')
    }

    displayStore(storeMap) {
        for (const value of storeMap.values()) {
            if (document.getElementById(value.name) == null) {
                let element = ViewOperations.createElement('button', 'storeElement')
                element.id = value.name
    
                let itemDesc = ViewOperations.createElement('p', 'storeElementText')
                itemDesc.textContent = value.name
                
                let itemPrice = ViewOperations.createElement('p', 'storeElementText')
                itemPrice.textContent = value.price
    
                element.append(itemDesc, itemPrice)
                this.sectionRoot.append(element)
            }
        }
    }

    bindPurchase(handler) {
        var elements = document.getElementsByClassName("storeElement")
        for (var element of elements) {
            element.addEventListener('click', event => {
                event.preventDefault()
                handler(event.target.id)
            })
        }
    }
}