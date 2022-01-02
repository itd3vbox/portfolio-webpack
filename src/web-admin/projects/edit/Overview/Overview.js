import Status from './Status'
import Name from './Name/Name'
import Links from './Links/Links'

export default class Overview
{
    element = null
    status = null
    name = null
    links = null
    
    constructor(arg)
    {
        this.element = arg.element
        
        this.status = new Status({
            element: this.element.querySelector('.ob-status'),
            data: arg.data.status,
            urlUpdate: arg.urlStatusUpdate,
            onUpdate: arg.onStatusUpdate,
        })

        this.name = new Name({
            element: this.element.querySelector('.ob-name'),
            data: arg.data.name,
            urlUpdate: arg.urlNameUpdate,
            onUpdate: arg.onNameUpdate,
        })

        this.links = new Links({
            element: this.element.querySelector('.ob-links'),
            data: arg.data.links,
            urlUpdate: arg.urlLinksUpdate,
            onUpdate: arg.onLinksUpdate,
        })
    }
}