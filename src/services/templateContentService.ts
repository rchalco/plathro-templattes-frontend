// Service for managing template content stored in localStorage
export interface ComponentElement {
  type: 'text' | 'image' | 'video'
  value: string
  id: string
}

export interface Component {
  name: string
  elements: Record<string, ComponentElement>
}

export interface Page {
  name: string
  components: Record<string, Component>
}

export interface TemplateContent {
  pages: Record<string, Page>
}

const STORAGE_KEY = 'template_content'

export class TemplateContentService {
  private static content: TemplateContent | null = null

  static loadContent(): TemplateContent {
    if (this.content) {
      return this.content
    }

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as TemplateContent
        this.content = parsed
        return this.content
      } catch (error) {
        console.error('Error parsing stored content:', error)
      }
    }

    // Return empty structure if nothing stored
    this.content = { pages: {} }
    return this.content
  }

  static saveContent(content: TemplateContent): void {
    this.content = content
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }

  static getPageContent(pageName: string): Page {
    const content = this.loadContent()
    if (!content.pages[pageName]) {
      content.pages[pageName] = { name: pageName, components: {} }
      this.saveContent(content)
    }
    return content.pages[pageName]
  }

  static getComponentContent(pageName: string, componentName: string): Component {
    const page = this.getPageContent(pageName)
    if (!page.components[componentName]) {
      page.components[componentName] = { name: componentName, elements: {} }
      this.saveContent(this.content!)
    }
    return page.components[componentName]
  }

  static getElementValue(
    pageName: string,
    componentName: string,
    elementId: string,
    defaultValue: string = '',
    type: 'text' | 'image' | 'video' = 'text',
  ): string {
    const component = this.getComponentContent(pageName, componentName)
    if (!component.elements[elementId]) {
      component.elements[elementId] = { type, value: defaultValue, id: elementId }
    }
    return component.elements[elementId].value || defaultValue
  }

  static setElementValue(
    pageName: string,
    componentName: string,
    elementId: string,
    value: string,
    type: 'text' | 'image' | 'video' = 'text',
  ): void {
    const component = this.getComponentContent(pageName, componentName)
    component.elements[elementId] = { type, value, id: elementId }
    this.saveContent(this.content!)
  }

  static clearAll(): void {
    this.content = { pages: {} }
    localStorage.removeItem(STORAGE_KEY)
  }
}
