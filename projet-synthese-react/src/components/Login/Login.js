import React from 'react';
import SvgImage from '../SvgImage';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import NavbarRegistrationLogin from '../NavbarRegistrationLogin/NavbarRegistrationLogin';
import Footer from '../Footer/Footer';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (player) => {
        playerLogin(player.username, player.password)
            .then((data) => data.username !== null ? onLoginSucceded(data) : alert("Wrong username or password"));
    }

    const onLoginSucceded = (data) => {
        sessionStorage.setItem("user", JSON.stringify(data))
        navigate("/HomePage")
    }

    const playerLogin = async (username, password) => {
        const res = await fetch(`http://localhost:8888/player/${username}/${password}`)
        return await res.json()
    }

    return (
        <div className='container-fluid'>
            <NavbarRegistrationLogin />
            <div className='row row-cols-2'>
                <div className='bg-light'>
                    <h2 className='text-center mt-5 text-color'>Welcome back !</h2>
                    <h2 className='text-center mb-5 text-color'>On <span className='badge rounded-pill bg-primary'> Quiz.io </span></h2>
                    <div className=''>
                        <form onSubmit={handleSubmit(onSubmit)} className='mx-3'>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label"><i className="fas fa-user"></i> Username: </label>
                                <input type="text" className="form-control" id="username" {...register("username", { required: true })} />
                                {errors.username && <span className='text-danger'>This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label"><i className="fas fa-lock"></i> Password: </label>
                                <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
                                {errors.password && <span className='text-danger'>This field is required</span>}
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='registration-login shadow-lg rounded-start'>
                    <div className='text-center'>
                        <SvgImage />
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    )
}

export default Login