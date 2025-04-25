

import React, { useState, useEffect } from 'react';

const API = "http://127.0.0.1:5000";

export const Users = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editing, setEditing] = useState(false);
    const [id, setId] = useState('');
    const [users, setUsers] = useState([]);

    const handleSumbit = async (e) => {
        e.preventDefault();
        if (!editing) {
            const res = await fetch(`${API}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone })
            });
            await res.json();
        } else {
            try {
                if (!id) return;
                const res = await fetch(`${API}/users/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, phone })
                });
                await res.json();
                setEditing(false);
                setId('');
            } catch (error) {
                console.log(error);
            }
        }

        await getUsers();
        setName('');
        setEmail('');
        setPhone('');
    };

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => { getUsers(); }, []);

    const editUser = async (id) => {
        const res = await fetch(`${API}/user/${id}`);
        const data = await res.json();
        setEditing(true);
        setId(data._id);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete it?')) {
            const res = await fetch(`${API}/users/${id}`, { method: 'DELETE' });
            await res.json();
            await getUsers();
        }
    };

    return (
        <div className='container py-5'>
            <h2 className='text-center mb-4'>User Manager</h2>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='card shadow-sm'>
                        <div className='card-body'>
                            <h5 className='card-title mb-3'>{editing ? 'Update User' : 'Create User'}</h5>
                            <form onSubmit={handleSumbit}>
                                <div className='form-group mb-3'>
                                    <input
                                        type='text'
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        className='form-control'
                                        placeholder='Name'
                                        required
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <input
                                        type='email'
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        className='form-control'
                                        placeholder='Email'
                                        required
                                    />
                                </div>
                                <div className='form-group mb-4'>
                                    <input
                                        type='number'
                                        onChange={e => setPhone(e.target.value)}
                                        value={phone}
                                        className='form-control'
                                        placeholder='Phone'
                                        required
                                    />
                                </div>
                                <button className='btn btn-primary w-100'>
                                    {editing ? 'Update' : 'Create'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='col-md-8'>
                    <div className='card shadow-sm'>
                        <div className='card-body'>
                            <h5 className='card-title mb-3'>User List</h5>
                            <div className='table-responsive'>
                                <table className='table table-hover align-middle'>
                                    <thead className='table-light'>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>
                                                    <button
                                                        className='btn btn-sm btn-outline-secondary me-2 w-100'
                                                        onClick={() => editUser(user._id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className='btn btn-sm btn-outline-danger me-2 w-100 mt-4'
                                                        onClick={() => deleteUser(user._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {users.length === 0 && <p className='text-muted text-center'>No users found.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
