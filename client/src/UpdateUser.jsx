import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
    const [Users, setUsers] = useState([]);
    const { id } = useParams();
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [age, setage] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/' + id)
            .then(result => {
                setname(result.data.name);
                setemail(result.data.email);
                setage(result.data.age);
            })
            .catch(err => console.log(err))
    }, []);

    const Update = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3001/updateusers/${id}`, { name, email, age })
            .then(res => {console.log(res), navigate('/')})
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 bg-primary'>
            <div className='bg-white p-3 rounded w-50'>
                <form onSubmit={Update}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control' value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="age">Age</label>
                        <input type="text" placeholder='Enter Age' className='form-control' value={age} onChange={(e) => setage(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;