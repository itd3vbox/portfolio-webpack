import Dialog from './Dialog'

export default class ImageMain
{
    element = null
    image = null
    dialog = null

    onStore = null
    onDelete = null

    _DATA_ = null

    constructor(arg)
    {
        this.element = arg.element
        this.image = this.element.querySelector('img')
        
        console.log(arg.data)

        this.element.querySelector('.button-icon')
            .addEventListener('click', () => this.handleDialog())

        this.dialog = new Dialog({
            element: this.element.querySelector('.dialog-center'),
            data: arg.data,
            urlStore: arg.urlStore,
            onStore: (data) => this.handleUpdateOnStore(data),
        })

        this.onStore = arg.onStore
        this.onDelete = arg.onDelete

        this._DATA_ = arg.data
        
        this.reset()
    }

    handleDialog()
    {
        this.dialog.dialog.setSelected(true)
    }

    handleUpdateOnStore(data)
    {
        this._DATA_ = data
        this.reset()
    }

    reset()
    {
        this.image.src = this._DATA_ ? this._DATA_.src_public : '#'
    }
}