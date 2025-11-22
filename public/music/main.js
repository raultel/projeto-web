import { api_get, api_create, api_delete, api_get_by_id, api_update } from "/shared/api.js"
import { setup_form, setup_admin_view} from "/shared/crud.js"

const token = localStorage.getItem("jwtToken");
const form = document.getElementById("model-form");
const modal = document.getElementById("register-modal");
const model_name = "releases"

function formatDate(input) {
    const date = new Date(input);

    if (isNaN(date)) {
        throw new Error("Invalid date format");
    }

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    // Ordinal suffix
    function ordinal(n) {
        if (n % 100 >= 11 && n % 100 <= 13) return n + "th";
        switch (n % 10) {
            case 1: return n + "st";
            case 2: return n + "nd";
            case 3: return n + "rd";
            default: return n + "th";
        }
    }

    return `${month} ${ordinal(day)} ${year}`;
}

function withBreaks(text) {
    return text.replace(/\n/g, "<br>");
}

function create_links(youtube, bandcamp, soundcloud, spotify) {
    let div = document.createElement("div");
    div.classList.add("links");

    if (youtube) {
        div.insertAdjacentHTML("afterbegin",`
            <a href=${youtube}> <img src="/assets/logos/youtube.svg" alt="youtube logo"> </a>
        `);
    }

    if (bandcamp) {
        div.insertAdjacentHTML("beforeend",`
        <a href=${bandcamp}> <img src="/assets/logos/bandcamp.svg" alt="bandcamp logo"> </a>
        `);
    }

    if (soundcloud) {
        div.insertAdjacentHTML("beforeend",`
        <a href=${soundcloud}> <img src="/assets/logos/soundcloud.svg" alt="soundcloud logo"> </a>
        `);
    }

    if (spotify) {
        div.insertAdjacentHTML("beforeend",`
        <a href=${spotify}> <img src="/assets/logos/spotify.svg" alt="spotify logo"> </a>
        `);
    }


    return div;
}


function build_card(item) {
    let div = document.createElement("div");
    let buttons;
    div.classList.add("card");

    if (token) {
        buttons = setup_admin_view(item, modal, form, model_name, list_items);
    }

    console.log(item.youtube)
    console.log(item.date)

    div.insertAdjacentHTML("afterbegin", `
        <div class="album_cover">
        <img src="${item.img_path}" alt="">
        </div>
        <div class="album_info">
        <div class="item-field"><h1>${item.title}</h1></div>
        <div class="item-field">Release: ${formatDate(item.date)}</div>
        <div class="item-field">Duration: ${item.duration}</div>
        <div class="links"></div>
        <br>
        <div class="item-field"><strong>${withBreaks(item.subtitle)}</strong></div>
        <br>
        <div class="item-field">${item.description}</div>
        </div>
    `);

    // Corrected: querySelector, no [0]
    div.querySelector(".album_info").append(buttons);
    div.querySelector(".links").replaceWith(
        create_links(item.youtube, item.bandcamp, item.soundcloud, item.spotify)
    );

    return div;
}


async function list_items() {
    document.getElementById("music-collection").innerHTML = ""
    const musics = await api_get(model_name);
    if (!Array.isArray(musics)) return;
    for(let music of musics) {
        const div = build_card(music)
        document.getElementById("music-collection").appendChild(div);
    }
}


await list_items();
if (token) {
    await setup_form(form, modal, model_name, list_items);
    document.getElementsByClassName("open-btn")[0].style = "display: block"
}
