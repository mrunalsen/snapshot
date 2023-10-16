import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

/* Initial Values for Login */
const initialvalue = {
    email: '',
    password: '',
};

const Login = () => {
    /* Navigation method for changing the location in the app */
    const navigateTo = useNavigate();
    /**
     * @description method used for submitting form values with Formik and Yup libraries
     */
    const { handleSubmit, values, handleChange } = useFormik({
        initialValues: initialvalue,
        // validationSchema: loginSchema,
        onSubmit: async (value, action) => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                const users = await response.data;
                const user = users.find(u => u.email === value.email && u.password === value.password);

                if (user) {
                    switch (user.role) {
                        case 'employee':
                            navigateTo('/home');
                            break;
                        case 'admin':
                            navigateTo('/admin');
                            break;
                        default:
                            alert('Invalid Role');
                    }
                } else {
                    alert('Invalid Credentials');
                }
            } catch (error) {
                console.error('Error:', error);
            }
            action.resetForm();
        }
    });

    return (
        <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
            <div
                className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
            >
                <div
                    className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
                >
                    {/* Start : Brand */}
                    <div className="my-3 text-4xl font-bold tracking-wider text-center">
                        <p><span className="text-rose-500 tracking-[-4px]">1</span>R Forms</p>
                    </div>
                    {/* End : Brand */}
                    {/* Start : Login Info */}
                    <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, earum!
                    </p>
                    {/* End : Login Info */}
                    <p className="flex flex-col items-center justify-center mt-10 text-center">
                        <span>Don't have an account?</span>
                        <Link to={`/signup`}>Get Started!</Link>
                    </p>
                    <p className="mt-6 text-sm text-center text-gray-300">
                        Read our <a href="" className="underline">terms</a> and <a href="" className="underline">conditions</a>
                    </p>
                </div>
                <div className="p-5 bg-white md:flex-1">
                    <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
                    <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-500">email</label>
                            <input
                                name='email'
                                type="text"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                className="input-primary"
                                autoComplete='on'
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                            </div>
                            <input
                                name='password'
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                className="input-primary"
                                autoComplete='off'
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className='flex items-center space-x-2'>
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                                />
                                <label htmlFor="remember" className="text-sm font-semibold text-gray-500 select-none">Remember me</label>
                            </div>
                            <a href="" className="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
                        </div>
                        <div>
                            <button type="submit" className="btn-primary w-full">Log in</button>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <span className="flex items-center justify-center space-x-2">
                                <span className="h-px bg-gray-400 w-14"></span>
                                <span className="font-normal text-gray-500">or login with</span>
                                <span className="h-px bg-gray-400 w-14"></span>
                            </span>
                            <div className="flex flex-col space-y-4">
                                <a
                                    href=""
                                    className="btn-outline-primary group"
                                >
                                    <i className="bi bi-microsoft text-outline-primary text-sm font-medium"></i>
                                    <span className="text-outline-primary text-sm font-medium">Microsoft</span>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;