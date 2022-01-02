export default class ButtonToggleSimple
{
    element = null

    data = null
    onSelect = null

    constructor(arg)
    {
        this.element = arg.element ? arg.element : document.querySelector(arg.selector)
        this.element.addEventListener('click', (event) => {
            event.stopPropagation()
            
            if(this.element.classList.contains('disabled')) return

            let isSelected = this.select()
            this.element.querySelector('.ball').style.animation = '0.25s button-toggle-simple-width linear' 
            if(arg.onSelect) arg.onSelect(isSelected)
        })
        this.element.addEventListener('animationend', () => {
            this.element.querySelector('.ball').style.animation = ''
        })

        if(arg.data) this.setSelected(arg.data)
        else this.setSelected(false)

        this.onSelect = arg.onSelect
    }

    select()
    {
        let isSelected = this.element.classList.contains('on')
        this.setSelected(!isSelected)
        return !isSelected
    }

    setSelected(isSelected)
    {
        if(isSelected)
        {
            this.element.classList.add('on')
            this.element.classList.remove('off')
            this.data = 1
        }
        else
        {
            this.element.classList.add('off')
            this.element.classList.remove('on')
            this.data = 0
        }
    }

    getData()
    {
        return this.data
    }

    reset(data)
    {
        const isSelected = data ? true : false
        if(isSelected) this.setSelected(isSelected)
        else this.setSelected(false)
        
        this.onSelect(isSelected)
    }

}