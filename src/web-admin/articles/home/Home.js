import './sass/main.sass'
import './sass/custom.sass'

import Options from './Options/Options'
import List from './List/List'
import DialogStore from './DialogStore/DialogStore'

export default class Home
{
    element = null
    options = null
    list = null
    dialogStore = null

    constructor(arg)
    {
        this.element = document.querySelector('#wa-a-h')

        this.options = new Options({
            element: this.element.querySelector('.p-options'),
            onOptionAdd: (option) => this.handleOnOptionAdd(option),
        })

        this.list = new List({
            element: this.element.querySelector('.p-list'),
            urlSearch: arg.web_admin_url_search_all,
        })

        this.dialogStore = new DialogStore({
            element: this.element.querySelector('.dialog-store'),
            urlStore: arg.web_admin_url_store,
            urlLanguagesSearch: arg.web_admin_url_langs_search_all,
        })

        console.log(arg)
    }

    handleOnOptionAdd(option)
    {
        this.dialogStore.reset(option)
    }
}