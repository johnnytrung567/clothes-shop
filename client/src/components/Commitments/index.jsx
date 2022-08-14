import commitmentData from '../../data/commitmentData'
import CommitmentItem from './CommitmentItem'

const Commitments = () => {
    return (
        <section className='max-w-[1230px] mx-auto mt-20 flex flex-wrap'>
            {commitmentData.map((item, index) => (
                <CommitmentItem
                    key={index}
                    Icon={item.icon}
                    title={item.title}
                    description={item.description}
                    data-aos='fade-left'
                    customStyle='px-4 pb-8'
                />
            ))}
        </section>
    )
}
export default Commitments
