# localStorage

These functions collectively get data from server and form input to then display it on client side

## 1. Retrieving and Setting Logs from Local Storage

```jsx
useEffect(() => {
  const storedLogs = JSON.parse(localStorage.getItem('logs')) || [];
  setLogs(storedLogs);
}, []);
```

### Purpose
This function is designed to retrieve the logs stored in the browser's local storage upon the initial render of the application. It ensures that user data is persistent across sessions, enhancing the user experience by providing immediate access to previously entered logs without needing to fetch them from a server.

### How It Works
- **`useEffect` Hook:** Executes the function inside it after the initial render and not on subsequent re-renders, as indicated by the empty dependency array (`[]`).
- **Retrieval and Parsing:** The `localStorage.getItem('logs')` retrieves the logs as a JSON string, which `JSON.parse()` then converts into a JavaScript array.
- **Setting State:** The `setLogs` function updates the `logs` state with the retrieved array. If no logs are stored, an empty array is set as the default state.

### Importance
Ensuring data is immediately available upon application load improves performance and user satisfaction, as it eliminates the need for redundant data fetching and rendering delays.

## 2. Saving Logs to Local Storage

```jsx
useEffect(() => {
  localStorage.setItem('logs', JSON.stringify(logs));
}, [logs]);
```

### Purpose
This function automatically saves the current state of logs to the local storage whenever the `logs` state changes. This is crucial for data persistence, ensuring that any additions, deletions, or modifications to the logs are preserved across browser sessions.

### How It Works
- **`useEffect` Hook with Dependency:** Reacts to any changes in the `logs` state. The function inside `useEffect` runs every time the `logs` state updates.
- **Serialization and Storage:** Converts the `logs` array into a JSON string using `JSON.stringify()` and stores it in local storage under the key `'logs'`.

### Importance
Automatically updating local storage with state changes ensures data integrity and persistence without manual intervention, streamlining the user experience.

## 3. Handling Form Submission

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log)
  };
  fetch('http://localhost:3333/logs/', options)
    .then((res) => res.json())
    .then((data) => setLogs(data.logs))
    .then(() => {
      setToggleForm(false)
    })
}
```

### Purpose
This function handles the submission of new log entries through the `LogForm` component. It sends the log data to a server and updates the application state based on the server's response.

### How It Works
- **Form Submission Event:** Prevents the default form submission behavior to handle the process programmatically.
- **Fetch API:** Sends the new log data to the server using a POST request. The log data is serialized into a JSON string and included in the request body.
- **State Updates:** Upon successful submission and response from the server, the `logs` state is updated with the new log data, and the form is hidden by setting `toggleForm` to false.

### Importance
This function is integral to the application's interactivity, allowing users to add new logs seamlessly. It connects the frontend to the backend, ensuring that data is consistently synchronized between the user interface and the server.

# Testing App

**Doing a POST request currently won't modify the data in the server**

To send the JSON object to the endpoint `http://localhost:3333/logs/` using `curl`, you'll open your terminal or command line interface and use the following command:

```bash
curl -X POST http://localhost:3333/logs/ \
-H "Content-Type: application/json" \
-d '{"captainName": "Juli", "title": "What is sleep?", "post": "Never heard of it lol", "mistakesWereMadeToday": true, "daysSinceLastCrisis": 0}'
```

This command will send a POST request to your local server running on port 3333 at the `/logs/` endpoint with the specified JSON data. Make sure your server is running and listening on port 3333 before executing this command!

Yes, the `curl` request was successful. The server responded with a JSON object that includes an array of `logs`, with the last entry showing the data you sent:

```json
{
  "captainName": "Juli",
  "title": "What is sleep?",
  "post": "Never heard of it lol",
  "mistakesWereMadeToday": true,
  "daysSinceLastCrisis": 0,
  "id": 8
}
```

This indicates that the server successfully received your POST request, processed it, and added your new log entry to its collection. The new entry has been assigned an `id` of `8`, which typically signifies that it has been stored successfully and can be uniquely identified within the system. The response doesn't explicitly state a status code because `curl` in its default mode does not show HTTP status codes unless you include the `-i`, `-I`, or `-v` flag. However, the JSON response content clearly indicates a successful operation.

## Testing using Postman

To send the same data to `http://localhost:3333/logs/` using Postman, follow these steps:

1. **Open Postman**: Start by launching the Postman application on your computer.

2. **Create a New Request**: Click on the "New" button or the "+" tab to open a new request tab.

3. **Set the Request Type**: In the dropdown menu near the request URL field, select "POST" as the type of request you're making.

4. **Enter the Request URL**: Type `http://localhost:3333/logs/` into the request URL field.

5. **Set Headers**: Navigate to the "Headers" tab in the area below the URL field. You need to specify that you're sending JSON data. Add a new header with `Key` as `Content-Type` and `Value` as `application/json`.

6. **Enter the JSON Data**:
   - Go to the "Body" tab just below the URL field.
   - Select the "raw" radio button.
   - A dropdown menu next to the radio buttons will appear, likely set to "Text" by default. Click on it and select "JSON".
   - In the text field that becomes available, enter your JSON data:
     ```json
     {
       "captainName": "Juli",
       "title": "What is sleep?",
       "post": "Never heard of it lol",
       "mistakesWereMadeToday": true,
       "daysSinceLastCrisis": 0
     }
     ```

7. **Send the Request**: Click the "Send" button to send your request to the server.

8. **Review the Response**: After sending the request, the response will be displayed in the lower section of the Postman window. A successful request will typically show a `200 OK` or `201 Created` status code in the response status. Additionally, you can review the response body to see the data returned by the server, which should include the data you sent along with any additional information or identifiers added by the server, such as an `id` for the new log entry.

This process allows you to manually test API endpoints by sending requests and viewing responses directly within Postman, which can be particularly useful for debugging and development purposes.