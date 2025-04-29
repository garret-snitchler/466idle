export class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        
        this.onCurrencyChanged(0)

        this.view.bindClickCurrency(this.handleClickCurrency)
        this.model.bindCurrencyChanged(this.onCurrencyChanged)
    }

    onCurrencyChanged = (currency) => {
        this.view.displayCurrency(currency)
    }

    handleClickCurrency = () => {
        this.model.clickedCurrency()
    }
}