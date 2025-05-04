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
            const existing = document.getElementById(value.name)
            if (existing == null) {
                let element = ViewOperations.createElement('button', 'storeElement')
                element.id = value.name
                element.disabled = true

                let staticContainer = ViewOperations.createElement('div', 'storeElementContainer')

                let itemDesc = ViewOperations.createElement('span', 'storeElementText')
                itemDesc.textContent = value.name

                let itemCPS = ViewOperations.createElement('span', 'storeElementText')
                itemCPS.className = 'itemCPS'
                if (value.name === 'clicker') {
                itemCPS.textContent = `CPC: ${value.cps}`
                }
                else {
                    itemCPS.textContent = `CPS: ${value.cps}`
                }

                staticContainer.append(itemDesc, itemCPS)

                let fluidContainer = ViewOperations.createElement('div', 'storeElementContainer')

                let itemPrice = ViewOperations.createElement('span', 'storeElementText')
                itemPrice.className = 'itemPrice'
                itemPrice.textContent = `$${value.price}`

                let itemSellPrice = ViewOperations.createElement('span', 'storeElementText')
                itemSellPrice.className = 'itemSell'
                itemSellPrice.textContent = `Sell: $${value.oldPrice}`

                fluidContainer.append(itemPrice, itemSellPrice)
    
                element.append(staticContainer, fluidContainer)
                this.sectionRoot.append(element)
            } else {
                const priceText = existing.querySelector('.itemPrice')
                const sellText = existing.querySelector('.itemSell')
                if (priceText && sellText) {
                    priceText.textContent = `$${value.price}`
                    sellText.textContent = `Sell: $${value.oldPrice}`
                }
            }
        }
    }

    itemsLocked(currency) {
        const storeElements = this.sectionRoot.querySelectorAll('.storeElement')
        for (const element of storeElements) {
            const itemPrice = element.querySelector('.itemPrice')
            const rawText = itemPrice?.textContent ?? '';
            const numericText = rawText.replace(/[^0-9.]/g, '');  // Removes $, commas, etc.
            const price = parseFloat(numericText);
            element.disabled = price > currency
        }
    }

    bindPurchase(handler) {
        this.sectionRoot.addEventListener('click', event=> {
            const button = event.target.closest('.storeElement');
            if (button) {
                event.preventDefault();
                handler(button.id);
            }
        })
    }
}
