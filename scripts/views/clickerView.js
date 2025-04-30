import { ViewOperations } from "./viewOperations.js"

export class ClickerView {
    constructor() {
        this.sectionRoot = ViewOperations.getElement('#clickerContainer')

        // Create Title Element
        this.title = ViewOperations.createElement('h1')
        this.title.textContent = '466 Idle Game'

        this.currencyText = ViewOperations.createElement('p', 'currencyText')

        this.currencyPerSecondText = ViewOperations.createElement('p', 'currencyPerSecondText')

        this.currencyButton = ViewOperations.createElement('button')
        this.currencyButton.textContent = 'Get Currency'

        // Add all created elements to the DOM
        this.sectionRoot.append(this.title, this.currencyText, this.currencyPerSecondText, this.currencyButton)

        ViewOperations.addStyle('clicker.css')
    }

    /**DISPLAY STATE VALUE METHODS */
    displayCurrency(currency) {
        this.currencyText.textContent = `$${currency}`
    }

    displayCPS(currencyPerSecond) {
        this.currencyPerSecondText.textContent = `$${currencyPerSecond} per second`
    }

    /**BIND EVENT LISTENER METHODS */
    bindClickCurrency(handler) {
        this.currencyButton.addEventListener('click', event => {
            event.preventDefault()
            handler()
        })
    }
}