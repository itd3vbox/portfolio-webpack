import './sass/main.sass'
import './sass/custom.sass'

export default class Page
{
    constructor(arg)
    {
        
    }

    setScrollDisabled(isDisabled)
    {
        if(isDisabled) 
        {
            document.documentElement.style.overflow = 'hidden'
            document.body.className = 'scroll-disabled'
        }
        else 
        {
            document.documentElement.style.overflow = 'auto'
            document.body.className = ''
        }
    }
}