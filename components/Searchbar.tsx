import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

type SearchBarProps = {
  setKeyword: (keyword: string) => void;
  initKeyword: string;
  setActivePage: (activePage: number) => void;
  setSubmitButtonClick: (val: boolean) => void;
};

const Searchbar: React.FC<SearchBarProps> = ({
  setKeyword,
  initKeyword,
  setActivePage,
  setSubmitButtonClick,
}) => {
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    setActivePage(1);
    setSubmitButtonClick(true);
  }

  function onChangeState() {
    setKeyword(searchKeyword.current!.value);
  }

  function clearHandler() {
    setKeyword("");
    setActivePage(1);
    searchKeyword.current!.value = "";
    setSubmitButtonClick(true);
  }

  const searchKeyword = useRef<HTMLInputElement>(null);

  return (
    <div>
      <form onSubmit={submitHandler} onChange={() => onChangeState()}>
        <div className="flex flex-col space-y-1 w-full lg:flex-row lg:space-x-1 lg:space-y-0">
          <div className="lg:w-3/4">
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Search"
              ref={searchKeyword}
              defaultValue={initKeyword}
            />
          </div>
          <div className="flex lg:w-1/4 ">
            <Button
              variant="primary"
              type="submit"
              className="text-center w-6/12 mr-1"
            >
              Search
            </Button>
            <Button
              variant="secondary"
              className="text-center w-6/12 ml-1 "
              onClick={clearHandler}
            >
              Clear
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
