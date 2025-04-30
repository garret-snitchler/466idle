export class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.clickerView = view.clicker
        
        this.onCurrencyChanged(0)

        this.clickerView.bindClickCurrency(this.handleClickCurrency)
        this.model.bindCurrencyChanged(this.onCurrencyChanged)
    }

    onCurrencyChanged = (currency) => {
        this.clickerView.displayCurrency(currency)
    }

    handleClickCurrency = () => {
        this.model.clickedCurrency()
    }
}