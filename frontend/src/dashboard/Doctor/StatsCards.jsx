import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";

const DoctorPatients = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [displayedPatients, setDisplayedPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [medicalDetails, setMedicalDetails] = useState({
    hemoglobin: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
    prescription: ""
  });
  const [prescriptionFile, setPrescriptionFile] = useState(null);

  useEffect(() => {
    fetchDoctorPatients();
  }, []);

  const fetchDoctorPatients = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/appointments/doctor-patients");
      const patientsData = response.data.patients || response.data;
      setAllPatients(patientsData);
      setDisplayedPatients(patientsData.slice(0, 5));
    } catch (err) {
      console.error("Error fetching doctor's patients:", err);
      setError(err.response?.data?.message || "Failed to load patient data");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = () => {
    setShowModal(true);
  };

  const handleUpdatePatient = async (patient) => {
    try {
      setSelectedPatient(patient);
      // Fetch existing medical details
      const response = await axiosInstance.get(`/api/medical-details/patient/${patient._id}`);
      if (response.data.success) {
        const details = response.data.data.medicalDetail;
        setMedicalDetails({
          hemoglobin: details.hemoglobin || "",
          bloodPressureSystolic: details.bloodPressure?.systolic || "",
          bloodPressureDiastolic: details.bloodPressure?.diastolic || "",
          heartRate: details.heartRate || "",
          prescription: details.prescription || ""
        });
      }
      setShowUpdateModal(true);
    } catch (error) {
      console.error('Error fetching medical details:', error);
      setMedicalDetails({
        hemoglobin: "",
        bloodPressureSystolic: "",
        bloodPressureDiastolic: "",
        heartRate: "",
        prescription: ""
      });
      setShowUpdateModal(true);
    }
  };

  const handleMedicalUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/medical-details/update', {
        patientId: selectedPatient._id,
        hemoglobin: medicalDetails.hemoglobin || null,
        bloodPressure: medicalDetails.bloodPressureSystolic ? {
          systolic: parseInt(medicalDetails.bloodPressureSystolic),
          diastolic: parseInt(medicalDetails.bloodPressureDiastolic)
        } : null,
        heartRate: medicalDetails.heartRate || null,
        prescription: medicalDetails.prescription
      });

      if (response.data.success) {
        // Upload prescription file if selected
        if (prescriptionFile) {
          const formData = new FormData();
          formData.append('prescriptionPdf', prescriptionFile);
          formData.append('patientId', selectedPatient._id);
          
          await axiosInstance.post('/api/medical-details/upload-prescription', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        }

        alert('Patient details updated successfully!');
        setShowUpdateModal(false);
        setSelectedPatient(null);
        setMedicalDetails({
          hemoglobin: "",
          bloodPressureSystolic: "",
          bloodPressureDiastolic: "",
          heartRate: "",
          prescription: ""
        });
        setPrescriptionFile(null);
      }
    } catch (error) {
      console.error('Error updating patient details:', error);
      alert('Failed to update patient details');
    }
  };

  const handleDownloadPrescription = async (patientId) => {
    try {
      const response = await axiosInstance.get(`/api/medical-details/${patientId}/download-prescription`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'prescription.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading prescription:', error);
      alert('No prescription available for download');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Routine": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Treatment": return "bg-blue-100 text-blue-800";
      case "Follow-up Needed": return "bg-yellow-100 text-yellow-800";
      case "Stable": return "bg-green-100 text-green-800";
      case "Monitoring": return "bg-purple-100 text-purple-800";
      case "Regular Checkup": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <>
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">My Patients</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Age</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Condition</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Visit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Priority</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedPatients.map((patient) => (
                <tr key={patient._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{patient.name}</td>
                  <td className="py-4 px-4 text-gray-700">{patient.age}</td>
                  <td className="py-4 px-4 text-gray-700">{patient.condition || patient.disease}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {patient.lastVisit || (patient.date && new Date(patient.date).toLocaleDateString())}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`}>
                      {patient.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4 space-x-2">
                    <button
                      onClick={() => handleUpdatePatient(patient)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing {displayedPatients.length} of {allPatients.length} patients
          </span>
          <button onClick={handleViewAll} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            View All Patients
          </button>
        </div>
      </div>

      {/* Update Details Modal */}
      {showUpdateModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Update Medical Details - {selectedPatient.name}</h3>
              <button onClick={() => setShowUpdateModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                &times;
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleMedicalUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hemoglobin (g/dL)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={medicalDetails.hemoglobin}
                    onChange={(e) => setMedicalDetails({...medicalDetails, hemoglobin: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter hemoglobin level"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">BP Systolic</label>
                    <input
                      type="number"
                      value={medicalDetails.bloodPressureSystolic}
                      onChange={(e) => setMedicalDetails({...medicalDetails, bloodPressureSystolic: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Systolic"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">BP Diastolic</label>
                    <input
                      type="number"
                      value={medicalDetails.bloodPressureDiastolic}
                      onChange={(e) => setMedicalDetails({...medicalDetails, bloodPressureDiastolic: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Diastolic"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={medicalDetails.heartRate}
                    onChange={(e) => setMedicalDetails({...medicalDetails, heartRate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter heart rate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Prescription Notes</label>
                  <textarea
                    value={medicalDetails.prescription}
                    onChange={(e) => setMedicalDetails({...medicalDetails, prescription: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                    placeholder="Enter prescription details"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Prescription PDF</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPrescriptionFile(e.target.files[0])}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View All Patients Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">All My Patients</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                &times;
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Age</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Condition</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Visit</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Priority</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPatients.map((patient) => (
                      <tr key={patient._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-900">{patient.name}</td>
                        <td className="py-4 px-4 text-gray-700">{patient.age}</td>
                        <td className="py-4 px-4 text-gray-700">{patient.condition || patient.disease}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          {patient.lastVisit || (patient.date && new Date(patient.date).toLocaleDateString())}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`}>
                            {patient.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4 space-x-2">
                          <button
                            onClick={() => handleUpdatePatient(patient)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button onClick={() => setShowModal(false)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorPatients;