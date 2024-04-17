import React, { useState, useEffect } from "react";
import { Textarea, Input, Button, Label } from "./ui";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === "q") {
        // Ctrl + F pressed
        e.preventDefault(); // Prevent browser's native "Find in page"
        
        document.getElementById("search-textarea").focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Filter search history based on current query
    const filteredHistory = searchHistory.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    // Display filtered history as suggestions
    setSuggestions(filteredHistory);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      setErrorMessage("Please enter a search word.");
      return;
    }
    setErrorMessage("");

    // Update search history
    const updatedHistory = [query, ...searchHistory.slice(0, 9)]; // Limit to 10 entries
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    // Perform search
    onSearch(query);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    setSuggestions([]);
    localStorage.removeItem("searchHistory");
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]); // Clear suggestions
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <div className="flex gap-2">
      <form onSubmit={handleSearchSubmit} className="flex p-1 gap-1 items-end">
        <div className="flex flex-col gap-1 max-w-[250px]">
          <Label htmlFor="search-textarea">Search</Label>
          <Input
            id="search-textarea"
            value={query}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder="Search..."
          />
        </div>
        <Button type="submit">Search</Button>
        <Button type="button" onClick={clearSearchHistory}>
          Clear History
        </Button>
      </form>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      {suggestions.length > 0 && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="history">History</Label>
          <div id="history" className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <p key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
