import Training from './Training/Training'

export default class List
{
    element = null
    list = null
    pagination = null

    urlSearch = null
    _DATA_ = null

    constructor(arg)
    {
        this.element = arg.element
        this.list = this.element.querySelector('.list .articles')
        this.pagination = this.element.querySelector('.list .pagination')

        this.urlSearch = arg.urlSearch

        this.search()
    }

    setIsEmpty(isEmpty)
    {
        if(isEmpty) 
            this.element.classList.add('is-empty')
        else
            this.element.classList.remove('is-empty')
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

        if(this._DATA_.length === 0)
        {
            this.setIsEmpty(true)
            return
        }

        this.setIsEmpty(false)

        for(let i = 0; i < this._DATA_.length; i++)
        {
            let articleData = this._DATA_[i]

            const article = new Article({
                parentElement: this.list,
                data: trainingData, 
            })
        }
    }
}