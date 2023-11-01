#  MemoICE Project Documentation 

![Landing Page](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/landingPage2.png)


## Description

MemoICE is a memory game designed to train the brain , increase once's vocabulary and build friendship. Users (two players each) play against time to memorize words shown them. Then write all the words they remember to earn points. 

There are individual points and team points. The team point is calculated as (sum of individual points - wrong inputs). If players work together without chasing higher individual points, they will earn not only high individual points but also high team score. 

MemoICE has easy, medium, difficult and pro levels for everyone. Users can select the level and enter the room designed purposely for such level of gaming. 

Users have same time (30s) under each level to recall words of varying lengths and number of words. 7 easy words, 10 medium words, 12 hard words and 15 pro words. 

It is fun, nerve racking, brain teasing and a powerful relationship builder. 



**Built using Node, Express, and socket.io**

## Website
The working link to final webpage [WebPage-Final](https://memo-ice-game.glitch.me)

![show Page final](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/wordsShowPage.png)

The link to the [Functional page without styling](https://memo-ice-progress6.glitch.me)

![show page before](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/evaluationcomplex.png)



## Inspiration , Concept & Context

---

>  You wanna up your memorization game and build friendships at the same time? Play memoICE with a stranger. 
> -- Eric (CTO)

---

## Production
   ### The Plan
   I will be building MemoICE in two phases. The first phase will be purely functional with less aesthetics for user testing whilst the second phase will be an upgrade on the UI based primarily on the results of the user testing. 

   ### The WireFrame
   
   * I started off with a simple sketch of the game flow to inform the phase 1 coding. I didn't make a lot of sketches in project two because I focussed more on the communication between client and server (game flow) which is listed below. The user interface became really clear as a result of the user testing. 

  ![Layout Sketch](https://eric-asare.github.io/ConnectionsLab/week10/memoICE/design/wireframe.png)

  
   ### The Game Flow Steps 
   *  Two users  enter their name and join the same room from the lobby or landing page ( There are 4 rooms based on game difficulty : easy, medium, hard, pro levels)
   * When a third User Join, he or she is prompted to join another room
   
   *  Only one user has to click the start button. Once, the start button is clicked, the client side sends a signal to the server to load the game data ( ideally , words to test users based on level selected). 
   
   *  Client upon receiving this game data displays to the users and starts the memorization timer. 
   
   *  Once the timer is done, the clients sends to server memorization time is over, the server sends to the client to start recalling. a text box appears to the users telling them to enter the words they remember. A timer for this stage of the game begins to cause the users to feel a sense of urgency.
   
   * When users submit a word, the data is sent from the client side to the server side 
   
   * The server upon receiving the wordInput data prepares a progress report to send to client by 1. keeping track of the name of the user who submitted the word, 2. where the word is correct or wrong 3. Score increment and deduction
   
   * The client upon receiving the progress report back displays to the user in a game window

   *  When the recalling phase timer is over, the client send to server gameOver, the server then emits to the client to change the game page to the lobby page showing the users their results and allowing them to play the game again. 
         
   ### User Testing 
   
   The user testing page (progress 3): [Just Functional enough for user testing](https://ivory-prism-crafter.glitch.me/)
   
   #### Testing Questions & User Answers
   
   **Disclaimer:** Names of participants omitted for privacy. Users responses are weaved into a single answer. 
   
   * What is your first impression of the product? <br>
   **Ans:** It is an interesting game. The easy level is going to be easy. The words will be straigtforward.

   * What is going in your mind as you interact with this product?<br>
   **Ans:** This is interesting. The game play seems straight forward. Are all these words? Where did you get these words? Wait the easy level is not as easy as it seems. I am too dumb. I should type fast,time ticking. 

   * What did you expect to happen?<br>
   **Ans:** Thought it was a competition game but turns out to be a collaboration game? Thought it would be easy. 

   * Does this feel like it was designed for you?<br>
   **Ans:** Oh yes!,  No I am too dumb, my memory not so good for this game lol. Could be easier. 


   * What would you change? What should be added or removed to enhance your experience.<br>
   **Ans:**
      1. Could you clearly tell players whether they are collaborating or competing against each other.
      2. Could you clear the input so that I don't have to clean it when typing a new word
      3. Can you show whether I am alone in the room or the room is full?
      4. Can we have a link to go back to the LOBBY/ level selection
      5. What are we playing the against if it is not against each other? Can you add a Time pressure? 
      6. Is there a way to know the number of words left to type
      7. Can you colour code based on player
      8. Could you add an element of competition among the Users
      9. Could you separate clearly the words each player typed
      10. What happens if I type the same "correct" word. Is the score incremented or stays the same? (Prof :) )
      11. Could you randomize the words? If I play for a long time. I would want to see new words
      12. You could use [pantone colors](https://www.pantone.com/uk/en/color-of-the-year-2022-palette-exploration) for the UI 
      
   * Since this is still a project in development what would you like to see in the newer version?<br>
   **Ans:** 1. Maybe a communication system so that users can talk to each other as they play the game 2. Hints for the words if we fail guess

  #### Updates from User Testing (7th April 2022)
  User testing allowed me to discover what was important to my users rather than what I wanted to build.<br>
  I implemented the following from the user testing to enhance the overall game experience. 
  
  1. I added text **COLLABORATE** to tell users this game is about collaboration as it is about competition in the game result.<br>
  ![congrats page](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/congratsPage.png)
  
  2. Cleared the input area so that users may simply type new words without having to delete previous ones.
  
  3. I added alert messages to inform users if they should wait for a game partner to join or play the game as room is full.<br>
   ![wait for team member](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/waitforTeamMember.png)
  ![team members full](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/teamMembersFull.png)
 
  ![room full](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/roomFull.png)

   4. Removed the send button because users were confused whether they could submit by presssing enter. Since the game is time pressured, any little time lost in the process is nerve wracking.

   5. Made Sure that user can enter room only after entering name

   6. Added a timer to heat up the recall stage. Users feel a sense of urgency to type all the words they can remember as fast as they can. To display the timer nicely, I had to check if I am dealing with a single digit so that the timer don't appear as shown below. Helpful resource linked below.<br>

       ![is Digit](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/isDigit.png)
        
   7. Added a `div` just below the timer to allow the user know the the number of words left to recall

        ![wordsLeft](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/wordsLeft.png)


   8. Color coded users using two colors defined from server
        ![colorCoding](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/colorCoding2.png)


   9. Added sanity checks to not increment score if the word is already typed


   10. Added a type writer effect to give users a feel of what's the game is about in an ironic way. Sad I couldn't show this in class.<br>
         ![is Digit](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/memoICE.gif)



   11. Made the instructions clear by adding an idea/hint * emoji/ changing the instruction depending the stage of the game <br>
   ![Memorize](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/instructionsChange1.png)
   ![Recall](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/instructionsChange2.png)

   12. Added a single line of code `  elem.scrollTop = elem.scrollHeight;` which makes it easier to users to focus on the game and not scroll as they type their answers. essentially, an automatic scroller

   13. Added repeat emoji if word is repeated, correct emoji if correct and wrong emoji if wrong
   ![eval](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/eval.png)

   14. Kept track of each players score
    ![addedUserScore](https://eric-asare.github.io/ConnectionsLab/projectTwo/design/doc-images/addedUserScore.png)



## Challenges & Solutions
* For the individual score, I tried to storing the initial score in local storage but realize there is no need to. I can keep a score board with names stored in a similar ways to how I stored the names for easy retrieval. This is how the scores work, think I need an info page for that . or I can explain on the pop up score page. Individually, these are your scores but togehter this are your scores, the together will appear smaller because all wrongs committed on both side are accounted. So if you plan to play collaborately and not be greedy to get all the correct words, you will attempt few minimizing the wrongs and having a total score big enough. 

* The glitch was solved by add ` word = word.trim();` which removes all spaces before evaluation. 


``` javascript

  scoreBoard[socket.roomName] = [0, 0];

  
        // if word in word bank and has not already been marked as correct

        if (wordBank[socket.roomName].includes(word) && !(roomCorrectWords[socket.roomName].includes(word))) {

            //increase overall score
            roomScore[socket.roomName] += 1;



            // increment current User score
            scoreBoard[socket.roomName][currentUserIndex] += 1

            let score = roomScore[socket.roomName];
            let currentUserScore = scoreBoard[socket.
            roomName][currentUserIndex];

     
            progressData['score'] = score;

            progressData['namedScore'] = currentUserScore;

        

            // if word is a duplicate, do nothing to total score
        } else if (roomCorrectWords[socket.roomName].includes(word)) {

            let score = roomScore[socket.roomName];
    
            let currentUserScore = scoreBoard[socket.roomName][currentUserIndex];
    
            progressData['score'] = score;
            progressData['namedScore'] = currentUserScore;
        

        } else {

            // if score is not already zero, decrement score
            if (roomScore[socket.roomName] > 0) {
                roomScore[socket.roomName] -= 1;
            }
            let score = roomScore[socket.roomName];
            let currentUserScore = scoreBoard[socket.roomName][currentUserIndex];
            progressData['score'] = score;
            progressData['namedScore'] = currentUserScore;
        
        }
```

* The word evaluation system broke down when I tried to color code the users. I couldn't fix it and had to present the broken code in class. Even though the UI had been improved, the backend was still breaking. - went back to the old code and try to trace what was wrong. 

* The color Coding was not working. Changed from Hex to words like black and it is working. 

* Even though implementing alert to inform the user whether the room is full or not clears confusion when users are using the application, It felt annoying to always close the alert popups. So I look around for an alternative. 
It appears that you can control [in built alert](https://stackoverflow.com/questions/15466802/how-can-i-auto-hide-alert-box-after-it-showing-it). This failed to work because it was subtle and users couldn't even notice it in use.I switched back to the alert popups. 


* The window was changing as soon as timer stops, used setTimeout to delay the change by 2 seconds. Change it to 1second so that user don't feel the wait



## Lessons
  #### Technical & Design
* Lots of bugs in client-socket communication can be solved by running the little client -server communication as I write 

* Learned you can create a type writer effect by using Javascript classes (https://codepen.io/bradtraversy/pen/jeNjwP)


  #### General

* It is good to be ambitious but always take a step back to evaluate what you have and think of how to maximize the user experience. For instance, I wanted to add NeDB for score Board, a bubble floating word etc. However as described above, I found other ways to accomplish the same user experience and even better ways by just working with what I have. 


* Always try new things, some might break your code, but it is fine, it is the learning experience that matters, you can always go back to your previous working code. Thanks to github, glitch and discord, I could go back to my previous working code to trace the error in the updated code. It was so easy to work from the old code to the updated code since I documented how I did. 


* Practice Indeed make perfect. At first , I need to watch a youtube video with good explanation to even understand code not written by me. During this project, I could read a lot of javascript code online, in forums, on stackover , somethings even without explanatory text but could understand what the programmer is trying to do. 


* I learned I need to have at least a visual representation or logical flow of whatever I am doing / coding. I realized this when I sat for 2hrs non-stop sketching on paper how I wanted the project to look like and the game flow to be like. Having that physical and mental picture made it easy to code 


##  Next Steps
  * Add Words Shuffler or Generator (API)
  * neDB for Score Board to keep track of high scorers
  * Ticking Timer Sound when the timer reaches 00:05 down to  00:00
  * This game would be perfect if there is also the option to communicate over the internet as they play the game. 


## Refrences & Resources
* Noteworthy material utilized in service of the research, production and delivery of the project

*  Identifying a single digit:  https://stackoverflow.com/questions/3843647/javascript-best-way-to-tell-if-a-val-is-a-single-digit

* Timer: https://stackoverflow.com/questions/4435776/simple-clock-that-counts-down-from-30-seconds-and-executes-a-function-afterward

* Popup Screen: https://codepen.io/imprakash/pen/GgNMXO

* Get box shadow css:  https://getcssscan.com/css-box-shadow-examples

* Typewriter effect: https://codepen.io/bradtraversy/pen/jeNjwP


* Helpful library for creating word bubles
Animated text sphere in JavaScript using TagCloud.js (https://dev.to/asmit2952/animated-text-sphere-in-javascript-using-tagcloud-js-1p72)

* Need to generate random color in javascript : used this site https://css-tricks.com/snippets/javascript/random-hex-color/


*  Host server-client projects on glitch:  https://glitch.com/


