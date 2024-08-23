import { useState } from "react"
import { BiSearch } from "react-icons/bi"

const SearchBar = ({ onSearch, toggleUnits, units }) => {
    // State to store the input value for the city name
    const [city, setCity] = useState("")

    // Function to handle the search action
    const handleSearch = () => {
        // Trigger the search only if the input is not empty
        if (city.trim()) {
            onSearch(city)
        }
    }

    // Function to handle the "Enter" key press for triggering the search
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="flex flex-col md:flex-row justify-center my-6 space-y-4 md:space-y-0 md:space-x-4">
            {/* Input field and buttons are arranged horizontally on larger screens and vertically on smaller screens */}
            <div className="flex items-center justify-between w-full md:w-3/4 space-x-2 md:space-x-4">
                {/* Input field for entering the city name */}
                <input
                    type="text"
                    value={city} // Bind the input value to the city state
                    onChange={(e) => setCity(e.target.value)} // Update the city state on input change
                    onKeyPress={handleKeyPress} // Trigger search on "Enter" key press
                    placeholder="Enter city name"
                    className="text-gray-500 text-base md:text-lg font-light p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Search icon to trigger the search on click */}
                <BiSearch
                    onClick={handleSearch}
                    size={24}
                    className="cursor-pointer text-gray-300 transition ease-out hover:scale-125"
                />

                {/* Button to toggle between Celsius and Fahrenheit units */}
                <button
                    onClick={toggleUnits}
                    className="text-base w-12 md:text-lg font-medium border border-white rounded-md p-2 transition ease-out hover:bg-gray-700"
                >
                    {/* Display the opposite unit (°F if currently in °C, and vice versa) */}
                    {units === "metric" ? "°F" : "°C"}
                </button>
            </div>
        </div>
    )
}

export default SearchBar
