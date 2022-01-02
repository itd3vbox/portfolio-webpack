import Template from './Template'

export default class Link
{
    parentElement = null
    element = null
    btnDelete = null

    onDelete = null
    _DATA_ = null

    constructor(arg)
    {
        this.parentElement = arg.parentElement

        this.onDelete = arg.onDelete
        this._DATA_ = arg.data

        this.create()
    }

    create()
    {
        this.element = document.createElement('div')
        this.element.className = `link`
        this.element.innerHTML = Template(this._DATA_)

        this.parentElement.appendChild(this.element)

        this.reset()
    }

    reset()
    {
        this.btnDelete = this.element.querySelector('.btn-delete')
        this.btnDelete.addEventListener('click', () => this.onDelete(this))
    }

    getData()
    {
        return this._DATA_
    }
}