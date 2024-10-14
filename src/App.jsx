import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;


function App() {
  const [catData, setCatData] = useState(null)
  const [catName, setCatName] = useState('');
  const [bannedAttributes, setBannedAttributes] = useState([])

  const fetchData = async () => {
    const response = await fetch(
      "https://api.thecatapi.com/v1/breeds?api_key=live_TRFd3KxZmQqeP3TbCwKN28s3k1qVlTGSQoyaUI98RtTxP5E8xZeRO0eeLbCRbXj9",
      {
        headers: {
          "x-api-key": "live_TRFd3KxZmQqeP3TbCwKN28s3k1qVlTGSQoyaUI98RtTxP5E8xZeRO0eeLbCRbXj9",
        },
      }
    );

    const data = await response.json();
    console.log(response);
    // Get a random cat
    let randomCat;
    
    // Continue fetching until a cat with non-banned attributes is found
    do {
      randomCat = data[Math.floor(Math.random() * data.length)];
    } while (
      bannedAttributes.includes(randomCat.origin) || 
      bannedAttributes.includes(randomCat.name) ||
      bannedAttributes.includes(randomCat.weight?.metric) ||
      bannedAttributes.includes(randomCat.life_span)
    );

    // Update state with random cat data if it passes the check
    setCatData(randomCat);
    setCatName(getRandomCatName());
    }


    useEffect(() => {
      fetchData();
    }, []);
  
    const catNames = [
      "Luna",
      "Oliver",
      "Bella",
      "Simba",
      "Milo",
      "Nala",
      "Leo",
      "Chloe",
      "Loki",
      "Tiger",
      "Daisy",
      "Cleo",
      "Jasper",
      "Sophie",
      "Felix",
      "Oscar",
      "Shadow",
      "Tigger",
      "Willow",
      "Sassy",
      "Misty",
      "Miles",
      "Pepper",
      "Ginger",
      "Mittens"
    ];

    const getRandomCatName = () => {
      const randomIndex = Math.floor(Math.random() * catNames.length);
      return catNames[randomIndex];
    };

    const handleBanAttribute = (attribute, unit = '') => {
      const attributeWithUnit = `${attribute}${unit}`;
      if (!bannedAttributes.includes(attributeWithUnit)) {
        setBannedAttributes([...bannedAttributes, attributeWithUnit]);
      }
    }
    

    const handleRemoveAttribute = (attribute) => {
      const updatedAttributes = bannedAttributes.filter((attr) => attr !== attribute);
      setBannedAttributes(updatedAttributes);
    };

  return (
    <div className="App"> 
    <div className="main-content"> 
      <h1>All about Cats</h1>
      <h3> Discover all types of cats! 😺</h3>
      <br/>

      <div className="discover-container">
 
        {catData ? (
          <>
            <h2>Name: {catName}</h2>
            <button className="attribute-btn" onClick={() => handleBanAttribute(catData.name)}> {catData.name || 'Unknown'}</button>
            <button className="attribute-btn" onClick={() => handleBanAttribute(catData.weight?.imperial, ' lbs')}>{catData.weight?.imperial} lbs</button>
            <button className="attribute-btn" onClick={() => handleBanAttribute(catData.origin)}>{catData.origin}</button>
            <button className="attribute-btn" onClick={() => handleBanAttribute(catData.life_span, ' years')}>{catData.life_span} years</button>
            <br></br>
            {catData.image && ( 
              <img
                src={catData.image.url}
                alt={catData.name}
                style={{ width: '300px', height: 'auto', marginTop: '10px', marginBottom: '20px'}} // Adjust style as needed
              />
            )}
          </>
          
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <br/><br/>
      <button id='discover-btn' onClick={fetchData}> 🔀 Discover </button>
      </div>

      <div className="banned-attributes-container">
            <h2>Ban List</h2>
            <p>Select an attribute in your listing to ban it</p>
            {bannedAttributes.map((attribute) => (
            <button 
              key={attribute} 
              className="banned-attribute-buttons" 
              onClick={() => handleRemoveAttribute(attribute)}
            >
              {attribute}
            </button>
          ))}
      
          
      </div>
    </div>
  )
}

export default App
