import React from 'react';
import { MapPin, Clock, Users, Briefcase, Coffee, Wifi } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = ({featuredRef}) => {
  const features = [
    {
      icon: <MapPin className="h-10 w-10" />,
      title: "Prime Locations",
      description: "Access premium workspaces in convenient locations across major cities worldwide."
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Flexible Booking",
      description: "Book by the hour, day, or month with no long-term commitments required."
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Community Access",
      description: "Join a vibrant community of professionals, entrepreneurs, and creatives."
    },
    {
      icon: <Briefcase className="h-10 w-10" />,
      title: "Professional Environment",
      description: "Impress clients with well-designed meeting rooms and offices."
    },
    {
      icon: <Coffee className="h-10 w-10" />,
      title: "All-Inclusive Amenities",
      description: "Enjoy complimentary coffee, printing services, and kitchen facilities."
    },
    {
      icon: <Wifi className="h-10 w-10" />,
      title: "High-Speed WiFi",
      description: "Stay connected with enterprise-grade internet at all our locations."
    },
  ];

  return (
    <section ref={featuredRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose CoSpace?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer more than just a desk. Discover the benefits of our coworking spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
