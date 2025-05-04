export class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.clickerView = view.clicker
        this.storeView = view.store
        this.generatorView = view.generator
        
        // Send Initial State Values to View
        this.onCurrencyChanged(0)
        this.onCPCChanged(1)
        this.onCPSChanged(0)
        // we're instantiating with the data that already exists in the model
        this.onStoreChanged(this.model.state.storeMap)

        // Bind Player Input Event Listeners
        this.clickerView.bindClickCurrency(this.handleClickCurrency)
        this.storeView.bindPurchase(this.handleStorePurchase)
        this.generatorView.bindSell(this.handleSellItem)


        // Bind "On Value Changed" Event Listeners
        this.model.bindCurrencyChanged(this.onCurrencyChanged)
        this.model.bindCPCChanged(this.onCPCChanged)
        this.model.bindCPSChanged(this.onCPSChanged)
        this.model.bindStoreChanged(this.onStoreChanged)
        this.model.bindOwnedMapChanged(this.onOwnedMapChanged)

        // set timer that runs the model's currency per second addition every 1 second
        setInterval(() => this.model.addCurrencyPerSecond(), 1000)
    }
    
    /**PLAYER INPUT EVENT LISTENERS */
    handleClickCurrency = () => {
        this.model.clickedCurrency()
    }

    handleStorePurchase = (name) => {
        this.model.itemCanBePurchased(name)
    } 

    /**ON STATE VALUE CHANGED EVENT LISTENERS */
    onCurrencyChanged = (currency) => {
        this.clickerView.displayCurrency(currency)
        this.storeView.itemsLocked(currency)
    }

    onCPCChanged = (currencyPerClick) => {
        this.clickerView.displayCPC(currencyPerClick)
    }

    onCPSChanged = (currencyPerSecond) => {
        this.clickerView.displayCPS(currencyPerSecond)
    }

    onOwnedMapChanged = (name, count) => {
        this.view.generator.addGenerator(name, count)
    }

    handleSellItem = (name) => {
        this.model.itemCanBeSold(name)
    }

    // as of project the only time the storeMap changes is on initialization, but it's good to stick to the patterns
    onStoreChanged = (storeMap) => {
        this.storeView.displayStore(storeMap)
    }
}