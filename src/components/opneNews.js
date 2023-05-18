import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Navigation from '../Navigation';
import useAuth from '../useAuth'

function OpenNews() {
  useAuth();
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('all');
  const [language, setLanguage] = useState('all');
  const [country, setCountry] = useState('us');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    getNews();
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    getNews();
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    getNews();
  };

  useEffect(() => {
    getNews();
  }, []);

  function getNews() {
    const apiKey = process.env.REACT_APP_OPEN_NEWS_KEYS;
    const url = `https://newsapi.org/v2/top-headlines?`;

    const searchParams = new URLSearchParams();
    searchParams.append("apiKey", apiKey);

    if(category !='all'){
      searchParams.append("category", category);
    }
    if(language !='all'){
      searchParams.append("language", language);
    }

    if(country !='all'){
      searchParams.append("country", country);
    }
    
    searchParams.toString();

    axios.get(url+ searchParams.toString())
      .then(response => {

        if(response.data.totalResults === 0){
          alert("No News Found.");
          setArticles([]);
          return false;
        }
        setArticles(response.data.articles);
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
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Language">
          <Form.Label className="text-center">Language</Form.Label>
          <Form.Select value={language} onChange={handleLanguageChange}>
          <option value="all">All</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="ar">Arabic</option>
          <option value="de">German</option>
          <option value="es">Spanish/Castilian</option>
          <option value="he">Hebrew</option>
          <option value="it">Italian</option>
          <option value="nl">Dutch/Flemish</option>
          <option value="no">Norwegian</option>
          <option value="pt">Portuguese</option>
          <option value="sv">Swedish</option>
          <option value="ud">Urdu</option>
          <option value="zh">Chinese</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Country">
          <Form.Label className="text-center">Country</Form.Label>
          <Form.Select value={country} onChange={handleCountryChange}>
          <option value="ae">United Arab Emirates (the)</option>
          <option value="ar">Argentina</option>
          <option value="at">Austria</option>
          <option value="au">Australia</option>
          <option value="be">Belgium</option>
          <option value="bg">Bulgaria</option>
          <option value="br">Brazil</option>
          <option value="ca">Canada</option>
          <option value="ch">Switzerland</option>
          <option value="cn">China</option>
          <option value="co">Colombia</option>
          <option value="cu">Cuba</option>
          <option value="cz">Czechia</option>
          <option value="de">Germany</option>
          <option value="rg">rg</option>
          <option value="fr">France</option>
          <option value="gb">United Kingdom of Great Britain and Northern Ireland (the)</option>
          <option value="gr">Greece</option>
          <option value="hk">Hong Kong</option>
          <option value="hu">Hungary</option>
          <option value="id">Indonesia</option>
          <option value="ie">Ireland</option>
          <option value="il">Israel</option>
          <option value="in">India</option>
          <option value="it">Italy</option>
          <option value="jp">Japan</option>
          <option value="kr">Korea (the Republic of)</option>
          <option value="lt">Lithuania</option>
          <option value="lu">Luxembourg</option>
          <option value="ma">Morocco</option>
          <option value="mx">Mexico</option>
          <option value="my">Malaysia</option>
          <option value="ng">Nigeria</option>
          <option value="nl">Netherlands (the)</option>
          <option value="no">Norway</option>
          <option value="nz">New Zealand</option>
          <option value="ph">Philippines (the)</option>
          <option value="pl">Poland</option>
          <option value="pt">Portugal</option>
          <option value="ro">Romania</option>
          <option value="rs">Serbia</option>
          <option value="ru">Russian Federation (the)</option>
          <option value="sa">Saudi Arabia</option>
          <option value="se">Sweden</option>
          <option value="sg">Singapore</option>
          <option value="si">Slovenia</option>
          <option value="sk">Slovakia</option>
          <option value="th">Thailand</option>
          <option value="tr">Tokelau</option>
          <option value="tw">Taiwan (Province of China)</option>
          <option value="ua">Ukraine</option>
          <option value="us">United States of America (the)</option>
          <option value="ve">Venezuela (Bolivarian Republic of)</option>
          <option value="za">South Africa</option>
        </Form.Select>
        </Form.Group>
        </Form>
      </div>
        {articles.map(article => (
          <div key={article.url}>
            <div class="row">
              <div class="col">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <a href={article.url}>Read more</a>
              </div>
            </div>
            <hr/>
            </div>
            
        ))}
          
        </div>
    </div>
  );
}

export {OpenNews};