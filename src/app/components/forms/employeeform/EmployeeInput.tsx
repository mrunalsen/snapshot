const EmployeeInput = (props: any) => {
    // Constants extracted from props passed on from Employee Manager form
    const { input, values, handleChange } = props;
    const fields = [
        { name: 'id', label: 'Employee ID', autoComplete: 'off' },
        { name: 'name', label: 'Employee Name', autoComplete: 'on' },
        { name: 'project', label: 'Project Name', autoComplete: 'on' },
        { name: 'reviewer', label: 'Reviewer Name', autoComplete: 'on' },
    ];

    return (
        <div>
            {/* Start : Employee details */}
            <div className={`${input === 'disabled' ? 'bg-gray-200' : 'bg-white'} overflow-hidden rounded-md mb-4`}>
                {/* Start : Field Hero Title */}
                <div className='bg-blue-500'>
                    <p className='text-white p-3 m-0'>SNAPSHOT DETAILS [TO BE FILLED BY THE EMPLOYEE]</p>
                </div>
                {/* End : Field Hero Title */}
                <div className="p-4">
                    {fields.map((field) => (
                        <div key={field.name} className="group grid grid-cols-3 last:border-b-2 border-zinc-300">
                            {/* Start : Label */}
                            <label htmlFor={field.name} className='border-l-2 border-t-2 border-zinc-300 group-focus-within:text-blue-500 transition-all duration-300 p-1'>{field.label}</label>
                            {/* End : Label */}
                            {/* Start : Input */}
                            <input
                                type="text"
                                value={values[field.name]}
                                onChange={handleChange}
                                name={field.name}
                                id={field.name}
                                disabled={input}
                                className='col-span-2 border-x-2 border-t-2 border-zinc-300 outline-0 p-1 focus:bg-gray-100'
                                autoComplete={field.autoComplete}
                            />
                            {/* End : Input */}
                        </div>
                    ))}
                </div>
            </div>
            {/* End : Employee details */}

        </div>
    );
};

export default EmployeeInput;