import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import { useState } from 'react'

function parseDate(dateString, dateFormat, locale) {
    const parsed = dateFnsParse(dateString, dateFormat, { locale })
    return DateUtils.isDate(parsed) ? parsed : null
}
const format = 'dd MMM yyyy'
function formatDate(date, formatString, locale) {
    return dateFnsFormat(date, formatString, { locale })
}

function DateRangePicker(props) {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date((new Date() * 1) + 24 * 3600 * 1000))

    /**
     * 
     * @param {Date} date 
     */
    function updateStartDate(date) {
        setStartDate(date)
        if (endDate * 1 < date * 1) {
            setEndDate(date)
        }
    }
    /**
     * 
     * @param {Date} endDate 
     */

    function updateEndDate(endTime) {
        var dateDif = Math.floor((endTime * 1 - startDate * 1) / (24 * 3600 * 1000))
        console.log(dateDif);
        if (dateDif >= 1) {
            setEndDate(endTime)
        }
    }

    return (
        <div className='date-range-picker-container' >
            <div>
                <label htmlFor="">From:</label>
                <DayPickerInput
                    formatDate={formatDate}
                    format={format}
                    parseDate={parseDate}
                    placeholder={`${dateFnsFormat(new Date(), format)}`}
                    dayPickerProps={{
                        modifiers: {
                            disabled: {
                                before: new Date()
                            }
                        }
                    }}
                    value={startDate}
                    onDayChange={(day) => { updateStartDate(day) }}
                />
            </div>
            <div>
                <label htmlFor="">To:</label>
                <DayPickerInput
                    formatDate={formatDate}
                    format={format}
                    parseDate={parseDate}
                    placeholder={`${dateFnsFormat(new Date(), format)}`}
                    dayPickerProps={{
                        modifiers: {
                            disabled: {
                                before: startDate
                            }
                        }

                    }}
                    value={endDate}
                    onDayChange={(day) => { updateEndDate(day) }}
                />
            </div>
            <style jsx>{`
                .date-range-picker-container >div{
                    display: grid;
                    grid-template-columns: 30% auto;
                    padding: 0.5em;
                }
                 
            
            `}</style>
        </div>
    );
}

export default DateRangePicker;