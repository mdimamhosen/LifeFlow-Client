import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useQuery } from "@tanstack/react-query";
import { axiosOpen } from "../Hooks/useAxiosCommon";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Testimonials = () => {
  const {
    data: reviews = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: "reviews",
    queryFn: async () => {
      const { data } = await axiosOpen.get("/reviews");
      return data;
    },
  });
  console.log(reviews);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="px-4 md:px-12 lg:px-24 py-12">
      <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit text-center mx-auto">
        What Our Donors Say
      </h1>
      <div>
        <Swiper
          spaceBetween={30}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 1500,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          {reviews.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="z-10 card border-2 border-orange-600 h-56 md:80 lg:h-96 rounded-lg py-3 px-2 sm:space-y-4 md:space-y-1 lg:space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      className="rounded-full object-cover w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 border-2 border-red-500 p-1"
                      src={testimonial.imgSrc}
                      alt=""
                    />
                    <div>
                      <h1 className="text-lg md:text-xl lg:text-2xl text-red-500 font-bold">
                        {testimonial.name}
                      </h1>
                      <h1 className="text-xs   font-bold text-gray-400">
                        {testimonial.profession}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm md:text-md lg:text-lg text-gray-500">
                  <p>{testimonial.comment}</p>
                </div>
                <div className="flex opacity-90">
                  {Array.from({ length: 5 }, (_, index) => (
                    <AiFillStar
                      key={index}
                      className="text-[20px] md:text-[24px] lg:text-[30px] text-red-500"
                    />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
