import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { Button } from 'react-bootstrap';


export default function Home() {
  const [search, setSearch] = useState(''); 
  const [foodCat, setFoodCat] = useState([]); 
  const [foodItem, setFoodItem] = useState([]);
  
  // Function to load data
  const loadData = useCallback(async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
      });
      
      if (!response.ok) throw new Error("Network response was not ok");

      response = await response.json();
      setFoodItem(response[0]); // Set food items
      setFoodCat(response[1]); // Set food categories
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <Navbar /> 
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://cdn.pixabay.com/photo/2022/08/29/17/45/burger-7419428_640.jpg"
                className="d-block w-100 carousel-image"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://i.ytimg.com/vi/IILdbpg9Hoc/maxresdefault.jpg"
                className="d-block w-100 carousel-image"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://i.ytimg.com/vi/7miOlCzAHFk/maxresdefault.jpg"
                className="d-block w-100 carousel-image"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button> 
        </div>

        <main className="container">
          {foodCat.length > 0 ? (
            foodCat.map((category) => (
              <div key={category._id} className="row mb-3">
                <h3 className="fs-3 m-3">{category.CategoryName}</h3>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === category.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteredItem) => (
                      <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                        <Card 
                          foodName={filteredItem.name} 
                          options={filteredItem.options[0]}
                          imgSrc={filteredItem.img}
                        /> 
                      </div>
                    ))
                ) : (
                  <div>No Such Data Found</div>
                )}
              </div>
            ))
          ) : (
            <div>Loading Categories...</div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
