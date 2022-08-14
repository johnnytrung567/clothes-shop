import AOS from 'aos'
import 'aos/dist/aos.css'
import Commitments from '../components/Commitments'
import Feedbacks from '../components/Feedbacks'
import Introduction from '../components/Introduction'
import ParallaxCounter from '../components/ParallaxCounter'

const About = () => {
    AOS.init({
        duration: 1200,
        offset: 300,
        once: true,
    })

    return (
        <div className='py-16 flex flex-wrap'>
            <Introduction />
            <Commitments />
            <ParallaxCounter />
            <Feedbacks />
        </div>
    )
}
export default About
