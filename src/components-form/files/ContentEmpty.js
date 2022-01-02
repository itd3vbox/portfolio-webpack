export default class ContentEmpty
{
    element = null
    input = null
    btnChoose = null

    onReady = null

    constructor(arg)
    {
        this.element = arg.element

        this.input = this.element.querySelector('input')
        this.input.addEventListener('click', (event) => {
            event.stopPropagation()
        })
        this.input.addEventListener('change', (event) => {
            this.setHidden(true)
            this.onReady(this.input.files[0])
        })

        this.btnChoose = this.element.querySelector('.btn-choose')
        this.btnChoose.addEventListener('click', (event) => {
            this.input.value = null
            this.input.click()
        })

        this.onReady = arg.onReady
    }

    setHidden(isHidden)
    {
        if(isHidden) this.element.classList.add('hidden')
        else this.element.classList.remove('hidden')
    }

    openFilesWindow()
    {
        this.input.value = null
        this.input.click()
    }
}