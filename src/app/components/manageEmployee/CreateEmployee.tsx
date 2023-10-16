import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from 'yup';

const CreateEmployee = ({ addEmployee }: { addEmployee: (employee: CreateEmployee) => void; }) => {
    const initialValues: Omit<CreateEmployee, 'id'> = {
        name: '',
        email: '',
        password: '',
        role: '',
        submittedForms: [],
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        role: Yup.string().required('Role is required'),
        // submittedForms: Yup.string().required('Submitted Forms is required'),
    });
    const handleSubmit = (values: CreateEmployee, { resetForm, setSubmitting }: FormikHelpers<CreateEmployee>) => {
        setSubmitting(true);
        setTimeout(() => {
            addEmployee(values);
            console.log('added');
            setSubmitting(false);
            resetForm();
        }, 2000);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className='p-3'>
                    <div className='flex flex-col my-2'>
                        <label htmlFor="name" className='font-bold my-2' >Name:</label>
                        <Field
                            type="text"
                            name="name"
                            id="name"
                            className={`input-primary`}
                            placeholder="Name"
                        />
                        <ErrorMessage name="name" component="div" className="text-rose-500" />
                    </div>

                    <div className='flex flex-col my-2'>
                        <label htmlFor="email" className='font-bold my-2' >Email:</label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            className={`input-primary`}
                            placeholder="Email"
                        />
                        <ErrorMessage name="email" component="div" className="text-rose-500" />
                    </div>
                    <div className='flex flex-col my-2'>
                        <label htmlFor="email" className='font-bold my-2' >Password:</label>
                        <Field
                            type="password"
                            name="password"
                            id="password"
                            className={`input-primary`}
                            placeholder="password"
                        />
                        <ErrorMessage name="password" component="div" className="text-rose-500" />
                    </div>

                    <div className='flex flex-col my-2'>
                        <label htmlFor="name" className='font-bold my-2' >Role:</label>
                        <Field
                            as="select"
                            name="role"
                            id="role"
                            className={`input-primary`}
                        >
                            <option value="" disabled>select role</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                        </Field>
                        <ErrorMessage name="role" component="div" className="text-rose-500" />
                    </div>
                    {/* <div className='flex flex-col my-2'>
                        <label htmlFor="name" className='font-bold' >Forms my-2:</label>
                        <Field
                            type="text"
                            name="submittedForms"
                            id="submittedForms"
                            className={`input-primary`}
                            placeholder="Forms Submitted"
                            autoComplete="off"
                        />
                        <ErrorMessage name="submittedForms" component="div" className="text-rose-500" />
                    </div> */}
                    {/* Add fields for 'password', 'role', and 'submittedForms' similarly */}

                    <div className="text-end">
                        <button type="submit" disabled={isSubmitting} className='btn-primary disabled:bg-blue-300 disabled:cursor-not-allowed my-2'>
                            {isSubmitting ? 'Adding...' : 'Add'}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreateEmployee;