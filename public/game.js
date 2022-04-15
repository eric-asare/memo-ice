// client connects to the server
let socket = io();

//confirm that the client is connected
socket.on('connect', () => {


    console.log('connected to the server');
    // now that client has connected to server, emit name and room information
    let data = {
        'name': sessionStorage.getItem('name'),
        'room': sessionStorage.getItem('room')
    }
    socket.emit('userData', data);
})


// limiting number of people in room to 2
socket.on('maxUsersReached', () => {
    alert('This room is full. Please go back and try to join another room');

    document.getElementById("game-form").innerHTML = ""

})


// telling first user to join room to wait for game partner
socket.on('firstUserJoined', () => {
    alert('Hey! Be patient as your game partner joins');
})


// telling the team to begin playing the game
socket.on('secondUserJoined', (data) => {
    let welcomeMessage = data.msg;
    alert(welcomeMessage);
})


// listening on game data
socket.on('gameResults', (gameResults) => {
    console.log(gameResults);
    //save the name and the game results in session storage
    sessionStorage.setItem('userNames', gameResults.userNames);
    sessionStorage.setItem('eachUserScores', gameResults.eachUserScores);
    sessionStorage.setItem('teamScore', gameResults.teamScore);


    //redirect the user to lobby
    window.location = './index.html'
})


// start recall stage
socket.on('startRecall', () => {

    let timeLeft = 30;
    let elem = document.getElementById("game-timer");
    var timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {

            clearTimeout(timerId);
            // emit to socket gameOver when timer runs out
            socket.emit('gameOver');

        } else {
            if (isDigit(timeLeft)) {
                elem.innerHTML = '00:0' + timeLeft;
            } else {
                elem.innerHTML = '00:' + timeLeft;
            }

            timeLeft--;
        }
    }
})

// receive game data from server
socket.on('gameBegins', (gameData) => {
    gameData = gameData.roomName;

    let gameWindow = document.getElementById('game-box-msgs');

    // populate game window
    for (let i = 0; i < gameData.length; i++) {

        let word = document.createElement('p');
        word.classList.add("word-background");
        word.innerText = gameData[i];
        gameWindow.appendChild(word);
    }

    // hide the start button
    document.getElementById('start-button').style.visibility = 'hidden';

    // start timer
    let timeLeft = 30;
    let elem = document.getElementById("game-timer");
    var timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {

            clearTimeout(timerId);

            document.getElementById('info').innerHTML = "💡 Enter below as much words as you can recall";
            gameWindow.innerHTML = " ";

            // Show Words Input and Send Button
            let msgInput = document.getElementById('word-input');
            msgInput.style.visibility = 'visible';

            // tell server, memorization stage is over
            socket.emit('memorizationDone');

        } else {
            // show correct time
            if (isDigit(timeLeft)) {
                elem.innerHTML = '00:0' + timeLeft;
            } else {
                elem.innerHTML = '00:' + timeLeft;
            }

            timeLeft--;
        }
    }
})

// get progress data (game stats) and show on game window
socket.on('currentScore', (progressData) => {

    let userName = "<span style='color: " + progressData.nameColor + ";'>" + progressData.name + "</span>"
    let separator = "<span style='color: " + 'white' + ";'>" + ": " + "</span>"
    let word = "<span style='color: " + progressData.color + ";'>" + progressData.data + "</span>"

    let spans = [userName, separator, word];

    let texthtml = spans.join(" ");

    let paragraph = document.createElement('p');
    paragraph.classList.add("word-background");

    paragraph.innerHTML = texthtml;

    let gameWindow = document.getElementById('game-box-msgs');

    gameWindow.appendChild(paragraph);

    // automatic scroll if we type more
    gameWindow.scrollTop = gameWindow.scrollHeight;


    // add data to window screen and score to total score
    let gameScore = document.getElementById('game-score');
    gameScore.innerHTML = progressData.score;


    // update individual score
    let currentname = document.getElementById("user-name").innerHTML;

    if (currentname == progressData.name) {
        document.getElementById("user-score").innerHTML = progressData.namedScore;
    }

    // show words left
    let wordsDisplay = document.getElementById('game-words-left');
    wordsDisplay.style.visibility = 'visible';

    // update words left
    let wordsLeft = document.getElementById('words-left');
    wordsLeft.innerHTML = progressData.wordsLeft;


})



window.addEventListener('load', () => {
    init(); //start type writer effect on header

    // get username and show on game page
    let userName = document.getElementById('user-name');
    userName.innerHTML = sessionStorage.getItem('name');

    // get game level and show on game page
    let gameLevel = document.getElementById('game-header-msg')
    gameLevel.innerHTML = "Level: " + sessionStorage.getItem('room').toUpperCase();


    // Hide Words Input and Send Button
    let msgInput = document.getElementById('word-input');
    msgInput.style.visibility = 'hidden';


    let sendButton = document.getElementById('send-button');
    sendButton.style.visibility = 'hidden';

    let wordsLeft = document.getElementById('game-words-left');
    wordsLeft.style.visibility = 'hidden';

    // listen for start button and emit data
    let startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        socket.emit('gameStart');
    })


    // send words that you remember
    let gameForm = document.getElementById('game-form');

    gameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let name = sessionStorage.getItem('name');
        let word = document.getElementById('word-input').value;
        // console.log(name, word);

        //emit the information to the server
        wordObject = {
            'name': name,
            'word': word
        }

        // emit user's name and his or her word input
        socket.emit('wordInput', wordObject);

        // clear input after sending
        document.getElementById('word-input').value = " ";
    })

})



class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}



function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}


function isDigit(val) {
    return String(+val).charAt(0) == val;
}