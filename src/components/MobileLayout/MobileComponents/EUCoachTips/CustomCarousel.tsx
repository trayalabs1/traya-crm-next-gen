import React, { useEffect, useState, useCallback } from "react";

// Define generic type for CarouselProps
interface CarouselProps<T> {
  data: T[];
  renderItem: (item: { item: T }) => JSX.Element;
  autoplay?: boolean;
  loop?: boolean;
  interval?: number; // interval for autoplay in milliseconds
  PaginationInActiveDot?: React.CSSProperties;
  PaginationActiveDot?: React.CSSProperties;
  showPagination?: boolean;
  sliderWidth?: number;
  itemWidth?: number;
}

const CustomCarousel = <T,>({
  data,
  renderItem,
  autoplay = false,
  loop = false,
  interval = 3000,
  PaginationInActiveDot = {
    width: "6px",
    height: "6px",
    backgroundColor: "#ccc",
  },
  PaginationActiveDot = {
    width: "16px",
    height: "6px",
    backgroundColor: "#000",
  },
  showPagination = true,
  sliderWidth = 300,
  itemWidth = 300,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = data.length;

  // Function to move to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      loop
        ? (prevIndex + 1) % totalSlides
        : Math.min(prevIndex + 1, totalSlides - 1),
    );
  }, [loop, totalSlides]);

  // Function to move to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      loop
        ? (prevIndex - 1 + totalSlides) % totalSlides
        : Math.max(prevIndex - 1, 0),
    );
  }, [loop, totalSlides]);

  // Autoplay effect
  useEffect(() => {
    if (autoplay) {
      const slideInterval = setInterval(() => {
        nextSlide();
      }, interval);
      return () => clearInterval(slideInterval); // Clean up the interval on component unmount
    }
  }, [nextSlide, autoplay, interval]);

  return (
    <div
      style={{
        width: `${sliderWidth}px`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          width: `${totalSlides * itemWidth}px`,
        }}
      >
        {data.map((item, index) => (
          <div key={index} style={{ width: `${itemWidth}px`, flexShrink: 0 }}>
            {renderItem({ item })}
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {showPagination && (
        <div className="flex justify-center mt-3">
          {data.map((_, index) => (
            <span
              key={index}
              style={
                index === currentIndex
                  ? PaginationActiveDot
                  : PaginationInActiveDot
              }
              className={`inline-block mx-1 rounded-full`}
            />
          ))}
        </div>
      )}

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
        }}
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
        }}
      >
        &#10095;
      </button>
    </div>
  );
};

export default CustomCarousel;
