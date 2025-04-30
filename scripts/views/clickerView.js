import { ViewOperations } from "./viewOperations.js"

export class ClickerView {
    constructor() {
        // Get the right container
        this.sectionRoot = ViewOperations.getElement('#clickerContainer')

        this.title = ViewOperations.createElement('h1')
        this.title.textContent = '466 Idle Game'

        this.currencyText = ViewOperations.createElement('p', 'currencyText')

        this.currencyButton = ViewOperations.createElement('button')
        this.currencyButton.textContent = 'Get Currency'

        this.sectionRoot.append(this.title, this.currencyText, this.currencyButton)

        ViewOperations.addStyle('clicker.css')
    }

    displayCurrency(currency) {
        this.currencyText.textContent = currency
    }

    bindClickCurrency(handler) {
        this.currencyButton.addEventListener('click', event => {
            event.preventDefault()
            handler()
        })
    }
}