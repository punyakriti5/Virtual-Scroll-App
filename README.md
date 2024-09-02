# Virtual-Scroll-App

Overview
---------------------------------------------------------------------------------------------
The Virtual Scroll application demonstrates the use of virtual scrolling to efficiently render a large list of items by loading only a subset of items into the DOM. This helps improve performance and user experience by reducing the number of DOM nodes rendered at any time.

Architecture
---------------------------------------------------------------------------------------------

Frontend
React: The application uses React for building the user interface.
react-window: A library for efficiently rendering large lists and tabular data.
axios: For making HTTP requests to fetch data from the server.
Jest: Used for unit testing the components and functionality.

Backend
Express: The backend server is built using Express to handle HTTP requests.
Cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
Simulated Network Delay: The server simulates a network delay to mimic real-world scenarios.

Implementation
---------------------------------------------------------------------------------------------

Frontend
VirtualScroll Component (src/VirtualScroll.jsx):

Imports:
useState, useEffect: For managing state and side effects.
FixedSizeList from react-window: For virtualizing the list.
AutoSizer from react-virtualized-auto-sizer: To automatically adjust the size of the list.

State Management:
items: Holds the list of items fetched from the server.
loading: Tracks the loading state of data.

Data Fetching:
Uses axios to fetch data from the backend.
useEffect triggers data fetching on component mount and handles pagination.

Rendering:
FixedSizeList is used to render only the visible items to improve performance.
Conditional rendering based on loading state.

Backend
Server Setup (server.js):

Imports:
express: For setting up the server.
cors: For enabling CORS.

Data Generation:
generateItems(count): Function to create a large dataset.

Endpoints:
GET /api/items: Endpoint to fetch items with pagination. Simulates a network delay using setTimeout.
Running the Application

Frontend

Installation:
cd client
npm install

Run Development Server:
npm start

Backend

Installation:
cd api
npm install

Run Server:
node server.js

Testing
Unit Tests
Install Dependencies: Ensure you have the necessary testing libraries installed.

Configure Jest: Ensure jest.config.js is set up with necessary configurations, including transforming JSX files with Babel.

Run Tests:
npm test

Test Cases:
Loading State: Verifies that the loading text is displayed initially.
Rendering Items: Ensures that items are rendered after they are fetched.

Common Issues
---------------------------------------------------------------------------------------------
Large JavaScript Bundle Size

Issue: Slow load times due to large initial bundle.
Solution: Implemented code splitting with React's React.lazy and Suspense to reduce the initial bundle size.
Uncompressed Assets

Issue: Slow asset downloads due to uncompressed files.
Solution: Enabled Gzip compression on the server to compress JavaScript and CSS files.
Long JavaScript Execution Time

Issue: Inefficient rendering in virtualized lists.
Solution: Implemented react-window for virtual scrolling to improve rendering performance.

Issue: Network Delay Handling:
Soulation: Ensure that the simulated delay on the server does not exceed the timeout settings in the test environment.
Increase Jest timeout if necessary by adding jest.setTimeout(10000); in the setupTests.js or the specific test file.

React Testing Warnings:
Use act to wrap state updates in tests if encountering warnings related to unwrapped updates.
