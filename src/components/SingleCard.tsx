import "./SingleCard.css";

interface SingleCardProps {
  card: { src: string; id?: number; matched: boolean };
  onClickHandler: (card: {
    src: string;
    id?: number;
    matched: boolean;
  }) => void;

  flipped: boolean;
  disabled: boolean;
}

const SingleCard: React.FC<SingleCardProps> = ({
  card,
  onClickHandler,
  flipped,
  disabled,
}) => {
  const handleClick = () => {
    // console.log(disabled);
    if (!disabled) {
      onClickHandler(card);
    }
  };

  //   console.log(flipped);
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
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
