const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/student_management');

// Define student schema and model
const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  grade: String,
  dateOfBirth: Date,
  gender: String,
  email: String,
  phone: String,
  address: String,
  photograph: String,
  active: { type: Boolean, default: true },
});

const Student = mongoose.model('Student', studentSchema);

// APIs
// Get all activatd students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find({ active: true });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all deactivated students
app.get('/students/deactivated', async (req, res) => {
  try {
    const students = await Student.find({ active: false });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get specific student
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add new student
app.post('/students', upload.single('photograph'), async (req, res) => {
  try {
    const student = new Student({
      ...req.body,
      photograph: req.file ? req.file.filename : ''
    });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error adding student');
  }
});

// Edit student
app.put('/students/:id', upload.single('photograph'), async (req, res) => {
  try {
    const updateData = {
      ...req.body
    };
    if (req.file) {
      updateData.photograph = req.file.filename;
    }
    const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating student');
  }
});

//  Reactivate Deactivate student
app.put('/students/reactivate/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Deactivate student
app.delete('/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).send('Invalid Student ID');
    }

    const student = await Student.findByIdAndUpdate(studentId, { active: false }, { new: true });

    if (!student) {
      return res.status(404).send('Student not found');
    }

    res.json(student);
  } catch (err) {
    console.error('Error deactivating student:', err);
    res.status(500).send('Server Error');
  }
});

// Permanently delete student
app.delete('/students/permanent/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).send('Student not found');
    res.json({ message: 'Student deleted permanently' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
