import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlateWheat, faList} from '@fortawesome/free-solid-svg-icons';

type ModaleProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

const ListModale: React.FC<ModaleProps> = ({ isOpen, onClose,children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-gray-300 opacity-10"></div>
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
                                    Add recipe to list
                                </h3>

                                <div className="my-10 w-full">
                                    <label htmlFor="countries"
                                           className="block mb-2 text-sm font-medium dark:text-white">
                                        Select a list <FontAwesomeIcon icon={faList} className="ml-5"/>
                                    </label>
                                    <select id="countries" className="text-white dark:text-black w-full rounded block p-2.5 bg-gray-700 dark:bg-white">
                                        <option selected>_</option>
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
        </div>
    );
};

export default ListModale;