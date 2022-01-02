import ContentEmpty from './ContentEmpty'
import ContentUploading from './ContentUploading'
import ContentGrid from './ContentGrid'

export default class Files
{
    element = null
    contentEmpty = null
    contentUploading = null
    contentGrid = null
    
    onUpload = null
    onDelete = null
    _DATA_ = {
        items: [],
        max: 2,
    }

    constructor(arg)
    {
        this.element = arg.element ? arg.element : document.querySelector(arg.selector)
        
        this.contentEmpty = new ContentEmpty({
            element: this.element.querySelector('.content-empty'),
            onReady: (files) => this.handleOnReady(files),
        })
        
        this.contentUploading = new ContentUploading({
            element: this.element.querySelector('.content-uploading'),
        })
        
        this.contentGrid = new ContentGrid({
            element: this.element.querySelector('.content-grid'),
            onChoose: () => this.handleOnChoose(),
            onDelete: (fileUploaded) => this.handleOnDelete(fileUploaded),
            data: {
                imageDefault: arg.data && arg.data.imageDefault ? arg.data && arg.data.imageDefault : null,
            }
        })

        this.onUpload = arg.onUpload
        this.onDelete = arg.onDelete
    }

    setMax(max)
    {
        this._DATA_.max = max
    }
    
    setUploading(isUploading)
    {
        if(isUploading) 
        {
            this.contentUploading.setVisible(true)
            this.contentGrid.setVisible(false)
        }
        else
        {
            this.contentUploading.setVisible(false)
            this.contentGrid.setVisible(true)
        }
    }

    updatePreviewAfteOnUpload(fileInput, fileUploaded)
    {
        this.contentGrid.createPreview(this._DATA_, fileInput, fileUploaded)
        this.setUploading(false)
    }

    handleOnReady(fileInput)
    {
        if(this.onUpload) 
        {
            this.setUploading(true)
            this.onUpload(fileInput)
        }
        else
            this.contentGrid.createPreview(this._DATA_, fileInput)
    }

    handleOnChoose()
    {
        this.contentEmpty.openFilesWindow()
    }

    handleOnDelete(fileUploaded)
    {
        if(this.onDelete) this.onDelete(fileUploaded)

        if(this._DATA_.items.length == 0)
            this.contentEmpty.setHidden(false)
    }

    getData()
    {
        if(this._DATA_.items.length == 0) return ''
        
        //console.log(this._DATA_.items[0].fileInput)
        if(this._DATA_.max > 1)
        {
            let files = []
            for (let index = 0; index < this._DATA_.items.length; index++) 
                files.push(this._DATA_.items[index].fileInput)
            return files
        }
        else
        {
            let file = ''
            if(this._DATA_.items[0].fileInput)
                file = this._DATA_.items[0].fileInput
            return file
        }
    }

    reset(data = [])
    {
        this._DATA_.items = []

        this.contentGrid.clear()
        this.contentEmpty.setHidden(false)
        
        if(!data) data = []

        this.contentGrid.reset(this._DATA_, data)

        if(data.length > 0) this.contentEmpty.setHidden(true)
    }
}