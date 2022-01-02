export default class Indicators
{
    element = null
    dateUpdated = null

    _DATA_ = null

    constructor(arg)
    {
        this.element = arg.element
        this.dateUpdated = this.element.querySelector('.indicator.date-updated .value')

        this.reset(arg.data)
    }

    reset(data)
    {
        this._DATA_ = data
        
        this.resetDateLatest()
    }

    resetDateLatest(data)
    {
        if(data)
            this._DATA_.date_latest = data
            
        this.dateUpdated.innerHTML = this._DATA_.date_latest
    }
}