# Weather Forecast Dashboard ✨

## Overview

Welcome to the Weather Dashboard! This web application provides real-time weather information for any location. Built with modern web technologies, the dashboard offers a responsive design that works seamlessly across various devices and includes a dark mode feature for enhanced usability.

## Features

-   **Real-Time Weather Data:** Get current weather updates including temperature, humidity, wind speed, and weather conditions.
-   **5-Day Forecast:** View weather forecasts for the next five days.
-   **Responsive Design:** The dashboard adjusts beautifully on mobile, tablet, and desktop screens.
-   **Dark Mode:** A dark mode option to reduce eye strain in low-light environments.

## Technologies Used

-   **React:** For building the user interface and handling state management.
-   **Tailwind CSS:** For styling and ensuring a responsive design.
-   **OpenWeather API:** For fetching real-time weather data.
-   **Vercel:** For deployment and hosting the application.

## Live Demo

You can view the live demo of the Weather Dashboard [here](https://abhi-weather-dash.vercel.app/).

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/abhi-up/weather-dashboard.git
    cd weather-dashboard
    ```

2. **Install dependencies:**

    Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root of the project and add your OpenWeather API key:

    ```plaintext
    VITE_API_KEY=your_openweather_api_key
    ```

4. **Run the application:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Usage

1. Search for a Location: Enter the name of a city in the search bar and hit enter or click the search icon to get the current weather and forecast.
2. Toggle Units: Switch between Celsius and Fahrenheit by clicking the unit toggle button.
3. View Weather Details: The dashboard will display current weather details, including temperature, humidity, and wind conditions, along with a 5-day forecast.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and create a pull request. For bug reports or feature requests, please open an issue in the GitHub repository.
