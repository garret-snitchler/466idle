export class Model {
    constructor() {
        this.state = {
            currency: 0,
            currencyPerClick: 1,
            currencyPerSecond: 0
            /**
             * State should include:
             * - Currency
             * - Currency Per Second
             * - Currency Per Click
             * - Shop Items
             * - etc.
             * 
             * We could separate these into more than one state as well.
             */
        }
    }

    clickedCurrency() {
        this.state.currency += this.state.currencyPerClick
        this.onCurrencyChanged(this.state.currency)
    }

    incrementCurrencyPerSec(value) {
        this.state.currencyPerSecond += value
        this.onCPSChanged(this.state.currencyPerSecond)
    }

    bindCurrencyChanged(callback) {
        this.onCurrencyChanged = callback
    }

    bindCPSChanged(callback) {
        this.onCPSChanged = callback
    }
}