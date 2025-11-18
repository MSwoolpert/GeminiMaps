Gemini Map Creator
This is a web application that allows a user to generate an interactive Google Map using natural language prompts. It uses the Google Gemini API to interpret the user's request and dynamically generate JavaScript code for the Google Maps Platform.

The application features a CNN-inspired design and includes map editing tools like custom markers, text overlays, and drawing shapes.

Features
Natural Language to Map: Generate interactive maps by typing in a prompt (e.g., "Show a satellite map of New York City with a marker on the Empire State Building").

AI-Powered: Uses the Google Gemini API to understand the prompt and create the corresponding map code.

Dynamic Code Execution: The Node.js backend fetches the code from Gemini, and the frontend securely executes it to render the map.

Rich Map Editing Tools:

Draw shapes (polygons, rectangles, circles).

Add custom, draggable markers (Airport, Disaster, etc.).

Place draggable text overlays on the map.

CNN-Inspired UI: Includes custom styling, logos, and modal pop-ups for "Publish" and "Add Data".

Technology Stack
Backend: Node.js, Express.js

Frontend: HTML5, CSS3, JavaScript (ES6+)

APIs:

Google Gemini API (via @google/genai SDK)

Google Maps JavaScript API

Environment: dotenv for secure management of API keys.

Setup and Installation
Follow these steps to get the application running on your local machine.

1. Prerequisites
Node.js: You must have Node.js (version 18 or newer) installed.

Google Cloud Project: You need a Google Cloud project with the following:

An active billing account.

Generative Language API enabled.

Maps JavaScript API enabled.

API Keys: You need to generate two API keys from your Google Cloud project:

A Gemini API Key.

A Google Maps Platform API Key.

2. Installation
Clone or download this repository to your local machine.

Navigate to the project directory in your terminal (e.g., gemini-maps-final):

Bash

cd gemini-maps-final
Install the required Node.js dependencies:

Bash

npm install express @google/genai dotenv cors
3. Configuration
Create a file named .env in the root of the project directory.

Add your API keys to this file. It must be named exactly .env.

GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE

How to Run the Application
Start the Backend Server: Run the following command from the project's root directory:

Bash

node server.cjs
Note: If your server file is named server.js and you encounter a ReferenceError: require is not defined error, your package.json likely contains "type": "module". Rename your server file to server.cjs as shown above to resolve this.

View the Application: Once the server is running, you will see this message in your terminal:

Server running at http://localhost:3000
Open your web browser and navigate to http://localhost:3000.

Use the App: Type a prompt (like the one we used, "Show US Map with Illinois highlighted and New Canton labeled") into the text box and click "Create Map".
