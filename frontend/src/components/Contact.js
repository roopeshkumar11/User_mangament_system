import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setStatus("Please fill in all fields.");
            return;
        }

        try {
            // Example API POST request for contact form submission
            // Replace with actual API endpoint or email service (like SendGrid, etc.)
            const res = await fetch('http://127.0.0.1:5000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.ok) {
                setStatus('Your message has been sent successfully!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('Something went wrong. Please try again later.');
            }
        } catch (error) {
            setStatus('Error sending message. Please try again.');
        }
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Contact Us</h2>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea
                                        id="message"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Your message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Send Message
                                </button>
                            </form>
                            {status && (
                                <div className="mt-3 text-center">
                                    <p className={`text-${status.includes('error') ? 'danger' : 'success'}`}>{status}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
