import { BiSolidDropletHalf } from "react-icons/bi"
import { FiWind } from "react-icons/fi"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"

const TempDetails = ({ data, units }) => {
    const { main, weather, wind } = data

    // Convert temperature from deg Celsius to deg Fahrenheit
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
        <div className="max-w-full px-4 bg-gray-800 text-gray-200">
            <div className="flex items-center justify-center py-6 text-lg md:text-xl capitalize">
                <p>{weather[0].description}</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <div className="flex items-center justify-between w-full">
                    <img
                        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                        alt={weather[0].description}
                        className="w-28 md:w-32 "
                    />

                    <p className="text-4xl md:text-5xl font-semibold">
                        {`${convertTemperature(main.temp).toFixed(1)} °${
                            units === "metric" ? "C" : "F"
                        }`}
                    </p>
                    <div className="flex flex-col space-y-3 items-start">
                        {verticalDetails.map(({ id, Icon, title, value }) => (
                            <div
                                key={id}
                                className="flex font-light text-sm md:text-sm items-center"
                            >
                                <Icon
                                    size={20}
                                    className="mr-1 text-gray-300"
                                />
                                <p className="font-light ml-1">
                                    {`${title}:`}
                                    <span className="font-medium ml-1">
                                        {`${convertTemperature(value).toFixed(
                                            1
                                        )}°${units === "metric" ? "C" : "F"}`}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-row flex-wrap items-center justify-center space-x-10 text-sm md:text-sm py-3">
                {horizontalDetails.map(({ id, Icon, title, value }) => (
                    <div key={id} className="flex items-center">
                        <Icon size={24} className="text-gray-300" />
                        <p className="font-light ml-1">
                            {`${title}:`}
                            <span className="font-medium ml-1">{value}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TempDetails
