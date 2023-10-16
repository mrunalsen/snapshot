import { useRef, useState } from 'react';
import questions from '../common/Questions';
import EmployeeInput from './EmployeeInput';
import axios from 'axios';
import { useFormik } from 'formik';
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
    thematicBreakPlugin,
} from '@mdxeditor/editor';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import '@mdxeditor/editor/style.css';

const EmployeeForm = () => {
    const [input] = useState(null);
    const [pluginsVisible, setPluginsVisible] = useState(Array(questions.length).fill(false));

    const handlePlugin = (index: number) => {
        const updatedPluginsVisible = [...pluginsVisible];
        updatedPluginsVisible[index] = !updatedPluginsVisible[index];
        setPluginsVisible(updatedPluginsVisible);
    };

    const initialValue: FormsData = {
        id: '',
        name: '',
        project: '',
        reviewer: '',
        data: {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            q6: '',
            q7: '',
            q8: '',
            q9: '',
            q10: '',
        },
    };
    const containerRefs = useRef(Array(questions.length).fill(null).map(() => useRef<MDXEditorMethods>(null)));
    /**
     * @description method used for submitting form values with Formik
     */
    const { handleSubmit, values, handleChange } = useFormik({
        initialValues: initialValue,
        onSubmit: async (_value, action) => {
            containerRefs.current.forEach((ref, index) => {
                const fieldName = `q${index + 1}` as keyof typeof values.data;
                values.data[fieldName] = ref.current?.getMarkdown() || '';
            });
            console.log(values);

            try {
                await axios.post('http://localhost:3000/answers', values);
                action.resetForm();

            } catch (error) {
                console.error(error);
            }
        }
    }
    );

    return (
        <form onSubmit={handleSubmit}>
            {/* Start : Employee details */}
            <EmployeeInput
                input={null}
                questions={questions}
                values={values}
                handleChange={handleChange}
            />
            {/* End : Employee details */}
            {/* Start : Questions for Employees */}
            <div className={`${input === 'disabled' ? 'bg-gray-200' : 'bg-white'} overflow-hidden rounded-md mb-4`}>
                {/* Start : Field Hero Title */}
                <div className="bg-blue-500">
                    <p className='text-white p-3 m-0'>SELF-ASSESSMENT [TO BE FILLED BY THE EMPLOYEE]</p>
                </div>
                {/* End : Field Hero Title */}

                {/* Start : Form Questions */}
                <div className="p-4">
                    {questions.map((question, index) => (
                        <div className="group mb-4" key={index}>
                            {/* Start : label */}
                            <span
                                // htmlFor={`q${index + 1}`}
                                className={`${input === 'disabled' ? 'text-gray-500' : 'text-black'}`}
                            >
                                {question.label}
                            </span>
                            {/* End : label */}
                            {/* Start : Form Input */}
                            <div className='flex border border-zinc-300'>
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
                                    ref={containerRefs.current[index]}
                                    key={pluginsVisible[index] ? 'toolbar' : 'default'}
                                    markdown={values.data[`q${index + 1}`]}
                                    // id={`q${index + 1}`}
                                    // name={`data.q${index + 1}`}
                                    className='focus-within:bg-gray-100 transition-all duration-150 w-full'
                                    // disabled={input}
                                    plugins={[
                                        headingsPlugin(),
                                        listsPlugin(),
                                        quotePlugin(),
                                        thematicBreakPlugin(),
                                        linkPlugin(),
                                        linkDialogPlugin(),
                                        listsPlugin(),
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
                                        }
                                        )
                                    ]
                                    }
                                />

                            </div>
                            {/* End : Form Input */}
                        </div>
                    ))}
                </div>
                {/* End : Form Questions */}
            </div>
            {/* End : Questions for Employees */}
            {/* Start : Submit Action */}
            <div className="text-end">
                <button type='submit' className='btn-primary mb-4'>Submit</button>
            </div>
            {/* End : Submit Action */}
        </form>
    );
};

export default EmployeeForm;