import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsV9lXLJW9y4wQLLZkAFkhjMfFrMKYlbU",
    authDomain: "genz-langs.firebaseapp.com",
    databaseURL: "https://genz-langs-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "genz-langs",
    storageBucket: "genz-langs.appspot.com",
    messagingSenderId: "389081443408",
    appId: "1:389081443408:web:6cef894351c26a2b72b555",
    measurementId: "G-13L39FMY1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Reference to the database
const db = getDatabase(app);
const dbRef = ref(db);

// Retrieve data from Firebase
let database = {};
onValue(dbRef, (snapshot) => {
    database = snapshot.val();
});

function translateText() {
    const userInput = document.getElementById("userInput").value;
    const words = userInput.split(' ');
    if (words.length > 20) {
        document.getElementById("translation").innerHTML = "Please limit your input to 20 words.";
        return; // exit the function
    }
    let translatedWords = [];
    let skipWords = new Set();  // To skip words that are part of multi-word translations

    let output = "<strong>Words Found:</strong> ";

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        // If the word is in the skip list, continue
        if (skipWords.has(word)) {
            continue;
        }

        // Check for single-word translation
        if (database[word.toLowerCase()]) {
            output += `<strong>${word}</strong> `;
            if (!translatedWords.includes(word.toLowerCase())) {
                translatedWords.push(word.toLowerCase());
            }
        } 
        // Check for two-word translation (like "No Cap")
        else if (i < words.length - 1 && database[(word + " " + words[i+1]).toLowerCase()]) {
            const multiWord = word + " " + words[i+1];
            output += `<strong>${multiWord}</strong> `;
            if (!translatedWords.includes(multiWord.toLowerCase())) {
                translatedWords.push(multiWord.toLowerCase());
            }
            skipWords.add(words[i+1]);  // Add the next word to skip list
        } else {
            output += word + " ";
        }
    }

    output += "<br><br><strong>Meaning:</strong><br>";
    translatedWords.forEach(transWord => {
        output += `• <strong>${transWord}</strong>: ${database[transWord]}<br>`;
    });

    // Construct the translated text
    output += "<br><strong>Translated Text:</strong><br>";
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (skipWords.has(word)) {
            continue;
        } else if (i < words.length - 1 && database[(word + " " + words[i+1]).toLowerCase()]) {
            output += database[(word + " " + words[i+1]).toLowerCase()] + " ";
            skipWords.add(words[i+1]);
        } else {
            output += database[word.toLowerCase()] || word;
            output += " ";
        }
    }

    if (!translatedWords.length) {
        output = "All good, nothing to translate here.";
    }

    document.getElementById("translation").innerHTML = output;
}


document.getElementById('translateButton').addEventListener('click', translateText);
