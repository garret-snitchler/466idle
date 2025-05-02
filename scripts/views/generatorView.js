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

      container.append(heading, paragraph)
      this.sectionRoot.append(container)
    }
  }
}