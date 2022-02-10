import React from 'react'
import { useForm } from "react-hook-form";

const Registration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (player) => {
    console.log(player);
    addPlayer(player)
      .then((data) => data.username !== undefined ? alert("Registration succeeded") : alert("Username already exists"))
      .catch(() => alert("Registration failed, please try again"));
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    </div>
  )
}

export default Registration