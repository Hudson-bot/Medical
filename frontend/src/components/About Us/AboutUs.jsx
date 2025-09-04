import React from 'react';
import { FaClock, FaHandHoldingMedical, FaHeart, FaUserMd } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();
    const handleSubmit = () =>{
      navigate('/aboutUsPage');
    }
  return (
    
    <section className="mt-1 w-full py-16 px-4 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-8 bg-gradient-to-br bg-white">
      {/* Left Side (Text + List) */}
      <div className="lg:w-2/4 text-center lg:text-left">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2">
          <FaHeart className="text-xl" />
          <span>About Us</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Professionals dedicated to your health.
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          Our team of skilled professionals is committed to providing
          personalized, compassionate care. With a focus on excellence, we
          ensure the best healthcare experience.
        </p>

        <div className="mt-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <FaHandHoldingMedical className="text-indigo-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Patient-Centered Care
              </h3>
              <p className="text-gray-600 text-sm">
                Putting you at the heart of everything we do. Our
                patient-centered approach ensures personalized care.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <FaUserMd className="text-indigo-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Specialist Doctors
              </h3>
              <p className="text-gray-600 text-sm">
                Highly trained medical professionals providing expert care in
                all specialties.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <FaClock className="text-indigo-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                24 Hours Service
              </h3>
              <p className="text-gray-600 text-sm">
                Always available to provide emergency and routine care around
                the clock.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button onClick={handleSubmit} className="bg-indigo-900 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-800 transition-colors duration-300">
            View More About Us
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="lg:w-2/4 mt-8 lg:mt-10 relative flex flex-col items-center">
        <img 
          src="/images/AboutUSdoctor.jpg"
          alt="Doctor performing surgery"
          className="w-96 h-96 md:w-[420px] lg:w-[480px] rounded-3xl shadow-md object-cover"
        />

        <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-6 py-4 rounded-3xl shadow-lg flex flex-col w-56 sm:w-64 md:w-72">
          <div className="flex items-center gap-2">
            <FaClock className="text-xl" />
            <h4 className="text-lg font-semibold">Opening Hours</h4>
          </div>
          <p className="text-sm mt-3">Mon to Fri: <span className="font-bold">09:30 - 07:30</span></p>
          <p className="text-sm">Saturday: <span className="font-bold">10:30 - 5:00</span></p>
          <p className="text-sm">Sunday: <span className="text-red-400 font-bold">Closed</span></p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;