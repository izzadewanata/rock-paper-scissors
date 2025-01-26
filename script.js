// Initialize variables
let model, webcam, maxPredictions;
const gameResult = document.getElementById('gameResult');
const gestureElement = document.getElementById('gesture');

// Load the Teachable Machine model
async function initModel() {
    const modelURL = "https://teachablemachine.withgoogle.com/models/bnpI4lnXS/model.json";
    const metadataURL = "https://teachablemachine.withgoogle.com/models/bnpI4lnXS/metadata.json";

    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Setup webcam
    webcam = new tmImage.Webcam(400, 400, true); // Width, height, flip
    await webcam.setup(); // Request access to webcam
    await webcam.play();
    document.getElementById('container_video').appendChild(webcam.canvas);

    // Start webcam update loop
    window.requestAnimationFrame(loop);
}

// Webcam update loop
async function loop() {
    webcam.update(); // Update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// Make predictions based on the webcam feed
async function predict() {
    const predictions = await model.predict(webcam.canvas);
    let highestPrediction = predictions.reduce((prev, curr) => (prev.probability > curr.probability ? prev : curr));

    // Update the detected gesture in the UI
    gestureElement.innerText = `Detected: ${highestPrediction.className}`;

    // Return the gesture with the highest confidence
    return highestPrediction.className;
}

// Start video when the button is clicked
document.getElementById('startVideo').addEventListener('click', async () => {
    await initModel();
});

// Start game when the button is clicked
document.getElementById('startGame').addEventListener('click', async () => {
    const userGesture = gestureElement.innerText.split(': ')[1]; // Get the detected gesture
    playGame(userGesture);
});

// Function to play the game based on user gesture and random computer choice
function playGame(userChoice) {
    if (!userChoice || userChoice === "Waiting for your gesture...") {
        alert("Wait a minute, Gamers!\nClick the Start Video button to start the game :D");
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
