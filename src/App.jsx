import { useState } from "react"
import SearchBar from "./components/SearchBar"
import DateTimeLocation from "./components/DateTimeLocation"
import TempDetails from "./components/TempDetails"
import Forecast from "./components/Forecast"

const App = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [forecastData, setForecastData] = useState(null)
    // State to manage the unit of temperature ('metric' for Celsius, 'imperial' for Fahrenheit)
    const [units, setUnits] = useState("metric")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    // Function to handle the search for a city's weather data
    const handleSearch = async (city) => {
        const apiKey = import.meta.env.VITE_API_KEY // Fetch the API key from environment variables
        setLoading(true) // Start loading

        try {
            // Fetch current weather data from the OpenWeather API
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
            )
            const weatherResult = await weatherResponse.json()

            if (weatherResult.cod === 200) {
                // If the city is found, update the weather data state
                setWeatherData(weatherResult)

                // Fetch forecast data for the next 5 days
                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`
                )
                const forecastResult = await forecastResponse.json()
                setForecastData(forecastResult)
                setError(null) // Clear any previous errors
            } else {
                // If the city is not found, display an error message
                setError("City not found. Please try again.")
                setWeatherData(null)
                setForecastData(null)
            }
        } catch (error) {
            // Handle any errors during the fetch process
            setError("Failed to fetch weather data. Please try again later.")
        } finally {
            setLoading(false) // End loading
        }
    }

    // Function to toggle between Celsius and Fahrenheit units
    const toggleUnits = () => {
        setUnits((prevUnits) =>
            prevUnits === "metric" ? "imperial" : "metric"
        )
    }

    // Function to format the date and time from a timestamp
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp * 1000)
        const options = { day: "numeric", month: "short", year: "numeric" }
        const formattedDate = date.toLocaleDateString("en-GB", options)
        const formattedTime = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        })

        return { date: formattedDate, time: formattedTime }
    }

    return (
        // Main container for the app with a dark background and white text
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="mx-auto max-w-screen-lg py-5 px-4 md:px-8 lg:px-16 xl:px-32 bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl shadow-gray-700">
                {/* SearchBar component for entering the city name and toggling units */}
                <SearchBar
                    onSearch={handleSearch}
                    toggleUnits={toggleUnits}
                    units={units}
                />
                {/* Display error message if there is any */}
                {error && <p className="text-red-600 text-center">{error}</p>}
                {/* Show loading animation while fetching data */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader"></div>
                    </div>
                )}
                {/* Display weather data and forecast if available and not loading */}
                {weatherData && !loading && (
                    <>
                        <DateTimeLocation
                            date={formatDateTime(weatherData.dt).date}
                            time={formatDateTime(weatherData.dt).time}
                            location={`${weatherData.name}, ${weatherData.sys.country}`}
                        />
                        <TempDetails data={weatherData} units={units} />
                        <Forecast data={forecastData} units={units} />
                    </>
                )}
            </div>
        </div>
    )
}

export default App
