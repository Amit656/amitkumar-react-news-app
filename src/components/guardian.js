import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Navigation from '../Navigation';
import useAuth from '../useAuth';

function Guardian() {
  useAuth();
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const [showPreviousButton, setPreviousButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevious = (event) => {
    setCurrentPage(currentPage - 1);
    getNews();
  };

  const handleNext = (event) => {
    setCurrentPage(currentPage + 1);
    getNews();
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    getNews();
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    getNews();
  };

  useEffect(() => {
    getNews();
  }, []);

  function getNews() {
    const apiKey = process.env.REACT_APP_API_GUARDIAN;
    const url = `https://content.guardianapis.com/search?`;

    const searchParams = new URLSearchParams();
    searchParams.append("api-key", apiKey);
    searchParams.append("page", currentPage);

    if(category !='all'){
      searchParams.append("tag", category);
    }
    if(search !=''){
      searchParams.append("q", search);
    }
    
    searchParams.toString();

    axios.get(url+ searchParams.toString())
      .then(response => {

        if(response.data.response.total === 0){
          alert("No News Found.");
          setArticles([]);
          return false;
        }
        setArticles(response.data.response.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navigation />
      <div class="container">
      <h1>Filters</h1>
      <hr/>
      <div className="mb-3">
      <Form>
        <Form.Group className="mb-3" controlId="Category">
          <Form.Label className="text-center" id="Category">Category</Form.Label>
          <Form.Select value={category} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="environment/recycling">Environment / Recycling</option>
          <option value="environment/plasticbags">Environment / Plasticbags</option>
          <option value="environment/energyefficiency">Environment / Energy Efficiency</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Language">
          <Form.Label className="text-center">Search</Form.Label>
          <Form.Control type="text" placeholder="Enter To Search" onChange={handleSearch} />         
        </Form.Group>
        </Form>
      </div>


      {articles.map((article, index) => (
        <div key={index}>
            <div class="row">
              <div class="col">
                <h2>{article.webTitle}</h2>
                <p>{article.webPublicationDate}</p>
                <p>{article.sectionName}</p>
                <a href={article.webUrl}>Read more</a>
              </div>
            </div>
            <hr/>
        </div>
      ))}
      
      <div class="row">
        <div class="col">
        {currentPage > 1 && <button className='btn btn-primary' onClick={handlePrevious}>Previous</button>}
          
        <button className='btn btn-warning' onClick={handleNext}>Next</button>
        </div>
      </div>
        </div>
    </div>
  );
}

export {Guardian};