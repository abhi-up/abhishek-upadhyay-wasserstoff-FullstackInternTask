import { useState } from "react"
import { BiSearch } from "react-icons/bi"

const SearchBar = ({ onSearch, toggleUnits, units }) => {
    const [city, setCity] = useState("")

    const handleSearch = () => {
        if (city.trim()) {
            onSearch(city)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="flex flex-col md:flex-row justify-center my-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center justify-between w-full md:w-3/4 space-x-2 md:space-x-4">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress} // Add this line
                    placeholder="Enter city name"
                    className="text-gray-500 text-base md:text-lg font-light p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <BiSearch
                    onClick={handleSearch}
                    size={24}
                    className="cursor-pointer text-gray-300 transition ease-out hover:scale-125"
                />

                <button
                    onClick={toggleUnits}
                    className="text-base w-12 md:text-lg font-medium border border-white rounded-md p-2 transition ease-out hover:bg-gray-700"
                >
                    {units === "metric" ? "°F" : "°C"}
                </button>
            </div>
        </div>
    )
}

export default SearchBar
