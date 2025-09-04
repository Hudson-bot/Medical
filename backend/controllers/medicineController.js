const Medicine = require('../models/Medicine');

// Get all medicines with filtering and sorting
exports.getMedicines = async (req, res) => {
  try {
    const { search, filter, sortBy, category } = req.query;
    
    // Build query
    let query = {};
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { disease: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by disease
    if (filter) {
      query.disease = filter;
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Build sort object
    let sort = {};
    switch (sortBy) {
      case 'name':
        sort.name = 1;
        break;
      case 'price':
        sort.price = 1;
        break;
      case 'disease':
        sort.disease = 1;
        break;
      case 'price-desc':
        sort.price = -1;
        break;
      default:
        sort.name = 1;
    }
    
    const medicines = await Medicine.find(query).sort(sort);
    res.json(medicines);
  } catch (err) {
    console.error('Get medicines error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single medicine by ID
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.json(medicine);
  } catch (err) {
    console.error('Get medicine error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all unique diseases for filter dropdown
exports.getDiseases = async (req, res) => {
  try {
    const diseases = await Medicine.distinct('disease');
    res.json(diseases.sort());
  } catch (err) {
    console.error('Get diseases error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all unique categories for filter dropdown
exports.getCategories = async (req, res) => {
  try {
    const categories = await Medicine.distinct('category');
    res.json(categories.sort());
  } catch (err) {
    console.error('Get categories error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new medicine (admin only)
exports.createMedicine = async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    console.error('Create medicine error:', err);
    res.status(500).json({ message: "Server error" });
  }
};