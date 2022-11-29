import "./SingleCard.css";

interface SingleCardProps {
  card: { src: string; id?: number };
  onClickHandler: (card: { src: string; id?: number }) => void;
}

const SingleCard: React.FC<SingleCardProps> = ({ card, onClickHandler }) => {
  const handleClick = () => {
    onClickHandler(card);
  };

  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          onClick={handleClick}
          src="/img/cover.png"
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
