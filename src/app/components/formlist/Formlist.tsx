import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FormList = () => {
    const [formData, setFormData] = useState<Form[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/forms')
            .then((response) => {
                setFormData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching form data:', error);
            });
    }, []);

    return (
        <div className="container mx-auto mt-10 w-full">
            <h2 className="text-2xl font-semibold mb-4">Form List</h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {formData.map((form, index) => (
                    <Link to={`/forms/${form.id}`} key={index} className="bg-white rounded shadow-md p-4 hover:shadow-lg text-lg font-semibold text-blue-500 select-none cursor-pointer">
                        {Object.keys(form)[0]}
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default FormList;
