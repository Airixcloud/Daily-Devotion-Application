function getVietnamDate() {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Ho_Chi_Minh",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());
}


// Turn the date into a number
function getDayNumber(dateString) {
    const date = new Date(dateString + "T00:00:00Z");

    const start = new Date(
        Date.UTC(date.getUTCFullYear(), 0, 1)
    );

    const difference = date - start;

    return Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );
}


// Turn a string into a repeatable number
function hashString(string) {
    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        hash =
            ((hash << 5) - hash + string.charCodeAt(i))
            | 0;
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


// Get the JSON
fetch("verses.json")

    .then(response => response.json())

    .then(data => {

        // -----------------------------
        // 1. Get today's Vietnam date
        // -----------------------------

        const date = getVietnamDate();


        // -----------------------------
        // 2. Turn date into day number
        // -----------------------------

        const dayNumber = getDayNumber(date);


        // -----------------------------
        // 3. How many verses?
        // -----------------------------

        const verseCount = data.length;


        // -----------------------------
        // 4. Which cycle are we in?
        // -----------------------------

        const cycle = Math.floor(
            dayNumber / verseCount
        );


        // -----------------------------
        // 5. Position inside the cycle
        // -----------------------------

        const position = dayNumber % verseCount;


        // -----------------------------
        // 6. Create [0, 1, 2, 3...]
        // -----------------------------

        const indexes = Array.from(
            { length: verseCount },
            (_, i) => i
        );


        // -----------------------------
        // 7. Create a seed for this cycle
        // -----------------------------

        const seed = hashString(
            "verse-cycle-" + cycle
        );


        // -----------------------------
        // 8. Shuffle the indexes
        // -----------------------------

        shuffle(indexes, seed);


        // -----------------------------
        // 9. Pick today's verse
        // -----------------------------

        const verseIndex = indexes[position];

        const verse = data[verseIndex];


        // -----------------------------
        // 10. Put it into the HTML
        // -----------------------------

        document.getElementById("reference").textContent =
            `${verse.Book} ${verse.Chapter}:${verse.Verse}`;

        document.getElementById("english").textContent =
            verse.Text_english;

        document.getElementById("vietnamese").textContent =
            verse.Text_vietnamese;

        document.getElementById("date").textContent =
            date;

    })

    .catch(error => {
        console.error("Error:", error);
    });