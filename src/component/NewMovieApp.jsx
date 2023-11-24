// ! Movies app
import axios from 'axios';
import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { ImCancelCircle } from 'react-icons/im';
import apistyles from '../Movieapi.module.css';
import Loader from './Loader';
import altimg from "../assets/na.gif"

function NewMovieApp() {
  const [searchValue, setSearchValue] = useState('');
  const [storedata, setStoreData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  async function searchApi() {
    setLoading(true);

    try {
      const searchValuesApi = await axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=98a22302`);

      if (searchValue.trim() === '' || (searchValuesApi.data.Response === 'False')) {
        setNoResults(true);
        setStoreData([]);
      } else {
        setNoResults(false);
        setStoreData(searchValuesApi.data.Search || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setNoResults(true);
      setStoreData([]);
    } finally {
      setLoading(false);
    }
  }

  const inputSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const onSubmitInput = (e) => {
    e.preventDefault();
    onSearch();
  };

  const onSearch = () => {
    searchApi();
  };

  

  return (
    <section>
      <div className={apistyles.heading}>
        <h1>Movie Review App</h1>
        <div>
          <form onSubmit={onSubmitInput}>
            <input type="search" placeholder="Search Here...." value={searchValue} onChange={inputSearch} />
            <button type="submit" className={apistyles.btn} onClick={onSearch}>
              <IoSearchSharp size={30} />
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className={apistyles.beforemaping}>
          {noResults ? (
            <div className={apistyles.noResults}>
              <h1>
                NO MOVIES FOUND HERE..... <ImCancelCircle /> <br />
                Try Again
              </h1>
            </div>
          ) : (
            storedata.map(({ imdbID, Title, Poster, imdbRating, Year }) => (
              <div className={apistyles.maping} key={imdbID}>
                <img height={'200px'} width={'200px'} src={ Poster !== "N/A" ? Poster : altimg} alt="" />
                <div className={apistyles.titlevote}>
                  <h3>{Title}</h3>
                </div>
                <div className={apistyles.overview}>
                  <div>
                    <p>YEAR:</p>
                    {Year}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default NewMovieApp;


