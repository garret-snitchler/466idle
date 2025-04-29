export class View {
    constructor() {
        // Get the DOM root
        this.app = this.getElement('#root')

        this.title = this.createElement('h1')
        this.title.textContent = '466 Idle Game'

        this.currencyText = this.createElement('p')

        this.currencyButton = this.createElement('button')
        this.currencyButton.textContent = 'Get Currency'

        this.app.append(this.title, this.currencyText, this.currencyButton)
    }

    get _currency() {
        return parseInt(this.currencyText.textContent)
    }
    
    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)
        
        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)

        return element
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