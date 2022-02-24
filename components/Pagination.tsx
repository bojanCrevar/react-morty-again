import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useSelector } from "react-redux";
import { PaginationModel } from "../model/paginationModel";
import { RootState } from "../model/storeModel";

type paginationProps = {
  setActivePage: (arg: React.SetStateAction<number>) => void;
  activePage: number;
  pagesInfo: PaginationModel;
};

const PaginationBar = ({
  setActivePage,
  activePage,
  pagesInfo,
}: paginationProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const prevButtonTemplate =
    activePage > 1 ? (
      <Pagination.Prev onClick={() => setActivePage((prev) => prev - 1)} />
    ) : null;

  const nextButtonTemplate =
    activePage < pagesInfo.pages ? (
      <Pagination.Next onClick={() => setActivePage((prev) => prev + 1)} />
    ) : null;

  return (
    <Pagination className={"mb-1 mb-lg-2" + (theme ? " dark" : "")}>
      {prevButtonTemplate}
      <Pagination.Item>{activePage}</Pagination.Item>
      {nextButtonTemplate}
    </Pagination>
  );
};

export default PaginationBar;
