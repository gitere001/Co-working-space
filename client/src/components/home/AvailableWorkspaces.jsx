import React, { useState } from 'react';
import { Search, Filter, Building2 } from 'lucide-react';
import WorkspaceCard from './WorkspaceCard';


const AvailableWorkspaces = ({ workspaces, onBookNow }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWorkspaces = workspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workspace.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center mb-4 md:mb-0">
          <Building2 className="mr-2 text-blue-500" size={20} />
          Available Workspaces
        </h2>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search workspaces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredWorkspaces.length === 0 ? (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">No workspaces found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableWorkspaces;
