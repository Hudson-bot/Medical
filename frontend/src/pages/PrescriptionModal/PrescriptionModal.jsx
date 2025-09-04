import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";

// Set worker for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PrescriptionModal = ({ 
  isOpen, 
  onClose, 
  medicines, 
  onAddToCart 
}) => {
  const [prescriptionText, setPrescriptionText] = useState("");
  const [prescriptionMedicines, setPrescriptionMedicines] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Extract text from PDF
  const extractTextFromPDF = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const typedArray = new Uint8Array(e.target.result);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let text = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map((item) => item.str).join(" ");
            text += pageText + "\n";
          }

          resolve(text);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  // Extract text from image using OCR
  const extractTextFromImage = async (file) => {
    const { data: { text } } = await Tesseract.recognize(file, "eng");
    return text;
  };

  // Handle file upload (supports TXT, PDF, JPG, PNG)
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      let text = "";

      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else if (file.type.startsWith("text/")) {
        const reader = new FileReader();
        text = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsText(file);
        });
      } else if (file.type.startsWith("image/")) {
        text = await extractTextFromImage(file);
      } else {
        alert("Unsupported file type. Please upload TXT, PDF, JPG, or PNG.");
        return;
      }

      setPrescriptionText(text);
    } catch (err) {
      console.error("Error reading file:", err);
      alert("Failed to read prescription file.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Process prescription text to extract medicines
  const processPrescription = () => {
    setIsProcessing(true);
    try {
      const text = prescriptionText.toLowerCase();
      const foundMedicines = medicines.filter((med) =>
        text.includes(med.name.toLowerCase())
      );

      setPrescriptionMedicines(foundMedicines);

      if (foundMedicines.length === 0) {
        alert("No medicines found in your prescription. Please check the spelling or try again.");
      }
    } catch (err) {
      console.error("Error processing prescription:", err);
      alert("Error processing prescription. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Add all prescription medicines to cart
  const addPrescriptionToCart = () => {
    onAddToCart(prescriptionMedicines);
    onClose();
    setPrescriptionText("");
    setPrescriptionMedicines([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-green-900 mb-4 text-center">
          Upload Prescription
        </h2>
        
        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Prescription File
          </label>
          <input
            type="file"
            accept=".txt,.pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: TXT, PDF, JPG, PNG
          </p>
        </div>

        {/* Text Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or type/paste prescription text:
          </label>
          <textarea
            value={prescriptionText}
            onChange={(e) => setPrescriptionText(e.target.value)}
            placeholder="Enter medicine names from your prescription..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none text-sm"
            rows={4}
          />
        </div>

        {/* Process Button */}
        <button
          onClick={processPrescription}
          disabled={!prescriptionText.trim() || isProcessing}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 mb-4 text-sm font-medium"
        >
          {isProcessing ? "Processing..." : "Process Prescription"}
        </button>

        {/* Detected Medicines */}
        {prescriptionMedicines.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Medicines Found:</h3>
            <div className="max-h-40 overflow-y-auto border rounded-lg p-2">
              {prescriptionMedicines.map((med) => (
                <div key={med._id} className="flex justify-between items-center p-2 border-b text-sm">
                  <div>
                    <span className="font-medium">{med.name}</span>
                    <span className="text-gray-600 text-xs block">For: {med.disease}</span>
                  </div>
                  <span className="font-bold">${med.price}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={addPrescriptionToCart}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Add All to Cart
              </button>
              <button
                onClick={() => setPrescriptionMedicines([])}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 text-sm font-medium"
              >
                Clear List
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              onClose();
              setPrescriptionText("");
              setPrescriptionMedicines([]);
            }}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 text-sm font-medium"
          >
            Close
          </button>
          {prescriptionMedicines.length > 0 && (
            <button
              onClick={addPrescriptionToCart}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
            >
              Add & Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
