import { BiSolidDropletHalf } from "react-icons/bi"
import { FiWind } from "react-icons/fi"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"

const TempDetails = ({ data, units }) => {
    const { main, weather, wind } = data

    // Convert temperature from Celsius to Fahrenheit if needed
    const convertTemperature = (temp) => {
        return units === "metric" ? temp : temp * 1.8 + 32
    }

    const verticalDetails = [
        {
            id: 1,
            Icon: MdKeyboardArrowUp,
            title: "High",
            value: main.temp_max,
        },
        {
            id: 2,
            Icon: MdKeyboardArrowDown,
            title: "Low",
            value: main.temp_min,
        },
    ]

    const horizontalDetails = [
        {
            id: 1,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${main.humidity}%`,
        },
        {
            id: 2,
            Icon: FiWind,
            title: "Wind",
            value: `${wind.speed} m/s, ${wind.deg}°`,
        },
    ]

    return (
        <div className="max-w-full px-4 py-6 bg-gray-800 text-gray-200">
            {/* Weather Description */}
            <div className="text-center">
                <p className="text-xl md:text-2xl capitalize font-medium">
                    {weather[0].description}
                </p>
            </div>

            {/* Main Temperature and Details */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
                {/* Weather Icon */}
                <div className="flex-shrink-0">
                    <img
                        src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
                        alt={weather[0].description}
                        className="w-32 h-32 md:w-40 md:h-40 "
                    />
                </div>

                {/* Temperature Display */}
                <div className="mt-4 md:mt-0 md:mx-8">
                    <p className="text-5xl md:text-6xl font-bold">
                        {`${convertTemperature(main.temp).toFixed(1)}°${
                            units === "metric" ? "C" : "F"
                        }`}
                    </p>
                </div>

                {/* High and Low Temperatures */}
                <div className="mt-4 md:mt-0 flex flex-col space-y-4">
                    {verticalDetails.map(({ id, Icon, title, value }) => (
                        <div
                            key={id}
                            className="flex items-center text-lg md:text-xl"
                        >
                            <Icon className="text-gray-300 mr-2" size={24} />
                            <p>
                                {title}:
                                <span className="font-semibold ml-1">
                                    {`${convertTemperature(value).toFixed(1)}°${
                                        units === "metric" ? "C" : "F"
                                    }`}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Details */}
            <div className="mt-6 grid grid-cols-2 gap-4 md:flex md:justify-center md:space-x-12">
                {horizontalDetails.map(({ id, Icon, title, value }) => (
                    <div
                        key={id}
                        className="flex items-center justify-center text-lg md:text-xl"
                    >
                        <Icon className="text-gray-300 mr-2" size={24} />
                        <p>
                            {title}:
                            <span className="font-semibold ml-1">{value}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TempDetails
