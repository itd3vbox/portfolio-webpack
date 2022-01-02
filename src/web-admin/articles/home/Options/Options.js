import Search from './Search'
import Extra from './Extra'

export default class Options
{
    element = null
    search = null
    extra = null

    constructor(arg)
    {
        this.element = document.querySelector('.p-options')

        this.search = new Search({
            element: this.element.querySelector('.search')
        })

        this.extra = new Extra({
            element: this.element.querySelector('.extra'),
            onOptionAdd: arg.onOptionAdd,
        })
    }
}