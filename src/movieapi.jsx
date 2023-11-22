
// import axios from 'axios';
// import React, { useState } from 'react';
// import apistyles from './Movieapi.module.css';

// function Movieapi() {
//   const [searchValue, setSearchValue] = useState('');
//   const [storedata, setStoreData] = useState([]);

 

//   async function searchApi() {
//     if (searchValue.trim() === '') {
//       // apiDatas();
//     } else {
//       const searchValuesApi = await axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=98a22302`);
//       setStoreData(searchValuesApi.data.Search || []); // Check if data.Search is an array, otherwise set it as an empty array
//       console.log(searchValuesApi.data.Search );
//     }
//   }

//   const inputSearch = ({ target: { value } }) => {
//     setSearchValue(value);
//   };

//   const onSubmitInput = (e) => {
//     e.preventDefault();
//     onSearch();
//   };

//   const onSearch = () => {
//     searchApi();
//   }

//   return (
//     <section>
//       <div className={apistyles.heading}>
//         <h1>Movie Review App</h1>
//         <div>
//           <form onSubmit={onSubmitInput}>
//             <input type="search" placeholder='Search Here....' value={searchValue} onChange={inputSearch} />
//             <button type="submit" className={apistyles.btn} onClick={onSearch}>
//        search
//             </button>
//           </form>
//         </div>
//       </div>
//       <div className={apistyles.beforemaping}>
//         {storedata.map(({ imdbID,  Title, Poster, imdbRating, Year}) => {
//           return (
//             <div className={apistyles.maping} key={imdbID}>
//               <img height={"200px"} width={"200px"} src={Poster} alt="" />
//               <div className={apistyles.titlevote}>
//                 <h4>{Title}</h4>
                
//               </div>
//               <div className={apistyles.overview}>
//                 <div><p>Overview:</p>{Year}</div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
     
//     </section>
//   );
// }

// export default Movieapi;


import axios from 'axios';
import React, { useState } from 'react';
import apistyles from './Movieapi.module.css';
import Loader from './Loader';

function Movieapi() {
  const [searchValue, setSearchValue] = useState('');
  const [storedata, setStoreData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function searchApi() {
    setLoading(true); // Set loading to true when starting the API call

    try {
      if (searchValue.trim() === '') {
        // apiDatas();
      } else {
        const searchValuesApi = await axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=98a22302`);
        setStoreData(searchValuesApi.data.Search || []); // Check if data.Search is an array, otherwise set it as an empty array
        console.log(searchValuesApi.data.Search);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when the API call is complete, regardless of success or failure
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
  }

  return (
    <section>
      <div className={apistyles.heading}>
        <h1>Movie Review App</h1>
        <div>
          <form onSubmit={onSubmitInput}>
            <input type="search" placeholder='Search Here....' value={searchValue} onChange={inputSearch} />
            <button type="submit" className={apistyles.btn} onClick={onSearch}>
              Search
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <div>
        <Loader/>
        </div>
      ) : (
        <div className={apistyles.beforemaping}>
          {storedata.map(({ imdbID, Title, Poster, imdbRating, Year }) => {
            return (
              <div className={apistyles.maping} key={imdbID}>
                <img height={"200px"} width={"200px"} src={Poster} alt="" />
                <div className={apistyles.titlevote}>
                  <h4>{Title}</h4>
                </div>
                <div className={apistyles.overview}>
                  <div><p>Overview:</p>{Year}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Movieapi;

