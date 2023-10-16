import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditEmployee = ({ employeeData, updateEmployee, onCancel }) => {

    const [initialValues, setInitialValues] = useState(employeeData);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        role: Yup.string().required('Role is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        updateEmployee(values);
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="p-3 bg-white rounded">
                    {/* Render the form fields similar to the CreateEmployee component */}
                    {/* You can reuse the same form fields and components here */}
                    {/* Example Field for editing 'name': */}
                    <div className="flex flex-col my-2">
                        <label htmlFor="name" className="font-bold my-2">
                            Name:
                        </label>
                        <Field
                            type="text"
                            name="name"
                            id="name"
                            className={`input-primary`}
                            placeholder="Name"
                        />
                        <ErrorMessage name="name" component="div" className="text-rose-500" />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="email" className="font-bold my-2">
                            Email:
                        </label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            className={`input-primary`}
                            placeholder="email"
                        />
                        <ErrorMessage name="email" component="div" className="text-rose-500" />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="password" className="font-bold my-2">
                            Password :
                        </label>
                        <Field
                            type="text"
                            name="password"
                            id="password"
                            className={`input-primary`}
                            placeholder="password"
                        />
                        <ErrorMessage name="password" component="div" className="text-rose-500" />
                    </div>

                    <div className="flex justify-between mt-2">
                        <button type="button" onClick={onCancel} className="btn-danger text-sm">
                            cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:bg-blue-300 disabled:cursor-not-allowed text-sm">
                            {isSubmitting ? 'updating...' : 'update'}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EditEmployee;
