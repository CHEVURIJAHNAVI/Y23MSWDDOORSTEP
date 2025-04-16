import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-10 bg-gray-100 text-center">
      <h2 className="text-3xl font-semibold text-green-700">Contact Us</h2>
      <form className="mt-6 max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-left font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
