# Fullstack Project Checklist (No Database)

## Setup

### Initial Configuration

- [x] Create a parent directory for the project to house both frontend and backend directories.
- [x] Inside the parent directory, create a `backend` folder and initialize it (`npm init -y`).

### Backend Setup

- [x] Within the `backend` folder, create `app.js` and `server.js` files to set up the server.
- [x] Install necessary dependencies: `npm install dotenv express cors`.
- [x] Add a `.gitignore` file and list `node_modules`, `.env`, and any other sensitive files.
- [x] Create a `.env` file to store environment variables (e.g., PORT).
- [x] In `app.js`, integrate middleware for CORS and JSON body parsing: `cors()` and `express.json()`.
- [x] Test the server setup to ensure it runs correctly.

### Data and Routes

- [x] Add a `model` folder (or file) to simulate data storage.
- [x] Create a `controller` folder and add relevant controller files for business logic.
- [x] Set up routing: Create a `router` folder/file and define routes.
- [x] Connect the router to `app.js`.
- [x] Implement a GET route to return all mock data.
- [x] Test the GET route using Postman or a browser.

### Frontend Setup

- [x] Copy a basic Vite React template into a new `frontend` folder within the parent directory.
- [x] Test the frontend setup to confirm it's working.
- [x] Create a component to retrieve data using the backend's GET All route and nest it within `App.jsx`.
- [x] Implement state management in `App.jsx` to handle the fetched data.
- [x] Use `useEffect` to fetch data from the backend and set the state accordingly.
- [x] Ensure the fetched data is displayed on the page.

### Integrating Create Functionality

- [x] On the backend, add a POST route to handle data creation requests.
- [x] Test the POST route with Postman - also test with cURL
- [x] On the frontend, create a Form component with controlled inputs for data submission.
- [ ] Implement form submission handling to POST data to the backend.

### Adding Single Item Fetching

- [x] On the backend, create a GET route to return a single item by its `id`.
- [x] Test the single-item GET route with Postman.
- [x] On the frontend, create a Details component to display the fetched item.

### Implementing Delete Functionality

- [x] On the backend, add a DELETE route to remove an item by its `id`.
- [x] Test the DELETE route with Postman.
- [x] On the frontend, within the component listing all items, add a Delete button with an associated deletion handler.

### Additional Features

- [x] Implement a toggle state in `App.jsx` to control the visibility of the Details component.
- [x] Ensure the Details component is displayed conditionally based on the toggle state.
- [x] Add functionality to hide and show the form based on a toggle state in `App.jsx`. 

## Testing

- [x] Thoroughly test the application by running both frontend and backend servers simultaneously.
- [x] Verify that all functionalities (Create, Read, Delete) work as expected and data is correctly managed between the frontend and backend.