function getPageName(url) {
    const pathname = new URL(url).pathname;
    const parts = pathname.split("/").filter(Boolean);
    return parts[0];
}

export async function load_header() {
    try {
        /* Pega o placeholder e substitui pelo código */
        const response = await fetch('/shared/header.html');
        const data = await response.text();
        document.getElementById('header-placeholder').outerHTML = data;

        /* Pega a página atual (ex. imagens) e substitui o ícone do header da seção
         * por um ícone colorido (indicação de página atual)
         */
        const page_name = getPageName(window.location.href);
        document.getElementById(page_name+"-nav-img").src = "/assets/navbar/" + page_name + "_v_color.svg";

    } catch (error) {
        console.error('Error loading header:', error);
    }

}

load_header();
