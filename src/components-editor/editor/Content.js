export default class Content
{
    element = null

    onSelect = null

    _DATA_ = []
    
    constructor(arg)
    {
        this.element = arg.element
        
        this.element.addEventListener('click', () => this.handleOnSelect())
    }

    handleOnSelect()
    {
        console.log('...')
    }

    create({component, content})
    {
        this._DATA_.push({component, content})
    }

    delete({component, content})
    {
        let componentPrevious = null
        let componentDelete = null

        this._DATA_ = this._DATA_.filter((_component) => { 

            if(_component.content == content)
            {
                componentDelete = _component
                return false
            }
            else if(!componentDelete)
                componentPrevious = _component
            
            return true
        })

        if(componentPrevious) 
            componentPrevious.content.select()

    }
}