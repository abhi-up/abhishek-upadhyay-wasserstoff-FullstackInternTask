// This functional component displays the date, time, and location information.
const DateTimeLocation = ({ date, time, location }) => {
    return (
        <div>
            {/* Display the date and time in a centered, flex container with margin */}
            <div className="flex items-center justify-center my-4 md:my-6">
                <p className="text-base md:text-xl font-extralight text-center">
                    {/* Display the date and time, with "Local time:" as a label */}
                    {date} | Local time: {time}
                </p>
            </div>

            {/* Display the location in a centered, flex container with margin */}
            <div className="flex items-center justify-center my-2 md:my-3">
                <p className="text-2xl md:text-3xl font-medium text-center">
                    {/* Display the location name */}
                    {location}
                </p>
            </div>
        </div>
    )
}

export default DateTimeLocation
