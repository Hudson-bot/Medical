import React from "react";

const Blog6 = () => {
  const post = {
    id: "blog6",
    title: "The Impact of Climate Change on Health",
    author: "Dr. Emily Carter",
    date: "September 28, 2023",
    content: [
      {
        type: "paragraph",
        text: "Climate change is leading to increased heat-related illnesses, the spread of infectious diseases, and food and water insecurity. Healthcare systems must adapt to these challenges by improving infrastructure, increasing public awareness, and advocating for sustainable policies.",
      },
      {
        type: "subheading",
        text: "How Climate Change Affects Health",
      },
      {
        type: "paragraph",
        text: "Climate change impacts health in multiple ways, including extreme weather events, air pollution, and changes in the distribution of infectious diseases. Rising temperatures and unpredictable weather patterns exacerbate existing health issues and create new challenges for healthcare systems worldwide.",
      },
      {
        type: "subheading",
        text: "Key Health Risks of Climate Change",
      },
      {
        type: "list",
        items: [
          "**Heat-Related Illnesses**: Increased temperatures lead to heatstroke, dehydration, and cardiovascular stress.",
          "**Spread of Infectious Diseases**: Warmer climates expand the habitats of disease-carrying vectors like mosquitoes, leading to the spread of diseases such as malaria and dengue.",
          "**Food and Water Insecurity**: Droughts and floods disrupt food production and water supplies, leading to malnutrition and waterborne diseases.",
          "**Air Pollution**: Higher levels of pollutants worsen respiratory conditions like asthma and increase the risk of lung diseases.",
          "**Mental Health Impacts**: Natural disasters and displacement due to climate change can lead to anxiety, depression, and post-traumatic stress disorder (PTSD).",
        ],
      },
      {
        type: "subheading",
        text: "Adapting Healthcare Systems to Climate Change",
      },
      {
        type: "list",
        items: [
          "**Improving Infrastructure**: Building resilient healthcare facilities that can withstand extreme weather events.",
          "**Public Awareness Campaigns**: Educating communities about the health risks of climate change and preventive measures.",
          "**Sustainable Policies**: Advocating for policies that reduce greenhouse gas emissions and promote renewable energy.",
          "**Research and Innovation**: Investing in research to understand the health impacts of climate change and develop effective interventions.",
        ],
      },
      {
        type: "subheading",
        text: "What Can Individuals Do?",
      },
      {
        type: "list",
        items: [
          "**Reduce Carbon Footprint**: Use public transportation, reduce energy consumption, and support renewable energy initiatives.",
          "**Stay Informed**: Learn about the health risks of climate change and how to protect yourself and your community.",
          "**Support Sustainable Practices**: Choose eco-friendly products and support businesses that prioritize sustainability.",
          "**Advocate for Change**: Participate in local and global efforts to combat climate change and promote health equity.",
        ],
      },
      {
        type: "subheading",
        text: "The Role of Healthcare Professionals",
      },
      {
        type: "paragraph",
        text: "Healthcare professionals play a critical role in addressing the health impacts of climate change. They can advocate for policy changes, educate patients, and lead by example in adopting sustainable practices in healthcare settings.",
      },
      {
        type: "quote",
        text: "Climate change is not just an environmental issue—it's a public health crisis that requires urgent action from all sectors of society.",
        author: "Dr. Emily Carter",
      },
      {
        type: "image",
        src: "/images/climate-action.jpg", // Add another image
        alt: "Climate Action",
      },
    ],
    image: "/images/climate-health.jpg", // Main image
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

export default Blog6;