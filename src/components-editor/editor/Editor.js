import Content from './Content'
import Tools from'./Tools'

export default class Editor
{
    element = null
    tools = null
    content = null

    _DATA_ = []
    componentDefault = null
    componentSelected = null

    constructor(arg)
    {
        this.element = arg.element ? arg.element : document.querySelector(arg.selector)
        
        this.tools = new Tools({
            element: this.element.querySelector('.edx-tools')
        })

        this.content = new Content({
            element: this.element.querySelector('.edx-content')
        })
    }
    
    addComponent(component)
    {   
        this._DATA_.push(component)

        component.connect({ 
            parentElementTools: this.tools.element, 
            parentElementContent: this.content.element,
            onSelect: ({component, isSelected}) => this.handleOnSelect({component, isSelected}),
            onCreate: ({component, content}) => this.handleOnCreate({component, content}),
            onDelete: ({component, content}) => this.handleOnDelete({component, content}),
        })
    }

    setDefault(component)
    {
        this.componentDefault = component
    }

    getData()
    {
        let data = []
        return data
    }

    // --- HANDLE EVENTS

    handleOnSelect({component, isSelected})
    {
        
    }

    handleOnCreate({component, content})
    {
        this.content.create({component, content})
    }

    handleOnDelete({component, content})
    {
        this.content.delete({component, content})
    }

    // ---
}