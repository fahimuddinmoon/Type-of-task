import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import pic1 from '../../public/aerial-view-business-data-analysis-graph_53876-13390.avif'
import pic2 from '../../public/data-profession-money-symbol-lens-flare_1134-1414.jpg'
import pic3 from '../../public/man-analyzing-tasks-wellorganized-wall-planning-system_954352-7115.avif'
const Banner = () => {
    return (
        <div className='mb-6'>
             <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide className=''>
                    <img className='w-full h-96 lg:h-[550px] lg:w-full    object-cover' src={pic1} alt="" />
                   
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-96 lg:h-[550px] lg:w-full   object-cover' src={pic2} alt="" />
                   
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-96 lg:h-[550px] lg:w-full   object-cover' src={pic3} alt="" />
                   
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;