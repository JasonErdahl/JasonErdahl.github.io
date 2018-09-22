import React, { Component } from "react";
import ClickCard from "./components/ClickCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import Footer from "./components/Footer";
import cards from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  // state = {
  //   friends
  // };
    state = {
      message: "Click an image to begin!",
      topScore: 0,
      curScore: 0,
      cards: cards,
      unselectedCards: cards
    }

    componentDidMount() {
    }

    // GOOGLEFU TO THE RESCUE https://www.jstips.co/en/javascript/shuffle-an-array/
    shuffleArray = cardArray => {
      console.log(cardArray);
      for (let i = cardArray.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
      }
      console.log(cardArray);
    }

  selectCard = name => {
    const findCard = this.state.unselectedCards.find(item => item.name === name);
    const newCards = this.state.unselectedCards.filter(item => item.name !== name);

    if(findCard === undefined) {
      // FAILURE to select a new card
      this.setState({ 
          message: "You guessed incorrectly!",
          topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
          curScore: 0,
          cards: cards,
          unselectedCards: cards
      });
    } 
    else if (findCard && this.state.curScore < 11) {
      // SUCCESS to select a new card
      this.setState({ 
          message: "You guessed correctly!",
          curScore: this.state.curScore + 1,
          cards: cards,
          unselectedCards: newCards
      });
    } 
    else {
      this.setState({ 
          message: "- You Win!! -",
          topScore: 12,
          curScore: 0,
          cards: cards,
          unselectedCards: newCards
      });
      
    }

    this.shuffleArray(cards);
  };

  // Map over this.state.friends and render a ClickCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Navbar
            message={this.state.message}
            curScore={this.state.curScore}
            topScore={this.state.topScore}
        />
        <Title />
        <main className="container">
          {this.state.cards.map(card => (
            <ClickCard
              message={this.state.message}
              id={card.id}
              key={card.id}
              name={card.name}
              image={card.image}
              selectCard={this.selectCard}
              curScore={this.state.curScore}
            />
          ))}
        </main>
        <Footer />
      </Wrapper>
    );
  }
}

export default App;
