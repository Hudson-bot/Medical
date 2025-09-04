import React, { useState } from "react";
import { ChevronDown, ChevronUp, PhoneCall } from "lucide-react";

const FrequentlyAsked = () => {
  const faqs = [
    {
      question: "What should I bring to my first appointment?",
      answer:
        "For your first visit, please bring a valid ID, your insurance card, any current medications or a list of them, and any relevant medical records.",
    },
    {
      question: "How do I schedule an appointment?",
      answer:
        "You can schedule an appointment through our website or by calling our support line at 659-888-589.",
    },
    {
      question: "What insurance plan do you accept?",
      answer:
        "We accept a variety of insurance plans. Please check with our billing department for more details.",
    },
    {
      question: "Can I get a prescription refill without an appointment?",
      answer:
        "Some prescription refills may be available without an appointment. Please contact our office for more information.",
    },
    {
      question: "What should I expect during my first visit?",
      answer:
        "During your first visit, our doctor will review your medical history, perform necessary examinations, and discuss a treatment plan tailored to you.",
    },
    {
      question: "How are treatment plans customized for individual needs?",
      answer:
        "Our treatment plans are based on your specific condition, medical history, and personal health goals to ensure the best outcomes.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleEvent = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-6 md:px-12 rounded-3xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div>
          <h3 className="text-indigo-600 text-lg font-semibold flex items-center gap-2">
            <span role="img" aria-label="stethoscope">🩺</span> Frequently Asked Questions
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Helping you understand healthcare
          </h2>
          <p className="text-gray-600 mt-4">
            Here to make your experience as seamless as possible—explore answers
            to common questions about our services, policies, and patient care.
          </p>

          {/* Emergency Contact Card */}
          <div className="bg-white shadow-lg rounded-xl p-6 mt-6 w-96 flex items-center gap-4 hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-indigo-100 p-3 rounded-full">
              <PhoneCall className="text-indigo-700 w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-600">We always take care of your smile</p>
              <h4 className="text-xl font-bold text-gray-900">24/7 Emergency</h4>
              <p className="text-indigo-600 font-medium">659-888-589</p>
            </div>
          </div>
        </div>

        {/* Right Side (FAQ Section) */}
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-none">
              <button
                onClick={() => handleEvent(index)}
                className="w-full flex justify-between items-center py-4 text-left transition-colors duration-200 hover:bg-indigo-50 rounded-lg px-4"
              >
                <span
                  className={`text-lg font-semibold ${
                    openIndex === index ? "text-indigo-700" : "text-gray-900"
                  }`}
                >
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-indigo-700 w-5 h-5" />
                ) : (
                  <ChevronDown className="text-gray-600 w-5 h-5" />
                )}
              </button>
              {openIndex === index && (
                <p className="text-gray-700 pb-4 px-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAsked;