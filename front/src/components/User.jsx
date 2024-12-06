import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const User = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState(''); // Direct user ID handling for simplicity
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event for modal
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  // Fetch events from backend
  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  }, []);

  // Enroll in event
  const enrollInEvent = async (eventId) => {
    try {
      const response = await axios.post(`http://localhost:3000/user/enroll/${eventId}`, {
        userId,
      });
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error enrolling in event');
    }
  };

  // Filter events based on search term
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle event card click
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
      <h2 className="text-3xl font-bold mb-6">Events</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Events"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 mb-6 w-full rounded-md"
      />

      {/* Available Events */}
      <h3 className="text-xl font-medium mb-4">Available Events</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <li
            key={event._id}
            className="border border-gray-300 bg-white rounded-lg shadow-lg p-4 cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => handleEventClick(event)} // Show event details on click
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h4 className="text-lg font-semibold text-blue-600">{event.title}</h4>
            <p className="text-gray-700 mb-2">{event.description.slice(0, 100)}...</p>
            <p className="text-sm text-gray-500">
              Date: {new Date(event.date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      {/* Modal to show event details */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h3 className="text-2xl font-semibold mb-4">{selectedEvent.title}</h3>
            <img
              src={selectedEvent.imageUrl}
              alt={selectedEvent.title}
              className="w-full h-64 object-cover mb-4 rounded-md"
            />
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
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                onClick={() => enrollInEvent(selectedEvent._id)}
              >
                Add to Dashboard
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                onClick={closeModal}
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

export default User;
