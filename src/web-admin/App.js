import Page from './page/Page'
import Home from './home/Home'
import Projects from './projects/App'
import Articles from './articles/App'

export default class App
{
    _page = null
    _home = null
    _projects = null
    _articles = null

    constructor(arg) 
    {
        this._page = new Page(arg)
    }

    page()
    {
        return this._page
    }

    home()
    {
        this._home = new Home()
    }

    projects()
    {
        this._projects = new Projects()
        return this._projects
    }

    articles()
    {
        this._articles = new Articles()
        return this._articles
    }
}