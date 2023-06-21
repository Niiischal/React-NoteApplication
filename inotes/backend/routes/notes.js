const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { query, validationResult, body } = require("express-validator");

// Route 1: Retrieve all the notes using: GET "api/notes/fetchNotes". Login required
router.get("/fetchNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

// Route 2: Adding a new note using: POST "api/notes/addNote". Login required
router.post(
  "/addNote",
  fetchuser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Enter description with atleast 5 characters").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors, return the errors
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      })
      const savedNote = await note.save();
      res.json(savedNote);
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

module.exports = router;
