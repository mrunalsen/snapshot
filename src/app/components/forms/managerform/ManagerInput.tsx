const ManagerInput = (props: any) => {
    const { values, handleChange, input } = props;
    return (
        <>
            {/* Start : Manager Review */}
            <div className={`${input === 'disabled' ? 'bg-gray-200' : 'bg-white'} overflow-hidden rounded-md mb-4`}>
                {/* Start : Field Hero Title */}
                <div className="bg-blue-500">
                    <p className='text-white p-3 m-0'>MANAGER REVIEW [TO BE FILLED BY THE REVIEW MANAGER]</p>
                </div>
                {/* End : Field Hero Title */}
                <div className="p-3">
                    {/* Start : Performance Differentiators */}
                    <div className="group mb-4">
                        {/* Start : Label */}
                        <label htmlFor='mq1'>PERFORMANCE DIFFERENTIATORS</label>
                        {/* End : Label */}
                        {/* Start : Input */}
                        <textarea
                            value={values.review.mq1}
                            onChange={handleChange}
                            // type="text"
                            id="mq1"
                            name='review.mq1'
                            placeholder='Manager to describe performance differentiators displayed by the employee'
                            className='disabled:cursor-not-allowed border-2 border-zinc-300 outline-0 w-full p-1 focus:bg-gray-100' disabled={input} />
                        {/* End : Input */}
                    </div>
                    {/* End : Performance Differentiators */}
                    {/* Start : Development Actions */}
                    <div className="group mb-4">
                        {/* Start : Label */}
                        <label htmlFor='mq2'>DEVELOPMENT ACTIONS</label>
                        {/* End : Label */}
                        {/* Start : Input */}
                        <textarea
                            value={values.review.mq2}
                            onChange={handleChange}
                            // type="text"
                            id="mq2"
                            name="review.mq2"
                            placeholder='Manager to describe development areas for the employee'
                            className='disabled:cursor-not-allowed border-2 border-zinc-300 outline-0 w-full p-1 focus:bg-gray-100' disabled={input} />
                        {/* End : Input */}
                    </div>
                    {/* End : Development Actions */}
                    {/* Start : Fututre Focus Area */}
                    <div className="group mb-4">
                        {/* Start : Label */}
                        <label htmlFor='mq2'>FUTURE FOCUS AREAS</label>
                        {/* End : Label */}
                        {/* Start : Inout */}
                        <textarea
                            value={values.review.mq3}
                            onChange={handleChange}
                            // type="text"
                            id="mq3"
                            name="review.mq3"
                            placeholder='Manager to highlight future focus areas for the employee'
                            className='disabled:cursor-not-allowed border-2 border-zinc-300 outline-0 w-full p-1 focus:bg-gray-100' disabled={input} />
                        {/* End : Inout */}
                    </div>
                    {/* End : Fututre Focus Area */}
                </div>
            </div>
            {/* End : Manager Review */}
        </>
    );
};

export default ManagerInput;