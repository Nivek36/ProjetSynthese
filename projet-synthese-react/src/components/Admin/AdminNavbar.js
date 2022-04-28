import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
    const admin = JSON.parse(sessionStorage.getItem("user"))
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.setItem('user', "")
        navigate('/AdminLogin')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md bg-light shadow mb-5">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Quiz.io</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="fas fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="dropdown">
                            <button className="btn btn-primary rounded-pill dropdown-toggle mx-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {admin.username + " "}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" to="/admin-quizzes">Manage quizzes</Link></li>
                                <li><Link className="dropdown-item" to="/admin-players-list">Manage players</Link></li>
                                <li>
                                    <button
                                        className="dropdown-item text-danger"
                                        onClick={e => { e.preventDefault(); logout() }}>
                                        <i className="fas fa-arrow-right-to-bracket"></i> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar