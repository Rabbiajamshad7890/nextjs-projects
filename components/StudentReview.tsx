// "use client";
// import React, { useRef, useEffect, FC } from 'react';
// import { Quote, Star, User } from 'lucide-react';

// // --- Type Definitions ---

// /**
//  * Defines the structure for a single testimonial object.
//  */
// interface Testimonial {
//     id: number;
//     client: string;
//     project: string;
//     logo: string;
//     review: string;
//     rating: number;
//     reviewerName: string;
// }

// /**
//  * Defines the props for the Rating sub-component.
//  */
// interface RatingProps {
//     count: number;
// }

// /**
//  * Defines the props for the TestimonialCard sub-component.
//  */
// interface TestimonialCardProps {
//     reviewData: Testimonial;
// }


// // --- Configuration & Data ---

// const darkBgColor: string = 'bg-[#0d0617]'; // Deep space background
// const accentColorHex: string = 'bg-[#0d0617]'; // Cyan for highlights
// const cardBgColor: string = 'bg-[#1a0f2b]'; // Dark purple card background

// // Testimonials data: now explicitly typed as an array of Testimonial
// const testimonials: Testimonial[] = [
//     {
//         id: 1,
//         client: 'Ideoversity',
//         project: 'LMS Student',
//         logo: 'https://placehold.co/40x40/4F46E5/FFFFFF?text=ID',
//         review: 'The P2P Clouds learning system is cutting-edge! The courses are well-structured, making my training sessions efficient and accessible from anywhere.',
//         rating: 5,
//         reviewerName: 'Ahsan Khan (DevOps Student)',
//     },
//     {
//         id: 2,
//         client: 'Nexskill Johar Town',
//         project: 'Cloud Bootcamp',
//         logo: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=NX',
//         review: 'The Cloud Bootcamp boosted my skills immensely. I especially loved the hands-on labs and the responsive instructor support.',
//         rating: 5,
//         reviewerName: 'Sarah M. (AI/ML Track)',
//     },
//     {
//         id: 3,
//         client: 'Nexskill Mian Channu',
//         project: 'Full-Stack Web Dev',
//         logo: 'https://placehold.co/40x40/8B5CF6/FFFFFF?text=NX',
//         review: 'I finally feel confident building web applications. The curriculum was highly relevant and the instructors were brilliant!',
//         rating: 4,
//         reviewerName: 'Kamran Ali (Web Dev Student)',
//     },
//     {
//         id: 4,
//         client: 'Bitmine Pro Team',
//         project: 'Trading Algorithm Course',
//         logo: 'https://placehold.co/40x40/06B6D4/FFFFFF?text=BP',
//         review: "This course on trading algorithms was insightful and practical. It provided real-time data analysis techniques that I can immediately apply.",
//         rating: 5,
//         reviewerName: 'Omar Saeed (Quant Finance)',
//     },
//     {
//         id: 5,
//         client: 'MS Future Team',
//         project: 'Product Management Cert.',
//         logo: 'https://placehold.co/40x40/10B981/FFFFFF?text=MS',
//         review: 'The Product Management Certification program was comprehensive. It optimized my understanding of the development lifecycle and market strategy.',
//         rating: 5,
//         reviewerName: 'Emily W. (Product Manager)',
//     },
//     {
//         id: 6,
//         client: 'Mian Ahmad Manzoor',
//         project: 'Custom IT Training',
//         logo: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=MA',
//         review: 'The custom training modules P2P Clouds created were exactly what I needed. Delivered with exceptional detail and quality.',
//         rating: 4,
//         reviewerName: 'Mian A. Manzoor (Tech Lead)',
//     },
// ];

// // --- Sub-Components ---

// // Card for a single testimonial
// const TestimonialCard: FC<TestimonialCardProps> = ({ reviewData }) => {
//     // Star Rating Component
//     const Rating: FC<RatingProps> = ({ count }) => (
//         <div className="flex text-yellow-400">
//             {[...Array(5)].map((_, i) => (
//                 <Star 
//                     key={i} 
//                     className={`w-5 h-5 transition-transform duration-300 ${
//                         i < count ? 'fill-yellow-400' : 'fill-gray-700'
//                     }`} 
//                 />
//             ))}
//         </div>
//     );

//     return (
//         <div
//             className={`min-w-full sm:min-w-[55%] md:min-w-[40%] lg:min-w-[30%] xl:min-w-[24%] p-6 mx-3 
//                         ${cardBgColor} rounded-xl border border-white/10 shadow-2xl shadow-black/50 
//                         flex-shrink-0`}
//             style={{ 
//                 border: `1px solid rgba(255, 255, 255, 0.1)`, 
//                 // Adding a subtle radial gradient for depth
//                 background: `radial-gradient(circle at top left, rgba(123, 0, 255, 0.1), rgba(0, 0, 0, 0.1) 60%), ${cardBgColor}`
//             }}
//         >
//             {/* Top Section: Client Logo and Project */}
//             <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center space-x-3">
//                     {/* <img 
//                         src={reviewData.logo} 
//                         alt={`${reviewData.client} logo`} 
//                         className="w-10 h-10 rounded-full object-cover border border-cyan-400/50"
//                         onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
//                             e.currentTarget.onerror = null; 
//                             e.currentTarget.src = 'https://placehold.co/40x40/1A0F2B/FFFFFF?text=P2P'; 
//                         }}
//                     /> */}
//                     <div>
//                         <p className="text-sm font-bold text-white leading-tight">{reviewData.client}</p>
//                         <p className="text-xs text-cyan-400 leading-tight">{reviewData.project}</p>
//                     </div>
//                 </div>
//                 <Quote className="w-6 h-6 text-purple-400 opacity-60 flex-shrink-0 mt-1" />
//             </div>

//             {/* Review Text */}
//             <p className="text-sm text-gray-300 mb-4 h-24 overflow-hidden leading-relaxed">
//                 {reviewData.review}
//             </p>

//             {/* Bottom Section: Rating and Reviewer Name */}
//             <div className="pt-4 border-t border-white/10">
//                 <Rating count={reviewData.rating} />
//                 <p className="text-xs text-gray-500 mt-2 flex items-center">
//                     <User className='w-3 h-3 mr-1' /> Reviewer: {reviewData.reviewerName}
//                 </p>
//             </div>
//         </div>
//     );
// };


// // --- Main Component ---

// const StudentReviews: FC = () => {
//     // 1. Add useRef to target the scrollable element, explicitly typing it for an HTMLDivElement
//     const scrollRef = useRef<HTMLDivElement>(null);

//     // 2. Add useEffect for the auto-scroll animation
//     useEffect(() => {
//         const scrollContainer = scrollRef.current;
//         // Type check to ensure scrollContainer is not null
//         if (!scrollContainer) return;

//         let animationFrameId: number;
//         const scrollSpeed: number = 0.5; // Adjust speed (pixels per frame) for smoothness

//         const autoScroll = (): void => {
//             // Check if we've scrolled past the total width (minus client viewport width)
//             if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
//                 // Jump back to the start smoothly
//                 scrollContainer.scrollTo({
//                     left: 0,
//                     behavior: 'smooth' 
//                 });
//             } else {
//                 // Otherwise, keep scrolling incrementally
//                 scrollContainer.scrollLeft += scrollSpeed;
//             }
            
//             // Request the next frame
//             animationFrameId = requestAnimationFrame(autoScroll);
//         };

//         // Start the scrolling animation
//         animationFrameId = requestAnimationFrame(autoScroll);

//         // Clean up the animation frame when the component unmounts
//         return () => {
//             cancelAnimationFrame(animationFrameId);
//         };
//     }, []); // Empty dependency array ensures it runs once on mount

//     // --- Render ---

//     return (
//         <section className={`${darkBgColor} text-white py-20 px-4 sm:px-6 lg:px-8 font-inter`}>
//             <div className="max-w-7xl mx-auto">

//                 {/* Header */}
//                 <div className="flex flex-col justify-center items-center mb-12 text-center">
//                     <span className="inline-flex items-center px-4 py-1 bg-purple-900/40 border border-purple-500/50 text-xs font-medium rounded-full tracking-widest uppercase text-white shadow-lg shadow-purple-900/50 mb-3">
//                         Student Success Stories
//                     </span>
//                     <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
//                         Hear from our <span className="text-cyan-400">Students</span>
//                     </h2>
//                     <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//                         See how P2P Clouds is helping aspiring engineers and tech leaders achieve their goals through our courses and mentorship.
//                     </p>
//                 </div>
                
//                 {/* Scroll-Row / Reviews Grid */}
//                 <div 
//                     ref={scrollRef}
//                     className="flex overflow-x-scroll py-4 -mx-3"
//                     style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                 >
//                     {testimonials.map((review: Testimonial) => (
//                         <TestimonialCard 
//                             key={review.id} 
//                             reviewData={review} 
//                         />
//                     ))}
//                 </div>
//             </div>
//             {/* Custom style to hide the scrollbar for the carousel */}
//             <style>{`
//                 ::-webkit-scrollbar {
//                     display: none;
//                 }
//             `}</style>
//         </section>
//     );
// };

// export default StudentReviews;
