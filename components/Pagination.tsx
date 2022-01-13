import { PreviewData } from "next";
import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { PaginationModel } from "../model/paginationModel";

type paginationProps = {
  setActivePage: (arg: React.SetStateAction<number>) => void;
  activePage: number;
  pagesInfo: PaginationModel;
};

//first destructure props then set type
const PaginationBar = ({
  setActivePage,
  activePage,
  pagesInfo,
}: paginationProps) => {
  const prevButtonTemplate =
    activePage > 1 ? (
      <Pagination.Prev onClick={() => setActivePage((prev) => prev - 1)} />
    ) : null;

  const nextButtonTemplate =
    activePage < pagesInfo.pages ? (
      <Pagination.Next onClick={() => setActivePage((prev) => prev + 1)} />
    ) : null;

  return (
    <Pagination className="mb-1 lg:mb-2">
      {prevButtonTemplate}
      <Pagination.Item>{activePage}</Pagination.Item>
      {nextButtonTemplate}
    </Pagination>
  );
};

export default PaginationBar;
