function getPageName(url) {
    const pathname = new URL(url).pathname;   // "/image/index.html"
    const parts = pathname.split("/").filter(Boolean); // ["image", "index.html"]
    return parts[0]; // first folder → "image"
}

export async function load_header() {
    try {
        const response = await fetch('/shared/header.html');
        const data = await response.text();
        document.getElementById('header-placeholder').innerHTML = data;

        const page_name = getPageName(window.location.href);
        document.getElementById(page_name+"-nav-img").src = "/assets/navbar/" + page_name + "_color.svg";

    } catch (error) {
        console.error('Error loading header:', error);
    }

}

load_header();
