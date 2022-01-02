import './sass/main.sass'
import './sass/custom.sass'

import ContentTop from './ContentTop/ContentTop'
import Tabs from './Tabs'
import Overview from './Overview/Overview'

export default class Edit
{
    element = null
    contentTop = null
    tabs = null
    overview = null

    constructor(arg)
    {
        console.log(arg)

        this.element = document.querySelector('#wa-p-e')

        this.contentTop = new ContentTop({
            element: this.element.querySelector('.p-content-top'),
            data: {
                image_main: arg.project.image_main,
                name: arg.project.name,
                status: arg.project.status,
                date_latest: arg.project.date_latest,
            },

            urlImageMainStore: arg.project.web_admin_url_image_main_store,
        })
        
        this.overview = new Overview({
            element: this.element.querySelector('.p-overview'),
            data: {
                status: arg.project.status,
                name: arg.project.name,
                links: arg.project.links,
            },

            urlStatusUpdate: arg.project.web_admin_url_status_update,
            urlNameUpdate: arg.project.web_admin_url_name_update,
            urlLinksUpdate: arg.project.web_admin_url_links_update,

            onStatusUpdate: (data) => this.handleOnStatusUpdate(data),
            onNameUpdate: (data) => this.handleOnNameUpdate(data),
            onLinksUpdate: (data) => this.handleOnLinksUpdate(data),
        })

        this.tabs = new Tabs({
            element: this.element,
        })
    }

    handleOnStatusUpdate(data)
    {
        this.contentTop.resetStatus(data.status)
        this.contentTop.indicators.resetDateLatest(data.date_latest)
    }

    handleOnNameUpdate(data)
    {
        this.contentTop.resetName(data.name)
        this.contentTop.indicators.resetDateLatest(data.date_latest)
    }

    handleOnLinksUpdate(data)
    {
        this.contentTop.indicators.resetDateLatest(data.date_latest)
    }
}