export default class Tabs
{
    element = null

    onTabSelect = null

    currentTab = {
        item: null,
        content: null,
    }

    constructor(arg)
    {
        this.element =  arg.element

        this.onTabSelect = arg.onTabSelect

        let items = this.element.querySelectorAll('.tabs-nav > .tn-item')
        let contents = this.element.querySelectorAll('.tabs-contents > .tc-content')
        for(let i = 0; i < items.length; i++)
        {
            if(i === 0) this.selectInit()

            items[i].addEventListener('click', (event) => {
                this.select(items[i], contents[i], i)
            })
        }
    }

    select(item, content, index)
    {
        if(item.classList.contains('disabled')) return
        
        if(this.currentTab.item)
        {
            this.currentTab.item.classList.remove('selected')
            this.currentTab.content.classList.remove('selected')
        }

        this.currentTab.item = item
        this.currentTab.content = content
        this.currentTab.item.classList.add('selected')
        this.currentTab.content.classList.add('selected')

        if(this.onTabSelect) this.onTabSelect(index)
    }

    setSelected(index)
    {
        let items = this.element.querySelectorAll('.tabs-nav > .tn-item')
        let contents = this.element.querySelectorAll('.tabs-contents > .tc-content')
        this.select(items[index], contents[index], index)
    }

    selectInit()
    {
        let item = this.element.querySelector('.tabs-nav > .tn-item:nth-child(1)')
        let content = this.element.querySelector('.tabs-contents > .tc-content:nth-child(1)')

        if(this.currentTab.item)
        {
            this.currentTab.item.classList.remove('selected')
            this.currentTab.content.classList.remove('selected')
        }

        this.currentTab.item = item
        this.currentTab.content = content
        this.currentTab.item.classList.add('selected')
        this.currentTab.content.classList.add('selected')
    }

    setItemDisabled(isDisabled, index)
    {
        let item = this.element.querySelector(`.tabs-nav > .tn-item:nth-child(${ index + 1 })`)
        if(isDisabled)
            item.classList.add('disabled')
        else
            item.classList.remove('disabled')
    }
}