import React, { useMemo, useState } from "react";
import Pagination from "react-bootstrap/Pagination";


export default function DataPagination({rowsPerPage, totalRows, siblingCount = 2, currentPage, onPageChange}) {
  
  const totalPageCount = useMemo(() => Math.ceil(totalRows / rowsPerPage), [totalRows, rowsPerPage])

  const paginationItems = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 1

    if(totalPageNumbers >= totalPageCount ) {

      return {
        arrows: false,
        leftDots: false,
        rightDots: false,
        pageItems: Array.from({ length: totalPageCount}, (_, idx) => idx + 1)
      } 
    }

    const leftDots = Math.max(currentPage - siblingCount, 1) > 2;
    const rightDots = currentPage + siblingCount < totalPageCount;
    
    let startingPage = Math.max(currentPage - siblingCount, 1)
    if(totalPageCount-currentPage < siblingCount) {
      startingPage -= siblingCount - (totalPageCount-currentPage)
    }

    const pageItems = Array.from({ length: totalPageNumbers}, 
      (_, idx) => idx + startingPage
    )

    return {
      arrows: true,
      leftDots,
      rightDots,
      pageItems
    }

  },[totalPageCount, siblingCount, currentPage, totalRows])

  return (<>
  { totalPageCount > 1 && 
    <Pagination className="mx-auto text-center">
      { paginationItems.arrows && 
        <>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        />
        <Pagination.Prev 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        </>
      }
      { paginationItems.leftDots && 
        <>
        <Pagination.Ellipsis />
        </>
       }
      { paginationItems.pageItems.map(i => 
        <Pagination.Item 
          key={`Page${i}`}
          active={i === currentPage}
          onClick={(event) => {
              onPageChange(i)
              event.target.blur()
            }}>
            {i}
        </Pagination.Item>)
      }
      { paginationItems.rightDots && 
      <>
      <Pagination.Ellipsis /> 
      </>
      }
      { paginationItems.arrows && 
        <>
        <Pagination.Next
          disabled={currentPage === totalPageCount}
          onClick={() => onPageChange(currentPage + 1)}
        />
        <Pagination.Last 
          disabled={currentPage === totalPageCount}
          onClick={() => onPageChange(totalPageCount)}
        />
        </>
      }
    </Pagination>
  }
  </>)

}