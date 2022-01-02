import Tool from './Tool'
import Content from './Content'

export default class List
{
    parentElementTools = null
    parentElementContent = null

    tool = null
    
    isDefault = false
    isSelected = false
    onSelect = null
    onCreate = null
    onDelete = null

    currentContent = null
    _DATA_ = []

    constructor(arg)
    {
        this.tool = new Tool({
            onSelect: (isSelected) => this.handleToolOnSelect(isSelected),
        })   
    }

    connect({parentElementTools, parentElementContent, onSelect, onCreate, onDelete})
    {
        this.tool.connect(parentElementTools)

        this.parentElementTools = parentElementTools
        this.parentElementContent = parentElementContent

        this.onSelect = onSelect
        this.onCreate = onCreate
        this.onDelete = onDelete
    }

    create()
    {
        const content = new Content({
            parentElement: this.parentElementContent,
            onSelect: ({content, isSelected}) => this.handleOnSelect({content, isSelected}),
            onDelete: (content) => this.handleOnDelete(content),
        }) 
        content.select()

        this.onCreate({component: this, content})
    }

    // --- HANDLE EVENTS

    handleToolOnSelect(isSelected)
    {
        console.log('On Select Tool List ...')

        if(isSelected && !this.isSelected)
            this.create()
        else if(!isSelected)
        {
            if(this.currentContent)
                this.currentContent.setSelected(false)
            this.setSelected(false)
        }
    }

    handleOnSelect({content, isSelected})
    {
        console.log('On Select List ...')
        if(this.currentContent && this.currentContent != content)
            this.currentContent.setSelected(false)
        
        this.currentContent = content
        this.setSelected(true)
    }

    handleOnDelete(content)
    {
        this.tool.setSelected(false)
        this.onDelete({component: this, content})    
    }

    // ---

    setDefault(isDefault)
    {
        this.isDefault = isDefault
    }

    setSelected(isSelected)
    {
        this.isSelected = isSelected
        this.tool.setSelected(isSelected)
    }

    getData()
    {
         
    }
}