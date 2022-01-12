import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

type SearchBarProps = {
  setKeyword: (keyword: string) => void;
  initKeyword: string;
  setActivePage: (activePage: number) => void;
};

const Searchbar: React.FC<SearchBarProps> = ({
  setKeyword,
  initKeyword,
  setActivePage,
}) => {
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    setActivePage(1);
    setKeyword(searchKeyword.current!.value);
  }

  function clearHandler() {
    setKeyword("");
    setActivePage(1);
    searchKeyword.current!.value = "";
  }

  const searchKeyword = useRef<HTMLInputElement>(null);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col lg:flex-row lg:space-x-2">
          <div className="w-full lg:w-2/3">
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Search"
              ref={searchKeyword}
              defaultValue={initKeyword}
            />
          </div>
          <div className="w-full pt-2 space-x-2 lg:w-1/3 lg:p-0">
            <Button variant="primary" type="submit">
              Search
            </Button>
            <Button variant="secondary" onClick={clearHandler}>
              Clear
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
