import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

const App: React.FC = () => {
  const [cards, setCards] =
    useState<{ src: string; id?: number; matched: boolean }[]>(cardImages);
  const [turns, setTurns] = useState<number>(0);

  const [choiceOne, setChoiceOne] = useState<{
    src: string;
    id?: number;
    matched: boolean;
  } | null>(null);

  const [choiceTwo, setChoiceTwo] = useState<{
    src: string;
    id?: number;
    matched: boolean;
  } | null>(null);

  //to enable two cards at a time
  const [disabled, setDisabled] = useState<boolean>(false);
  //shuffle the cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //for shuffling the position of the cards
      .map((card) => ({ ...card, id: Math.random() })); //for shuffling the cards

    //resetting the game upon start up
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  // console.log(cards);
  // console.log(turns);

  //handle a choice
  const handlerClick = (card: {
    src: string;
    id?: number;
    matched: boolean;
  }) => {
    // console.log(card.id);
    //if choiceOne is null, it means no selection for the first card
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    //not here because state will take  some time to load
  };

  //compare two selected cards(everytime the choice changes, useEffect will come into play)
  useEffect(() => {
    //reset choices & increase turns
    const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns((prevTurns) => prevTurns + 1);
      setDisabled(false);
    };

    //when both the choices are selected
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // console.log("matched");
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.id === choiceOne.id || card.id === choiceTwo.id) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // console.log("not matched");
        //resetting quick so setting up a time out
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  //start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card, index) => (
          <SingleCard
            key={index}
            card={card}
            onClickHandler={handlerClick}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
};

export default App;
