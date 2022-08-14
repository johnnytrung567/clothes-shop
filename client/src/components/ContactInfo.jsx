import { BsPinMapFill, BsTelephoneFill } from 'react-icons/bs'
import { GrMail } from 'react-icons/gr'

const ContactInfo = () => {
    return (
        <section className='flex flex-wrap mt-20'>
            <div
                data-aos='fade-right'
                className='flex w-full sm:w-1/2 md:w-1/3 items-start px-4 pb-8'
            >
                <div className='bg-brown-300 text-white w-10 h-10 flex justify-center items-center'>
                    <BsPinMapFill size={22} />
                </div>
                <div className='ml-4 flex-1'>
                    <p className='font-bold text-xl mb-2.5'>Address:</p>
                    <p>
                        720 A Dien Bien Phu, Ward 22, Binh Thanh District, Ho
                        Chi Minh City
                    </p>
                </div>
            </div>
            <div
                data-aos='fade-left'
                data-aos-delay='100'
                className='flex w-full sm:w-1/2 md:w-1/3 items-start px-4 pb-8'
            >
                <div className='bg-brown-300 text-white w-10 h-10 flex justify-center items-center'>
                    <BsTelephoneFill size={22} />
                </div>
                <div className='ml-4 flex-1'>
                    <p className='font-bold text-xl mb-2.5'>Phone:</p>
                    <a href='tel:0123456789' className='font-bold'>
                        0123 456 789
                    </a>
                    <p>Dial 109 - Bussiness department</p>
                    <p>Dial 103 - Technical department</p>
                </div>
            </div>
            <div
                data-aos='fade-left'
                data-aos-delay='200'
                className='flex w-full sm:w-1/2 md:w-1/3 items-start px-4 pb-8'
            >
                <div className='bg-brown-300 text-white w-10 h-10 flex justify-center items-center'>
                    <GrMail size={22} />
                </div>
                <div className='ml-4 flex-1'>
                    <p className='font-bold text-xl mb-2.5'>Email:</p>
                    <a
                        href='mailto:vantrung242628@gmail.com'
                        className='break-all'
                    >
                        vantrung242628@gmail.com
                    </a>
                </div>
            </div>
        </section>
    )
}
export default ContactInfo
