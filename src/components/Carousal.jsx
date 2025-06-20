import React, { useState, useEffect } from 'react';

const slides = [
  {
    label: 'Juicy Cheeseburger',
    description: 'Grilled to perfection with melted cheese, crispy lettuce, and fresh buns.',
    image: '/images/burger.webp',
  },
  {
    label: 'Crispy French Fries',
    description: 'Golden, crunchy, and served hot — the perfect sidekick to any meal.',
    image: '/images/frenchfries.webp',
  },
  {
    label: 'Creamy Alfredo Pasta',
    description: 'Rich, creamy sauce tossed with perfectly cooked fettuccine and herbs.',
    image: '/images/pasta.webp',
  },
];


const Carousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrent(index);

return (
    <div className="relative w-full mx-auto overflow-hidden  shadow-lg">
        {/* Slides */}
        <div
            className="relative h-80 sm:h-[32rem] transition-all duration-700 ease-in-out group"
        >
            {slides.map((slide, idx) => (
                <div
                    key={slide.label}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        idx === current ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.label}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                        <h5 className="text-xl font-bold">{slide.label}</h5>
                        <p className="text-sm">{slide.description}</p>
                    </div>
                </div>
            ))}
            {/* Overlay for hover detection */}
            <div className="absolute inset-0 group-hover:bg-transparent"></div>
        </div>
        <button
            onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-4xl  focus:outline-none hover:text-gray-300 z-20"
        >
            ‹
        </button>

        {/* Next Button */}
        <button
            onClick={() => setCurrent((current + 1) % slides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-4xl  focus:outline-none hover:text-gray-300 z-20"
        >
            ›
        </button>

        {/* Indicators */}
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-1.5 h-1.5 rounded-full transition ${
                        index === current ? 'bg-white' : 'bg-gray-500'
                    }`}
                ></button>
            ))}
        </div>
    </div>
);
};

export default Carousel;
