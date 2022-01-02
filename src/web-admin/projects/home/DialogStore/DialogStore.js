import Content3 from './Content3/Content3'

export default class DialogStore
{
    element = null
    btnClose = null
    content3 = null

    isSelected = false
    idTimeout = null

    onStore = null

    constructor(arg)
    {
        this.element = arg.element

        this.btnClose = this.element.querySelector('.content-1 .btn-close')
        this.btnClose.addEventListener('click', () => this.handleClose())
        
        this.content3 = new Content3({
            element: this.element.querySelector('.content-3'),
            urlStore: arg.urlStore,
            onStore: () => this.handleOnStore(),
        })
        
        this.setup()

        this.onStore = arg.onStore
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
            this.clear()
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

    handleClose()
    {
        this.setSelected(false)
    }

    handleOnStore()
    {
        this.onStore()
    }

    reset(option)
    {
        this.setSelected(true)
    }
    
    clear()
    {
        this.content3.clear()
    }
}