import AOS from 'aos'
import 'aos/dist/aos.css'
import ContactInfo from '../components/ContactInfo'
import GoogleMap from '../components/GoogleMap'

const Contact = () => {
    AOS.init({
        duration: 1200,
        offset: 300,
        once: true,
    })

    return (
        <div className='w-full max-w-[1230px] mx-auto py-16'>
            <GoogleMap />
            <ContactInfo />
        </div>
    )
}
export default Contact
