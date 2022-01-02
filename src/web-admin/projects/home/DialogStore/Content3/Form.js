import ButtonToggleSimple from 'components/button-toggle-simple/ButtonToggleSimple'
import Files from 'components-form/files/Files'
import Links from 'components-form/links/Links'
import ButtonText from 'components/button-text/ButtonText'

export default class Form
{
    element = null
    status = null
    name = null
    files = null
    links = null
    btnAdd = null

    urlStore = null
    onStore = null

    constructor(arg)
    {
        this.element = arg.element

        this.status = new ButtonToggleSimple({
            element: this.element.querySelector('.f-status .button-toggle-simple'),
            onSelect: (isSelected) => this.handleStatus(isSelected)
        })
        this.handleStatus(false)

        this.name = this.element.querySelector('.f-name')

        this.files = new Files({
            element: this.element.querySelector('.f-file .files'),
        })
        this.files.setMax(1)
        this.files.reset(arg.data)

        this.links = new Links({
            element: this.element.querySelector('.f-links .links'),
        })

        this.btnAdd = new ButtonText({
            element: this.element.querySelector('.f-submit .button-text'),
            onSelect: () => this.store(),
        })

        this.urlStore = arg.urlStore
        this.onStore = arg.onStore
    }

    handleStatus(isSelected)
    {
        const statusValue = this.element.querySelector('.f-status .value')

        if(isSelected)
        {
            statusValue.classList.add('is-visible')
            statusValue.querySelector('.data').textContent = 'Visible'
        }
        else
        {
            statusValue.classList.remove('is-visible')
            statusValue.querySelector('.data').textContent = 'Not Visible'
        }
    }

    store()
    {
        const formData = new FormData(this.element)
        formData.append('_method', 'POST')

        formData.append('status', this.status.getData())
        formData.append('file', this.files.getData())
        formData.append('links', this.links.getData())
        
        fetch(this.urlStore, {
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
                    this.onStore(response.data.project)
                    this.clear()
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

    clear()
    {
        this.status.reset()
        this.name.querySelector('input').value = ''
        this.files.reset()
        this.links.reset()

        this.updateErrors()
    }
}