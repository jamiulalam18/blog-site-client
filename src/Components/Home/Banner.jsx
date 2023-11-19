import { Carousel } from "flowbite-react";
import BannerCard from "./BannerCard";

const Banner = () => {
  const choices = ["654c26a9a50545392e8b1eb9", "654c2915a50545392e8b1eba"];
  return (
    <div className="max-w-screen-xl mx-auto pt-16">
      <div className="h-screen lg:h-[500px]">
        <Carousel slideInterval={2000}>
          {/* <img alt="..." src={brandInfo?.brand_banners?.[0]} />
          <img alt="..." src={brandInfo?.brand_banners?.[1]} />
          <img alt="..." src={brandInfo?.brand_banners?.[2]} /> */}
          {choices.map((choice, index) => (
            <div key={index} className="w-full flex justify-center">
              <BannerCard key={choice.idx} choice={choice}></BannerCard>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
