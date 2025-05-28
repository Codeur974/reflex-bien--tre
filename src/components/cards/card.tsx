import styles from "./card.module.scss";

interface CardProps {
  itemCard: {
    title: string;
    description: string;
  };
}

function Card({ itemCard }: CardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.card__titleCard}>{itemCard.title}</h3>
      <p className={styles.card__titleDescription}>{itemCard.description}</p>
    </div>
  );
}

export default Card;
