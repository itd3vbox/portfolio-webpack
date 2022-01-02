import Template from './Template'

export default class Link
{
    parentElement = null
    element = null

    onShow = null
    _DATA_ = null

    constructor(arg)
    {
        this.parentElement = arg.parentElement

        this.onShow = arg.onShow
        this._DATA_ = arg.data

        this.create()
    }

    create()
    {
        this.element = document.createElement('a')
        this.element.className = `link`
        this.element.target = '_blank'
        this.element.href = this._DATA_.url
        this.element.innerHTML = Template(this._DATA_)

        this.parentElement.appendChild(this.element)
    }
}