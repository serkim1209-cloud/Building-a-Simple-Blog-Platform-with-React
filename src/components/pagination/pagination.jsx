import { Swiper, SwiperSlide } from "swiper/react";
function Pagination({ page, setPage, totalPages }) {
  return (
    <Swiper slidesPerView={"auto"} spaceBetween={8} className="w-[500px]">
      {Array.from({ length: totalPages }, (_, index) => (
        <SwiperSlide
          key={index}
          className={`!w-[24px] !h-[24px] flex items-center justify-center border border-[#61BB61] text-[#61BB61] ${page === index + 1 ? "bg-[#61BB61] text-white" : "bg-white text-[#61BB61]"}`}
        >
          <button
            className="flex items-center justify-center w-full h-full cursor-pointer"
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default Pagination;
