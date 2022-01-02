export default function Template(data) 
{
    let template = `
        <div class="block-1">
            <img src="${ data.training.image_main ? data.training.image_main.src_public : ''  }" 
                alt="Image Main - ${ data.name } - ${ data.name_sub }">
            <div class="avatar">
                <div class="frame">
                    <a class="button-icon" href="${ data.web_zero_url_edit }">
                        <img src="http://projectsmanager.alpha.xdev/images/samples/fox-hub.svg" 
                            alt="Avatar - Training">
                    </a>
                </div>
            </div>
        </div>

        <div class="block-2">
            <h6>
                <span class="name">${ data.name }</span>
                <span class="name-sub">${ data.name_sub }</span>
            </h6>
            <div class="date-latest">${ data.training.date_latest }</div>
        </div>
        
        <div class="block-3">
            <div class="indicator">
                <div class="label">Projects</div>
                <div class="value">${ data.training.total_projects }</div>
            </div>
            <div class="indicator">
                <div class="label">News</div>
                <div class="value">${ data.training.total_news }</div>
            </div>
        </div>
    `

    return template
}