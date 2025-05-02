import {StoreItem} from "./storeItem.js"

export class Model {
    constructor() {
        // Instantiate State
        this.state = {
            currency: 0,
            currencyPerClick: 1,
            currencyPerSecond: 0,
            storeMap: new Map([
                ["clicker", new StoreItem("clicker", 1, 1, 1, 1)],
                ["generator", new StoreItem("generator", 10, 10, 10, 10)]
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
            this.itemPurchased(name)
        }
    }

    itemCanBeSold(name) {
        const itemCount = this.state.ownedMap.get(name)
        if (itemCount > 0) {
            this.itemSold(name)
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
              
        this.itemPriceCalculation(name)

        if (this.onOwnedMapChanged) {
            this.onOwnedMapChanged(name, this.state.ownedMap.get(name))
        }
    }
    
    itemSold(name) {
        this.state.ownedMap.set(name, this.state.ownedMap.get(name) - 1)
        this.state.currency += this.state.storeMap.get(name).oldPrice
        this.incrementCurrencyPerSec(-this.state.storeMap.get(name).cps)
        this.itemSellCalculation(name)

        if (this.onCurrencyChanged) {
            this.onCurrencyChanged(this.state.currency)
        }
        if (this.onCPSChanged) {
            this.onCPSChanged(this.state.currencyPerSecond)
        }
        if (this.onOwnedMapChanged) {
            this.onOwnedMapChanged(name, this.state.ownedMap.get(name))
        }
            
    }

    itemPriceCalculation(name) {
        const item = this.state.storeMap.get(name)
        item.oldPrice = item.price
        item.price = Math.floor(item.oldPrice * 2.15)
        this.state.storeMap.set(name, item)
        this.onStoreChanged(this.state.storeMap)
    }

    itemSellCalculation(name) {
        const item = this.state.storeMap.get(name)
        item.price = item.oldPrice
        item.oldPrice = Math.ceil(item.oldPrice / 2.15) >= item.basePrice ? Math.ceil(item.oldPrice / 2.15) : item.basePrice
        this.state.storeMap.set(name, item)
        this.onStoreChanged(this.state.storeMap)
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

    bindOwnedMapChanged(callback) {
        this.onOwnedMapChanged = callback
    }
}