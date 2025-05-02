import { ViewOperations } from "./viewOperations.js"

export class GeneratorView {
  constructor() {
    this.sectionRoot = ViewOperations.getElement('#autoGeneratorContainer')
    
    // Create Title Element
    this.title = ViewOperations.createElement('h1')
    this.title.textContent = 'Owned Generators'

    // Add all created elemets to the DOM
    this.sectionRoot.append(this.title);

    ViewOperations.addStyle('generator.css')
  }

  /**ADD ELEMENTS FOR NEW TYPE OF GENERATOR BOUGHT */
  addGenerator(item, itemCount) {
    let existing = this.sectionRoot.querySelector(`#gen-${item}`)

    if (existing) {
      // Update existing container
      const count = existing.querySelector('p')
      count.textContent = `Owned: ${itemCount}`
    } else {
      // Create new container
      let container = ViewOperations.createElement('div')
      container.id = `gen-${item}`
      container.classList.add('generator-box')

      let heading = ViewOperations.createElement('h2')
      heading.textContent = item
      
      let paragraph = ViewOperations.createElement('p')
      paragraph.textContent = `Owned: ${itemCount}`

      let button = ViewOperations.createElement('button')
      button.textContent = 'Sell'
      button.id = `${item}-sell`
      button.classList.add('sell-button')
      

      container.append(heading, paragraph, button)
      this.sectionRoot.append(container)
    }
  }

  /**BIND EVENT LISTENER METHODS */
  bindSell(handler) {
    this.sectionRoot.addEventListener('click', (event) => {
      const button = event.target.closest('.sell-button')
      if (button) {
        const itemName = button.id.replace('-sell', '')
        handler(itemName)
      }
    })
  }
}