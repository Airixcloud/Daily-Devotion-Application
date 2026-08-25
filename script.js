function getVietnamDate() {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Ho_Chi_Minh",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());
}

// Turn the date into a number of days since a fixed epoch.
// (Using Jan 1 of the *same* year, as before, resets the count every
// Dec 31 -> Jan 1, which breaks the cycle math. A fixed epoch fixes that.)
function getDayNumber(dateString) {
    const date = new Date(dateString + "T00:00:00Z");
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date string: "${dateString}"`);
    }
    const epoch = new Date(Date.UTC(1970, 0, 1));
    const difference = date - epoch;
    return Math.floor(difference / (1000 * 60 * 60 * 24));
}

// Turn a string into a repeatable number
function hashString(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = ((hash << 5) - hash + string.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

// Random number generator that uses a seed
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Shuffle an array using our seeded random
function shuffle(array, seed) {
    for (let i = array.length - 1; i > 0; i--) {
        const random = seededRandom(seed + i);
        const j = Math.floor(random * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Safely set text on an element, tolerating a missing element or value
function setText(id, value) {
    const el = document.getElementById(id);
    if (!el) {
        console.warn(`Element #${id} not found in the page`);
        return;
    }
    el.textContent = value ?? "";
}

// Show a user-visible error instead of failing silently to a blank page
function showError(message) {
    const container =
        document.getElementById("verse-container") || document.body;
    setText("reference", "");
    setText("english", message);
    setText("vietnamese", "");
    console.error(message);
}

// Validate that a verse object has the fields we need before using it
function isValidVerse(verse) {
    return (
        verse &&
        typeof verse === "object" &&
        typeof verse.Book === "string" &&
        (typeof verse.Chapter === "number" || typeof verse.Chapter === "string") &&
        (typeof verse.Verse === "number" || typeof verse.Verse === "string") &&
        typeof verse.Text_english === "string" &&
        typeof verse.Text_vietnamese === "string"
    );
}

async function loadVerse() {
    let response;
    try {
        response = await fetch("today.json");
    } catch (networkError) {
        showError("Could not load verses (network error). Please check your connection.");
        return;
    }

    if (!response.ok) {
        showError(`Could not load verses (server returned ${response.status}).`);
        return;
    }

    let data;
    try {
        data = await response.json();
    } catch (parseError) {
        showError("Verse data is corrupted and could not be read.");
        return;
    }

    if (!Array.isArray(data) || data.length === 0) {
        showError("No verses are available right now.");
        return;
    }

    // Filter out any malformed entries rather than crashing on one bad row
    const verses = data.filter(isValidVerse);
    if (verses.length === 0) {
        showError("Verse data is malformed.");
        return;
    }

    const date = getVietnamDate();

    let dayNumber;
    try {
        dayNumber = getDayNumber(date);
    } catch (dateError) {
        showError("Could not determine today's date.");
        return;
    }

    const verseCount = verses.length;
    const cycle = Math.floor(dayNumber / verseCount);
    const position = dayNumber % verseCount;

    const indexes = Array.from({ length: verseCount }, (_, i) => i);
    const seed = hashString("verse-cycle-" + cycle);
    shuffle(indexes, seed);

    const verseIndex = indexes[position];
    const verse = verses[verseIndex];

    if (!verse) {
        showError("Could not select a verse for today.");
        return;
    }

    setText("reference", `${verse.Book} ${verse.Chapter}:${verse.Verse}`);
    setText("english", verse.Text_english);
    setText("vietnamese", verse.Text_vietnamese);
    setText("date", date);
}

loadVerse();