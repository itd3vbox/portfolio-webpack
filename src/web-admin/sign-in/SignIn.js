import './sass/main.sass'
import './sass/custom.sass'

import ButtonMenu from './ButtonMenu'
import C1 from './C1'

export default class SignIn
{
    btnMenu = null
    c1 = null

    constructor(arg)
    {
        this.btnMenu = new ButtonMenu({
            onSelect: (isSelected) => this.handleC1(isSelected),
        })
        
        this.c1 = new C1({
            onClose: () => this.handleC1OnClose(),
        })
    }

    setScrollDisabled(isDisabled)
    {
        if(isDisabled) document.body.className = 'scroll-disabled'
        else document.body.className = ''
    }

    handleC1(isSelected)
    {
        this.c1.setSelected(isSelected) 
    }

    handleC1OnClose()
    {
        this.btnMenu.setSelected(false) 
    }
}