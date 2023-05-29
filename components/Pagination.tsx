import React from "react";
import Layout from "./Layout";

export type PaginationProps = {
    page: number;
    totalPosts: number;
    handlePageChange: Function;
};

export const Pagination: React.FC<{ props: PaginationProps }>= ({props}) =>
{    
    const {page,totalPosts, handlePageChange} = props;
    const pages = [];
    let firstPage = 0;
    const lastPage = totalPosts/10;
    let lastindex = 0;
   

    if(page <5){
        firstPage = 1;
        lastindex = Math.min(9  ,lastPage );

    }else{
        firstPage = Math.max(page - 4 , 1);
         lastindex = Math.min(page+4 ,lastPage );

    }
    for(let i = firstPage;i<= lastindex;i++){
        pages.push(
            <button
             key={i} 
             onClick={()=>handlePageChange(i)}
               disabled={i === page}
            className={i === page ? "active" : ""} >             
                {i}
            </button>
        );
    }
    console.log(lastindex);
 return (
  <div>
      <button
        className={page === 1 ? "disabled" : ""}
        disabled={page === 1}
        onClick={()=>{if(page !== 1){ handlePageChange(page - 1)}}}
        >
        &laquo;
        </button>
        {pages}
        <button
        className={page >= lastindex ? "disabled" : ""}
        disabled={page >= lastindex}
        onClick={()=>{if(page !== lastindex){ handlePageChange(page + 1)}}}
        >
        &raquo;
        </button>
    </div>
 );
};
