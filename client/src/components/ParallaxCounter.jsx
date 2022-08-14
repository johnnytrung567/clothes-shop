import CountUp from 'react-countup'
import counterData from '../data/counterData'

const ParallaxCounter = () => {
    return (
        <section className="w-full mt-14 pt-16 pb-20 bg-[url('/images/parallax-background.jpg')] bg-center bg-cover bg-fixed relative -z-20 after:-z-10 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-black/70">
            <div className='text-white flex flex-wrap max-w-[1230px] mx-auto'>
                {counterData.map((item, index) => (
                    <div
                        key={index}
                        className='text-center uppercase p-4 w-1/2 md:w-1/4'
                    >
                        <CountUp
                            end={item.quantity}
                            enableScrollSpy={true}
                            scrollSpyOnce={true}
                            className='text-[40px] font-bold'
                        />
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default ParallaxCounter
