import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Footer from '../Footer/Footer';

const AdminLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (admin) => {
        adminLogin(admin.username, admin.password)
            .then((data) => data.username !== null ? onLoginSucceded(data) : alert("Wrong username or password"));
    }

    const onLoginSucceded = (data) => {
        sessionStorage.setItem("user", JSON.stringify(data))
        navigate("/admin-homepage")
    }

    const adminLogin = async (username, password) => {
        const res = await fetch(`http://localhost:8888/admin/${username}/${password}`)
        return await res.json()
    }
    return (
        <div className=''>
            <h2 className='text-center my-5 text-color'>Administrator</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='mx-5'>
                <div className="card mx-5 bg-light">
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" {...register("username", { required: true })} />
                            {errors.username && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
                            {errors.password && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default AdminLogin