import Template from './Template'

export default class Language
{
    parentElement = null
    element = null

    onSelect = null
    _DATA_ = null

    constructor(arg)
    {
        this.parentElement = arg.parentElement

        this.onSelect = arg.onSelect
        this._DATA_ = arg.data

        this.create()
    }

    create()
    {
        this.element = document.createElement('article')
        this.element.className = `language ${ this._DATA_.color }`
        this.element.innerHTML = Template(this._DATA_)

        this.parentElement.appendChild(this.element)

        this.reset()
    }
    
    reset()
    {
        this.element.addEventListener('click', (event) => this.handleOnSelect())
    }

    select()
    {
        if(this.element.classList.contains('selected')) 
            this.element.classList.remove('selected')
        else this.element.classList.add('selected')
    }

    setSelected(isSelected)
    {
        if(isSelected) this.element.classList.add('selected')
        else this.element.classList.remove('selected')
    }

    handleOnSelect()
    {
        this.select()
        this.onSelect(
            this.element.classList.contains('selected') 
            ? this
            : null
        )
    }
}