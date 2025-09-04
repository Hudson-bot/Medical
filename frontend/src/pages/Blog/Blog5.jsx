import React from "react";

const Blog5 = () => {
  const post = {
    id: "blog5",
    title: "Managing Chronic Pain in the Modern World",
    author: "Dr. Michael Lee",
    date: "October 5, 2023",
    content: [
      {
        type: "paragraph",
        text: "Chronic pain is a complex condition that requires a multidisciplinary approach. Treatments such as physical therapy, cognitive-behavioral therapy, and non-opioid medications are proving effective. Additionally, lifestyle changes like exercise and stress management can significantly improve quality of life.",
      },
      {
        type: "subheading",
        text: "What is Chronic Pain?",
      },
      {
        type: "paragraph",
        text: "Chronic pain is defined as pain that persists for more than 12 weeks, despite medication or treatment. It can result from an injury, surgery, or an underlying health condition such as arthritis or fibromyalgia. Chronic pain can affect every aspect of a person's life, from physical health to emotional well-being.",
      },
      {
        type: "subheading",
        text: "Common Causes of Chronic Pain",
      },
      {
        type: "list",
        items: [
          "**Arthritis**: Inflammation of the joints causing persistent pain.",
          "**Fibromyalgia**: A condition characterized by widespread musculoskeletal pain.",
          "**Back Injuries**: Herniated discs or spinal stenosis can lead to chronic back pain.",
          "**Neuropathy**: Nerve damage causing pain, often in the hands and feet.",
          "**Migraines**: Recurrent headaches that can become chronic.",
        ],
      },
      {
        type: "subheading",
        text: "Effective Treatments for Chronic Pain",
      },
      {
        type: "list",
        items: [
          "**Physical Therapy**: Exercises and stretches to improve mobility and reduce pain.",
          "**Cognitive-Behavioral Therapy (CBT)**: Helps patients manage pain by changing thought patterns and behaviors.",
          "**Non-Opioid Medications**: Anti-inflammatory drugs, antidepressants, and anticonvulsants can help manage pain.",
          "**Acupuncture**: An alternative therapy that can provide relief for some patients.",
          "**Lifestyle Changes**: Regular exercise, a healthy diet, and stress management techniques can improve overall well-being.",
        ],
      },
      {
        type: "subheading",
        text: "Lifestyle Changes to Manage Chronic Pain",
      },
      {
        type: "list",
        items: [
          "**Exercise**: Low-impact activities like swimming, yoga, or walking can help reduce pain and improve flexibility.",
          "**Healthy Diet**: Eating a balanced diet rich in anti-inflammatory foods can help manage pain.",
          "**Stress Management**: Techniques such as meditation, deep breathing, and mindfulness can reduce stress and pain.",
          "**Sleep Hygiene**: Ensuring adequate and quality sleep is essential for pain management.",
        ],
      },
      {
        type: "subheading",
        text: "When to Seek Professional Help",
      },
      {
        type: "paragraph",
        text: "If chronic pain is affecting your daily life, it's important to seek help from a healthcare provider. A multidisciplinary approach involving doctors, physical therapists, and mental health professionals can provide comprehensive care and improve your quality of life.",
      },
      {
        type: "quote",
        text: "Managing chronic pain requires a holistic approach that addresses both the physical and emotional aspects of the condition.",
        author: "Dr. Michael Lee",
      },
      {
        type: "image",
        src: "/images/chronic-pain-management.jpg", // Add another image
        alt: "Chronic Pain Management",
      },
    ],
    image: "/images/chronic-pain.jpg", // Main image
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

export default Blog5;