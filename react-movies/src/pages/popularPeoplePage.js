import React, { useState } from "react";
import {  getPopular } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import BasicPagination from "../components/pagination";
import PageTemplate from "../components/templatePeopleListPage"

const PopularPeoplePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);//dont need to cached
  const {  data, error, isLoading, isError }  = useQuery(['popular',currentPage], getPopular)

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const popularPeople = data.results;
  const totalPages = data.total_pages;
  console.log("total pages: "+totalPages)


  return (
    <>
    <PageTemplate
      title="Popular People"
      people={popularPeople}
      /> 
    <BasicPagination 
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={(page) => setCurrentPage(page)}
  />
  </>
);
}
export default PopularPeoplePage;