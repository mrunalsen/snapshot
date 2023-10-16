import {
    CreateLink,
    InsertThematicBreak,
    ListsToggle,
    MDXEditor,
    MDXEditorMethods,
    Separator,
    headingsPlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin
} from '@mdxeditor/editor';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import '@mdxeditor/editor/style.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import questions from '../common/Questions';
import Ratings from '../common/Ratings';
import reviews from '../common/Reviews';
import EmployeeInput from '../employeeform/EmployeeInput';

const ManagerForm = () => {
    const [input] = useState('disabled');
    const [pluginsVisible, setPluginsVisible] = useState(Array(questions.length).fill(false));

    const handlePlugin = (index: number) => {
        const updatedPluginsVisible = [...pluginsVisible];
        updatedPluginsVisible[index] = !updatedPluginsVisible[index];
        setPluginsVisible(updatedPluginsVisible);
    };


    /* Constant for initial values for form input values */
    const initialvalue = {
        id: 'xyzzyx',
        name: 'Mrunal',
        project: 'SnapGen',
        reviewer: 'Mitul',
        data: {
            q1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, atque?',
            q2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, dolor.',
            q3: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus aperiam, quae expedita consequatur tempore dolor?',
            q4: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla aperiam blanditiis porro reiciendis voluptatum enim?',
            q5: 'Lorem ipsum dolor sit amet.',
            q6: '**Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, commodi?**',
            q7: ' 1. *Italic*\n2. **Bold**\n3. <u>Underline</u>\n4. ***<u>Bold, Italic & Underline</u>*** ',
            q8: 'Lorem ipsum dolor sit amet.',
            q9: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam aliquam magni obcaecati illo aut natus consequatur sed. Tempora!',
            q10: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero soluta fuga ducimus facilis, commodi expedita laborum provident minima vero accusantium.',
        },
        review: {
            leadership: undefined,
            business: undefined,
            technology: undefined,
            inclusive: undefined,
            collaboration: undefined,
        },
        reviewquestions: {
            q1: '',
            q2: '',
            q3: '',
        }
    };

    const containerRefs = useRef(Array(reviews.length).fill(null).map(() => useRef<MDXEditorMethods>(null)));
    /**
     * @description method used for submitting form values with Formik and Yup libraries
     */
    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: initialvalue,

        onSubmit: async (_value, action) => {
            containerRefs.current.forEach((ref, index) => {
                const fieldName = `q${index + 1}` as keyof typeof values.data;
                values.reviewquestions[fieldName] = ref.current?.getMarkdown();
            });

            console.log(values);
            try {
                await axios.post('http://localhost:3000/answers', values);
                action.resetForm();
            } catch (error) {
                console.error('Error:', error);
            }
        },
    });


    return (
        <>
            {/* Start : Manager Form */}
            <div>
                {/* Start : Employee Input */}
                <EmployeeInput
                    initialvalue={initialvalue}
                    values={values}
                    handleChange={handleChange}
                    input={'disabled'}
                    questions={questions}
                />
                {/* End : Employee Input */}
                {/* Start : Questions for Employees */}
                <div className={`${input === 'disabled' ? 'bg-gray-200' : 'bg-white'} overflow-hidden rounded-md mb-4`}>
                    {/* Start : Field Hero Title */}
                    <div className="bg-blue-500">
                        <p className='text-white p-3 m-0'>SELF-ASSESSMENT [TO BE FILLED BY THE EMPLOYEE]</p>
                    </div>
                    {/* End : Field Hero Title */}
                    {/* Start : MdxEditor Emplyee Response */}
                    <div className="p-4">
                        {questions.map((question, index) => (
                            <div className="group mb-4" key={index}>
                                {/* Start : label */}
                                <span className={`${input === 'disabled' ? 'text-gray-500' : 'text-black'}`}>
                                    {question.label}
                                </span>
                                {/* End : label */}
                                {/* Start : Form Input */}
                                <div className='border border-zinc-300'>
                                    <MDXEditor
                                        markdown={values.data[`q${index + 1}`]}
                                        readOnly
                                        className='focus-within:bg-gray-100 transition-all duration-150'
                                        plugins={[
                                            headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin(), linkPlugin(), linkDialogPlugin(), listsPlugin(),
                                        ]}
                                    />
                                </div>
                                {/* End : Form Input */}
                            </div>
                        ))}
                    </div>
                    {/* End : MdxEditor Emplyee Response */}
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Start : Manager Input */}
                    <div className={`bg-white overflow-hidden rounded-md mb-4`}>
                        {/* Start : Field Hero Title */}
                        <div className="bg-blue-500">
                            <p className='text-white p-3 m-0'>MANAGER REVIEW [TO BE FILLED BY THE REVIEW MANAGER]</p>
                        </div>
                        {/* End : Field Hero Title */}
                        <div className="p-3">
                            {reviews.map((reviews, index) => (
                                <div className="mb-4" key={index}>
                                    <span>
                                        {reviews.label}
                                    </span>
                                    <div className="flex border border-zinc-300">
                                        <div className='flex items-end'>
                                            <button
                                                type='button'
                                                className='px-2 py-3'
                                                onClick={() => handlePlugin(index)}
                                            >
                                                <i className="bi bi-pencil-fill text-zinc-500"></i>
                                            </button>
                                        </div>
                                        <MDXEditor
                                            key={pluginsVisible[index] ? 'toolbar' : 'default'}
                                            ref={containerRefs.current[index]}
                                            markdown={values.reviewquestions[`q${index + 1}`]}
                                            className='focus-within:bg-gray-100 transition-all duration-150 w-full'
                                            id={`q${index + 1}`}
                                            name={`reviewquestions.q${index + 1}`}
                                            plugins={[
                                                headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin(), linkPlugin(), linkDialogPlugin(), listsPlugin(),
                                                toolbarPlugin({
                                                    toolbarContents: () => (
                                                        <div className={`flex rounded z-0`}>
                                                            {pluginsVisible[index] && (
                                                                <div className='flex rounded z-0'>
                                                                    <UndoRedo />
                                                                    <Separator />
                                                                    <BoldItalicUnderlineToggles />
                                                                    <Separator />
                                                                    <InsertThematicBreak />
                                                                    <CreateLink />
                                                                    <ListsToggle />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })]}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* End : Manager Input */}
                    {/* Start : Tarings Input */}
                    <Ratings
                        values={values}
                        handleChange={handleChange}
                        input={null}
                    />
                    {/* End : Tarings Input */}
                    {/* Start : Submit Action */}
                    <div className="text-end">
                        <button className="btn-primary w-auto" type='submit'>submit</button>
                    </div>
                    {/* End : Submit Action */}
                </form>

            </div>
            {/* End : Manager Form */}
        </>
    );
};

export default ManagerForm;