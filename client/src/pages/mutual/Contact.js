import { useState } from "react";
import Select from "react-select"; // Importing react-select

const Contact = () => {
    const [formData, setFormData] = useState({
        email : "",
        purpose : "",
        message : ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log( formData );
        const body = `
            Email: ${formData.email}
            Purpose: ${formData.purpose}
            Message: ${formData.message}
        `;
        
        const subject = `Contact Form Submission - ${formData.purpose}`;
        // Create the mailto link
        const mailtoLink = `mailto:admin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open the user's email client with the pre-filled mailto link
        window.location.href = mailtoLink;

        // Optionally, reset the form
        setFormData({ email: "", purpose: "", message: "" });
    };

    const purposeOptions = [
        { value: "support", label: "Support" },
        { value: "feedback", label: "Feedback" },
        { value: "inquiry", label: "Inquiry" }
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm mx-4 ">
                <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
                    Contact Us
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address : 
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData( {...formData, email:e.target.value } ) }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-sm font-semibold opacity-80"
                        />
                    </div>

                    {/* Purpose Dropdown with React Select */}
                    <div>
                        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                            Purpose of Contact
                        </label>
                        <Select
                            id="purpose"
                            name="purpose"
                            options={purposeOptions}
                            value={ purposeOptions.find( ele => ele.value === formData.purpose )}
                            onChange={( e ) => setFormData( {...formData, purpose : e.value})}
                            isSearchable={false} 
                            isClearable={false}  
                            placeholder="Select Purpose"
                            className="w-full text-sm font-semibold opacity-80"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Message : 
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={ formData.message }
                            onChange={(e) => setFormData( {...formData, message : e.target.value } ) }
                            rows="3"
                            placeholder="Write your message..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm  focus:ring-indigo-500 focus:outline-none text-sm font-semibold opacity-80"
                        ></textarea>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 transform hover:scale-105 focus:outline-none     focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
