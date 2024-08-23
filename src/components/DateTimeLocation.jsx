const DateTimeLocation = ({ date, time, location }) => {
    return (
        <div>
            <div className="flex items-center justify-center my-4 md:my-6">
                <p className="text-base md:text-xl font-extralight text-center">
                    {date} | Local time: {time}
                </p>
            </div>

            <div className="flex items-center justify-center my-2 md:my-3">
                <p className="text-2xl md:text-3xl font-medium text-center">
                    {location}
                </p>
            </div>
        </div>
    )
}

export default DateTimeLocation
