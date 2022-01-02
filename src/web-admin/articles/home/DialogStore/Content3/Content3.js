import Languages from './Languages/Languages'
import Form from './Form/Form'

export default class Content3
{
    element = null
    languages = null
    form = null

    constructor(arg)
    {
        this.element = arg.element

        this.languages = new Languages({
            element: this.element.querySelector('.c-languages'),
            urlSearch: arg.urlLanguagesSearch,
            onLanguageSelect: arg.onLanguageSelect,
         })

        this.form = new Form({
            element: this.element.querySelector('.c-form'),
            urlStore: arg.urlStore,
            onStore: arg.onStore,
        })
    }
}