import { useRef } from 'react';
import brand from '../../../../assets/images/fulllogo.png';
import { formatDate, getDate } from '../../../shared/getDate';
import NewForm from './formcomponents/NewForm';

const FormContainer = () => {
    const containerRef = useRef(null);
    return (
        <>
            {/* Start : Form Header */}
            <div ref={containerRef}>
                <div className="container overflow-hidden my-5 mx-auto">
                    <div className='bg-head flex justify-end rounded-md my-4'>
                        <div className='bg-white max-w-[300px] rounded-md px-6 py-10 m-10'>
                            <figure className='mb-4'>
                                <img src={brand} alt="brand" className='mx-auto' />
                            </figure>
                            <p className='text-xl font-semibold border-b-2 border-zinc-300 py-2'>Office of Human Resources</p>
                            <div className='mb-4'>
                                <p className='font-medium text-lg'>Form Name</p>
                                <p className='font-medium'>{formatDate(getDate)}</p>
                            </div>
                            <p>Form Message</p>
                        </div>
                    </div>
                </div>
                {/* End : Form Header */}
                {/* Start : Create New Form */}
                <div className="container overflow-hidden mb-4 mx-auto">
                    <NewForm />
                    {/* <NewForm containerRef={containerRef} /> */}
                </div>
                {/* End : Create New Form */}
            </div>
        </>
    );
};

export default FormContainer;