import { useState } from 'react';
import LoginAction from '../login/LoginAction';

const Header = () => {
    /* State for setting User name in the profile menu */
    const [username, setUsername] = useState('Profile');

    return (
        <div className='relative'>
            <div className='flex justify-between items-center bg-blue-500 p-2'>
                {/* Start : Brand name */}
                <p className='text-white text-3xl font-bold p-1 ms-1 select-none'><span className='text-rose-500'>1</span>R</p>
                {/* End : Brand name */}
                {/* Start : Form Name */}
                <h2 className='text-xl font-medium text-white select-none'>SnapGen</h2>
                {/* End : Form Name */}
                {/* Start : Profile actions */}
                <label htmlFor="loginActionToggle" className='text-white select-none cursor-pointer p-2 hover:bg-blue-600 rounded transition-all duration-300'><i className="bi bi-caret-down-fill me-2"></i> {username}</label>
                {/* End : Profile actions */}
            </div>
            {/* Start : Login action container checkbox */}
            <input type="checkbox" name="loginActionToggle" id="loginActionToggle" className='hidden' />
            {/* End : Login action container checkbox */}
            {/* Start : Login action container */}
            <div id="loginAction">
                <LoginAction />
            </div>
            {/* End : Login action container */}
            {/* Start : Login action backdrop */}
            <label htmlFor="loginActionToggle" className='loginBackdrop'></label>
            {/* End : Login action backdrop */}
        </div>
    );
};

export default Header;