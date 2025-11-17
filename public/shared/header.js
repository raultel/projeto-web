export async function load_header() {
    try {
        const response = await fetch('/shared/header.html');
        const data = await response.text();
        document.getElementById('header-placeholder').innerHTML = data;
    } catch (error) {
        console.error('Error loading header:', error);
    }

}

load_header();
