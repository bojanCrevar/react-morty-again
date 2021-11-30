import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

const Searchbar = ({ setKeyword }) => {
  function submitHandler(e) {
    e.preventDefault();
    console.log(searchKeyword.current.value);
    setKeyword(searchKeyword.current.value);
  }

  function clearHandler() {
    setKeyword("");
    searchKeyword.current.value = "";
  }

  const searchKeyword = useRef();

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="flex space-x-2">
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Search"
            ref={searchKeyword}
          />
          <Button variant="primary" type="submit">
            Search
          </Button>
          <Button variant="secondary" onClick={clearHandler}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
