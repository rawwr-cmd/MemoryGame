import "./SingleCard.css";

interface SingleCardProps {
  src: string;
}

const SingleCard: React.FC<SingleCardProps> = ({ src }) => {
  return (
    <div className="card">
      <div>
        <img className="front" src={src} alt="card front" />
        <img className="back" src="/img/cover.png" alt="card back" />
      </div>
    </div>
  );
};

export default SingleCard;
