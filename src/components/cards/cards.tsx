import React from "react";
import Card from "./card";
import api from "../../doc.json";
import styles from "./card.module.scss";

const entreprise = api.find((item) => item.id === 4);

function Cards() {
  if (!entreprise || !entreprise.sections)
    return <div>Aucune donnée entreprise</div>;
  return (
    <div className={styles.cardsContainer}>
      {entreprise.sections.map((section, idx) => (
        <div key={idx} className={styles.card__section}>
          <h2 className={styles.card__title}>{section.title}</h2>
          {section.items.map((item, itemIdx) => (
            <Card key={itemIdx} itemCard={item} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Cards;
