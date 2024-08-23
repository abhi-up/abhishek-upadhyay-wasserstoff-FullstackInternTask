// Forecast component displays a 5-day weather forecast based on the provided data and units.
const Forecast = ({ data, units }) => {
    // Return nothing if the data is not available or if the list of forecasts is missing.
    if (!data || !data.list) {
        return null
    }

    // Helper function to format a timestamp into a readable date.
    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
    }

    // Helper function to convert the temperature based on the selected units (Celsius or Fahrenheit).
    const convertTemperature = (temp) => {
        return units === "metric" ? temp : temp * 1.8 + 32
    }

    // Group the forecast data by date, keeping only the first entry for each date.
    const groupByDate = (list) => {
        const grouped = {}
        list.forEach((item) => {
            const date = new Date(item.dt * 1000).toDateString()
            if (!grouped[date]) {
                grouped[date] = item
            }
        })
        return Object.values(grouped) // Return the grouped data as an array.
    }

    // Get the daily forecast data, limiting to the next 5 days (excluding today).
    const dailyForecasts = groupByDate(data.list).slice(1, 6)

    return (
        <div className="max-w-full px-4">
            {/* Header for the 5-day forecast */}
            <div className="flex items-center justify-start mt-6">
                <p className="font-medium uppercase text-lg md:text-xl">
                    5-day forecast
                </p>
            </div>
            <hr className="my-2" />

            {/* Display the daily forecasts in a grid layout */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                {dailyForecasts.map((item) => (
                    <div
                        key={item.dt}
                        className="text-center p-4 border rounded-lg"
                    >
                        {/* Display the formatted date */}
                        <p className="text-sm md:text-base font-semibold mb-2">
                            {formatDate(item.dt)}
                        </p>
                        {/* Display the average temperature */}
                        <p className="text-sm md:text-base">
                            {`Avg: ${convertTemperature(item.main.temp).toFixed(
                                1
                            )}°${units === "metric" ? "C" : "F"}`}
                        </p>
                        {/* Display the weather description */}
                        <p className="text-xs md:text-sm capitalize">
                            {item.weather[0].description}
                        </p>
                        {/* Display the weather icon */}
                        <img
                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt={item.weather[0].description}
                            className="w-12 md:w-16 mx-auto"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

// Export the Forecast component for use in other parts of the app.
export default Forecast
