import React, { Component } from "react";
// import FriendCard from "./components/FriendCard";
import ClickCard from "./components/ClickCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
// import friends from "./friends.json";
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

  // removeFriend = id => {
  //   // Filter this.state.friends for friends with an id not equal to the id being removed
  //   const friends = this.state.friends.filter(friend => friend.id !== id);
  //   // Set this.state.friends equal to the new friends array
  //   this.setState({ friends });
  //   console.log({friends});
  // };

    // GOOGLEFU TO THE RESCUE https://www.jstips.co/en/javascript/shuffle-an-array/
    shuffleArray = cardArray => {
      for (let i = cardArray.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
      }
    }

  selectCard = name => {
    const findCard = this.state.unselectedCards.find(item => item.name === name);

    if(findCard === undefined) {
        // failure to select a new card
        this.setState({ 
            message: "You guessed incorrectly!",
            topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
            curScore: 0,
            cards: cards,
            unselectedCards: cards
        });
    }
    else {
        // success to select a new card
        const newCards = this.state.unselectedCards.filter(item => item.name !== name);
        
        this.setState({ 
            message: "You guessed correctly!",
            curScore: this.state.curScore + 1,
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
        {this.state.cards.map(card => (
          <ClickCard
            id={card.id}
            key={card.id}
            name={card.name}
            image={card.image}
            selectCard={this.selectCard}
            curScore={this.state.curScore}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
