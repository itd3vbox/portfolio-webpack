import Page from './page/Page'
import Home from './home/Home'

export default class App
{
    _page = null
    _home = null

    constructor(arg) 
    {
        this._page = new Page(arg)
    }

    page()
    {
        return this._page
    }

    home(arg)
    {
        this._home = new Home(arg)
        return this._home
    }
}