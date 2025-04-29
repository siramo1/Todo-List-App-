import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Student from './models/student.model.js';

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


// MongoDB Connection with improved error handling
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((error) => {
  console.error("❌ MongoDB connection failed:", error.message);
  process.exit(1);
});

// register new student
app.post('/api/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Get All Students (Tested in Insomnia)
app.get('/api/students', async (req, res) => {
  try {
    const student = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({message: error.message})
  };
});

//find one student
app.get('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if(!student){
      return res.status(404).json({message: "student not found"})
    };

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
    
})

//update student
app.put('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body);

    if(!student){
      return res.status(404).json({message: "product not found"})
    }
    
    const updatedStudent = await Student.findById(id);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({message: error.message})
  }

})

//delete student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    
    if(!student){
      return res.status(404).json({message: "student not found"})
    };

    res.status(200).json({message: "student deleted succesfully"});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
  
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 MongoDB URI: ${process.env.MONGO_URI}`);
})