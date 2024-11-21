# Rock, Paper, Scissors Game Guide
**Design by Izza Sinatrya**

This game involves gesture-based "Rock, Paper, Scissors," allowing players to play against the computer by showing gestures in front of a camera. The game uses machine learning to recognize hand gestures via a webcam and automatically classifies them. Here’s how the game works and the rules for playing:

## How to Play
1. **Start Video for Gesture Recognition**:
   - **Activate the Webcam**: Press the "Start Video" button to activate your webcam. The game uses the live video feed to detect and classify your gestures.
   - **Recognize Your Gesture**: Once the video is running, the system will recognize your hand gesture as either "Rock," "Paper," or "Scissors" and display the identified gesture in real-time.

2. **Show Your Gesture**:
   - Position your hand clearly within the webcam frame, and the game will automatically detect your hand gesture. The recognized gesture will appear on the screen.

3. **Start the Game**:
   - When you’re ready to play, press "Start Game." The game will then use your recognized gesture (either "Rock," "Paper," or "Scissors") as your choice.
   - The computer will also make a random choice for "Rock," "Paper," or "Scissors."

4. **Determine the Winner**:
   - The game compares your gesture with the computer’s choice and determines the result based on standard "Rock, Paper, Scissors" rules:
     - **Rock** beats **Scissors**.
     - **Scissors** beat **Paper**.
     - **Paper** beats **Rock**.
   - If both choices are the same, it’s a tie.

5. **View the Result**:
   - The game displays the computer’s choice and announces the result, showing if you won, lost, or tied.

## Additional Notes
- **Video Control**: You can toggle the video on or off using the "Start Video" button. If you choose to stop the video, gesture recognition pauses until it’s reactivated.
- **Error Handling**: If webcam access is not granted, you’ll be prompted to enable it to proceed.

Enjoy the game by showing your gestures confidently, and see if you can beat the computer!

<br>