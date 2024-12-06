import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API calls
import '../index.css'; // Custom CSS file for styling

const UserDashboard = () => {
  const [enrolledEvents, setEnrolledEvents] = useState([]); // To store events the user is enrolled in
  const [selectedEvent, setSelectedEvent] = useState(null); // Event clicked for modal
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  // Fetch enrolled events when the component is mounted
  useEffect(() => {
    // Fetch the enrolled events directly from the backend without needing a userId
    axios
      .get('http://localhost:3000/user/enrolledEvents') // Fetch data from backend
      .then((response) => setEnrolledEvents(response.data.enrolledEvents)) // Update state with enrolled events
      .catch((error) => console.error(error)); // Handle any error
  }, []);

  // Function to enroll in an event
  const enrollInEvent = async (eventId) => {
    try {
      const response = await axios.post(`http://localhost:3000/user/enroll/${eventId}`);
      alert(response.data.message); // Show success message
      setEnrolledEvents((prevState) => [...prevState, response.data.event]); // Add the enrolled event to the state
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error enrolling in event');
    }
  };

  // Function to cancel enrollment in an event
  const cancelEnrollment = async (eventId) => {
    try {
      const response = await axios.post(`http://localhost:3000/user/cancelEnrollment/${eventId}`);
      alert(response.data.message); // Show success message
      setEnrolledEvents(enrolledEvents.filter((event) => event._id !== eventId)); // Remove the canceled event from the state
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error canceling enrollment');
    }
  };

  // Handle event click for showing event details in modal
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Dashboard</h2>

      {/* Enrolled Events */}
      <h3 className="text-xl font-medium mb-4">Your Enrolled Events</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledEvents.map((event) => (
          <li
            key={event._id}
            className="border border-gray-300 bg-white rounded-lg shadow-lg p-4 cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={() => handleEventClick(event)} // Open the modal to show event details
          >
            <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover mb-4" />
            <h4 className="text-lg font-semibold text-blue-600">{event.title}</h4>
            <p className="text-gray-700 mb-2">{event.description.slice(0, 100)}...</p>
            <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      {/* Modal to show event details */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full transform transition-all duration-500 ease-in-out">
            <h3 className="text-2xl font-semibold mb-4">{selectedEvent.title}</h3>
            <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-64 object-cover mb-4" />
            <p className="text-gray-700 mb-4">{selectedEvent.fullArticle}</p>
            <p className="text-sm text-gray-500">Date: {new Date(selectedEvent.date).toLocaleString()}</p>
            <p className="text-sm text-gray-500">Location: {selectedEvent.location}</p>
            <p className="text-sm text-gray-500">Organizer: {selectedEvent.organizer}</p>
            <p className="text-sm text-gray-500">
              Tags: {selectedEvent.tags ? selectedEvent.tags.join(', ') : 'No tags available'}
            </p>
            <p className="text-sm text-gray-500">Price: ${selectedEvent.price}</p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => cancelEnrollment(selectedEvent._id)} // Cancel enrollment button inside modal
              >
                Cancel Enrollment
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                onClick={closeModal} // Close modal button
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
