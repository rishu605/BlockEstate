import React, { useEffect } from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
    useEffect(() => {
        // Ensure Bootstrap's JavaScript is only executed on the client side
        if (typeof document !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <Image
                        src="https://tse3.mm.bing.net/th?id=OIP.qV6dz_0LA40DMpAMN8RJRwHaE7&pid=Api"
                        alt="BlockEstate logo"
                        width={40}
                        height={40}
                        priority
                    />
                    <span style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '10px' }}>BlockEstate</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/list">List My Property</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Listed</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}