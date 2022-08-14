import Carousel from 'nuka-carousel'
import Button from './Button'

const Slider = ({ data }) => {
    const defaultControlsConfig = {
        pagingDotsClassName: 'hidden',
        nextButtonText: '>',
        prevButtonText: '<',
        nextButtonClassName: 'slider-next-btn',
        prevButtonClassName: 'slider-prev-btn',
    }

    return (
        <Carousel
            defaultControlsConfig={defaultControlsConfig}
            wrapAround={true}
            autoplay={true}
        >
            {data.map((item, index) => (
                <div key={index} className='h-[600px] bg-zinc-800'>
                    <div className='h-full max-w-[1230px] mx-auto text-white relative'>
                        <div className='absolute right-0 top-1/2 -translate-y-1/2'>
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className='max-w-[550px] h-full pl-11 pr-6 relative z-10 flex flex-col justify-center'>
                            <p className='text-2xl font-bold'>Clothing Store</p>
                            <h2 className='text-5xl font-bold my-4'>
                                {item.name}
                            </h2>
                            <p className='text-zinc-200 mb-4'>
                                {item.description}
                            </p>
                            <Button big outline customClass='self-start'>
                                Xem sản phẩm
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    )
}
export default Slider
