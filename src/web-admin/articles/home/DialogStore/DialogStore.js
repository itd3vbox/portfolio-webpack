import Content2 from './Content2'
import Content3 from './Content3/Content3'
import Tabs from './Tabs'

export default class DialogStore
{
    element = null
    btnClose = null
    content2 = null
    content3 = null
    tabs = null

    isSelected = false
    idTimeout = null

    _DATA_ = null

    constructor(arg)
    {
        this.element = arg.element

        this.btnClose = this.element.querySelector('.content-1 .btn-close')
        this.btnClose.addEventListener('click', () => this.handleClose())
        
        this.content2 = new Content2({
            element: this.element.querySelector('.content-2'),
        })

        this.content3 = new Content3({
            element: this.element.querySelector('.content-3'),
            urlLanguagesSearch: arg.urlLanguagesSearch,
            onLanguageSelect: (language) => this.handleOnLanguageSelect(language), 
            urlStore: arg.urlStore,
            onStore: arg.onStore,
        })
    
        this.tabs = new Tabs({
            element: this.element.querySelector('.content-3')
        })
        //this.tabs.setItemDisabled(true, 1)
        this.tabs.setSelected(1) // TMP

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

    handleOnLanguageSelect(data)
    {
        console.log(data)
        this.content2.reset(data)
        if(data)
        {
            this.content3.form.reset(data)
            this.tabs.setItemDisabled(false, 1)
        }
        else
            this.tabs.setItemDisabled(true, 1)
    } 
    
    handleOnStore()
    {
        console.log('added ...')
    }

    reset(option)
    {
        this._DATA_ =  {
            option: option,
        }

        this.content3.languages.reset()
        
        this.setSelected(true)
    }

    clear()
    {

    }
}