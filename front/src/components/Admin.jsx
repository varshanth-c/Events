import { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [tags, setTags] = useState('');
  const [fullArticle, setFullArticle] = useState('');
  const [price, setPrice] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null); // For storing the event to be updated
  const [showModal, setShowModal] = useState(false); // To control modal visibility

  // Fetch events
  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  }, []);

  const createEvent = () => {
    const newEvent = { title, description, date, totalSeats, imageUrl, location, organizer, tags, fullArticle, price };
    axios
      .post('http://localhost:3000/admin/create', newEvent)
      .then(response => {
        alert('Event created!');
        setEvents([...events, response.data.event]);
      })
      .catch(error => alert('Error creating event'));
  };

  const deleteEvent = id => {
    axios
      .delete(`http://localhost:3000/admin/delete/${id}`)
      .then(() => {
        alert('Event deleted!');
        setEvents(events.filter(event => event._id !== id));
      })
      .catch(error => alert('Error deleting event'));
  };

  const updateEvent = (id) => {
    // Open the modal and pre-fill the form with the selected event's data
    const eventToUpdate = events.find(event => event._id === id);
    setSelectedEvent(eventToUpdate);
    setTitle(eventToUpdate.title);
    setDescription(eventToUpdate.description);
    setDate(eventToUpdate.date);
    setTotalSeats(eventToUpdate.totalSeats);
    setImageUrl(eventToUpdate.imageUrl);
    setLocation(eventToUpdate.location);
    setOrganizer(eventToUpdate.organizer);
    setTags(eventToUpdate.tags.join(', ')); // Assuming tags are stored as an array
    setFullArticle(eventToUpdate.fullArticle);
    setPrice(eventToUpdate.price);
    setShowModal(true);
  };

  const handleUpdateSubmit = () => {
    const updatedEvent = { title, description, date, totalSeats, imageUrl, location, organizer, tags, fullArticle, price };
    axios
      .put(`http://localhost:3000/admin/update/${selectedEvent._id}`, updatedEvent)
      .then(response => {
        alert('Event updated!');
        setEvents(events.map(event => (event._id === selectedEvent._id ? response.data.event : event)));
        setShowModal(false);
      })
      .catch(error => alert('Error updating event'));
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>

      {/* Create Event Form */}
      <h3 className="text-xl font-medium mb-4">Create Event</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          className="border border-gray-300 rounded p-2"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="number"
          className="border border-gray-300 rounded p-2"
          placeholder="Total Seats"
          value={totalSeats}
          onChange={e => setTotalSeats(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Organizer"
          value={organizer}
          onChange={e => setOrganizer(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <textarea
          className="border border-gray-300 rounded p-2"
          placeholder="Full Article"
          value={fullArticle}
          onChange={e => setFullArticle(e.target.value)}
        />
        <input
          type="number"
          className="border border-gray-300 rounded p-2"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 sm:col-span-2"
          onClick={createEvent}
        >
          Create
        </button>
      </div>

      {/* Display Events */}
      <h3 className="text-xl font-medium mb-4">Manage Events</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <li
            key={event._id}
            className="border border-gray-300 rounded-lg shadow-md bg-white p-6"
          >
            <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover mb-4" />
            <h4 className="text-xl font-bold text-blue-600 mb-2">{event.title}</h4>
            <p className="text-gray-700 mb-2">
              {event.description.length > 100 ? `${event.description.substring(0, 100)}...` : event.description}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Date: {new Date(event.date).toLocaleString()}
            </p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => deleteEvent(event._id)}
              >
                Delete
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                onClick={() => updateEvent(event._id)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Updating Event */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h3 className="text-2xl font-semibold mb-4">Update Event</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <input
                className="border border-gray-300 rounded p-2"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded p-2"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <input
                type="datetime-local"
                className="border border-gray-300 rounded p-2"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
              <input
                type="number"
                className="border border-gray-300 rounded p-2"
                placeholder="Total Seats"
                value={totalSeats}
                onChange={e => setTotalSeats(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded p-2"
                placeholder="Image URL"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded p-2"
                placeholder="Location"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded p-2"
                placeholder="Organizer"
                value={organizer}
                onChange={e => setOrganizer(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded p-2"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={e => setTags(e.target.value)}
              />
              <textarea
                className="border border-gray-300 rounded p-2"
                placeholder="Full Article"
                value={fullArticle}
                onChange={e => setFullArticle(e.target.value)}
              />
              <input
                type="number"
                className="border border-gray-300 rounded p-2"
                placeholder="Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 sm:col-span-2"
                onClick={handleUpdateSubmit}
              >
                Update
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white rounded p-2 sm:col-span-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
