import chunk from "lodash.chunk";
import padstart from "lodash.padstart";
import setSprite from "./sprite";

const container = document.querySelector("#screen__content");

let currentChunkId = 0;
let currentGuestId = 0;
let screen = "loading";
let guests = chunk(JSON.parse(document.getElementById("guests").innerHTML), 6);

document.getElementById("guests").remove();

function backControlMutation() {
    if (currentChunkId > 0 && currentGuestId === 0) {
        currentChunkId--;
        currentGuestId = 5;

        return guestsScreen();
    } else if (currentGuestId > 0) {
        currentGuestId--;
        return guestsScreen();
    }
}

function nextControlMutation() {
    if (guests.length > currentChunkId) {
        if (currentGuestId === 5) {
            currentChunkId++;
            currentGuestId = 0;

            return guestsScreen();
        } else if (currentGuestId < guests[currentChunkId].length - 1) {
            currentGuestId++;
            return guestsScreen();
        }
    }
}

function handleControls() {
    document
        .getElementById("top")
        .addEventListener("click", backControlMutation);
    document
        .getElementById("bottom")
        .addEventListener("click", nextControlMutation);

    document
        .getElementById("a-button")
        .addEventListener("click", guestDetailScreen);
    document.getElementById("b-button").addEventListener("click", guestsScreen);

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") return backControlMutation();
        if (e.key === "ArrowDown") return nextControlMutation();
        if (e.key === "Enter") return guestDetailScreen();
        if (e.key === "Escape") return guestsScreen();
    });
}

function buildItem(guest) {
    const el = document.createElement("li");

    // Create guest idx div
    const id = document.createElement("div");
    id.classList.add("guest__id");
    id.innerHTML = padstart(guest.id, 3, 0);

    // Create current && name container
    const container = document.createElement("div");
    container.classList.add("guest__container");

    // Create chevron
    const chevron = document.createElement("div");
    chevron.classList.add("guest__chevron");
    chevron.innerHTML = `<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 17.898C9 18.972 10.2649 19.546 11.0731 18.8388L17.3838 13.3169C18.1806 12.6197 18.1806 11.3801 17.3838 10.6829L11.0731 5.16108C10.2649 4.45388 9 5.02785 9 6.1018V17.898Z" fill="#212121"/>
  </svg>`;

    // Create name text
    const name = document.createElement("div");
    name.appendChild(document.createTextNode(guest.name));

    // Add chevron && name in container
    container.appendChild(chevron);
    container.appendChild(name);

    // Compose element
    el.classList.add("guest__item");
    el.appendChild(id);
    el.appendChild(container);

    return el;
}

function guestsScreen() {
    screen = "guests";
    container.innerHTML = "";

    let guestsScreen = document.createElement("ul");
    guestsScreen.classList.add("guests");

    guests[currentChunkId]
        .map(buildItem)
        .map((guest, idx) => {
            if (idx === currentGuestId) guest.classList.add("current");

            return guest;
        })
        .forEach((guest) => guestsScreen.appendChild(guest));

    container.innerHTML = "";
    container.appendChild(guestsScreen);
}

function guestDetailScreen() {
    const guest = guests[currentChunkId][currentGuestId];

    // Create main container
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("guest__detail__screen");

    // Create characteristics container and elements
    const charContainer = document.createElement("div");
    charContainer.classList.add("guest__detail__char");

    const charLeft = document.createElement("div");
    charLeft.classList.add("guest__left");

    const sprite = document.createElement("canvas");
    sprite.setAttribute("width", "56px");
    sprite.setAttribute("height", "56px");

    setSprite(sprite, guest.sprite[0], guest.sprite[1]);

    const id = document.createElement("div");
    id.innerHTML = `<div><span class="id__prefix">No.</span> ${padstart(
        guest.id,
        3,
        0
    )}</div>`;

    charLeft.appendChild(sprite);
    charLeft.appendChild(id);

    const charRight = document.createElement("div");
    charRight.classList.add("guest__right");

    const firstName = document.createElement("div");
    firstName.classList.add('guest__firstname')
    firstName.appendChild(document.createTextNode(guest.name.split(" ")[0]));

    const relation = document.createElement("div");
    relation.classList.add('guest__relation')
    relation.appendChild(document.createTextNode(guest.relation));

    charRight.appendChild(firstName);
    charRight.appendChild(relation);

    charContainer.appendChild(charLeft);
    charContainer.appendChild(charRight);

    // Create description
    const desc = document.createElement("p");
    desc.classList.add("guest__detail__desc");
    desc.appendChild(document.createTextNode(guest.description));

    mainContainer.appendChild(charContainer);
    mainContainer.appendChild(desc);

    container.innerHTML = "";
    container.appendChild(mainContainer);
}

async function boot() {
    screen = "loading";
    container.innerHTML = `<div id="boot">Chargement</div>`;

    const content = document.querySelector("#boot");
    const loader = setInterval(() => {
        if (content.innerHTML === "Chargement...")
            return (content.innerHTML = "Chargement.");

        return (content.innerHTML = content.innerHTML + ".");
    }, 800);

    const endAfter = Math.floor(Math.random() * 10) * 900;
    setTimeout(() => cleanLoading(loader, content), endAfter);
}

function cleanLoading(loader, content) {
    clearInterval(loader);

    content.innerHTML = "Chargement terminé";

    setTimeout(guestsScreen, 600);
    handleControls(currentGuestId);
}

boot();
