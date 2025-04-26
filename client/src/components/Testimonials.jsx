import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = ({testimonialsRef}) => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Freelance Designer",
      company: "Creative Studio",
      image: "https://images.unsplash.com/photo-1526380469674-be22ba33ffde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2VueWFuJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
      quote: "CoSpace has completely transformed how I work. The spaces are beautiful, the community is supportive, and the flexibility fits perfectly with my variable schedule.",
      rating: 5
    },
    {
      id: 2,
      name: "James Wilson",
      role: "Startup Founder",
      company: "TechLaunch",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
      quote: "As our startup grew, CoSpace provided us with the perfect solution to scale our workspace needs without long-term leases. The meeting rooms are perfect for client pitches.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Zhang",
      role: "Remote Manager",
      company: "Global Innovations",
      image: "https://images.unsplash.com/photo-1520943219761-6ca840e2e585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtlbnlhbiUyMHdvbWFufGVufDB8fDB8fHww",
      quote: "I manage a distributed team, and CoSpace locations have become our go-to meeting spots. The ease of booking and professional environment make our quarterly reviews productive.",
      rating: 4
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section ref={testimonialsRef} className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Members Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our members love about CoSpace.
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 md:translate-x-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 md:translate-x-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Testimonial card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonials[currentIndex].rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>

                  <div>
                    <p className="font-semibold text-gray-900">{testimonials[currentIndex].name}</p>
                    <p className="text-gray-600">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`mx-1 w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
