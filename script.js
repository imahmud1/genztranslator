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

document.getElementById('translateButton').addEventListener('click', translateText);
