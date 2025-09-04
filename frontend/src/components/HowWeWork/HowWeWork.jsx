import React from 'react';

const HowWeWork = () => {
  const steps = [
    {
      id: "01",
      title: "Create Account",
      description: "Join our community by creating an account today.",
      image: "/images/work1.jpg",
    },
    {
      id: "02",
      title: "Search Doctor",
      description: "Find the best doctors for your needs easily.",
      image: "/images/work2.jpg",
    },
    {
      id: "03",
      title: "Schedule Appointment",
      description: "Book an appointment at your convenience.",
      image: "/images/work3.jpg",
    },
    {
      id: "04",
      title: "Start Consultation",
      description: "Connect with a doctor and start your consultation.",
      image: "/images/work4.jpg",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-6 md:px-12 lg:px-24 text-center rounded-3xl">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-indigo-600 text-lg font-semibold flex items-center justify-center gap-2">
          <span role="img" aria-label="stethoscope">🩺</span> How We Work
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          We work to achieve better <br /> health <br /> outcomes
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We are committed to improving health outcomes through personalized care,
          innovative treatments, and a focus on prevention.
        </p>
      </div>

      <div className="relative mt-12 flex justify-center items-center max-w-6xl mx-auto">
        {/* Line connecting the numbers */}
        <div className="absolute top-[180px] left-0 right-0 mx-auto w-3/4 h-0.5 bg-gray-300 hidden md:block"></div>

        {steps.map((step) => (
          <div key={step.id} className="text-center relative w-1/4">
            {/* Image */}
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300 bg-white hover:border-indigo-500 transition-all duration-300">
              <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
            </div>

            {/* Step Number (Line connects these numbers) */}
            <div className="relative mt-6 flex justify-center items-center">
              <span className="z-10 inline-block text-indigo-600 text-lg font-semibold bg-white px-4 py-1 rounded-full shadow border border-indigo-500 hover:bg-indigo-50 transition-colors duration-300">
                {step.id}
              </span>
            </div>

            <h4 className="text-lg font-semibold mt-2">{step.title}</h4>
            <p className="text-gray-600 text-sm mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;