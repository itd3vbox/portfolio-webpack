export default function Template(data) 
{
    let template = `
        <div class="block-1">
            <img src="${ data.image_main ? data.image_main.src_public : ''  }" 
                alt="Image Main - ${ data.name } - ${ data.name_sub }">
            
            <div class="btn-container">
                <a class="button-icon" href="${ data.web_admin_url_edit  }">
                    <img src="http://projectsmanager.alpha.xdev/images/samples/fox-hub.svg" 
                        alt="Avatar - Project">
                </a>
            </div>
    
        </div>

        <div class="block-2">
            <h6>${ data.name }</h6>
            <div class="date-latest">${ data.date_latest }</div>
        </div>
        
        <div class="block-3"></div>
    `

    return template
}