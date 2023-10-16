import axios from 'axios';
import { Field, FieldArray, Form, Formik, ErrorMessage } from 'formik';
import { useRef, useState } from 'react';
// import inputValidation from '../../../../schemas';
import * as Yup from 'yup';


const NewForm = () => {
    /* User input Form name */
    const [formName, setFormName] = useState('');
    /* Constant for Submit button reference */
    const submitButtonRef = useRef<HTMLDivElement | null>(null);

    /**
 * @description YUP validations for form fields
 */
    const inputValidation = Yup.object({
        formName: Yup.string().required('Please Enter Form Title'),
        [formName]: Yup.array().of(
            Yup.object().shape({
                question: Yup.string().required('Question is required'),
                required: Yup.boolean()
            })
        )
    });

    /**
     * @description this function brings Submit button into view on add question button click
     */
    const scrollToSubmitButton = () => {
        setTimeout(() => {
            if (submitButtonRef.current) {
                submitButtonRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        });
    };


    return (
        <Formik
            initialValues={{
                [formName]: []
            }}
            validationSchema={inputValidation}
            onSubmit={async (values, action) => {
                try {
                    const response = await axios.post('http://localhost:3000/forms',
                        { [formName]: values[formName] }
                    );
                    console.log('response', response.data);
                    setFormName('');
                    action.resetForm();
                } catch (err) {
                    console.error('Error', err);
                }
            }}
        >
            {({ values, handleSubmit, handleBlur, handleChange, isValid, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <div className='flex flex-col my-3'>
                        <label htmlFor="formName" className="block font-medium mb-2">
                            Form Title
                        </label>
                        <Field
                            type="text"
                            id="formName"
                            name="formName"
                            value={formName}
                            onBlur={handleBlur}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setFormName(e.target.value);
                                handleChange(e);
                            }}
                            className="input-primary w-full"
                            autoFocus
                            autoComplete='off'
                        />
                        <ErrorMessage
                            name="formName"
                            component="span"
                            className="text-red-500 my-1"
                        />
                    </div>
                    {/* Start : Field Array */}
                    <FieldArray name={formName}>
                        {({ push, remove }) => (
                            <div className='bg-white overflow-hidden rounded-md'>
                                {(values[formName] || []).map((index) => (
                                    <div key={index} className='flex flex-col border hover:bg-gray-100 p-4'>
                                        {/* Start : Question input Field */}
                                        <Field
                                            type='text'
                                            name={`${formName}[${index}].question`}
                                            id={`${formName}[${index}].question`}
                                            className={`input-primary`}
                                            placeholder={`${index + 1}) Question`}
                                            autoComplete="off"
                                        />
                                        <ErrorMessage
                                            name={`${formName}[${index}].question`}
                                            component="div"
                                            className="text-red-500"
                                        />
                                        {/* End : Question input Field */}
                                        {/* Start : Action Fields */}
                                        <div className="flex justify-between mt-2">
                                            {/* Start : Required Action */}
                                            <div className="flex items-center">
                                                <Field
                                                    type="checkbox"
                                                    name={`${formName}[${index}].required`}
                                                    id={`${formName}[${index}].required`}
                                                    className={`hidden checkbox`}
                                                />
                                                <label htmlFor={`${formName}[${index}].required`} className='slider-container'>
                                                    <div className="slider"></div>
                                                </label>
                                                <p className='m-0'>Required</p>
                                            </div>
                                            {/* End : Required Action */}
                                            {/* Start : Remove Field Action */}
                                            <button type="button" onClick={() => remove(index)}>
                                                <i className="bi bi-trash-fill text-zinc-600 hover:text-rose-500 text-lg"></i>
                                            </button>
                                            {/* End : Remove Field Action */}
                                        </div>
                                        {/* End : Action Fields */}
                                    </div>
                                ))}
                                {/* Start : Add Question Action */}
                                <div className='text-center py-6'>
                                    <button
                                        type="button"
                                        className='btn-primary disabled:bg-blue-300'
                                        disabled={!isValid || !touched.formName}
                                        onClick={() => {
                                            push({ question: '', required: false });
                                            scrollToSubmitButton();
                                        }}>
                                        Add Question
                                    </button>
                                </div>
                                {/* End : Add Question Action */}
                            </div>
                        )}
                    </FieldArray>
                    {/* End : Field Array */}
                    {/* Start : Submit Action */}
                    <div className='text-end mt-4' ref={submitButtonRef}>
                        <button type="submit" className='btn-primary'>Submit</button>
                    </div>
                    {/* End : Submit Action */}
                </Form>
            )}
        </Formik>
    );
};

export default NewForm;