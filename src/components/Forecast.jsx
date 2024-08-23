const Forecast = ({ data, units }) => {
    if (!data || !data.list) {
        return null // Return nothing if the data is not yet available
    }

    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
    }

    const convertTemperature = (temp) => {
        return units === "metric" ? temp : temp * 1.8 + 32
    }

    // Group forecast data by date
    const groupByDate = (list) => {
        const grouped = {}
        list.forEach((item) => {
            const date = new Date(item.dt * 1000).toDateString()
            if (!grouped[date]) {
                grouped[date] = item
            }
        })
        return Object.values(grouped)
    }

    const dailyForecasts = groupByDate(data.list).slice(1, 6)

    return (
        <div className="max-w-full px-4">
            <div className="flex items-center justify-start mt-6">
                <p className="font-medium uppercase text-lg md:text-xl">
                    5-day forecast
                </p>
            </div>
            <hr className="my-2" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                {dailyForecasts.map((item) => (
                    <div
                        key={item.dt}
                        className="text-center p-4 border rounded-lg"
                    >
                        <p className="text-sm md:text-base font-semibold mb-2">
                            {formatDate(item.dt)}
                        </p>
                        <p className="text-sm md:text-base">
                            {`Avg: ${convertTemperature(item.main.temp).toFixed(
                                1
                            )}°${units === "metric" ? "C" : "F"}`}
                        </p>
                        <p className="text-xs md:text-sm capitalize">
                            {item.weather[0].description}
                        </p>
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

export default Forecast
