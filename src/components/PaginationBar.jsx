import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";

const PAGE_SIZE = 20;
const FRAME_SIZE = 6;
const PaginationBar = ({ pageInfo, setPageInfo }) => {
  console.log("pageinfo", pageInfo);
  const [pagesFrame, setPageFrame] = useState(1);

  const framesMax = Math.ceil(pageInfo.size / PAGE_SIZE);

  function updateActive(newActive) {
    setPageInfo((prev) => ({ ...prev, active: newActive }));
  }

  function gotoLast() {
    updateActive(pageInfo.size);
    setPageFrame(framesMax);
  }

  function gotoFirst() {
    updateActive(1);
    setPageFrame(1);
  }

  let items = [<Pagination.First onClick={() => gotoFirst()} />];
  if (pagesFrame > 1) {
    items.push(
      <Pagination.Ellipsis onClick={() => setPageFrame((prev) => prev - 1)} />
    );
  }
  for (
    let pageNum = (pagesFrame - 1) * FRAME_SIZE + 1;
    pageNum <= (pagesFrame - 1) * FRAME_SIZE + FRAME_SIZE;
    pageNum++
  ) {
    items.push(
      <Pagination.Item
        key={pageNum}
        active={pageNum === pageInfo.active}
        onClick={() => updateActive(pageNum)}
      >
        {pageNum}
      </Pagination.Item>
    );
  }
  if (pagesFrame < framesMax) {
    items.push(
      <Pagination.Ellipsis onClick={() => setPageFrame((prev) => prev + 1)} />
    );
  }
  items.push(<Pagination.Last onClick={() => gotoLast()} />);
  return (
    <div className="my-2">
      <Pagination>{items}</Pagination>
      <br />
    </div>
  );
};

export default PaginationBar;
