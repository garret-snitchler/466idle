export class ViewOperations{
    /**
     * Creates an Element
     * 
     * @param {string} tag the tag identifier
     * @param {string} className Optional: the class of the tag
     * @returns {HTMLElement} The element created
     */
    static createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)
        
        return element
    }


    /**
     * Gets an element using the given selector. Essentially a wrapper method for document.querySelector(selector)
     * 
     * @param {string} selector the selector to get the element
     * @returns 
     */
    static getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    /**
     * Applies a stylesheet to the DOM.
     * 
     * @param {string} stylesheet name of the stylesheet. Must be located in the 'styles' directory. 
     */
    static addStyle(stylesheet) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = `styles/${stylesheet}`
        document.head.append(link)
    }
}