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

        let items = this.element.querySelectorAll('.page-tabs-nav > .t-item')
        let contents = this.element.querySelectorAll('.page-tabs-contents > .t-content')
        for(let i = 0; i < items.length; i++)
        {
            if(i === 0) this.select(items[i], contents[i], i)

            items[i].addEventListener('click', (event) => {
                this.select(items[i], contents[i], i)
            })
        }
    }

    select(item, content, index)
    {
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
        let items = this.element.querySelectorAll('.page-tabs-nav > .t-item')
        let contents = this.element.querySelectorAll('.page-tabs-contents > .t-content')
        this.select(items[index], contents[index], index)
    }

}