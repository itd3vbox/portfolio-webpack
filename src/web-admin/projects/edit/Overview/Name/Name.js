import ButtonIcon from 'components/button-icon/ButtonIcon'
import Dialog from './Dialog'

export default class Name
{
    element = null
    btnEdit = null
    value = null
    dialog = null

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
            urlUpdate: arg.urlUpdate,
            onUpdate: (data) => this.handleOnUpdate(data),
            data: arg.data,
        })

        this.onUpdate = arg.onUpdate  
        this.reset(arg.data)      
    }

    handleEdit()
    {
        this.dialog.dialog.setSelected(true)
    }

    handleOnUpdate(data)
    {
        this.reset(data.name)
        this.onUpdate(data)
    }

    reset(data)
    {
        this._DATA_ = data
        this.value.textContent = this._DATA_
    }
}