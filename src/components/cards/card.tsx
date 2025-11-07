import styles from "./card.module.scss";

interface CardProps {
  itemCard: {
    title: string;
    description: string;
  };
  index?: number;
}

function Card({ itemCard, index }: CardProps) {
  const cardClass = index !== undefined
    ? `${styles.card} ${styles[`card--${index}`] || ''}`
    : styles.card;

  return (
    <div className={cardClass}>
      <h3 className={styles.card__titleCard}>{itemCard.title}</h3>
      <p className={styles.card__titleDescription}>{itemCard.description}</p>
    </div>
  );
}

export default Card;
