// Search.js
import React from "react";
import { Form } from "react-bootstrap";

const Search = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1">
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="mr-2 rounded-pill me-2"
          style={{ width: "400px" }} // Змінюємо ширину тут
        />
      </Form>
    </div>
  );
};

export default Search;
