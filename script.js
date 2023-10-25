let database = {
    "istg": "I swear to God",
    "fr": "for real",
    "brb": "be right back",
    "idk": "I don't know",
    "ily": "I love you",
    "imo": "in my opinion",
    "imho": "in my humble opinion",
    "tbf": "to be fair",
    "tbh": "to be honest",
    "smh": "shaking my head",
    "rofl": "rolling on the floor laughing",
    "lol": "laugh out loud",
    "lmao": "laughing my ass off",
    "omg": "oh my God/gosh",
    "oml": "oh my Lord",
    "ttyl": "talk to you later",
    "btw": "by the way",
    "fwiw": "for what it's worth",
    "fomo": "fear of missing out",
    "yolo": "you only live once",
    "ngl": "not gonna lie",
    "wtf": "what the f***",
    "stg": "swear to God",
    "dm": "direct message",
    "ftw": "for the win",
    "icymi": "in case you missed it",
    "rn": "right now",
    "jk": "just kidding",
    "jsyk": "just so you know",
    "qotd": "quote of the day",
    "ootd": "outfit of the day",
    "bts": "behind the scenes",
    "idc": "I don't care",
    "fyi": "for your information",
    "bruh": "brother/bro",
    "afaik": "as far as I know",
    "afk": "away from keyboard",
    "bae": "before anyone else",
    "bff": "best friends forever",
    "cya": "see you",
    "g2g": "got to go",
    "gg": "good game",
    "hmu": "hit me up",
    "idek": "I don't even know",
    "irl": "in real life",
    "lmk": "let me know",
    "nvm": "never mind",
    "onfleek": "extremely good",
    "pov": "point of view",
    "sus": "suspicious",
    "tmi": "too much information",
    "u": "you",
    "wbu": "what about you?",
    "wdym": "what do you mean?",
    "wym": "what you mean?",
    "yt": "YouTube",
    "ykwim": "You Know what i mean",
    "delulu": "delusional",
    // ... you can continue adding more as you discover them
};

function translateText() {
    const userInput = document.getElementById("userInput").value;
    const words = userInput.split(' ');
    let translatedWords = [];

    let output = "<strong>Words Found:</strong> ";

    words.forEach(word => {
        if (database[word.toLowerCase()]) {
            output += `<strong>${word}</strong> `;
            if (!translatedWords.includes(word.toLowerCase())) {
                translatedWords.push(word.toLowerCase());
            }
        } else {
            output += word + " ";
        }
    });

    output += "<br><br><strong>Meaning:</strong><br>";
    translatedWords.forEach(transWord => {
        output += `• <strong>${transWord}</strong>: ${database[transWord]}<br>`;
    });

    output += "<br><strong>Translated Text:</strong><br>";
    output += words.map(word => database[word.toLowerCase()] || word).join(' ') + "<br>";

    if (!translatedWords.length) {
        output = "All good, nothing to translate here.";
    }

    document.getElementById("translation").innerHTML = output;
}
