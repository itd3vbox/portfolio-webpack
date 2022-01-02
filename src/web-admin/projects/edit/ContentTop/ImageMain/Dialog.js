import DialogCenter from 'components-layout/dialog-center/DialogCenter'
import Files from 'components-form/files/Files'

export default class Dialog
{
    element = null
    dialog = null
    form = null
    files = null
    buttonText = null

    urlStore = null
    onStore = null
    messageTimeOutId = null

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

        this.files = new Files({
            element: this.element.querySelector('.form-row .files'),
            onUpload: (file) => this.store(file),
        })
        this.files.setMax(1)
        this.files.reset(arg.data)
        
        this.urlStore = arg.urlStore
        this.onStore = arg.onStore

        this._DATA_ = arg.data
    }

    handleOnSelect()
    {
        _APP.page().setScrollDisabled(true)
    }

    handleOnClose()
    {
        _APP.page().setScrollDisabled(false)
    }

    store(file)
    {
        const formData = new FormData(this.element.querySelector('form'))
        formData.append('_method', 'POST')

        formData.append('file', file)
        
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
                    const file = response.data.file
                    this.files.updatePreviewAfteOnUpload(file, {
                            // extra data
                            file: file, 
                            // require
                            src: file.src_public,
                    })
                    this.updateMessage(response.message)
                    this.onStore(file)
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