import ButtonIcon from 'components/button-icon/ButtonIcon'

export default class DialogCenter
{
    element = null
    buttonClose = null

    onClose = null
    onSelect = null
    timeoutID = null

    constructor(arg) 
    {
        this.element = arg.element ? arg.element : document.querySelector(arg.selector)
        this.element.addEventListener('click', () => {
            this.setSelected(false)
        })
        
        this.element.querySelector('.dc-container')
            .addEventListener('click', (event) => {
            event.preventDefault()
            event.stopPropagation()
        })

        this.buttonClose = new ButtonIcon({
            element: this.element.querySelector('.btn-close'),
            onSelect: () => this.setSelected(false)
        })
        
        this.onClose = arg.onClose
        this.onSelect = arg.onSelect
        this.setup()
    }

    setup()
    {
        this.element.addEventListener('transitionend', () => {
            if(this.timeoutID == null)
            {
                this.element.classList.remove('selected')
                if(this.onClose) this.onClose()
                this.afterTransitionEnd()
            }
        })
    }

    afterTransitionEnd()
    {
        if(!this.isSelected) 
            if(this.onClose) this.onClose()
    }
    
    setSelected(isSelected)
    {
        this.isSelected = isSelected

        if(this.isSelected)
        {
            if(this.onSelect) this.onSelect(isSelected)
            this.element.classList.add('selected')
            this.timeoutID = setTimeout(() => {
                this.element.classList.add('ready')
            }, 200)
        }
        else
        {   
            if(this.onSelect) this.onSelect(isSelected)
            clearTimeout(this.timeoutID)
            this.timeoutID = null
            this.element.classList.remove('ready')
        }
    }

    reset(data)
    {
        this.element.querySelector('.decoration')
            .style.backgroundImage =  `url(${ data.backgroundImage })`
    }
}