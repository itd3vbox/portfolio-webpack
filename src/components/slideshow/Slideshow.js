export default class Slideshow
{
    element = null

    constructor(arg)
    {
        this.element = arg.element ? arg.element : document.querySelector(arg.selector)
    }
}