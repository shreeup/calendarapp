import React from "react";
import ReactDOM from "react-dom";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useSelector, useDispatch } from "react-redux";
import {
  openmodal,
  closemodal,
  setActiveEvent,
  eventUpdate,
  eventAddNew,
} from "../reduxstore/caleventsSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement("#calendardiv");

function CalEventModal() {
  //let title;
  //const [modalIsOpen, setIsOpen] = React.useState(props.modalOpen);
  let currstate = useSelector((state) => state);
  const modalIsOpen = currstate.modalOpen;

  const activeEvent = currstate.activeEvent;
  const [formValues, setFormValues] = useState(activeEvent);

  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  function closeModal1() {
    // setIsOpen(false);
    dispatch(closemodal(currstate));
  }

  async function submithandler() {
    if (!isFormValid()) return;
    dispatch(setActiveEvent(formValues));
    if (activeEvent && activeEvent._id) {
      //posteventurl = `${posteventurl}/${activeEvent._id}`;
      dispatch(eventUpdate(formValues));
    } else {
      dispatch(eventAddNew(formValues));
    }
    // try {
    //   const res = await fetch(`${posteventurl}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(activeEvent),
    //   });
    // } catch (error: any) {
    //   console.log("Update failed", error.message);
    //   toast.error(error.message);
    // }

    closeModal1();
  }

  const isFormValid = () => {
    if (formValues.title.trim().length === 0) {
      toast.error("Title is required");
      return false;
    } else if (formValues.title.trim().length > 32) {
      toast.error("Title length must be max 32 characters");
      return false;
    } else if (moment(formValues.start).isSameOrAfter(moment(formValues.end))) {
      toast.error("End date must be after start date");
      return false;
    }
    return true;
  };

  return (
    <div>
      {/* <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="bg-blue-500"
      > */}

      <Transition.Root show={modalIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto text-black"
          initialFocus={cancelButtonRef}
          onClose={closeModal1}
        >
          <div
            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
         sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className="inline-block align-bottom bg-white rounded-lg
               text-left 
            overflow-hidden shadow-xl 
            transform transition-all 
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Event Details
                      </Dialog.Title>
                      <form>
                        <div className="mt-2">
                          <label htmlFor="title">Title: </label>
                          <input
                            type="text"
                            value={formValues.title}
                            onChange={handleInputChange}
                            name="title"
                            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                          />

                          <br />
                          <label htmlFor="eventdesc">Description: </label>
                          <textarea
                            value={formValues.description}
                            rows={4}
                            cols={40}
                            onChange={(e) => {
                              setFormValues({
                                ...formValues,
                                description: e.target.value,
                              });
                            }}
                            name="eventdesc"
                            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                          />

                          <br />
                          <label htmlFor="eventstart">Start:</label>
                          <DatePicker
                            selected={moment(formValues.start).toDate()}
                            onChange={(date) => {
                              setFormValues({
                                ...formValues,
                                start: date || new Date(),
                              });
                            }}
                            showTimeSelect
                            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            dateFormat="Pp"
                          />

                          <br />
                          <label htmlFor="eventend">End:</label>
                          <DatePicker
                            selected={moment(formValues.end).toDate()}
                            onChange={(date) => {
                              setFormValues({
                                ...formValues,
                                end: date || new Date(),
                              });
                            }}
                            minDate={moment(formValues.start).toDate()}
                            showTimeSelect
                            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            dateFormat="Pp"
                          />
                          <br />
                          <label htmlFor="eventinvitees">Invitees:</label>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md
                   border border-transparent shadow-sm px-4 py-2 bg-red-600
                    text-base font-medium text-white hover:bg-red-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => submithandler()}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center
                  rounded-md border border-gray-300 shadow-sm px-4 py-2
                   bg-white text-base font-medium text-gray-700
                    hover:bg-gray-50 focus:outline-none focus:ring-2
                     focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0
                      sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => closeModal1}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default CalEventModal;
