import {StoreItem} from "./storeItem.js"

export class Model {
    constructor() {
        // Instantiate State
        this.state = {
            currency: 0,
            currencyPerClick: 1,
            currencyPerSecond: 0,
            storeMap: new Map([
                ["clicker", new StoreItem("clicker", 1, 1)],
                ["generator", new StoreItem("generator", 10, 10)]
            ]),
            ownedMap: new Map()
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

    chargeCurrency(price) {
        this.state.currency -= price
        this.onCurrencyChanged(this.state.currency)
    }

    clickedCurrency() {
        this.state.currency += this.state.currencyPerClick
        this.onCurrencyChanged(this.state.currency)
    }

    // is called by controller every second
    addCurrencyPerSecond() {
        this.state.currency += this.state.currencyPerSecond
        this.onCurrencyChanged(this.state.currency)
    }

    incrementCurrencyPerSec(value) {
        this.state.currencyPerSecond += value
        this.onCPSChanged(this.state.currencyPerSecond)
    }

    itemCanBePurchased(name) {
        let itemPrice = this.state.storeMap.get(name).price
        if (itemPrice <= this.state.currency) {
            return true
        } else {
            return false
        }
    }

    
    itemPurchased(name) {
        // item has been purchased before
        if (this.state.ownedMap.has(name)) {
            // take current owned value and increase it by one
            this.state.ownedMap.set(name, this.state.ownedMap.get(name) + 1)
        }
        else {
            // add new item name to map
            this.state.ownedMap.set(name, 1)
        }
        this.chargeCurrency(this.state.storeMap.get(name).price)
        this.incrementCurrencyPerSec(this.state.storeMap.get(name).cps)
        //TODO: NEEDS TO UPDATE VIEW OF OWNED ITEMS
    }

    bindCurrencyChanged(callback) {
        this.onCurrencyChanged = callback
    }

    bindCPSChanged(callback) {
        this.onCPSChanged = callback
    }

    bindStoreChanged(callback) {
        this.onStoreChanged = callback
    }
}