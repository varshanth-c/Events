const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');

const router = express.Router();

// Hardcoded User ID (can be modified or retrieved from authentication in the future)
const userId = '675253a339f5b5f9b3b78ed5';

// Enroll in Event
router.post('/enroll/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    // Fetch the hardcoded user and event
    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is already enrolled
    if (user.enrolledEvents.includes(eventId)) {
      return res.status(400).json({ message: 'User already enrolled in this event' });
    }

    // Check if seats are available
    if (event.bookedSeats >= event.totalSeats) {
      return res.status(400).json({ message: 'No seats available for this event' });
    }

    // Enroll user in event and update event's bookedSeats
    user.enrolledEvents.push(eventId);
    event.bookedSeats += 1;

    await user.save();
    await event.save();

    res.status(200).json({ message: 'Successfully enrolled in the event', event });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Cancel Enrollment
router.post('/cancelEnrollment/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    // Fetch the hardcoded user and event
    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is enrolled
    if (!user.enrolledEvents.includes(eventId)) {
      return res.status(400).json({ message: 'User not enrolled in this event' });
    }

    // Cancel enrollment and update event's bookedSeats
    user.enrolledEvents.pull(eventId);
    event.bookedSeats -= 1;

    await user.save();
    await event.save();

    res.status(200).json({ message: 'Enrollment canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Get Enrolled Events for User
router.get('/enrolledEvents', async (req, res) => {
  try {
    // Fetch the hardcoded user with enrolled events populated
    const user = await User.findById(userId).populate('enrolledEvents');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ enrolledEvents: user.enrolledEvents });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
