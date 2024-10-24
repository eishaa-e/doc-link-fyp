import React from "react";

const ContactUs = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center bg-gray-100 py-20 p-4">
            <div
                className="w-full max-w-6xl bg-fuchsia-100 rounded-lg shadow-xl shadow-light-orchid flex flex-col md:flex-row overflow-hidden">
                {/* Contact Information Section */}
                <div className="bg-light-orchid w-full md:w-1/2 p-8 text-white">
                    <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                    <p className="mb-6">Say something to start a live chat!</p>
                    <ul>
                        <li className="mb-4">
                          <span role="img" aria-label="phone" className="mr-2">
                            📞
                          </span>
                            +92 123 4567890
                        </li>
                        <li className="mb-4">
                          <span role="img" aria-label="email" className="mr-2">
                            📧
                          </span>
                            DocLink@gmail.com
                        </li>
                        <li>
                          <span role="img" aria-label="location" className="mr-2">
                            📍
                          </span>
                            132 Dartmouth Street Boston, Massachusetts 02156 United States
                        </li>
                    </ul>
                    <div className="mt-6 flex space-x-4">
                        {/* Social Media Icons */}
                        <a href="#" className="text-white text-xl">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-white text-xl">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-white text-xl">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
                {/* Contact Form Section */}
                <div className="w-full md:w-1/2 py-8 px-16">
                    <h2 className="text-3xl font-bold mb-6 text-center ">Contact Us</h2>
                    <p className="text-center mb-8">
                        Any question or remarks? Just write us a message!
                    </p>
                    <form>
                        <div className="flex mb-4 space-x-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-1/2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-1/2 p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex mb-4 space-x-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-1/2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="w-1/2 p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Select Subject:</label>
                            <div className="flex space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="subject"
                                        value="General Inquiry"
                                        className="form-radio text-fuchsia-500 focus:ring-fuchsia-500 focus:ring-2"
                                        checked
                                    />
                                    <span className="ml-2">General Inquiry</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="subject"
                                        value="Other"
                                        className="form-radio text-fuchsia-500 focus:ring-fuchsia-500 focus:ring-2"
                                    />
                                    <span className="ml-2">Other</span>
                                </label>
                            </div>
                        </div>
                        <div className="mb-4">
              <textarea
                  placeholder="Write your message..."
                  className="w-full p-2 border border-gray-300 rounded h-32"
              ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-fuchsia-500 hover:bg-fuchsia-400 text-white py-2 px-6 rounded-full"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
