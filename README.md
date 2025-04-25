-> To clone the app run:
  git clone https://github.com/PrasadTirri/task-management.git

-> To run the app:
  npm install
  npm run dev

->  Explanation:

This project is built using React and Tailwind CSS for a responsive UI. It uses json-server as a mock REST API to store and persist task data.

The board is divided into 3 columns representing task statuses: To Do, In Progress, and Done.

Tasks are fetched from the API and filtered based on their status.

New tasks can be added via a modal form.

Tasks can be moved between columns using react-dnd-html5-backend, react-dnd and each movement updates the backend.

State is managed using local component state and effects.



-> Improvements

Add inline task editing and deletion

Implement filter/sort/search features

Use a global state manager like Redux or Zustand for better state handling

Add basic authentication for user-specific task boards

Refactor components to be more modular and reusable


-> Technology	Rating
React.js	9/10
JavaScript 9/10
CSS	9/10
react-dnd	8/10
json-server (API mock)	9/10
  
