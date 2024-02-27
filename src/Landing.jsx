import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Landing = () => {
    const location = useLocation();

    return (
        <div className='home'>
        <section className='landing-functionality'>
            <Link to="/logs">
                <img src="https://www.pinkchicken.com/cdn/shop/files/outerspacenotebook_grande.png?v=1690302429"/>
              {/* <button id="button"> View Journal </button> */}
            </Link>
        </section>
        </div>
    );
};

export default Landing;
