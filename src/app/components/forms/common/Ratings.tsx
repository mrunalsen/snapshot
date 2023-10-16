
const Ratings = (props: any) => {
    /* input  and value props from ManagerForm and EmployeeForm components */
    const { values, input } = props;
    /* constant for categories Rating input labels */
    const categories = [
        { key: 'leadership', label: 'Leadership' },
        { key: 'business', label: 'Business Acumen' },
        { key: 'technology', label: 'Digital & Technology' },
        { key: 'inclusive', label: 'Global & Inclusive' },
        { key: 'collaboration', label: 'Collaboration' }
    ];
    /* constant for Rating's guide */
    const ratingGuideData = [
        {
            title: '1 = Not at level :',
            description: `The performance of the individual being rated is below the expected level indicating that the performance is not up to par with what is expected. This rating is usually given when the performance is not satisfactory.\n(This may also be given if there\'s not enough information available to give a higher rating.)`,
        },
        {
            title: '2 = Partially at Level :',
            description: 'The individual is not meeting all the expectations for their current position but is still performing at an acceptable level.',
        },
        {
            title: '3 = At Level :',
            description: 'The performance of the individual is meeting all the expectations for their current position.',
        },
        {
            title: '4 = Partially at Next Level :',
            description: 'The performance of the individual is meeting all the expectations for their current position and has demonstrated some of the skills required for the next level.',
        },
        {
            title: '5 = At Next Level :',
            description: 'The individual is performing exceptionally well in current field and also has shown potential that goes beyond their current level of achievement.',
        },
    ];

    /**
     * This method returns radio buttons for ratings input which have ratings from (1-5)
    * @params categoryKey
    */
    const renderRadioButtons = (categoryKey: any) => {
        const value = values.review[categoryKey];
        const radioButtons = [];

        for (let i = 1; i <= 5; i++) {
            radioButtons.push(
                <div className="group-radio flex" key={`${categoryKey}${i}`}>
                    <input
                        type="radio"
                        name={`review.${categoryKey}`}
                        className='group-input'
                        id={`${categoryKey}${i}`}
                        value={value}
                        onChange={() => { values.review[categoryKey] = i; }}
                        disabled={input}
                    />
                    <label htmlFor={`${categoryKey}${i}`} className='group-label'>{i}</label>
                </div>
            );
        }

        return radioButtons;
    };

    return (
        <>
            {/* Start : Rate Input */}
            <div className={`${input === 'disabled' ? 'bg-gray-200' : 'bg-white'} overflow-hidden rounded-md mb-4`}>
                <div className="bg-blue-500">
                    <p className="text-white p-3 m-0">RATINGS [TO BE FILLED BY THE REVIEW MANAGER]</p>
                </div>
                {categories.map((category) => (
                    <div key={category.key} className="p-4">
                        <p className='mb-3 font-semibold'>{category.label}</p>
                        <div className="flex">
                            {renderRadioButtons(category.key)}
                        </div>
                    </div>
                ))}
                {/* End : Rate Input */}
                {/* Start : Rating Guide */}
                <div className="border-t-2 border-gray-400 p-4">
                    <h6 className="text-lg mb-3">Rating Guide :</h6>
                    {ratingGuideData.map((item, index) => (
                        <div className="mb-3" key={index}>
                            <p className="font-semibold underline">{item.title}</p>
                            <p className='whitespace-pre-line'>{item.description}</p>
                        </div>
                    ))}
                </div>
                {/* End : Rating Guide */}
            </div>
        </>
    );
};

export default Ratings;
