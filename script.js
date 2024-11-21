// DOM elements
const startGame = document.getElementById("startGame"); // Button to start the game
const startVideo = document.getElementById("startVideo"); // Button to start/stop the webcam video
const gesture = document.getElementById("gesture"); // Element to display the user's gesture
const video = document.getElementById("video"); // Video element to show webcam feed
const gameResult = document.getElementById("gameResult"); // Element to display game results

// URL of the machine learning model for gesture recognition
const modelUrl = "https://teachablemachine.withgoogle.com/models/jjt693_wG/model.json";
let userChoice = ""; // Stores the user's detected gesture choice

// Initialize the classifier with the model URL
let classifier = ml5.imageClassifier(modelUrl);

let stream = null; // Stream object for webcam
let isVideoActive = false; // Track the state of the video

// Add event listener for toggling webcam video
startVideo.addEventListener("click", toggleVideo);

async function toggleVideo() {
  if (isVideoActive) {
    // Stop the video by stopping all media tracks
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null; // Disconnect the video source
    isVideoActive = false;
    startVideo.innerText = "Start Video"; // Update button text
    startVideo.classList.remove("stop"); // Reset button styling
  } else {
    // Start the video by accessing webcam and displaying it in the video element
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream; // Set webcam stream as video source
      video.play();
      isVideoActive = true;
      startVideo.innerText = "Stop Video"; // Update button text
      startVideo.classList.add("stop"); // Update button styling
      classifyGesture(); // Start gesture classification
    } catch (error) {
      console.error("Error accessing the webcam:", error);
      alert("Please enable the webcam to play the game."); // Notify user if webcam access fails
    }
  }
}

// Function to classify the gesture shown on video
function classifyGesture() {
  if (isVideoActive) {
    classifier.classify(video, (results) => {
      userChoice = results[0].label; // Update userChoice with the detected gesture
      gesture.innerHTML = `Your Gesture: <b>${userChoice}</b>`; // Display the detected gesture
      classifyGesture(); // Recursively classify gestures in a loop
    });
  }
}

// Add event listener for the game start button
startGame.addEventListener("click", () => {
  playGame(userChoice);
});

// Function to play the game based on user gesture and random computer choice
function playGame(userChoice) {
  if (!userChoice) {
    alert("Hi there!\nClick the Start Video button to start the game");
    return;
  }

  let choices = ["Rock", "Paper", "Scissors"]; // Possible choices for the game
  let randomNumber = Math.floor(Math.random() * choices.length); // Randomly select a choice
  let computerChoice = choices[randomNumber]; // Assign computer choice
  let result = ""; // Game result

  // Determine game outcome
  if (userChoice === computerChoice) {
    result = "It's a TIE!";
  } else if (
    (userChoice === "Rock" && computerChoice === "Scissors") ||
    (userChoice === "Scissors" && computerChoice === "Paper") ||
    (userChoice === "Paper" && computerChoice === "Rock")
  ) {
    result = "You WIN!";
  } else {
    result = "You LOSE!";
  }

  // Display the game result
  gameResult.innerHTML = `Computer chose: ${computerChoice}.<br><b>${result}</b>`;
  gameResult.classList.remove('hide'); // Show result if hidden
}