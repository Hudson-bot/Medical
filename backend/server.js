require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const contactRoutes = require('./routes/contactRoutes');
const medicalDetails = require('./routes/medicalDetails');
const noteRoutes = require('./routes/noteRoutes');
const payments = require('./routes/payments');
const aiRoutes = require('./routes/aiRoutes');

const cors = require('cors');
const nodemon = require('nodemon');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/medical-details', medicalDetails);
app.use('/api/notes', noteRoutes);
app.use('/api/payments', payments);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
