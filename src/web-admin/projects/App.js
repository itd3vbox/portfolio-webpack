import Home from './home/Home'
import Edit from './edit/Edit'

export default class App
{
    _home = null
    _edit = null

    constructor() {}

    home(arg)
    {
        this._home = new Home(arg) 
    }

    edit(arg)
    {
        this._edit = new Edit(arg)
    }
}