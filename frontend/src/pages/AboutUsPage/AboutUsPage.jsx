import React from "react";

import teamPhoto from "/images/doctorTeam.jpeg"; // Ensure this path is correct

const AboutUsPage = () => {
 

  return (
    <div className="mt-10 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        

        {/* Page Title */}
        <h3 className="text-indigo-600 text-lg font-semibold flex items-center justify-center gap-2">
        <span role="img" aria-label="stethoscope">🩺</span> About Us
      </h3>

        {/* Photo Section */}
        <div className="mt-5 mb-12">
          <img
            src={teamPhoto} // Use the imported photo
            alt="Our Team"
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {/* Our Mission */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6">
              Our team of skilled professionals is committed to providing personalized, compassionate care. With a focus on excellence, we ensure the best healthcare experience for all our patients.
            </p>
            <p className="text-gray-700">
              We believe that everyone deserves access to high-quality healthcare, and we strive to make that a reality through innovative treatments, state-of-the-art facilities, and a patient-first approach.
            </p>
          </div>

          {/* Our History */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Our History
            </h2>
            <p className="text-gray-700 mb-6">
              Founded in 2005, our clinic started as a small practice with a vision to revolutionize healthcare in our community. Over the years, we have grown into a leading medical facility, serving thousands of patients annually.
            </p>
            <p className="text-gray-700">
              Our journey has been marked by a commitment to innovation, compassion, and excellence. We are proud of our legacy and excited about the future as we continue to expand our services and reach.
            </p>
          </div>

          {/* Our Values */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Our Values
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Compassion:</strong> We treat every patient with empathy and understanding.</li>
              <li><strong>Excellence:</strong> We strive for the highest standards in medical care.</li>
              <li><strong>Integrity:</strong> We are honest, transparent, and ethical in all our actions.</li>
              <li><strong>Innovation:</strong> We embrace new technologies and treatments to improve patient outcomes.</li>
              <li><strong>Community:</strong> We are dedicated to serving and supporting our local community.</li>
            </ul>
          </div>

          {/* Meet the Team */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Meet the Team
            </h2>
            <p className="text-gray-700 mb-6">
              Our team is the heart of our clinic. Comprising highly skilled doctors, nurses, and support staff, we work together to provide the best care for our patients.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Dr. John Doe</h3>
                <p className="text-gray-700">Cardiologist</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Dr. Jane Smith</h3>
                <p className="text-gray-700">Neurologist</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Dr. Emily Brown</h3>
                <p className="text-gray-700">Orthopedic Surgeon</p>
              </div>
            </div>
          </div>

          {/* Community Involvement */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Community Involvement
            </h2>
            <p className="text-gray-700 mb-6">
              We believe in giving back to the community that has supported us over the years. Our clinic regularly participates in health camps, free check-up drives, and educational programs to promote wellness and preventive care.
            </p>
            <p className="text-gray-700">
              Through these initiatives, we aim to make healthcare accessible to everyone, regardless of their background or financial situation.
            </p>
          </div>

          {/* Testimonials */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              What Our Patients Say
            </h2>
            <div className="space-y-4">
              <blockquote className="text-gray-700 italic">
                "The care I received at this clinic was exceptional. The doctors were knowledgeable, and the staff was incredibly supportive."
              </blockquote>
              <blockquote className="text-gray-700 italic">
                "I highly recommend this clinic to anyone looking for top-notch medical care. They truly care about their patients."
              </blockquote>
              <blockquote className="text-gray-700 italic">
                "From the moment I walked in, I felt welcomed and well taken care of. Thank you for your dedication and compassion."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;