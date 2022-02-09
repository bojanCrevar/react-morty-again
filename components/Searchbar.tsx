import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { useDispatch } from "react-redux";
import { filterActions } from "../store/filter-slice";

type SearchBarProps = {
  initKeyword: string;
  setActivePage: (activePage: number) => void;
  triggerSearch: () => void;
};

const Searchbar: React.FC<SearchBarProps> = ({
  initKeyword,
  setActivePage,
  triggerSearch,
}) => {
  const dispatch = useDispatch();

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    setActivePage(1);
    triggerSearch();
  }

  function onChangeState() {
    dispatch(filterActions.setKeyword(searchKeyword.current!.value));
  }

  function clearHandler() {
    dispatch(filterActions.setKeyword(""));
    setActivePage(1);
    triggerSearch();
    searchKeyword.current!.value = "";
  }

  const searchKeyword = useRef<HTMLInputElement>(null);

  return (
    <div>
      <form onSubmit={submitHandler} onChange={onChangeState}>
        <div className="flex flex-col space-y-1 w-full lg:flex-row lg:space-x-1 lg:space-y-0">
          <div className="lg:w-3/4">
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Search"
              ref={searchKeyword}
              defaultValue={initKeyword}
              data-testid="keywordInput"
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
