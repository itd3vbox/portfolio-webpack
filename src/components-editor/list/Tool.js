export default class Tool
{
    parentElement = null
    element = null

    enabled = true
    selected = false
    onSelect = true

    constructor(arg)
    {
        this.onSelect = arg.onSelect
    }

    createElement()
    {
        this.element = document.createElement('div')
        this.element.className = 'tool'
        this.element.innerHTML = `
            <i class="fas fa-list-ul"></i>
        `
        
        this.parentElement.appendChild(this.element)

        this.element.addEventListener('click', () => this.handleOnSelect())
    }
    
    connect(parentElement)
    {
        this.parentElement = parentElement
        
        this.createElement()
    }

    select()
    {
        if(this.element.classList.contains('selected'))
        {
            this.element.classList.remove('selected')
            this.onSelect(false)
        }
        else
        {
            this.element.classList.add('selected')
            this.onSelect(true)
        }
    }

    // --- HANDLE EVENTS

    handleOnSelect()
    {
        this.select()
    }

    // ---

    setSelected(isSelected)
    {
        if(isSelected)
            this.element.classList.add('selected')
        else
            this.element.classList.remove('selected')
    }
}