import React from 'react';

const FilterDropdown = ({ onFilter }) => {
  const tags = ['Gaming', 'Vlog', 'Tech', 'Beauty', 'Fitness'];

  return (
    <select
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Tags</option>
      {tags.map(tag => (
        <option key={tag} value={tag}>{tag}</option>
      ))}
    </select>
  );
};

export default FilterDropdown;