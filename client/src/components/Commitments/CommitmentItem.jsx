const commitmentItem = ({ Icon, title, description, customStyle = '' }) => {
    return (
        <div
            data-aos='fade-left'
            className={`flex w-full sm:w-1/2 md:w-1/3 ${
                customStyle ? customStyle : ''
            }`}
        >
            <Icon size={60} />
            <div className='flex-1 pl-4'>
                <h3 className='text-xl mb-2.5 font-bold'>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}
export default commitmentItem
