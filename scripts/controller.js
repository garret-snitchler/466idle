export class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.clickerView = view.clicker
        
        this.onCurrencyChanged(0)
        this.onCPSChanged(0)

        this.clickerView.bindClickCurrency(this.handleClickCurrency)
        this.model.bindCurrencyChanged(this.onCurrencyChanged)
        this.model.bindCPSChanged(this.onCPSChanged)
    }

    onCurrencyChanged = (currency) => {
        this.clickerView.displayCurrency(currency)
    }

    onCPSChanged = (currencyPerSecond) => {
        this.clickerView.displayCPS(currencyPerSecond)
    }

    handleClickCurrency = () => {
        this.model.clickedCurrency()
    }
}