export default function Template(data) 
{
    let template = `
        <a href="${ data.url }" target="_blank">
            <i class="${ data.icon }"></i>
        </a>
        <div class="btn-delete">
            <i class="fas fa-times"></i>
        </div>
    `

    return template
}