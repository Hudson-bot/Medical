import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Updated blog data with images and additional posts
const blogPosts = [
  {
    id: "blog1", // Corrected ID
    title: "Implantation Bleeding Vs Periods: Know the Difference",
    author: "Dr. Sarah Johnson",
    date: "February 28, 2025",
    content:
      "Implantation bleeding occurs when a fertilized egg attaches to the lining of the uterus, usually around 10-14 days after conception. It is typically lighter and shorter than a regular period. Menstrual periods, on the other hand, involve the shedding of the uterine lining and are usually heavier and last longer. Recognizing the differences can help in early pregnancy detection and proper medical consultation.",
    image: "/images/ImplantationBleeding.jpg", // Add image URL
  },
  {
    id: "blog2", // Corrected ID
    title: "Bloating During Ovulation: Symptoms, Causes and Remedies",
    author: "Dr. Michael Lee",
    date: "February 28, 2025",
    content:
      "Bloating during ovulation is often caused by hormonal changes that lead to water retention. Symptoms include a feeling of fullness, abdominal discomfort, and slight swelling. Remedies include staying hydrated, eating a balanced diet, and avoiding foods that cause gas. Over-the-counter medications can also help alleviate symptoms.",
    image: "/images/bloating.jpg", // Add image URL
  },
  {
    id: "blog3", // Corrected ID
    title: "Itching During Dengue: Causes, Treatment and Home Remedies",
    author: "Dr. Emily Carter",
    date: "February 18, 2025",
    content:
      "Itching during dengue fever is often a result of the body's immune response to the virus. Treatment options include antihistamines and topical creams. Home remedies such as oatmeal baths and aloe vera can also provide relief. It is important to stay hydrated and avoid scratching to prevent skin infections.",
    image: "/images/itching.jpg", // Add image URL
  },
  {
    id: "blog4", // Corrected ID
    title: "Cervical Cerclage: Types, Procedures, Precautions and Risks",
    author: "Dr. James Patel",
    date: "February 18, 2025",
    content:
      "Cervical cerclage involves stitching the cervix closed to prevent it from opening too early during pregnancy. There are different types of cerclage, including McDonald and Shirodkar procedures. Precautions include avoiding heavy lifting and strenuous activities. Risks include infection, bleeding, and premature rupture of membranes. It is important to discuss the benefits and risks with your healthcare provider.",
    image: "/images/cervical.png", // Add image URL
  },
  {
    id: "blog5", // Corrected ID
    title: "Managing Chronic Pain in the Modern World",
    author: "Dr. Michael Lee",
    date: "October 5, 2023",
    content:
      "Chronic pain is a complex condition that requires a multidisciplinary approach. Treatments such as physical therapy, cognitive-behavioral therapy, and non-opioid medications are proving effective. Additionally, lifestyle changes like exercise and stress management can significantly improve quality of life.",
    image: "/images/chronic.jpg", // Add image URL
  },
  {
    id: "blog6", // Corrected ID
    title: "The Impact of Climate Change on Health",
    author: "Dr. Emily Carter",
    date: "September 28, 2023",
    content:
      "Climate change is leading to increased heat-related illnesses, the spread of infectious diseases, and food and water insecurity. Healthcare systems must adapt to these challenges by improving infrastructure, increasing public awareness, and advocating for sustainable policies.",
    image: "/images/climate-health.png", // Add image URL
  },
];

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h3 className="text-indigo-600 text-lg font-semibold flex items-center justify-center gap-2">
            <span role="img" aria-label="stethoscope">🩺</span> Medical Blog
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 leading-snug">
            Insights from doctors on modern medical problems and solutions.
          </h2>
        </div>

        {/* "Write New Blog" Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/blog/new")}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Write New Blog
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="block bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Blog Post Image */}
              <div className="rounded-2xl overflow-hidden mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Blog Post Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>

              {/* Blog Post Author and Date */}
              <p className="text-gray-600 text-sm mb-4">
                By {post.author} | {post.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

