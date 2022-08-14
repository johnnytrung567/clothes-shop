const FeedbackItem = ({ name, avatar, content }) => {
    return (
        <div
            data-aos='flip-left'
            className='italic w-full md:w-1/3 text-center px-4 pb-9 flex flex-col   '
        >
            <div className='w-[100px] h-[100px] rounded-full overflow-hidden mx-auto mb-4'>
                <img src={avatar} alt={name} />
            </div>
            <p className='mb-4'>{content}</p>
            <p className='text-xl font-bold mt-auto'>{name}</p>
        </div>
    )
}
export default FeedbackItem
