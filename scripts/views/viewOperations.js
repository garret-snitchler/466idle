export class ViewOperations{
    static createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)
        
        return element
    }

    static getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    static addStyle(stylesheet) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = `styles/${stylesheet}`
        document.head.append(link)
    }
}