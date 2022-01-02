export default class Content2
{
    element = null
    language = null

    constructor(arg)
    {
        this.element = arg.element
        this.language = this.element.querySelector('.language')
    }

    reset(data)
    {
        if(data)
            this.language.innerHTML = `<div>${ data.name }</div>`
        else
            this.language.textContent = ''
    }
}