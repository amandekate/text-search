import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";

const App = () => {
  const [text, setText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setText(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const regex = new RegExp(query, "gi");
    const matches = text.match(regex);
    setSearchResults(matches || []);
  };

  // Function to count the total number of words
  const countWords = (text) => {
    return text.split(/\s+/).filter((word) => word !== "").length;
  };

  if (text.length === 0) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <FileUpload onUpload={handleFileUpload} />
      </div>
    );
  } else {
    return (
      <div className="h-full w-screen justify-center items-center flex flex-col ">
        <div className="w-full h-auto p-2 flex items-start">
          <FileUpload onUpload={handleFileUpload} />
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="w-full h-auto p-2 flex flex-col">
          <SearchResult
            searchQuery={searchQuery}
            searchResults={searchResults}
            text={text}
            totalWords={countWords(text)}
          />
          <p className="text-gray-500"><span className="font-semibold text-black pl-1">Shortcut guide :</span> Ctrl + Q  - For search </p>
        </div>
      </div>
    );
  }
};

export default App;
