const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// 1. Create an event
router.post('/create', async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      totalSeats,
      imageUrl,
      location,
      organizer,
      tags,
      fullArticle,
      price
    } = req.body;

    // Check if all required fields are provided
    if (!title || !description || !date || !totalSeats || !location || !organizer || !fullArticle) {
      return res.status(400).json({ message: 'All mandatory fields are required.' });
    }

    // Create the event
    const newEvent = new Event({
      title,
      description,
      date,
      totalSeats,
      bookedSeats: 0,
      imageUrl,
      location,
      organizer,
      tags,
      fullArticle,
      price
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully!', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
});

// 2. Read all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

// 3. Update an event
router.put('/update/:id', async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      totalSeats,
      imageUrl,
      location,
      organizer,
      tags,
      fullArticle,
      price
    } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        date,
        totalSeats,
        imageUrl,
        location,
        organizer,
        tags,
        fullArticle,
        price
      },
      { new: true, runValidators: true } // Ensure the response contains the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
});

// 4. Delete an event
router.delete('/delete/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
});

// 5. Get event by ID
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
});

module.exports = router;
