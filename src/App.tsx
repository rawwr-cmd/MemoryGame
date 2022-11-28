import "./App.css";
import { useState } from "react";
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

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id} src={card.src} />
        ))}
      </div>
    </div>
  );
};

export default App;
