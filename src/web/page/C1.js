import ButtonIcon from 'components/button-icon/ButtonIcon'

export default class C1
{
    element = null
    btnClose = null

    isSelected = false
    onClose = null
    idTimeout = null

    constructor(arg)
    {
        this.element = document.querySelector('#page-c1')

        this.btnClose = new ButtonIcon({
            element: this.element.querySelector('.btn-close'),
            onSelect: () => this.handleClose(),
        })

        this.onClose = arg.onClose

        this.setup()
    }

    setup()
    {
        this.element.addEventListener('transitionend', () => {
            this.afterTransitionEnd()
        })
    }

    afterTransitionEnd()
    {
        if(!this.element.classList.contains('ready'))
        {
            this.element.classList.remove('selected')
            _APP.page().setScrollDisabled(false)    
        }
    }


    setSelected(isSelected)
    {
        this.isSelected = isSelected

        if(this.isSelected)
        {
            _APP.page().setScrollDisabled(this.isSelected)
            this.element.classList.add('selected')

            clearTimeout(this.idTimeout)
            this.idTimeout = setTimeout(() => {
                this.element.classList.add('ready')
                this.element.style.overflow = 'auto'
            }, 100)
        }
        else
        {
            this.element.style.overflow = 'hidden'
            this.element.classList.remove('ready')
        }
    }

    select()
    {
        this.isSelected = !this.isSelected

        if(this.isSelected)
        {
            _APP.page().setScrollDisabled(this.isSelected)
            this.element.classList.add('selected')

            clearTimeout(this.idTimeout)
            this.idTimeout = setTimeout(() => {
                this.element.classList.add('ready')
                this.element.style.overflow = 'auto'
            }, 100)
        }
        else
        {
            this.element.style.overflow = 'hidden'
            this.element.classList.remove('ready')
        }
    }

    handleClose()
    {
        this.onClose()
    }
}