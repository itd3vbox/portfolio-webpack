import Template from './Template'

export default class Training
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
        this.element = document.createElement('article')
        this.element.className = `project`
        this.element.innerHTML = Template(this._DATA_)

        this.parentElement.appendChild(this.element)
    }
}