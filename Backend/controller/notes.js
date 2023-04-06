

const Notes = require('../model/notes');

let createNotes= async (req, res, next) => {
  try {
     
    let criteria={
        title:req.body.title
    }

   
    let notesData = await Notes.find(criteria);
 
    if(notesData.length > 0){
        return res.status(400).json({ error: 'Notes with this title is already exists' })
    }
    const note = new Notes(req.body);
    await note.save();
    res.status(201).json({
        message:"Note created successfully",
        data:note
    });
  } catch (err) {
    next(err);
  }
};

let getAllnotes= async (req, res, next) => {
 
  try {
   
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalNotes = await Notes.countDocuments();
    const totalPages = Math.ceil(totalNotes / limit);
      
    const notes = await Notes.find()
      .skip((page - 1) * limit)
      .limit(limit);

      res.json({
        totalNotes: totalNotes,
        totalPages: totalPages,
        currentPage: page,
        notesPerPage: limit,
        notes: notes
      });
    
    
   
  } catch (err) {
   
    next(err);
  }
};

let getNotesById = async (req, res, next) => {
  try {
    
    const note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).json({ error: 'Notes not exist.' })
    }
    res.json(note);
  } catch (err) {
    next(err);
  }
};

let updateNote = async (req, res, next) => {
  try {
    //check Notes exists
    let notesData= await Notes.findById(req.params.id)
  
    // role update from provider to client then throw erros for required fields
   
    
    if(!notesData){
        return res.status(400).json({ error: 'Notes not exist.' })
    }
    let objToUpdate={}
    if(req.body.title && req.body.title !== notesData.title){
        objToUpdate.title=req.body.title
    }
    
    if(req.body.description && req.body.desciption !== notesData.description){
        objToUpdate.description=req.body.description
    }
    if(objToUpdate == {}){
        objToUpdate=req.body;
    }
    const notes = await Notes.findByIdAndUpdate(req.body.id, objToUpdate, {
      new: true,
      runValidators: true,
    });
   res.status(201).json({
        message:"Notes updated successfully",
        data:notes
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
};

let deleteNote = async (req, res, next) => {
  try {

    let noteData= await Notes.findById(req.params.id)
    if(!noteData){
        return res.status(404).json({ error: 'notes not exist.' })
    }
    
    await noteData.deleteOne();
    

    
    return res.status(200).json({
      message: 'Note deleted successfully',
      data: { id: noteData._id },
    });
  } catch (err) {
    next(err);
  }
};

module.exports={
    createNotes,
    getAllnotes,
    getNotesById,
    updateNote,
    deleteNote
}