import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { PaginationModel } from "../model/paginationModel";
import { RootState } from "../model/storeModel";
import { paginationActions } from "../store/pagination-slice";

type paginationProps = {
  pagesInfo: PaginationModel;
};

const PaginationBar = ({ pagesInfo }: paginationProps) => {
  const dispatch = useDispatch();

  const activePage = useSelector(
    (state: RootState) => state.pagination.activePage
  );

  const isDarkTheme = useSelector(
    (state: RootState) => state.profile.isDarkTheme
  );

  const prevButtonTemplate =
    activePage > 1 ? (
      <Pagination.Prev
        onClick={() =>
          dispatch(paginationActions.setActivePage(activePage - 1))
        }
      />
    ) : null;

  const nextButtonTemplate =
    activePage < pagesInfo.pages ? (
      <Pagination.Next
        onClick={() =>
          dispatch(paginationActions.setActivePage(activePage + 1))
        }
      />
    ) : null;

  return (
    <Pagination className={"mb-1 mb-lg-2" + (isDarkTheme ? " dark" : "")}>
      {prevButtonTemplate}
      <Pagination.Item>{activePage}</Pagination.Item>
      {nextButtonTemplate}
    </Pagination>
  );
};

export default PaginationBar;
