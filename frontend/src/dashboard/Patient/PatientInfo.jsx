import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig"; // Adjust path as needed

const PatientInfo = () => {
  const [patientData, setPatientData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    emergencyContact: "",
    medicalHistory: "",
    allergies: "",
    bloodGroup: "",
    height: "",
    weight: ""
  });

  // Fetch patient data from backend
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setPatientData(response.data);
        // Initialize form data with patient data
        setFormData({
          name: response.data.name || "",
          age: response.data.patientInfo?.age || "",
          gender: response.data.patientInfo?.gender || "",
          phone: response.data.patientInfo?.phone || "",
          address: response.data.patientInfo?.address || "",
          emergencyContact: response.data.patientInfo?.emergencyContact || "",
          medicalHistory: response.data.patientInfo?.medicalHistory || "",
          allergies: response.data.patientInfo?.allergies || "",
          bloodGroup: response.data.patientInfo?.bloodGroup || "",
          height: response.data.patientInfo?.height || "",
          weight: response.data.patientInfo?.weight || ""
        });
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setError("Failed to fetch patient data");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.put("/api/patient/update-info", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setPatientData(response.data);
      setIsEditing(false);
      alert("Information updated successfully!");
    } catch (err) {
      console.error("Error updating patient data:", err);
      alert("Failed to update information");
    }
  };

  const handleCancel = () => {
    // Reset form data to original patient data
    setFormData({
      name: patientData.name || "",
      age: patientData.patientInfo?.age || "",
      gender: patientData.patientInfo?.gender || "",
      phone: patientData.patientInfo?.phone || "",
      address: patientData.patientInfo?.address || "",
      emergencyContact: patientData.patientInfo?.emergencyContact || "",
      medicalHistory: patientData.patientInfo?.medicalHistory || "",
      allergies: patientData.patientInfo?.allergies || "",
      bloodGroup: patientData.patientInfo?.bloodGroup || "",
      height: patientData.patientInfo?.height || "",
      weight: patientData.patientInfo?.weight || ""
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-blue-100">
        <div className="animate-pulse">
          <div className="h-8 bg-blue-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-6 bg-blue-200 rounded w-full"></div>
            ))}
          </div>
          <div className="h-10 bg-blue-200 rounded w-1/4 mt-6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Patient's Information</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Patient's Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">Personal Details</h3>
          
          <InfoField 
            label="Name" 
            name="name"
            value={isEditing ? formData.name : patientData.name} 
            editing={isEditing}
            onChange={handleChange}
          />
          
          <InfoField 
            label="Age" 
            name="age"
            value={isEditing ? formData.age : patientData.patientInfo?.age} 
            editing={isEditing}
            onChange={handleChange}
            type="number"
          />
          
          <InfoField 
            label="Gender" 
            name="gender"
            value={isEditing ? formData.gender : patientData.patientInfo?.gender} 
            editing={isEditing}
            onChange={handleChange}
          />
          
          <InfoField 
            label="Phone" 
            name="phone"
            value={isEditing ? formData.phone : patientData.patientInfo?.phone} 
            editing={isEditing}
            onChange={handleChange}
          />
          
          <InfoField 
            label="Address" 
            name="address"
            value={isEditing ? formData.address : patientData.patientInfo?.address} 
            editing={isEditing}
            onChange={handleChange}
            textarea
          />
        </div>

        {/* Medical Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">Medical Details</h3>
          
          <InfoField 
            label="Emergency Contact" 
            name="emergencyContact"
            value={isEditing ? formData.emergencyContact : patientData.patientInfo?.emergencyContact} 
            editing={isEditing}
            onChange={handleChange}
          />
          
          <InfoField 
            label="Blood Group" 
            name="bloodGroup"
            value={isEditing ? formData.bloodGroup : patientData.patientInfo?.bloodGroup} 
            editing={isEditing}
            onChange={handleChange}
          />
          
          <InfoField 
            label="Height" 
            name="height"
            value={isEditing ? formData.height : patientData.patientInfo?.height} 
            editing={isEditing}
            onChange={handleChange}
            placeholder="e.g., 175 cm"
          />
          
          <InfoField 
            label="Weight" 
            name="weight"
            value={isEditing ? formData.weight : patientData.patientInfo?.weight} 
            editing={isEditing}
            onChange={handleChange}
            placeholder="e.g., 68 kg"
          />
          
          <InfoField 
            label="Allergies" 
            name="allergies"
            value={isEditing ? formData.allergies : patientData.patientInfo?.allergies} 
            editing={isEditing}
            onChange={handleChange}
            textarea
          />
          
          <InfoField 
            label="Medical History" 
            name="medicalHistory"
            value={isEditing ? formData.medicalHistory : patientData.patientInfo?.medicalHistory} 
            editing={isEditing}
            onChange={handleChange}
            textarea
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300"
          >
            Edit Information
          </button>
        )}
      </div>
    </div>
  );
};

// Reusable component for info fields
const InfoField = ({ label, value, editing, onChange, name, type = "text", textarea = false, placeholder = "" }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-700 mb-1">{label}:</span>
    {editing ? (
      textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="border border-blue-300 rounded-lg p-2 text-sm"
          rows={3}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="border border-blue-300 rounded-lg p-2 text-sm"
          placeholder={placeholder}
        />
      )
    ) : (
      <span className="text-sm font-semibold text-blue-800">{value || "Not provided"}</span>
    )
    }
  </div>
);

export default PatientInfo;