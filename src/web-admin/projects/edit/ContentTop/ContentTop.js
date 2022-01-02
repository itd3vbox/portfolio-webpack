import ImageMain from './ImageMain/ImageMain'
import Indicators from './Indicators'

export default class ContentTop
{
    element = null
    imageMain = null
    status = null
    name = null
    indicators = null
    
    _DATA_ = null

    constructor(arg)
    {
        this.element = arg.element

        console.log(arg.data)

        this.imageMain = new ImageMain({
            element: this.element.querySelector('.block-1 .image-main'),
            data: arg.data.image_main,
            urlStore: arg.urlImageMainStore,
        })

        this.status = this.element.querySelector('.block-1 .status')
        this.name = this.element.querySelector('.block-2 h2')

        this.indicators = new Indicators({
            element: this.element.querySelector('.block-2 .indicators'),
            data: {
                date_latest: arg.data.date_latest,
            }
        })

        this.reset(arg.data)
    }

    reset(data)
    {
        this._DATA_ = data
        this.resetStatus()
        this.resetName()
    }

    resetStatus(data)
    {
        if(data)
            this._DATA_.status = data

        this.status.textContent = this._DATA_.status.value_text
    }

    resetName(data)
    {
        if(data)
            this._DATA_.name = data

        this.name.textContent = this._DATA_.name
    }
}