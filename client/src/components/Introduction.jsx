import aboutImage from '../assets/about.jpg'

const Introduction = () => {
    return (
        <section className='max-w-[1230px] mx-auto flex flex-wrap items-center'>
            <div data-aos='fade-right' className='w-full md:w-1/2 px-4 pb-8'>
                <img src={aboutImage} alt='About' className='w-full' />
            </div>
            <div data-aos='fade-left' className='w-full md:w-1/2 px-4 pb-8'>
                <h2 className='text-[40px] font-bold mb-5'>
                    About Fashion Outfit
                </h2>
                <p>
                    THE FASHION OUTFIT STORE caters to thoughtful shoppers who
                    appreciate unique designs and top quality pieces you just
                    can’t find anywhere else. Fashion Outfit persistently takes
                    a stab at magnificence, sourcing key pieces and
                    accumulations from the world’s most notable brands close by
                    new and energizing fashioners. We are constantly curating
                    fresh new collections and looking for the next big thing our
                    customers will love. Founded in Vietnam in 2022, we are
                    proud to be your Online Clothing Store that you can rely on
                    for our expert service and care.
                </p>
            </div>
        </section>
    )
}
export default Introduction
