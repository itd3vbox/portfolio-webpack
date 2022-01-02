import ButtonText from 'components/button-text/ButtonText'

export default class MasseageAdded
{
    element = null
    btnIcon = null
    btnText = null

    onAdd = null

    constructor(arg)
    {
        this.element = arg.element
        this.btnIcon = this.element.querySelector('.button-icon')
        this.btnText = new ButtonText({
            element: this.element.querySelector('.button-text'),
            onSelect: () => this.handleOnAdd(),
        })

        this.onAdd = arg.onAdd
    }

    handleOnAdd()
    {
        this.onAdd()
        this.clear()
    }

    reset(data)
    {
        this.btnIcon.href = data.web_admin_url_edit
    }

    clear()
    {
        this.btnIcon.href = '#'
    }
}