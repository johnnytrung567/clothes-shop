import feedbackData from '../../data/feedbackData'
import FeedbackItem from './FeedbackItem'

const Feedbacks = () => {
    return (
        <section className='w-full max-w-[1230px] mx-auto pt-16 flex flex-wrap'>
            {feedbackData.map((item, index) => (
                <FeedbackItem
                    key={index}
                    name={item.name}
                    avatar={item.avatar}
                    content={item.content}
                />
            ))}
        </section>
    )
}
export default Feedbacks
