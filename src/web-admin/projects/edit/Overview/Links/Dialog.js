import DialogCenter from 'components-layout/dialog-center/DialogCenter'
import Links from 'components-form/links/Links'
import ButtonText from 'components/button-text/ButtonText'

export default class Dialog
{
    element = null
    dialog = null
    form = null
    links = null
    buttonText = null

    urlUpdate = null
    onUpdate = null
    _DATA_ = null

    constructor(arg)
    {
        this.element = arg.element

        this.dialog = new DialogCenter({
            element: this.element,
            onSelect: () => this.handleOnSelect(),
            onClose: () => this.handleOnClose(),
        })

        this.form = this.element.querySelector('form')
        this.form.addEventListener('submit', (event) => {
            event.preventDefault()
        })

        this.links = new Links({
            element: this.element.querySelector('.f-links .links'),
        })
    
        this.buttonText = new ButtonText({
            element: this.element.querySelector('.f-submit .button-text'),
            onSelect: () => this.update(),
        })

        this.urlUpdate = arg.urlUpdate
        this.onUpdate = arg.onUpdate
    }

    handleOnSelect()
    {
        _APP.page().setScrollDisabled(true)
    }

    handleOnClose()
    {
        _APP.page().setScrollDisabled(false)
    }

    update()
    {
        const formData = new FormData(this.form)
        formData.append('_method', 'PATCH')

        formData.append('links', this.links.getData())
        
        fetch(this.urlUpdate, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Accept': 'application/json',
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                this.updateErrors(response.errors)
                if(!response.errors)
                {
                    this._DATA_ = response.data.project.links
                    this.onUpdate(response.data.project)
                    this.updateMessage(response.message)
                }   
            })
    }

    updateErrors(errors)
    {
        let formErrors = this.element.querySelectorAll('.form-error')
        for(let i = 0; i < formErrors.length; i++)
            formErrors[i].parentElement.removeChild(formErrors[i])

        if(errors)
            for(let error_p in errors) 
                this.createError(errors, error_p)
    }

    createError(errors, error_p)
    {
        errors[error_p]
            .forEach(error => {
                let selector = `.form-row.f-${ error_p }`
                let error_e = document.createElement('div')
                error_e.className = 'form-error'
                error_e.textContent = error
                
                this.element.querySelector(selector).appendChild(error_e)
            }) 
    }

    updateMessage(message)
    {
        let element = this.form.querySelector('.form-message')
        
        if(!element)
        {
            element = document.createElement('div')
            element.className = 'form-message'
            this.form.appendChild(element)
        }

        element.textContent = message
    
        clearTimeout(this.messageTimeOutId)

        this.messageTimeOutId = setTimeout(() => {
            this.form.removeChild(element)
        }, 10000)
    }

    reset(data)
    {
        this._DATA_ = data
        this.links.reset(this._DATA_)
    }
}