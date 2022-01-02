import Language from './Language/Language'

export default class Languages
{
    element = null
    list = null

    urlSearch = null
    isSearchDone = false
    onLanguageSelect = null
    currentLanguage = null
    
    _DATA_ = null

    constructor(arg)
    {
        this.element = arg.element
        this.list = this.element.querySelector('.list')
        
        this.urlSearch = arg.urlSearch
        this.onLanguageSelect = arg.onLanguageSelect
    }

    search()
    {
        const formData = new FormData()
        formData.append('_method', 'POST')

        fetch(this.urlSearch, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
                    .getAttribute('content'),
                'Accept': 'application/json',
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                
                this._DATA_ = response

                this.update()
            })
    }

    update()
    {
        while(this.list.firstChild) 
            this.list.removeChild(this.list.firstChild)
        
        /*
        if(this._DATA_.length === 0)
        {
            this.setIsEmpty(true)
            return
        }

        this.setIsEmpty(false)
        */

        for(let i = 0; i < this._DATA_.length; i++)
        {
            const colorNumber = parseInt((i + 1) % 5)

            let languageData = this._DATA_[i]
            languageData.color = `c${ colorNumber == 0 ? 5 : colorNumber }`
            
            const language = new Language({
                parentElement: this.list,
                data: languageData, 
                onSelect: (language) => this.handleOnLanguageSelect(language),
            })
        }
    }

    handleOnLanguageSelect(language)
    {
        if(this.currentLanguage)
            this.currentLanguage.setSelected(false)
        
        if(language)
        {
            this.currentLanguage = language
            this.onLanguageSelect(language._DATA_)
        }
        else
        {
            this.currentLanguage = null
            this.onLanguageSelect(null)
        }
    }

    reset()
    {
        if(!this.isSearchDone)
        {
            this.isSearchDone = true
            this.search()
        }
    }

    clear()
    {
        
    }
}