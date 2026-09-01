const API_URL =
    "https://random-verse-api.airixcloud.workers.dev";

function getClientId() {
    let clientId = localStorage.getItem("verseClientId");

    if (!clientId) {
        clientId = crypto.randomUUID();
        localStorage.setItem("verseClientId", clientId);
    }

    return clientId;
}

// Safely set text on an element
function setText(id, value) {
    const el = document.getElementById(id);

    if (!el) {
        console.warn(`Element #${id} not found in the page`);
        return;
    }

    el.textContent = value ?? "";
}

// Show an error on the page
function showError(message) {
    setText("reference", "");
    setText("english", message);
    setText("vietnamese", "");

    console.error(message);
}

// Validate the verse returned by the API
function isValidVerse(verse) {
    return (
        verse &&
        typeof verse === "object" &&
        typeof verse.Book === "string" &&
        (typeof verse.Chapter === "number" ||
            typeof verse.Chapter === "string") &&
        (typeof verse.Verse === "number" ||
            typeof verse.Verse === "string") &&
        typeof verse.Text_english === "string" &&
        typeof verse.Text_vietnamese === "string"
    );
}

async function loadVerse() {
    try {
        const clientId = getClientId();

        const response = await fetch(
            `${API_URL}?client=${encodeURIComponent(clientId)}`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const verse = await response.json();

        document.getElementById("reference").textContent =
            `${verse.Sach} ${verse.Doan}:${verse.Cau}`;

        document.getElementById("english").textContent =
            verse.Text_english;

        document.getElementById("vietnamese").textContent =
            verse.Text_vietnamese;

    } catch (error) {
        console.error(error);

        document.getElementById("english").textContent =
            "Could not connect to the verse server.";
    }
}

loadVerse();