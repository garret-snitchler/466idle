export class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.clickerView = view.clicker
        
        // Send Initial State Values to View
        this.onCurrencyChanged(0)
        this.onCPSChanged(0)

        // Bind Player Input Event Listeners
        this.clickerView.bindClickCurrency(this.handleClickCurrency)

        // Bind "On Value Changed" Event Listeners
        this.model.bindCurrencyChanged(this.onCurrencyChanged)
        this.model.bindCPSChanged(this.onCPSChanged)
    }
    
    /**PLAYER INPUT EVENT LISTENERS */
    handleClickCurrency = () => {
        this.model.clickedCurrency()
    }

    /**ON STATE VALUE CHANGED EVENT LISTENERS */
    onCurrencyChanged = (currency) => {
        this.clickerView.displayCurrency(currency)
    }

    onCPSChanged = (currencyPerSecond) => {
        this.clickerView.displayCPS(currencyPerSecond)
    }
}