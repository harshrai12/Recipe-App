import React,{useEffect,useState} from 'react';
import Recipe from'./Recipe';

import './App.css';

function App() {
  const APP_ID="e40e1328";
  const APP_KEY="133670cf079bb4985a9f19c6ebdb8a3d";


const[recipes,setRecipes]=useState([]);
const[search,setSearch]=useState("");
const[query,setQuery]=useState('chicken'); 

 useEffect(()=>{const getRecipes= async ()=>{
  const response =await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data= await response.json();
  setRecipes(data.hits);
  console.log(data);
};
 getRecipes();}
 ,[query]); 

 
 
  const updateSearch= e=>{
    setSearch(e.target.value)
  }
  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }


  return (
    <div className="App">
    <div className="appname">
    RECIPIFY
    <p>Search any recipe ingredients</p>
    </div>
      <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
      <button className="search-button" type="submit">
      Search
      </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients} />
      ))}
    </div>
    </div>
  );
}

export default App;
