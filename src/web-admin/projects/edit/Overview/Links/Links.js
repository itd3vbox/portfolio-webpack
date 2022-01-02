import ButtonIcon from 'components/button-icon/ButtonIcon'
import Link from './Link/Link'
import Dialog from './Dialog'

export default class Links
{
    element = null
    btnEdit = null
    value = null
    dialog = null

    urlUpdate = null
    onUpdate = null
    _DATA_ = null

    constructor(arg)
    {
        this.element = arg.element

        this.btnEdit = new ButtonIcon({
            element: this.element.querySelector('.b-title  .button-icon'),
            onSelect: () => this.handleEdit(),
        })

        this.value = this.element.querySelector('.b-content .value')

        this.dialog = new Dialog({
            element: this.element.querySelector('.dialog-center'),
            data: arg.data,
            urlUpdate: arg.urlUpdate,
            onUpdate: (data) => this.handleOnUpdate(data),
        })

        this.onUpdate = arg.onUpdate

        this.reset(arg.data)
    }

    handleEdit()
    {
        this.dialog.reset(this._DATA_)
        this.dialog.dialog.setSelected(true)
    }

    handleOnUpdate(data)
    {
        this.reset(data.links)
        this.onUpdate(data)
    }

    reset(data)
    {
        while(this.value.firstChild)
            this.value.removeChild(this.value.firstChild)

        this._DATA_ = data ? JSON.parse(data) : []
        console.log(this._DATA_)
        for (let index = 0; index < this._DATA_.length; index++) 
        {
            const dataLink = this._DATA_[index]
            const link = new Link({
                parentElement: this.value,
                data: dataLink,
            })
        }
    }
}