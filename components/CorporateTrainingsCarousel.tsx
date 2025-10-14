'use client';

import React, { useState, useEffect } from 'react'; // Added useEffect
import Image from 'next/image';
import { motion } from 'framer-motion';
// Adjusted path for the separate theme context file 
import { useTheme } from "../app/Context/ThemeContext"; 

// --- 1. DATA FOR CAROUSEL CARDS ---
const trainingImages = [
  { 
    id: 1, 
    src: "/image7.png", 
    alt: "Zeeshan Ali - Unlocking Revenue with AI Session",
    caption: "Unlocking Revenue with AI Session"
  },
  { 
    id: 2, 
    src: "/image6.png", 
    alt: "Zeeshan Ali - Briefing on Meta Ads",
    caption: "Meta Ads Strategy Briefing"
  },
  { 
    id: 3, 
    src: "/image5.png", 
    alt: "Women Chamber of Commerce - Zeeshan Ali Session",
    caption: "Session at Women Chamber of Commerce"
  },
  { 
    id: 4, 
    src: "/image4.png", 
    alt: "Women Chamber Club Glimpses",
    caption: "Glimpses from the Women Chamber Club"
  },
  { 
    id: 5, 
    src: "/image3.png", 
    alt: "Prompts Session - Chamber of Commerce",
    caption: "Advanced Prompts Session at Chamber of Commerce"
  },
  { 
    id: 6, 
    src: "/image2.png",
    alt: "Meta Ads Type Understanding by Zeeshan Ali",
    caption: "In-depth Meta Ads Type Workshop"
  },
  { 
    id: 7, 
    src: "/image1.png", 
    alt: "EPIC and P2P Clouds Workshop - Zeeshan Ali at Women Chamber Club",
    caption: "EPIC & P2P Clouds Workshop"
  },
];


// --- 2. CAROUSEL CLIENT COMPONENT ---

const CorporateTrainingsCarousel: React.FC = () => {
    const { theme } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Dark mode background is pure black (bg-black)
    const bgColor = theme === 'dark' ? 'bg-black' : 'bg-white';
    
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === trainingImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? trainingImages.length - 1 : prevIndex - 1
        );
    };

    // --- AUTOMATIC CAROUSEL LOGIC ---
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Automatically move to the next slide
            setCurrentIndex((prevIndex) => 
              prevIndex === trainingImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 5000 milliseconds = 5 seconds

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); 

    // Card component for the carousel
    const CarouselCard = ({ src, alt, caption }: { src: string, alt: string, caption: string }) => (
        <motion.div 
            key={src}
            className="w-full flex-shrink-0 p-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                <div className="relative h-64 md:h-96 w-full">
                    <Image
                        src={src}
                        alt={alt}
                        layout="fill"
                        objectFit="cover"
                        className="transition-opacity duration-500"
                    />
                </div>
                <div className="p-6 text-center">
                    {/* Card title uses dark blue for light mode */}
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-white">{caption}</h3>
                    {/* Card subtitle uses a slightly lighter dark blue for light mode */}
                    <p className="mt-1 text-sm text-blue-800 dark:text-gray-400">Corporate Session Glimpse</p>
                </div>
            </div>
        </motion.div>
    );

    // Apply text color based on the current theme state for guaranteed visibility
    const headingTextColor = theme === 'light' ? 'text-blue-900' : 'text-white';
    const paragraphTextColor = theme === 'light' ? 'text-blue-900' : 'text-gray-300';


    return (
        <div className={`min-h-screen ${bgColor} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}>
            <div className="max-w-4xl mx-auto">
                
                {/* FIX APPLIED: Main heading color now dynamically set by state for high contrast */}
                <h1 className={`text-4xl font-extrabold text-center mb-10 ${headingTextColor}`}>
                    Corporate Training Highlights
                </h1>

                {/* Carousel Container */}
                <div className="relative">
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            // Calculates the translation distance based on the current index
                            style={{ width: `${trainingImages.length * 100}%`, transform: `translateX(-${currentIndex * (100 / trainingImages.length)}%)` }}
                        >
                            {trainingImages.map((image) => (
                                <div key={image.id} className="w-full flex-shrink-0" style={{ width: `${100 / trainingImages.length}%` }}>
                                    <CarouselCard 
                                        src={image.src}
                                        alt={image.alt}
                                        caption={image.caption}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full ml-2 hover:bg-opacity-75 transition z-10"
                        aria-label="Previous slide"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full mr-2 hover:bg-opacity-75 transition z-10"
                        aria-label="Next slide"
                    >
                        &gt;
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center space-x-2 mt-4">
                        {trainingImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === currentIndex 
                                        ? 'bg-purple-500' 
                                        : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Simple Information Below Carousel */}
                <div className="mt-12 text-center max-w-2xl mx-auto">
                    {/* FIX APPLIED: Information text color now dynamically set by state for high contrast */}
                    <p className={`text-lg ${paragraphTextColor}`}>
                        These are glimpses of the successful corporate training and workshops conducted by Zeeshan Ali for various organizations, including the Women Chamber of Commerce and other industry partners.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CorporateTrainingsCarousel;
