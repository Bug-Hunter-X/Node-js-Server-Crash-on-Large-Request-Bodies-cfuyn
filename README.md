# Node.js Server Crash on Large Request Bodies

This repository demonstrates a common error in Node.js servers where they can crash when receiving large request bodies.  The issue stems from not handling potential errors and exceeding memory limits.

## Bug

The `bug.js` file contains a vulnerable server implementation that doesn't handle large request bodies gracefully.  It will crash if a request body exceeds available memory. 

## Solution

The `bugSolution.js` file provides a corrected server implementation. It includes error handling for large request bodies using the `'error'` event listener on the `req` object.  If the request body is too large, it responds with a `413 Payload Too Large` status code. Additionally, error handling during JSON parsing prevents crashes due to invalid JSON input. 

## How to reproduce the bug

1. Clone the repository.
2. Run `node bug.js`.
3. Send a large POST request (e.g., using curl or Postman) to `http://localhost:3000` with a large JSON payload. The server will likely crash.

## How to test the solution

1. Clone the repository.
2. Run `node bugSolution.js`.
3. Send a large POST request to `http://localhost:3000` with a large JSON payload. The server will respond with a `413 Payload Too Large` status code instead of crashing.