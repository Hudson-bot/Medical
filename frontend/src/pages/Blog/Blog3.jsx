import React from "react";

const Blog3 = () => {
  const post = {
    id: "blog3",
    title: "Itching During Dengue: Causes, Treatment and Home Remedies",
    author: "Dr. Emily Carter",
    date: "February 18, 2025",
    content: [
      {
        type: "paragraph",
        text: "Itching during dengue fever is often a result of the body's immune response to the virus. Treatment options include antihistamines and topical creams. Home remedies such as oatmeal baths and aloe vera can also provide relief. It is important to stay hydrated and avoid scratching to prevent skin infections.",
      },
      {
        type: "subheading",
        text: "What Causes Itching During Dengue?",
      },
      {
        type: "paragraph",
        text: "Itching during dengue fever is primarily caused by the release of histamines as part of the body's immune response to the virus. This can lead to skin irritation and a persistent urge to scratch, which may worsen the condition.",
      },
      {
        type: "subheading",
        text: "Common Symptoms of Dengue-Related Itching",
      },
      {
        type: "list",
        items: [
          "Intense itching, especially on the palms and soles.",
          "Redness or rashes on the skin.",
          "Dry or flaky skin due to dehydration.",
          "Mild swelling or inflammation in affected areas.",
        ],
      },
      {
        type: "subheading",
        text: "Effective Treatments for Itching",
      },
      {
        type: "list",
        items: [
          "**Antihistamines**: Medications like cetirizine or loratadine can help reduce itching.",
          "**Topical Creams**: Hydrocortisone or calamine lotion can soothe irritated skin.",
          "**Moisturizers**: Use fragrance-free moisturizers to keep the skin hydrated.",
          "**Cold Compress**: Applying a cold compress can provide immediate relief from itching.",
        ],
      },
      {
        type: "subheading",
        text: "Home Remedies for Itching",
      },
      {
        type: "list",
        items: [
          "**Oatmeal Baths**: Adding colloidal oatmeal to a lukewarm bath can soothe itchy skin.",
          "**Aloe Vera**: Applying fresh aloe vera gel can reduce inflammation and itching.",
          "**Coconut Oil**: Massaging coconut oil onto the skin can provide relief and hydration.",
          "**Stay Hydrated**: Drinking plenty of water helps flush out toxins and keeps the skin hydrated.",
        ],
      },
      {
        type: "subheading",
        text: "When to Seek Medical Advice",
      },
      {
        type: "paragraph",
        text: "If itching is severe, persistent, or accompanied by other symptoms like high fever, bleeding, or difficulty breathing, it's important to consult a healthcare provider immediately. These could be signs of a more serious complication of dengue fever.",
      },
      {
        type: "quote",
        text: "Proper hydration and skin care are essential for managing itching during dengue fever. Avoiding scratching can prevent secondary infections.",
        author: "Dr. Emily Carter",
      },
      {
        type: "image",
        src: "/images/itching-remedies.jpg", // Add another image
        alt: "Remedies for Itching",
      },
    ],
    image: "/images/itching.jpg", // Main image
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

export default Blog3;