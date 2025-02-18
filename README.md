# Interactive Quiz Platform 🎓

## Features ✨

### Quiz Creation & Management 📝

- Display a list of pre-defined quiz questions (from the provided sample).
- Allow users to take the quiz multiple times.
- Show users’ quiz attempt history.

### User Interaction 💬

- Allow users to select answers and provide instant feedback (correct/incorrect).
- Implement a timer (e.g., 30 seconds per question).

### Progress Tracking 📊

- Show a scoreboard at the end of each quiz attempt to track the user's score.

### Bonus Features 🎁

- Save the user's quiz history using IndexedDB to track past attempts.

## Deployment 🚀

- Deployed App: [Link to Deployed App](https://dacoidinteractivequiz.netlify.app/)
- GitHub Repository: [Link to GitHub Repository](#https://github.com/LaKhWaN/interactive-quiz)
- Deployment on Vercel or Netlify.

## Tech Stack 🛠️

- Frontend: Vite
- Modern responsive UI design
- Mobile compatibility

## Setup Instructions ⚙️

### Prerequisites 📋

- Node.js
- npm or yarn

### Installation 📥

1. Clone the repository:
   ```bash
   git clone https://github.com/LaKhWaN/interactive-quiz
   ```
2. Navigate to the project directory:
   ```bash
   cd interactive-quiz
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App ▶️

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173`.

### Deployment Steps 🌐

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to Vercel or Netlify.

## Code Quality 🧹

- Followed best practices and coding standards.
- Included comments and documentation for better understanding.

## Edge Case Handling 🛡️

- Handled cases where the user selects no answer.
- Managed timer expiration scenarios.

## UI/UX Design 🎨

- Clean and intuitive interface.
- Responsive design for mobile and desktop.
- Instant feedback for user interactions.

## Quiz Logic 🧠

- Randomized question order for each attempt.
- Accurate scoring and feedback mechanism.

## Bonus Features 🎁

- IndexedDB for storing quiz history.
- Persistent data across sessions.

## License 📄

This project is licensed under the MIT License.
