import React from 'react';
import { Link } from 'react-router-dom';

const NavbarRegistrationLogin = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-md bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Quiz.io</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="fas fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="btn btn-outline-primary rounded-pill mx-2" to="/">Sign in</Link>
                            <Link className="btn btn-primary rounded-pill mx-2" to="/Registration">Sign up</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavbarRegistrationLogin