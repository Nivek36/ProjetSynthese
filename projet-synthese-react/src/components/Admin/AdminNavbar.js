import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
    const admin = JSON.parse(sessionStorage.getItem("user"))

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
                            <button className="btn btn-primary dropdown-toggle mx-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {admin.username}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" to="/admin-quizzes">Manage quizzes</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar