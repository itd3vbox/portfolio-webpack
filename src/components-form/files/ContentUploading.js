export default class ContentUploading
{
    element = null

    constructor(arg)
    {
        this.element = arg.element
    }

    setVisible(isVisible)
    {
        if(isVisible) this.element.classList.add('visible')
        else this.element.classList.remove('visible')
    }
}