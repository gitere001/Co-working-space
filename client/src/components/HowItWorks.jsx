import React from 'react';
import { Search, Calendar, CreditCard, CheckCircle } from 'lucide-react';

const StepCard = ({
  icon,
  title,
  description,
  step,
}) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 relative">
        {icon}
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">
          {step}
        </div>
      </div>

      {step < 4 && (
        <div className="hidden md:block absolute top-8 left-full w-16 h-1 bg-blue-200 transform -translate-y-1/2"></div>
      )}
    </div>

    <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">{title}</h3>
    <p className="text-gray-600 text-center max-w-xs">{description}</p>
  </div>
);

const HowItWorks = ({aboutRef}) => {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Find Your Space",
      description: "Browse our collection of workspaces and filter by location, amenities, or price to find the perfect fit."
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Select Date & Time",
      description: "Choose when you need the space, whether it's for a few hours, days, or months."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Book & Pay",
      description: "Secure your reservation with our simple booking process and transparent pricing."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Enjoy Your Workspace",
      description: "Check in easily and enjoy all the benefits of your new productive environment."
    }
  ];

  return (
    <section ref={aboutRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Booking your ideal workspace is simple and straightforward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={index + 1}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
