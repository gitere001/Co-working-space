import React from 'react';
import { Check, Star } from 'lucide-react';
import HomeButton from '../../ui/HomeButton';


const WorkspaceCard = ({ workspace, onBookNow }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg border border-gray-100 bg-white">
      <div className="relative h-48">
        <img
          src={workspace.imageUrl}
          alt={workspace.name}
          className="w-full h-full object-cover"
        />
        {workspace.popular && (
          <div className="absolute top-2 right-2">
            <div className="flex items-center bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
              <Star size={12} className="mr-1" />
              Popular
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold">{workspace.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{workspace.description}</p>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline mb-3">
            <span className="text-xl font-bold text-blue-600">{workspace.price}</span>
            <span className="ml-1 text-gray-600 text-sm">/ {workspace.billingPeriod}</span>
          </div>
          <div className="border-t border-gray-100 pt-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
            <ul className="space-y-2">
              {workspace.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
              {workspace.features.length > 3 && (
                <li className="text-sm text-gray-500 pl-6">
                  +{workspace.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <HomeButton
          variant="primary"
          fullWidth
          onClick={() => onBookNow(workspace.id)}
          className="mt-4"
        >
          Book Now
        </HomeButton>
      </div>
    </div>
  );
};

export default WorkspaceCard;
