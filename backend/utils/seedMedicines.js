const mongoose = require('mongoose');
const Medicine = require('../models/Medicine');
require('dotenv').config();

const medicines = [
  {
    name: "Paracetamol",
    disease: "Fever",
    price: 5,
    description: "Relieves pain and fever",
    category: "Pain Relief",
    manufacturer: "PharmaCorp",
    dosage: "500mg",
    stock: 150
  },
  {
    name: "Ibuprofen",
    disease: "Pain Relief",
    price: 8,
    description: "Anti-inflammatory pain reliever",
    category: "Pain Relief",
    manufacturer: "MediHealth",
    dosage: "400mg",
    stock: 120
  },
  {
    name: "Cetirizine",
    disease: "Allergy",
    price: 6,
    description: "Antihistamine for allergy relief",
    category: "Allergy",
    manufacturer: "AllerFree",
    dosage: "10mg",
    stock: 200
  },
  {
    name: "Amoxicillin",
    disease: "Infection",
    price: 10,
    description: "Antibiotic for bacterial infections",
    category: "Antibiotic",
    manufacturer: "BioMed",
    dosage: "500mg",
    prescriptionRequired: true,
    stock: 80
  },
  {
    name: "Aspirin",
    disease: "Pain Relief",
    price: 7,
    description: "Pain reliever and anti-inflammatory",
    category: "Pain Relief",
    manufacturer: "Bayer",
    dosage: "325mg",
    stock: 180
  },
  {
    name: "Loratadine",
    disease: "Allergy",
    price: 9,
    description: "Non-drowsy allergy relief",
    category: "Allergy",
    manufacturer: "Claritin",
    dosage: "10mg",
    stock: 160
  },
  {
    name: "Omeprazole",
    disease: "Acid Reflux",
    price: 12,
    description: "Reduces stomach acid production",
    category: "Gastrointestinal",
    manufacturer: "Prilosec",
    dosage: "20mg",
    stock: 100
  },
  {
    name: "Diphenhydramine",
    disease: "Allergy",
    price: 4,
    description: "Antihistamine for allergies and sleep aid",
    category: "Allergy",
    manufacturer: "Benadryl",
    dosage: "25mg",
    stock: 140
  },
  {
    name: "Metformin",
    disease: "Diabetes",
    price: 15,
    description: "Oral medication for type 2 diabetes",
    category: "Diabetes",
    manufacturer: "Glucophage",
    dosage: "500mg",
    prescriptionRequired: true,
    stock: 90
  },
  {
    name: "Atorvastatin",
    disease: "Cholesterol",
    price: 20,
    description: "Lowers cholesterol levels",
    category: "Cardiovascular",
    manufacturer: "Lipitor",
    dosage: "20mg",
    prescriptionRequired: true,
    stock: 75
  },
  {
    name: "Losartan",
    disease: "Hypertension",
    price: 18,
    description: "Treats high blood pressure",
    category: "Cardiovascular",
    manufacturer: "Cozaar",
    dosage: "50mg",
    prescriptionRequired: true,
    stock: 85
  },
  {
    name: "Levothyroxine",
    disease: "Thyroid",
    price: 14,
    description: "Thyroid hormone replacement",
    category: "Hormonal",
    manufacturer: "Synthroid",
    dosage: "50mcg",
    prescriptionRequired: true,
    stock: 95
  },
  {
    name: "Albuterol",
    disease: "Asthma",
    price: 22,
    description: "Bronchodilator for asthma relief",
    category: "Respiratory",
    manufacturer: "ProAir",
    dosage: "90mcg",
    prescriptionRequired: true,
    stock: 70
  },
  {
    name: "Metoprolol",
    disease: "Heart Disease",
    price: 17,
    description: "Beta blocker for heart conditions",
    category: "Cardiovascular",
    manufacturer: "Lopressor",
    dosage: "50mg",
    prescriptionRequired: true,
    stock: 80
  },
  {
    name: "Sertraline",
    disease: "Depression",
    price: 25,
    description: "Antidepressant (SSRI)",
    category: "Mental Health",
    manufacturer: "Zoloft",
    dosage: "50mg",
    prescriptionRequired: true,
    stock: 65
  },
  {
    name: "Gabapentin",
    disease: "Neuropathy",
    price: 30,
    description: "Treats nerve pain and seizures",
    category: "Neurological",
    manufacturer: "Neurontin",
    dosage: "300mg",
    prescriptionRequired: true,
    stock: 60
  },
  {
    name: "Hydrochlorothiazide",
    disease: "Hypertension",
    price: 10,
    description: "Diuretic for high blood pressure",
    category: "Cardiovascular",
    manufacturer: "Microzide",
    dosage: "25mg",
    prescriptionRequired: true,
    stock: 110
  },
  {
    name: "Prednisone",
    disease: "Inflammation",
    price: 12,
    description: "Corticosteroid for inflammation",
    category: "Anti-inflammatory",
    manufacturer: "Deltasone",
    dosage: "10mg",
    prescriptionRequired: true,
    stock: 85
  },
  {
    name: "Warfarin",
    disease: "Blood Thinner",
    price: 28,
    description: "Anticoagulant blood thinner",
    category: "Cardiovascular",
    manufacturer: "Coumadin",
    dosage: "5mg",
    prescriptionRequired: true,
    stock: 55
  },
  {
    name: "Fluoxetine",
    disease: "Depression",
    price: 20,
    description: "Antidepressant (SSRI)",
    category: "Mental Health",
    manufacturer: "Prozac",
    dosage: "20mg",
    prescriptionRequired: true,
    stock: 70
  },
  {
    name: "Vitamin D3",
    disease: "Vitamin Deficiency",
    price: 8,
    description: "Vitamin D supplement for bone health",
    category: "Vitamins",
    manufacturer: "NatureMade",
    dosage: "1000IU",
    stock: 200
  },
  {
    name: "Vitamin C",
    disease: "Immune Support",
    price: 6,
    description: "Antioxidant and immune system support",
    category: "Vitamins",
    manufacturer: "Nature's Bounty",
    dosage: "500mg",
    stock: 250
  },
  {
    name: "Calcium Carbonate",
    disease: "Bone Health",
    price: 9,
    description: "Calcium supplement for bones",
    category: "Minerals",
    manufacturer: "Viactiv",
    dosage: "600mg",
    stock: 180
  },
  {
    name: "Omega-3 Fish Oil",
    disease: "Heart Health",
    price: 15,
    description: "Supports heart and brain health",
    category: "Supplements",
    manufacturer: "Nordic Naturals",
    dosage: "1000mg",
    stock: 120
  },
  {
    name: "Probiotic Complex",
    disease: "Digestive Health",
    price: 18,
    description: "Supports gut health and digestion",
    category: "Digestive",
    manufacturer: "Culturelle",
    dosage: "10 billion CFU",
    stock: 130
  },
  {
    name: "Melatonin",
    disease: "Sleep Disorders",
    price: 12,
    description: "Natural sleep aid supplement",
    category: "Sleep",
    manufacturer: "Natrol",
    dosage: "5mg",
    stock: 160
  },
  {
    name: "Glucosamine & Chondroitin",
    disease: "Joint Pain",
    price: 22,
    description: "Supports joint health and mobility",
    category: "Joint Health",
    manufacturer: "Move Free",
    dosage: "1500mg/1200mg",
    stock: 95
  },
  {
    name: "Iron Supplement",
    disease: "Anemia",
    price: 11,
    description: "Iron supplement for anemia treatment",
    category: "Minerals",
    manufacturer: "Slow FE",
    dosage: "65mg",
    prescriptionRequired: false,
    stock: 140
  },
  {
    name: "Zinc Lozenges",
    disease: "Cold & Flu",
    price: 7,
    description: "Zinc supplements for immune support",
    category: "Cold & Flu",
    manufacturer: "Cold-Eeze",
    dosage: "13.3mg",
    stock: 170
  },
  {
    name: "Coenzyme Q10",
    disease: "Heart Health",
    price: 19,
    description: "Antioxidant for heart health support",
    category: "Cardiovascular",
    manufacturer: "Qunol",
    dosage: "100mg",
    stock: 110
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing medicines
    await Medicine.deleteMany({});
    console.log('Cleared existing medicines');
    
    // Insert new medicines
    await Medicine.insertMany(medicines);
    console.log('Seeded medicines successfully');
    
    // Display summary
    const count = await Medicine.countDocuments();
    console.log(`Total medicines in database: ${count}`);
    
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDatabase();