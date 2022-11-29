import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

const App: React.FC = () => {
  const [cards, setCards] =
    useState<{ src: string; id?: number }[]>(cardImages);
  const [turns, setTurns] = useState<number>(0);

  const [choiceOne, setChoiceOne] = useState<{
    src: string;
    id?: number;
  } | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<{
    src: string;
    id?: number;
  } | null>(null);

  //shuffle the cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //for shuffling the position of the cards
      .map((card) => ({ ...card, id: Math.random() })); //for shuffling the cards

    setCards(shuffleCards);
    setTurns(0);
  };

  console.log(cards);
  console.log(turns);

  //handle a choice
  const handlerClick = (card: { src: string; id?: number }) => {
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
    };

    //when both the choices are selected
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("matched");
        resetTurn();
      } else {
        console.log("not matched");
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card, index) => (
          <SingleCard key={index} card={card} onClickHandler={handlerClick} />
        ))}
      </div>
    </div>
  );
};

export default App;
