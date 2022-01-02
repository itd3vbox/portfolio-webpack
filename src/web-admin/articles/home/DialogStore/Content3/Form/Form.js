import MessageAdded from './MessageAdded'
import Editor from 'components-editor/editor/Editor'
import EdxText from 'components-editor/text/Text'
import EdxList from 'components-editor/list/List'

export default class Form
{
    element = null
    form = null
    editor = null
    messageAdded = null

    urlStore = null
    onStore = null

    constructor(arg)
    {
        this.element = arg.element

        this.form = this.element.querySelector('form')

        this.editor = new Editor({
            element: this.element.querySelector('.editor')
        })

        this.messageAdded = new MessageAdded({
            element: this.element.querySelector('.message-added'),
            onAdd: () => this.handleOnAdd(),
        })

        this.urlStore = arg.urlStore
        this.onStore = arg.onStore

        this.setupEditor()
    }

    setupEditor()
    {
        const text = new EdxText()
        this.editor.addComponent(text)

        const list = new EdxList()
        this.editor.addComponent(list)
    }

    store()
    {

    }

    reset(data)
    {
        console.log(data)
    }

    clear()
    {
        
    }
}