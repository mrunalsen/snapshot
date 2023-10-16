import brand from '../../assets/images/fulllogo.png';
import { formatDate, getDate } from '../shared/getDate';
import EmployeeForm from './forms/employeeform/EmployeeForm';

const Home = () => {
    return (
        <>
            <div className="container overflow-hidden my-5 mx-auto">
                {/* Start : Form Header */}
                <div className='bg-head flex justify-end rounded-md my-4'>
                    <div className='bg-white max-w-[300px] rounded-md px-6 py-10 m-10'>
                        <figure className='mb-4'>
                            <img src={brand} alt="brand" className='mx-auto' />
                        </figure>
                        <p className='text-xl font-semibold border-b-2 border-zinc-300 py-2'>Office of Human Resources</p>
                        <div className='mb-4'>
                            <p className='font-medium text-lg'>Performance Review</p>
                            <p className='font-medium'>{formatDate(getDate)}</p>
                        </div>
                        <p>Hi! Would you mind taking few minutes to complete this form? It would be great if you can submit your response in next few days. Thank you!</p>
                    </div>
                </div>
                {/* End : Form Header */}
                {/* Start : Employee Form */}
                <EmployeeForm />
                {/* End : Employee Form */}
            </div>
        </>
    );
};

export default Home;