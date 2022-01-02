import Input from 'components-form/input/Input'
import ButtonText from 'components/button-text/ButtonText'
import Link from './Link/Link'

export default class Links
{
    element = null
    inputUrl = null
    inputIcon = null 
    list = null
    btnAdd = null

    _DATA_ = []

    constructor(arg)
    {
        this.element = arg.element ? arg.element : document.querySelector(arg.selector)
        
        this.inputUrl = Input.onEnter(
            this.element.querySelector('.r-url input'),
            (value) => this.handleBeforeAdd(),
        )
        
        this.inputIcon = Input.onEnter(
            this.element.querySelector('.r-icon input'),
            (value) => this.handleBeforeAdd(),
        )

        this.list = this.element.querySelector('.list')

        this.btnAdd = new ButtonText({
            element: this.element.querySelector('.r-add .button-text'),
            onSelect: () => this.handleBeforeAdd(),
        })
    }

    handleBeforeAdd()
    {        
        if(!this.element.querySelector('.r-url input').checkValidity())
            return
            // console.log('url false ...')
        
        if(!this.element.querySelector('.r-icon input').checkValidity())  
            return
            // console.log('url true ...')

        this.handleLinkAdd()
    }

    handleLinkAdd()
    {
        const urlData = this.element.querySelector('.r-url input').value
        const iconData = this.element.querySelector('.r-icon input').value

        // console.log(urlData, iconData)

        if(!(urlData && iconData)) return

        this._DATA_.push(new Link({
            parentElement: this.list,
            data: {
                url: urlData,
                icon: iconData,
            },
            onDelete: (link) => this.handleLinkDelete(link),
        }))

        this.element.querySelector('.r-url input').value = ''
        this.element.querySelector('.r-icon input').value = ''
    }

    handleLinkDelete(link)
    {
        this._DATA_ = this._DATA_.filter((_link) => { 
            return _link != link
        })

        this.list.removeChild(link.element)
    }

    reset(data)
    {
        let tmpData = data ? Array.isArray(data) ? data : JSON.parse(data) 
            : []

        this._DATA_ = []

        while(this.list.firstChild)
            this.list.removeChild(this.list.firstChild)

        for (let index = 0; index < tmpData.length; index++) 
        {
            const dataLink = tmpData[index]
            
            this._DATA_.push(new Link({
                parentElement: this.list,
                data: dataLink,
                onDelete: (link) => this.handleLinkDelete(link),
            }))
        }
    }

    getData()
    {
        let data = []
        for (let index = 0; index < this._DATA_.length; index++) 
            data.push(this._DATA_[index].getData())
        return data.length > 0 ? JSON.stringify(data) : ''
    }
}