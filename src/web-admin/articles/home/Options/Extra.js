import ButtonIcon from 'components/button-icon/ButtonIcon'

export default class Extra
{
    element = null
    optionAdd = null

    onOptionAdd = null

    constructor(arg)
    {
        this.element = arg.element

        this.optionAdd = new ButtonIcon({
            element: this.element.querySelector('.option-add'),
            onSelect: () => this.handleOnOptionAdd(),
        })

        this.onOptionAdd = arg.onOptionAdd
    }

    handleOnOptionAdd()
    {
        this.onOptionAdd(this.optionAdd)
    }
}