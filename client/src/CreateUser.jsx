import React from 'react';
import axois from 'axios';
import { useState } from 'react';
import { useNavigate as Navigate } from 'react-router-dom';


function CreateUser() {
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [age, setage] = useState()
    const navigate = Navigate()

    const Submit = (e) => {
        e.preventDefault()
        axois.post('http://localhost:3001/users', { name, email, age })
            .then(res => {console.log(res), navigate('/')})
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 bg-primary'>
            <div className='bg-white p-3 rounded w-50'>
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control' onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder='Enter Email' className='form-control' onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="age">Age</label>
                        <input type="text" placeholder='Enter Age' className='form-control' onChange={(e) => setage(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;