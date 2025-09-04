const Contact = require('../models/Contact');

// Submit contact form
exports.submitContactForm = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;
    
    // Validate required fields
    if (!fullName || !email || !message) {
      return res.status(400).json({ 
        success: false,
        message: "Full name, email, and message are required" 
      });
    }

    // Create new contact submission
    const contact = new Contact({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      message: message.trim()
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      data: {
        id: contact._id
      }
    });
  } catch (err) {
    console.error('Contact form submission error:', err);
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ 
        success: false,
        message: "Validation error", 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Server error. Please try again later." 
    });
  }
};

// Get all contact submissions (admin only)
exports.getContactSubmissions = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Get contacts with pagination and filtering
    const contacts = await Contact.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v'); // Exclude version key
    
    // Get total count for pagination
    const total = await Contact.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalContacts: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (err) {
    console.error('Get contacts error:', err);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// Get single contact submission
exports.getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findById(id).select('-__v');
    
    if (!contact) {
      return res.status(404).json({ 
        success: false,
        message: "Contact submission not found" 
      });
    }
    
    res.json({ 
      success: true,
      data: { contact } 
    });
  } catch (err) {
    console.error('Get contact error:', err);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// Update contact status
exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    if (!status || !['new', 'read', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required (new, read, archived)"
      });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!contact) {
      return res.status(404).json({ 
        success: false,
        message: "Contact submission not found" 
      });
    }
    
    res.json({
      success: true,
      message: "Contact status updated successfully",
      data: { contact }
    });
  } catch (err) {
    console.error('Update contact error:', err);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// Delete contact submission
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findByIdAndDelete(id);
    
    if (!contact) {
      return res.status(404).json({ 
        success: false,
        message: "Contact submission not found" 
      });
    }
    
    res.json({ 
      success: true,
      message: "Contact deleted successfully" 
    });
  } catch (err) {
    console.error('Delete contact error:', err);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};