import './sass/main.sass'
import './sass/custom.sass'

import ButtonPageC1 from './ButtonPageC1'
import C1 from './C1'

export default class Page
{
    buttonPageC1 = null
    pageC1 = null
    pageC2 = null

    constructor() 
    {
        this.buttonPageC1 = new ButtonPageC1({
            onSelect: () => this.handleButtonC1OnSelect(),
        })

        this.pageC1 = new C1({
            onClose: () => this.handlePageC1OnClose(),
        })

        this.pageC2 = document.querySelector('#page-c2')
    }

    handleButtonC1OnSelect()
    {
        this.pageC1.select()
    }

    handlePageC1OnClose()
    {
        this.pageC1.select()
        this.buttonPageC1.setSelected(false)
    }

    setScrollDisabled(isDisabled)
    {
        if(isDisabled) this.pageC2.className = 'scroll-disabled'
        else this.pageC2.className = ''
    }
}