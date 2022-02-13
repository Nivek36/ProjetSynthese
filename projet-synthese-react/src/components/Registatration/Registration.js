import React from 'react'
import { useForm } from "react-hook-form";
import './Registration.css'
import SvgImage from '../SvgImage';
import NavbarRegistrationLogin from '../NavbarRegistrationLogin/NavbarRegistrationLogin';

const Registration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (player) => {
    addPlayer(player)
      .then((data) => data.username !== undefined ? alert("Registration succeeded") : alert("Username already exists, please try again"))
      .catch(() => alert("Username already exists, please try again"));
  }

  const addPlayer = async (player) => {
    const result = await fetch('http://localhost:8888/player/register_player',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(player)
      })
    return await result.json()
  }

  return (
    <div className='container-fluid'>
      <NavbarRegistrationLogin />
      <div className='row row-cols-2'>
        <div className='registration-login shadow-lg rounded-end'>
          <div className='text-center'>
            <SvgImage />
          </div>
        </div>
        <div className='bg-light'>
          <h2 className='text-center mt-5 text-color'><span className='badge rounded-pill bg-primary'>Sign up</span> now !</h2>
          <h2 className='text-center mb-5 text-color'><span className='badge rounded-pill bg-primary'>Play</span> now !</h2>
          <div className=''>
            <form onSubmit={handleSubmit(onSubmit)} className='mx-3'>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" {...register("username", { required: true })} />
                {errors.username && <span>This field is required</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-">Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Registration