import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";

const PrescriptionPopup = ({ isOpen, onClose }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchPrescriptions();
    }
  }, [isOpen]);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get("/api/medical-details/prescriptions");
      
      if (response.data.success) {
        setPrescriptions(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
      setError("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (prescriptionId, filename, originalName) => {
    try {
      const response = await axiosInstance.get(
        `/api/medical-details/prescriptions/${prescriptionId}/download`,
        {
          responseType: 'blob'
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalName || `prescription-${prescriptionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error("Error downloading prescription:", err);
      alert("Failed to download prescription");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">My Prescriptions</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-3">Loading prescriptions...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {!loading && !error && prescriptions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No prescriptions found</p>
              <p className="text-sm">Your prescriptions will appear here once doctors upload them.</p>
            </div>
          )}

          {!loading && prescriptions.length > 0 && (
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div key={prescription._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        Dr. {prescription.doctorId?.name || 'Unknown Doctor'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {prescription.doctorId?.doctorType || 'General Physician'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Created: {formatDate(prescription.lastUpdated)}
                      </p>
                      
                      {prescription.prescription && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-700">
                            <strong>Notes:</strong> {prescription.prescription}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      {prescription.prescriptionPdf ? (
                        <button
                          onClick={() => handleDownload(
                            prescription._id,
                            prescription.prescriptionPdf.filename,
                            prescription.prescriptionPdf.originalName
                          )}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          📄 Download PDF
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">No PDF available</span>
                      )}
                      
                      {prescription.hemoglobin && (
                        <span className="text-xs text-gray-600">
                          Hemoglobin: {prescription.hemoglobin} g/dL
                        </span>
                      )}
                      
                      {prescription.heartRate && (
                        <span className="text-xs text-gray-600">
                          Heart Rate: {prescription.heartRate} bpm
                        </span>
                      )}
                      
                      {prescription.bloodPressure && (
                        <span className="text-xs text-gray-600">
                          BP: {prescription.bloodPressure.systolic}/{prescription.bloodPressure.diastolic}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPopup;