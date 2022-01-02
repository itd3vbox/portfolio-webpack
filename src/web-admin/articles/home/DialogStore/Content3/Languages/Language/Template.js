export default function Template(data) 
{
    let template = `
        <div class="icon">
            <i class="fas fa-globe"></i>
        </div>
        <div class="name">${ data.name }</div>
    `

    return template
}