import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
    selectedDate: Date | null;
    handleDateChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<Props> = ({ selectedDate, handleDateChange }) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholderText="Select date"
        />
    );
};

export default CustomDatePicker;
