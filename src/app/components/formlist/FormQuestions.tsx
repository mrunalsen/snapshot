import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FormQuestions = () => {
    type Question = {
        question: string;
        required: boolean;
    };

    type FormData = Record<string, Question[]>;

    const { id } = useParams();
    const [formData, setFormData] = useState<FormData | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/forms/${id}`)
            .then((response) => {
                setFormData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching form data:', error);
            });
    }, [id]);

    if (!formData) {
        return <div className="container mx-auto mt-10 text-center">
            <p className="text-xl font-semibold">Loading...</p>
        </div>;
    }

    const formName = Object.keys(formData)[0];
    const questions = formData[formName];

    return (
        <div className="container mx-auto mt-10 w-full">
            <h2 className="text-2xl font-semibold mb-4">Questions and Answers for {formName}</h2>
            <ul className="space-y-4">
                {questions.map((question, index) => (
                    <li key={index} className="bg-white rounded shadow-md p-4 hover:shadow-lg">
                        <p className="text-lg font-semibold">{question.question}</p>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="border-gray-300 border rounded p-2 w-full"
                                placeholder="Answer"
                                disabled
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FormQuestions;
