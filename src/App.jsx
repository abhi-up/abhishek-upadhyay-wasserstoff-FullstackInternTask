import { useState } from "react"
import SearchBar from "./components/SearchBar"
import DateTimeLocation from "./components/DateTimeLocation"
import TempDetails from "./components/TempDetails"
import Forecast from "./components/Forecast"

const App = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [forecastData, setForecastData] = useState(null)
    const [units, setUnits] = useState("metric") // 'metric' for Celsius, 'imperial' for Fahrenheit
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false) // New loading state

    const handleSearch = async (city) => {
        const apiKey = import.meta.env.VITE_API_KEY
        setLoading(true) // Start loading
        try {
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
            )
            const weatherResult = await weatherResponse.json()

            if (weatherResult.cod === 200) {
                setWeatherData(weatherResult)

                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`
                )
                const forecastResult = await forecastResponse.json()
                setForecastData(forecastResult)
                setError(null)
            } else {
                setError("City not found. Please try again.")
                setWeatherData(null)
                setForecastData(null)
            }
        } catch (error) {
            setError("Failed to fetch weather data. Please try again later.")
        } finally {
            setLoading(false) // End loading
        }
    }

    const toggleUnits = () => {
        setUnits((prevUnits) =>
            prevUnits === "metric" ? "imperial" : "metric"
        )
    }

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
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="mx-auto max-w-screen-lg py-5 px-4 md:px-8 lg:px-16 xl:px-32 bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl shadow-gray-700">
                <SearchBar
                    onSearch={handleSearch}
                    toggleUnits={toggleUnits}
                    units={units}
                />
                {error && <p className="text-red-600 text-center">{error}</p>}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader"></div>
                    </div>
                )}
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
