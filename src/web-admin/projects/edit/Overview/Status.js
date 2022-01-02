import ButtonToggleSimple from 'components/button-toggle-simple/ButtonToggleSimple'

export default class Status
{
    element = null
    form = null
    button = null
    value = null

    urlUpdate = null
    onUpdate = null
    messageTimeOutId = null
    _DATA_ = null

    constructor(arg)
    {
        this.element = arg.element

        this.form = this.element.querySelector('form')
        this.form.addEventListener('submit', (event) => {
            event.preventDefault()
        })

        this.button = new ButtonToggleSimple({
            element: this.element.querySelector('.form-row.f-status .button-toggle-simple'),
            value: false,
            onSelect: () => this.update(),
        })

        this.value = this.element.querySelector('.b-content .value')

        this.urlUpdate = arg.urlUpdate
        this.onUpdate = arg.onUpdate
        this._DATA_ = arg.data

        this.button.setSelected(this._DATA_.value)
        this.handleStatus(this._DATA_.value)
    }

    handleStatus(isSelected)
    {
        if(parseInt(isSelected))
            this.value.classList.add('is-available')
        else
            this.value.classList.remove('is-available')
        
        this.value.querySelector('.data').textContent = this._DATA_.value_text
    }

    update()
    {
        const formData = new FormData(this.form)
        formData.append('_method', 'PATCH')

        formData.append('status', this.button.getData())
        
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
                    this._DATA_ = response.data.project.status
                    this.handleStatus(this._DATA_.value)
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
}