import React, { useState } from "react";
import styled from "styled-components";
import ThemedButton from "../../styles/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateBooking } from "../../API/bookings/apiBookings";
import Message from "./SuccessMsgUpdateBooking";

const UpdateModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.form`
  background-color: ${(props) => props.theme.color.c5};
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  padding: 20px;
  margin: 10px;
`;

const OpenUpdateBookingForm = styled(ThemedButton)`
  padding: 5px 10px;
  background-color: inherit;
  color: ${(props) => props.theme.color.c3};
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.theme.color.c2};
  }
`;

const CloseIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0px;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 8px;
  border-radius: 5px;

  background-color: ${(props) => props.theme.color.c2};
  border: 1px solid ${(props) => props.theme.color.c1};
`;

const SpacingForButton = styled.div`
  margin-top: 10px;
`;

function UpdateBookingModal({ bookingId, setBookings }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [message, setMessage] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date, index) => {
    const newSelectedDates = [...selectedDates];
    newSelectedDates[index] = date;
    setSelectedDates(newSelectedDates);
  };

  const handleBookingSubmit = async (event) => {
    try {
      event.preventDefault();

      const updateResult = await updateBooking(bookingId, selectedDates);

      if (updateResult.success) {
        setMessage({
          text: "Your booking was successfully updated!",
          type: "success",
        });
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId
              ? {
                  ...booking,
                  dateFrom: selectedDates[0],
                  dateTo: selectedDates[1],
                }
              : booking
          )
        );
      } else {
        setMessage({
          text: `Booking update failed. ${updateResult.message}`,
          type: "error",
        });
      }
    } catch (error) {
      console.error(
        "An error occurred while making the booking change:",
        error
      );
    }
  };

  return (
    <>
      <OpenUpdateBookingForm onClick={openModal}>
        Update Booking
      </OpenUpdateBookingForm>
      {isModalOpen && (
        <UpdateModalContainer onClick={closeModal}>
          <ModalContent
            onSubmit={handleBookingSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseIcon>
              <FontAwesomeIcon icon={faRemove} onClick={closeModal}>
                Close
              </FontAwesomeIcon>
            </CloseIcon>
            <div>
              <Label>Check-In Date:</Label>
              <StyledDatePicker
                selected={selectedDates[0]}
                onChange={(date) => handleDateChange(date, 0)}
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText="Select a date"
                selectsStart
                startDate={selectedDates[0]}
                endDate={selectedDates[1]}
              />
            </div>
            <div>
              <Label>Check-Out Date:</Label>
              <StyledDatePicker
                selected={selectedDates[1]}
                onChange={(date) => handleDateChange(date, 1)}
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText="Select a date"
                selectsEnd
                startDate={selectedDates[0]}
                endDate={selectedDates[1]}
                minDate={selectedDates[0]}
              />
            </div>

            <SpacingForButton>
              <ThemedButton>Submit Update</ThemedButton>
            </SpacingForButton>
            {message && (
              <Message
                text={message.text}
                onRefresh={() => {
                  setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                      booking.id === bookingId
                        ? {
                            ...booking,
                            dateFrom: selectedDates[0],
                            dateTo: selectedDates[1],
                          }
                        : booking
                    )
                  );
                }}
              />
            )}
          </ModalContent>
        </UpdateModalContainer>
      )}
    </>
  );
}

export default UpdateBookingModal;
