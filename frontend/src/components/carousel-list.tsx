import Carousel from '@/components/Carousel';

function CarouselList() {
  return (
    <div style={{ height: '300px', position: 'relative' }}>
      <Carousel
        baseWidth={300}
        autoplay={true}
        autoplayDelay={3000}
        pauseOnHover={true}
        loop={true}
        round={false}
      />
    </div>
  );
}
export default CarouselList;
