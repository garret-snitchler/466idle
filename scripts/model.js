import {StoreItem} from "./storeItem.js"

export class Model {
    constructor() {
        // Instantiate State
        this.state = {
            currency: 0,
            currencyPerClick: 1,
            currencyPerSecond: 0,
            storeMap: new Map([
                ["clicker", new StoreItem("clicker", 10, 1, 1, 1)],
                ["generator", new StoreItem("generator", 1000, 1, 1, 1)],
                ["engine", new StoreItem("engine", 100000, 10, 10, 10)],
                ["dynamo", new StoreItem("dynamo", 10000000, 100, 100, 100)],
                ["alternator", new StoreItem("alternator", 1000000000, 1000, 1000, 1000)],
                ["turbine", new StoreItem("turbine", 100000000000, 10000, 10000, 10000)],
                ["reactor", new StoreItem("reactor", 10000000000000, 100000, 100000, 100000)],
                ["battery", new StoreItem("battery", 1000000000000000, 1000000, 1000000, 1000000)],

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

    incrementCurrencyPerClick(value) {
        this.state.currencyPerClick += value
        this.onCPCChanged(this.state.currencyPerClick)
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

        if (name === "clicker") {
            this.incrementCurrencyPerClick(this.state.storeMap.get(name).cps)
        }
        else {
            this.incrementCurrencyPerSec(this.state.storeMap.get(name).cps)
        }
              
        this.itemPriceCalculation(name)

        if (this.onOwnedMapChanged) {
            this.onOwnedMapChanged(name, this.state.ownedMap.get(name))
        }
    }
    
    itemSold(name) {
        this.state.ownedMap.set(name, this.state.ownedMap.get(name) - 1)
        this.state.currency += this.state.storeMap.get(name).oldPrice
        if (name === "clicker") {
            this.incrementCurrencyPerClick(-this.state.storeMap.get(name).cps)
        }
        else {
            this.incrementCurrencyPerSec(-this.state.storeMap.get(name).cps)
        }
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
        item.price = Math.floor(item.oldPrice * 1.75)
        this.state.storeMap.set(name, item)
        this.onStoreChanged(this.state.storeMap)
    }

    itemSellCalculation(name) {
        const item = this.state.storeMap.get(name)
        item.price = item.oldPrice
        item.oldPrice = Math.ceil(item.oldPrice / 1.75) >= item.basePrice ? Math.ceil(item.oldPrice / 1.75) : item.basePrice
        this.state.storeMap.set(name, item)
        this.onStoreChanged(this.state.storeMap)
    }

    bindCurrencyChanged(callback) {
        this.onCurrencyChanged = callback
    }

    bindCPCChanged(callback) {
        this.onCPCChanged = callback
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