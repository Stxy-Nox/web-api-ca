import React from "react";
import { useParams } from 'react-router-dom';
import PageTemplate from "../components/templatePersonPage";
import { getPreson , getPresonCredits} from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import PersonDetails from "../components/personDetails";

const PersonPage = (props) => {
  const { id } = useParams();
  const { data: personData, error:personError, isLoading:personIsLoading, isError:personIsError } = useQuery(
    ["person", {id : id}],
    getPreson
  )
  const { data: creditData, error:creditError, isLoading:creditIsLoading, isError:creditIsError } = useQuery(
    ["credit", {id : id}],
    getPresonCredits
  )

  if (personIsLoading || creditIsLoading) {
    return <Spinner />;
  }

  if (personIsError) {
    return <h1>{personError.message}</h1>;
  }
  if (creditIsError) {
    return <h1>{creditError.message}</h1>;
  }

  const knownForMovies = creditData.cast.sort((a,b) => b.popularity - a.popularity).slice(0,20); //sort ant get top 20 popular movies for a person

  return(
    <>
      {personData ? (
        <>
          <PageTemplate person = {personData} knownFor= {knownForMovies}>
            <PersonDetails person={personData} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for person details</p>
      )}    
    </>
  )
}

export default PersonPage;