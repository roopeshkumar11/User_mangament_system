import React from 'react';

const About = () => {
    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">About Our App</h1>
            <p className="lead">
                Welcome to <strong>User Manager</strong> — a full-stack application built with <strong>React</strong> on the frontend
                and <strong>Flask</strong> on the backend. This project is designed to demonstrate seamless integration between a modern
                JavaScript UI and a Python REST API.
            </p>

            <p>
                With this app, you can easily create, update, and delete user records. All user data (Name, Email, Phone) is stored and
                managed through the Flask backend and displayed in real-time using React.
            </p>

            <p>
                This project is ideal for learning full-stack development principles, including:
                <ul>
                    <li>Frontend design with React and Bootstrap</li>
                    <li>REST API handling with Fetch</li>
                    <li>Backend development using Flask</li>
                    <li>CRUD operations and data management</li>
                </ul>
            </p>

            <p>
                Whether you're a student learning how front and back ends communicate, or a developer exploring Flask + React
                workflows, this app offers a clean, responsive experience to experiment with.
            </p>

            <p className="text-muted">
                Built with 💻 by a passionate developer exploring the MERN stack, Flask, and modern UI design.
            </p>
        </div>
    );
};

export default About;
