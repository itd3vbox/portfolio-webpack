export default class Input
{
    element = null

    constructor(arg)
    {
        this.element = arg.element ? arg.element : document.querySelector(arg.selector)
    }

    static onEnter(element, onEnterKey = null)
    {
        let input = element
        input.addEventListener('keydown', event => {
            event.stopPropagation()
            if (event.keyCode === 13)
            {
                event.preventDefault()
                //input.blur()
                if(onEnterKey) onEnterKey(input.checkValidity() ? input.value : '')
                return false
            }
        })
    }

}