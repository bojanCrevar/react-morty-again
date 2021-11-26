import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationBar = ({ setActivePage, activePage, pagesInfo }) => {
  const prevButtonTemplate =
    activePage > 1 ? (
      <Pagination.Prev onClick={() => setActivePage((prev) => prev - 1)} />
    ) : null;

  console.log(pagesInfo);

  const nextButtonTemplate =
    activePage < pagesInfo.pages ? (
      <Pagination.Next onClick={() => setActivePage((prev) => prev + 1)} />
    ) : null;

  return (
    <Pagination>
      {prevButtonTemplate}
      <Pagination.Item>{activePage}</Pagination.Item>
      {nextButtonTemplate}
    </Pagination>
  );
};

export default PaginationBar;
