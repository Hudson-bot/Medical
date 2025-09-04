import { Users } from 'lucide-react';
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Brooklyn Simmons",
    role: "Orthodontics",
    image: "/images/random1.jpg", // Replace with actual images
    feedback:
      "My first appointment, but the staff was so welcoming. They took the time to listen to my concerns and made sure I felt comfortable.",
  },
  {
    id: 2,
    name: "Monika Roy",
    role: "Dental Hygienist",
    image: "/images/random2.jpg",
    feedback:
      "My first appointment, but the staff was so welcoming. They took the time to listen to my concerns and made sure I felt comfortable.",
  },
  {
    id: 3,
    name: "Albert Flores",
    role: "Senior Dentist",
    image: "/images/random3.jpg",
    feedback:
      "My first appointment, but the staff was so welcoming. They took the time to listen to my concerns and made sure I felt comfortable.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 text-center relative overflow-hidden rounded-3xl">
      {/* Background World Map Effect */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" 
        style={{ backgroundImage: "url('/images/worldmap.jpg')" }}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center text-indigo-600">
          <Users className="w-6 h-6" />
          <span className="ml-2 text-sm font-semibold">Testimonials</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
          Patient stories of care and recovery
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Discover inspiring stories of recovery and healing from those we've had the privilege to serve.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mt-10 relative z-10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 h-full flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Star Rating */}
            <div className="text-indigo-600 text-xl mb-3">★★★★★</div>

            {/* Testimonial Text */}
            <p className="text-gray-600 italic flex-grow">"{testimonial.feedback}"</p>

            {/* User Info */}
            <div className="mt-6 flex items-center gap-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;