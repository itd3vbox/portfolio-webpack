export default class Content
{
    element = null
    parentElement = null

    isSelected = false
    onSelect = null
    onDelete = null

    constructor(arg)
    {
        this.parentElement = arg.parentElement
        this.onSelect = arg.onSelect
        this.onDelete = arg.onDelete

        this.create()
        this.setSelected(true)
    }

    create()
    {
        this.element = document.createElement('p')
        this.element.className = 'edx-text'
        //this.element.contentEditable = true
        this.element.innerHTML = `Text ...`

        this.parentElement.appendChild(this.element)

        this.element.addEventListener('click', (event) => this.handleOnClick(event))
        this.element.addEventListener('keydown', (event) => this.handleInput(event))
    }

    delete()
    {
        console.log('delete ... text')
        this.parentElement.removeChild(this.element)
        this.onDelete(this)
    }

    select(isFromClick = false)
    {
     
        if(!isFromClick)
        {
            const range = document.createRange()
            range.selectNodeContents(this.element)
            range.collapse(false)
            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
        }
  
        this.onSelect(this, true)
    }

    delete()
    {
        //this.parentElement.removeChild(this.element)
        this.isEmpty = true
        this.onDelete()
    }

    // --- HANDLE EVENTS

    handleOnClick(event)
    {
        event.stopPropagation()
        this.select(true)
    }

    handleInput(event)
    {
        //event.preventDefault()
        
        if(event.keyCode == 8) // backspace
            this.handleOnBackspace()
        if(event.keyCode == 13) // enter
            console.log('enter ...')
        else if(event.keyCode == 16 && event.keyCode == 9) // shift + tab
            console.log('shift + tab ...')
    }

    handleOnBackspace()
    {
        console.log('backspace ...')

        let selection = document.getSelection()
        let range = selection.getRangeAt(0)

        /*
        console.log(
            range.startContainer.parentElement.nodeName,
            range.startContainer.parentElement == this.element, 
            range.startContainer.textContent.length,
        )

        if(
            range.startContainer.parentElement == this.element 
            && range.startContainer.textContent.length == 0
        )
            this.delete()
        */
    }

    // ---

    setSelected(isSelected)
    {
        this.isSelected = isSelected
    }

    getData()
    {
        return this.element.innerHTML
    }
}