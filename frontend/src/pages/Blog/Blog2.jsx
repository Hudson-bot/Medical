import React from "react";

const Blog2 = () => {
  const post = {
    id: "blog2",
    title: "Bloating During Ovulation: Symptoms, Causes and Remedies",
    author: "Dr. Michael Lee",
    date: "February 28, 2025",
    content: [
      {
        type: "paragraph",
        text: "Bloating during ovulation is often caused by hormonal changes that lead to water retention. Symptoms include a feeling of fullness, abdominal discomfort, and slight swelling. Remedies include staying hydrated, eating a balanced diet, and avoiding foods that cause gas. Over-the-counter medications can also help alleviate symptoms.",
      },
      {
        type: "subheading",
        text: "What Causes Bloating During Ovulation?",
      },
      {
        type: "paragraph",
        text: "During ovulation, hormonal fluctuations, particularly in estrogen and progesterone, can cause the body to retain water. This leads to bloating, which is often accompanied by mild cramping or discomfort.",
      },
      {
        type: "subheading",
        text: "Common Symptoms of Ovulation Bloating",
      },
      {
        type: "list",
        items: [
          "Feeling of fullness or tightness in the abdomen.",
          "Mild abdominal discomfort or cramping.",
          "Slight swelling or puffiness in the abdominal area.",
          "Increased gas or flatulence.",
        ],
      },
      {
        type: "subheading",
        text: "Effective Remedies for Bloating",
      },
      {
        type: "list",
        items: [
          "**Stay Hydrated**: Drinking plenty of water helps flush out excess sodium and reduce water retention.",
          "**Eat a Balanced Diet**: Focus on foods rich in fiber, such as fruits, vegetables, and whole grains, to promote digestion.",
          "**Avoid Gas-Producing Foods**: Limit intake of beans, carbonated drinks, and cruciferous vegetables like broccoli and cauliflower.",
          "**Over-the-Counter Medications**: Anti-bloating medications like simethicone can provide relief.",
          "**Exercise Regularly**: Light physical activity, such as walking or yoga, can help reduce bloating.",
        ],
      },
      {
        type: "subheading",
        text: "When to Seek Medical Advice",
      },
      {
        type: "paragraph",
        text: "If bloating is severe, persistent, or accompanied by other symptoms like severe pain, nausea, or changes in bowel habits, it's important to consult a healthcare provider. These could be signs of an underlying condition, such as irritable bowel syndrome (IBS) or ovarian cysts.",
      },
      {
        type: "quote",
        text: "Understanding your body's signals during ovulation can help you manage symptoms effectively and maintain your overall well-being.",
        author: "Dr. Michael Lee",
      },
      {
        type: "image",
        src: "/images/bloating-remedies.jpg", // Add another image
        alt: "Remedies for Bloating",
      },
    ],
    image: "/images/bloating.jpg", // Main image
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

export default Blog2;