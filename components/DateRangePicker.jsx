import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
function DateRangePicker(props) {
    return (
        <div className='date-range-picker-container' >
            <div>
                <label htmlFor="">From:</label>
                <DayPickerInput />
            </div>
            <div>
                <label htmlFor="">To:</label>
                <DayPickerInput />
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