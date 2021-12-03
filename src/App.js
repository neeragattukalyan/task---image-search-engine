import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useIntersectionObserver from './hooks/useIntersectionObserver';

function App() {

  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const listRef = useRef();
  const [currentpage, setCurrentPage] = useState(1);

  const onScreen = useIntersectionObserver(listRef, { threshold: 0.5 });

  useEffect(() => {
    if (onScreen) {
      getPhotos(true);
    }
  }, [onScreen])

  async function getPhotos(isScrolled = false) {
    if (searchText) {
      try {
        const res = await axios.get(`https://api.unsplash.com/search/photos?client_id=EpCyMtmoGVvBBRQW7141DSqRqwySLocPcl2g4G9uvJM&query=${searchText}&page=${isScrolled ? currentpage : 1}`);
        setData(isScrolled ? [...data, ...res.data?.results] : res.data?.results);
        if (isScrolled) {
          setCurrentPage(currentpage + 1);
        } else {
          setCurrentPage(1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container mt-4" data-testid="search-container">
      <div className="d-flex justify-content-center mb-4">
        <input className="form-control" role="textbox" placeholder="Search Text..." value={searchText} onChange={(event) => setSearchText(event.target.value)} />
        <button className="btn btn-success ms-3" role="button" onClick={() => {
          setData([]);
          getPhotos();
        }}>Search</button>
      </div>
      <div className="row">
        {
          data.length > 0 && data.map(imgObject => (<div className="col-md-4 mb-4" key={imgObject.id} role="listitem"><img src={imgObject?.urls?.regular} width="100%" height="300px" /></div>))
        }
        <div ref={listRef}></div>
      </div>
    </div>
  );
}

export default App;
