export default class ContentGrid
{
    element = null
    grid = null
    options = null
    btnChoose = null

    _DATA_ = {
        imageDefault: null,
    }
    onChoose = null
    onMaxReached = null
    onDelete = null

    constructor(arg)
    {
        this.element = arg.element
        this.grid = this.element.querySelector('.grid')
        this.options = this.element.querySelector('.options')

        this.btnChoose = this.element.querySelector('.btn-choose')
        this.btnChoose.addEventListener('click', (event) => {
            this.onChoose()
        })

        this._DATA_.imageDefault = arg.data.imageDefault
        this.onChoose = arg.onChoose
        this.onMaxReached = arg.onMaxReached
        this.onDelete = arg.onDelete
    }

    setVisible(isVisible)
    {
        if(isVisible) this.element.classList.add('visible')
        else this.element.classList.remove('visible')
    }

    setOptionsHidden(isHidden)
    {
        if(isHidden) this.options.classList.add('hidden')
        else this.options.classList.remove('hidden')
    }

    createPreview(data, fileInput = null, fileUploaded = null)
    {
        if(data.items.length >= data.max) return
        
        const preview = document.createElement('div')
        preview.className = 'image'
        preview.innerHTML = `
            <img>
            <div class="button-icon">
                <i class="fas fa-times"></i>
            </div>
        `

        preview.querySelector('.button-icon')
            .addEventListener('click', (event) => {
                this.deleteFile(data, preview)
            }) 

        this.grid.appendChild(preview)

        this.addFile(preview, data, fileInput, fileUploaded)
        
        this.setVisible(true)
    }

    getPreviewType(data)
    {
        const name = data.name
        let extension = name.split('.').pop()
        if(!extension)
            extension = data.type.split('/').pop()

        //console.log(data.type, name, extension)

        if(data.type.match(/(image)/g)) return 1
        else return 2
    }

    addFile(preview, data, fileInput, fileUploaded)
    {
        if(fileUploaded)
        {
            let extension = fileUploaded.src.split('.').pop()
            if(fileUploaded.src /*fileUploaded.type.match(/(image)/g)*/)
                preview.querySelector('img').src = fileUploaded.src
            else
                preview.querySelector('img').src = this._DATA_.imageDefault
        }
        else
        {
            let type = this.getPreviewType(fileInput)
            if(type == 1)
            {
                const reader = new FileReader()

                reader.addEventListener('load', () => {
                    // convert image file to base64 string
                    preview.querySelector('img').src = reader.result

                }, false)
                reader.readAsDataURL(fileInput)
            }
            else
                preview.querySelector('img').src = this._DATA_.imageDefault
        }

        data.items.push({
            element: preview,
            fileInput: fileInput,
            fileUploaded: fileUploaded,
        })

        if(data.items.length >= data.max) this.setOptionsHidden(true)
    }

    deleteFile(data, preview)
    {
        let data_current = null
        
        data.items = data.items.filter((item) => { 
            if(item.element == preview)
                data_current = item
            return item.element != preview
        })

        this.grid.removeChild(data_current.element)
        this.setOptionsHidden(false)

        if(data.items.length == 0)
            this.setVisible(false)

        this.onDelete(data_current.fileUploaded)
    }

    clear()
    {
        while(this.grid.firstChild)
            this.grid.removeChild(this.grid.firstChild)
    }

    reset(data, files)
    {
        for(let i = 0; i < files.length; i++)
            this.createPreview(data, null, files[i])
    }
}