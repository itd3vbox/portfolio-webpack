import Form from './Form'
import MessageAdded from './MessageAdded'

export default class Content3
{
    element = null
    form = null
    messageAdded = null

    onStore = null

    constructor(arg)
    {
        this.element = arg.element

        this.form = new Form({
            element: this.element.querySelector('form'),
            urlStore: arg.urlStore,
            onStore: (data) => this.handleOnStore(data),
        })

        this.messageAdded = new MessageAdded({
            element: this.element.querySelector('.message-added'),
        }) 
        
        this.onStore = arg.onStore
    }

    setIsAdded(isAdded)
    {
        if(isAdded) this.element.classList.add('is-added')
        else this.element.classList.remove('is-added')
    }

    handleOnStore(data)
    {
        console.log(data, this.messageAdded)
        
        this.messageAdded.reset(data)
        this.setIsAdded(true)

        this.onStore()
    }

    clear()
    {
        this.form.clear()
        this.messageAdded.clear()
        this.setIsAdded(false)
    }
}