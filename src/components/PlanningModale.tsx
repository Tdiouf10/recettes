import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlateWheat, faList, faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import CustomDatePicker from "../components/DatePicker";


type ModaleProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

const PlanningModale: React.FC<ModaleProps> = ({ isOpen, onClose, children }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedList, setSelectedList] = useState("");

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            setSelectedList(""); // reset the value of selectedList
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                >
                    <div className={`absolute inset-0 bg-gray-300 opacity-80`}></div>
                </div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >

                </span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                <FontAwesomeIcon icon={faPlateWheat} />
                            </div>

                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    className="text-lg leading-6 font-medium dark:text-white"
                                    id="modal-headline"
                                >
                                    Program the recipe
                                </h3>

                                <div className="py-10">
                                    <p className="mb-2 text-sm font-medium dark:text-white">
                                        Select a date <FontAwesomeIcon icon={faCalendarDay} className="ml-5"/>
                                    </p>
                                    <CustomDatePicker selectedDate={selectedDate} handleDateChange={handleDateChange} />

                                    <label htmlFor="countries"
                                           className="block mt-5 mb-2 text-sm font-medium dark:text-white">
                                        Select a list <FontAwesomeIcon icon={faList} className="ml-5"/>
                                    </label>
                                    <select
                                        id="countries"
                                        className="text-black w-full rounded block p-2.5 bg-gray-300 dark:bg-white"
                                        value={selectedList}
                                        onChange={(event) => setSelectedList(event.target.value)}
                                    >
                                        <option value="">_</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="FR">France</option>
                                        <option value="DE">Germany</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <span className="flex-1 w-full text-center">
                          <button type="button" className="w-50 py-2 px-5 text-white hover:text-black rounded bg-green-600 hover:bg-green-400"
                          >
                            Add
                          </button>
                        </span>

                        <span className="flex-1 w-full text-center">
                          <button
                              type="button"
                              className="w-50 py-2 bg-white px-5 text-red-700 rounded hover:underline"
                              onClick={onClose}
                          >
                            Cancel
                          </button>
                        </span>
                    </div>
                </div>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/datepicker.min.js"></script>
        </div>
    );
};

export default PlanningModale;