import React, { Component } from "react";

export default class FoodBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Data
      fruits: [
        {
          name: "blue-berries",
          calories: 61,
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPUi5edvRdvU09C7BVkQHzCKEj-wWixoy6pA&usqp=CAU",
        },
        {
          name: "orange",
          calories: 75,
          img: "https://www.kindpng.com/picc/m/155-1555808_oranges-png-image-orange-fruit-transparent-png.png",
        },
        {
          name: "chocolate",
          calories: 200,
          img: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Homemade-Chocolate-Bars-500x500.jpg",
        },
        {
          name: "apple",
          calories: 85,
          img: "https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00000000941310/56821c8303a9f57138f8003b1eb059e0_large.png&width=512&type=webp&quality=90",
        },
        {
          name: "banana",
          calories: 105,
          img: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1200-80.jpg",
        },
        {
          name: "cookies",
          calories: 107,
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrNXJxV6ow7xVCmq-UM_1p4rI9lKfkRyBnhMYskew8CrZ3lhSLammVTCHoJbGHn4TL81c&usqp=CAU",
        },
        {
          name: "grapes",
          calories: 114,
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUmoyzQBWgMdLcor8I9QilKuooWr9oPQcc7w&usqp=CAU",
        },
        {
          name: "watermelon",
          calories: 95,
          img: "https://solidstarts.com/wp-content/uploads/when-can-babies-eat-watermelon.jpg",
        },
        {
          name: "strawberries",
          calories: 45,
          img: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3RyYXdiZXJyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        },
        {
          name: "pizza",
          calories: 400,
          img: "https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg?w=2000",
        },
      ],
      searchTxt: "", // Data to be searched
      calories_count: 0, // Total calories
      myFruits: [],
    };
  }
  // method for searching the fruit
  searchFruit = (event) => {
    this.setState({
      searchTxt: event.target.value,
    });
  };
  // Capitalize the first letter of the fruit
  capatalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  // Add fruits to calories section
  addFruit = (event) => {
    let count = document.getElementById(event.target.value).value;
    let cal = this.state.fruits.filter((fruit) => {
      return fruit.name === event.target.value;
    });
    let fruitObj = {
      id: event.target.value,
      text: `${count} ${event.target.value} = ${cal[0].calories * count}`,
      btn_id: `${event.target.value}R`,
      calo: cal[0].calories * count,
    };
    this.setState({
      myFruits: this.state.myFruits.concat(fruitObj),
      calories_count: this.state.calories_count + cal[0].calories * count,
    });
    console.log(this.state.myFruits);
  };
  // Remove fruits from calories
  removeFruit = (event) => {
    document.getElementById(event.target.value).remove();
    let calorie = this.state.myFruits.filter((fruit) => {
      return `${fruit.id}R` === event.target.value;
    });
    this.setState({
      calories_count: this.state.calories_count - calorie[0].calo,
    });
  };

  render() {
    return (
      <div className="main-container">
        <div className="search-container">
          <h1>Search</h1>
          <input
            type="text"
            placeholder="Find a food"
            onChange={this.searchFruit}
            id="search"
          />
        </div>
        <div className="food-container">
          <div className="left">
            {this.state.fruits
              .filter((fruit) => {
                return fruit.name.includes(this.state.searchTxt);
              })
              .map((fruit) => {
                return (
                  <div key={fruit.name} className="fruit">
                    <img src={fruit.img} alt="" />
                    <div className="detail">
                      <h1>{this.capatalize(fruit.name)}</h1>
                      <h4>{fruit.calories}</h4>
                    </div>
                    <div className="count">
                      <input
                        type="number"
                        defaultValue="1"
                        id={fruit.name}
                        min="0"
                      /> &nbsp;
                      <button onClick={this.addFruit} value={fruit.name}>
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="right">
            <h1>Today's Food {this.state.calories_count} Calories</h1>
            {this.state.myFruits
              .filter((fruit) => {
                return fruit.text !== "";
              })
              .map((fruit) => {
                return (
                  <div key={fruit.id} className="item" id={fruit.btn_id}>
                    <span>{fruit.text}</span>
                    <button onClick={this.removeFruit} value={fruit.btn_id}>
                      X
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}