import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

function HeroSection() {
  const items = [
    {
      src: '/images/bankthree.jpg', // Replace with your image path
      altText: 'Slide 1',
      caption: 'Welcome to Dynamic Bank Application',
      captionColor: '#ff5733', // Red-orange
    },
    {
      src: '/images/banktwo.jpg', // Replace with your image path
      altText: 'Slide 2',
      caption: 'How are you!!',
      captionColor: '#33c1ff', // Sky blue
    },
    {
      src: '/images/bankone.jpg', // Replace with your image path
      altText: 'Slide 3',
      caption: 'I Hope you are good !!',
      captionColor: '#28a745', // Green
    },
    {
      src: '/images/bankfive.jpg', // Replace with your image path
      altText: 'Slide 4',
      caption: 'I am Here to Guide You',
      captionColor: '#ffc107', // Yellow
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.src}
    >
      <img
        src={item.src}
        alt={item.altText}
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 3 }}
      />
      <CarouselCaption
        captionText={item.caption}
        captionHeader={item.caption}
        style={{
          color: item.captionColor,
          fontWeight: 'bold',
          background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for visibility
          padding: '10px',
          borderRadius: '5px',
        }}
      />
    </CarouselItem>
  ));

  // Auto slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(next, 2000); // Change slide every 2 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [activeIndex]);

  return (
    <div>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
}

export default HeroSection;
