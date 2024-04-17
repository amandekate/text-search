import React from 'react';

const SearchResult = ({ searchQuery, searchResults, text, totalWords }) => {
  return (
    <div>
      <p>Total occurrences of "{searchQuery}": {searchResults.length}</p>
      <pre className='border-2 rounded p-2'>
        {text?.split(searchQuery).map((part, index) => (
          <span key={index}>
            {part}
            {index !== text.split(searchQuery).length - 1 && (
              <span style={{ backgroundColor: 'yellow' }}>{searchQuery}</span>
            )}
          </span>
        ))}
      </pre>
      <br />
      <p>Total words in the text: {totalWords}</p>
    </div>
  );
};
export default SearchResult;