import React from "react";

const Blog1 = () => {
  const post = {
    id: "blog1",
    title: "Implantation Bleeding Vs Periods: Know the Difference",
    author: "Dr. Sarah Johnson",
    date: "February 28, 2025",
    content: [
      {
        type: "paragraph",
        text: "Implantation bleeding occurs when a fertilized egg attaches to the lining of the uterus, usually around 10-14 days after conception. It is typically lighter and shorter than a regular period. Menstrual periods, on the other hand, involve the shedding of the uterine lining and are usually heavier and last longer. Recognizing the differences can help in early pregnancy detection and proper medical consultation.",
      },
      {
        type: "subheading",
        text: "What is Implantation Bleeding?",
      },
      {
        type: "paragraph",
        text: "Implantation bleeding is a common early sign of pregnancy. It occurs when the fertilized egg attaches itself to the uterine lining, causing slight bleeding. This usually happens around the time of your expected period, making it easy to confuse with a regular period.",
      },
      {
        type: "subheading",
        text: "Key Differences Between Implantation Bleeding and Periods",
      },
      {
        type: "list",
        items: [
          "**Timing**: Implantation bleeding occurs 6-12 days after conception, while periods follow a regular cycle.",
          "**Duration**: Implantation bleeding lasts 1-2 days, whereas periods typically last 3-7 days.",
          "**Flow**: Implantation bleeding is light and spotty, while menstrual flow is heavier.",
          "**Color**: Implantation bleeding is usually light pink or brown, unlike the bright red of menstrual blood.",
        ],
      },
      {
        type: "subheading",
        text: "When to See a Doctor",
      },
      {
        type: "paragraph",
        text: "If you experience heavy bleeding, severe pain, or other unusual symptoms, it's important to consult a healthcare provider. These could be signs of a more serious condition, such as an ectopic pregnancy or miscarriage.",
      },
      {
        type: "quote",
        text: "Early detection of pregnancy can help ensure proper prenatal care and a healthy pregnancy.",
        author: "Dr. Sarah Johnson",
      },
      {
        type: "image",
        src: "/images/implantation-details.jpg", // Add another image
        alt: "Implantation Process",
      },
    ],
    image: "/images/ImplantationBleeding.jpg", // Main image
  };

  return (
    <div className="mt-7 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Blog Post Content */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          {/* Blog Post Image */}
          <div className="rounded-2xl overflow-hidden mb-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          </div>

          {/* Blog Post Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

          {/* Blog Post Author and Date */}
          <p className="text-gray-600 text-sm mb-6">
            By {post.author} | {post.date}
          </p>

          {/* Blog Post Content */}
          <div className="space-y-6">
            {post.content.map((section, index) => {
              switch (section.type) {
                case "paragraph":
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {section.text}
                    </p>
                  );
                case "subheading":
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-4">
                      {section.text}
                    </h2>
                  );
                case "list":
                  return (
                    <ul key={index} className="list-disc list-inside text-gray-700 space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                case "quote":
                  return (
                    <blockquote key={index} className="border-l-4 border-indigo-600 pl-4 italic text-gray-700">
                      "{section.text}"
                      <p className="mt-2 text-sm text-gray-600">— {section.author}</p>
                    </blockquote>
                  );
                case "image":
                  return (
                    <div key={index} className="rounded-2xl overflow-hidden my-6">
                      <img
                        src={section.src}
                        alt={section.alt}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog1;