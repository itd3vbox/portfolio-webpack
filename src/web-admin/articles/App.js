import Home from './home/Home'
import Show from './show/Show'

export default class App
{
    _home = null
    _show = null

    constructor() {}

    home(arg)
    {
        this._home = new Home(arg) 
    }

    show(arg)
    {
        this._show = new Show(arg)
    }
}