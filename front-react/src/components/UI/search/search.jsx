import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1">
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="mr-2 rounded-pill me-2"
          style={{ width: "400px" }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form>
    </div>
  );
};

export default Search;
