import React from "react";

const Blog4 = () => {
  const post = {
    id: "blog4",
    title: "Cervical Cerclage: Types, Procedures, Precautions and Risks",
    author: "Dr. James Patel",
    date: "February 18, 2025",
    content: [
      {
        type: "paragraph",
        text: "Cervical cerclage involves stitching the cervix closed to prevent it from opening too early during pregnancy. There are different types of cerclage, including McDonald and Shirodkar procedures. Precautions include avoiding heavy lifting and strenuous activities. Risks include infection, bleeding, and premature rupture of membranes. It is important to discuss the benefits and risks with your healthcare provider.",
      },
      {
        type: "subheading",
        text: "What is Cervical Cerclage?",
      },
      {
        type: "paragraph",
        text: "Cervical cerclage is a surgical procedure used to prevent premature birth or miscarriage in women with a weak or incompetent cervix. The procedure involves stitching the cervix closed to provide additional support during pregnancy.",
      },
      {
        type: "subheading",
        text: "Types of Cervical Cerclage",
      },
      {
        type: "list",
        items: [
          "**McDonald Cerclage**: The most common type, where a stitch is placed around the cervix to keep it closed.",
          "**Shirodkar Cerclage**: A more complex procedure where the stitch is placed deeper within the cervix.",
          "**Transabdominal Cerclage**: Performed through an abdominal incision, usually in cases where vaginal cerclage is not possible.",
        ],
      },
      {
        type: "subheading",
        text: "Procedure Overview",
      },
      {
        type: "paragraph",
        text: "The procedure is typically performed under regional or general anesthesia. The surgeon uses a speculum to access the cervix and places a stitch to reinforce it. The stitch is usually removed around the 37th week of pregnancy or earlier if labor begins.",
      },
      {
        type: "subheading",
        text: "Precautions After Cervical Cerclage",
      },
      {
        type: "list",
        items: [
          "Avoid heavy lifting and strenuous activities.",
          "Refrain from sexual intercourse until approved by your doctor.",
          "Attend all follow-up appointments to monitor the cervix and overall pregnancy health.",
          "Report any signs of infection, such as fever, unusual discharge, or abdominal pain, immediately.",
        ],
      },
      {
        type: "subheading",
        text: "Risks and Complications",
      },
      {
        type: "list",
        items: [
          "Infection at the site of the stitch.",
          "Bleeding or spotting.",
          "Premature rupture of membranes.",
          "Cervical scarring or damage.",
          "Increased risk of preterm labor.",
        ],
      },
      {
        type: "subheading",
        text: "When to Consider Cervical Cerclage",
      },
      {
        type: "paragraph",
        text: "Cervical cerclage is typically recommended for women with a history of cervical incompetence, premature birth, or recurrent miscarriages. It is important to discuss your medical history and risks with your healthcare provider to determine if this procedure is right for you.",
      },
      {
        type: "quote",
        text: "Cervical cerclage can be a life-saving procedure for women at risk of preterm birth. Proper care and monitoring are essential for a successful outcome.",
        author: "Dr. James Patel",
      },
      {
        type: "image",
        src: "/images/cervical-procedure.jpg", // Add another image
        alt: "Cervical Cerclage Procedure",
      },
    ],
    image: "/images/cervical.jpg", // Main image
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

export default Blog4;