import React from "react";
import NavBar from "./NavBar";

const Contact = () => {
  return (
    <>
    <NavBar/>
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        Have questions or feedback? We'd love to hear from you! Reach out to us
        through the following channels:
      </p>
      <div className="flex justify-center space-x-4 mb-4">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-blue-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 21v-2m0 0c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0z"
            ></path>
          </svg>
          <span className="font-semibold ">Email: hjugwani@gmail.com</span>
        </div>
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18v2m-3-2v6h-5.586l-1.707-1.707c-.39-.39-1.022-.39-1.414 0l-1.707 1.707H6V3zm9 9h5.586l1.707 1.707c.39.39 1.022.39 1.414 0l1.707-1.707H21v6h-3m-4-4v4"
            ></path>
          </svg>
          <span>Phone: +91 8462944835</span>
        </div>
      </div>
      <p className="text-lg text-gray-700 mb-4">
        Connect with us on social media to stay updated on our latest news and
        offerings.
      </p>
      <div className="flex justify-center space-x-4">
        <p className="text-blue-500 hover:underline">Twitter</p>
        <p className="text-indigo-500 hover:underline">Facebook</p>
        <p className="text-red-500 hover:underline">Instagram</p>
      </div>
    </div>
    </>
  );
};

export default Contact;
