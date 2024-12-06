const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  totalSeats: { type: Number, required: true },
  bookedSeats: { type: Number, default: 0 }, // Track the number of booked seats
  imageUrl: { type: String, required: false }, // Optional image for event
  location: { type: String, required: true }, // Event location
  organizer: { type: String, required: true }, // Organizer's name
  tags: [{ type: String }], // Tags for filtering events
  fullArticle: { type: String, required: true }, // Detailed event information
  price: { type: Number, default: 0 }, // Ticket price
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);
