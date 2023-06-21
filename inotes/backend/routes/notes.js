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
    const { title, description, tag } = req.body;
    try {
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

// Route 3: Updating note using: PUT "api/notes/updateNote". Login required
router.put(
    "/updateNote/:id",
    fetchuser,
    async (req, res) => {
        try {
            // creating a newNote object
            const newNote = {}
            if (title){newNote.title=title};
            if (description){newNote.description=description};
            if (tag){newNote.tag=tag};
    
            //Find the note to be updated and update it
            let note =  await Note.findById(req.params.id);
            if(!note){return res.status(404).send("Not Found")}
    
            if(note.user.toString()!==req.user.id)
            {return res.status(401).send("Not Allowed")}
    
            note= await Note.findByIdAndUpdate(req.params.id,{$set: newNote}, {new: true} )
            res.json({note}) 
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured");
          }
        
    })

// Route 4: Deleting note using: DELETE "api/notes/deleteNote". Login required
router.delete(
    "/deleteNote/:id",
    fetchuser,
    async (req, res) => {
        try {
            const {title, description, tag}=req.body;
    
                //Find the note to be deleted and delete it
                let note =  await Note.findById(req.params.id);
                if(!note){return res.status(404).send("Not Found")}

                // Allow deletion only if user owns this Note
                if(note.user.toString()!==req.user.id)
                {return res.status(401).send("Not Allowed")}

                note= await Note.findByIdAndDelete(req.params.id)
                res.json({"Success": "Note has been deleted", note:note})
            } catch (error) {
                console.error(error.message);
                res.status(500).send("some error occured");
              }
        
    })

module.exports = router;
