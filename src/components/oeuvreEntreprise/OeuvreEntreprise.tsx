import api from "../../doc.json";
import styles from "./oeuvreEntreprise.module.scss";

function OeuvreEntreprise() {
  const section = api.find((item) => item.id === 6);

  if (!section) return <div>Aucune donnée</div>;
  if (!section.list) return <div>Aucune liste à afficher</div>;

  return (
    <div className={styles.oeuvreEntreprise}>
      <h2 className={styles.oeuvreEntreprise__title}>{section.title}</h2>
      <ul className={styles.oeuvreEntreprise__list}>
        {section.list.map((item, idx) =>
          typeof item === "string" ? (
            <li key={idx}>{item}</li>
          ) : (
            <li key={idx} className={styles.oeuvreEntreprise__item}>
              {item.text}
              <ul>
                {item.sublist.map((sub, subIdx) => (
                  <li key={subIdx} className={styles.oeuvreEntreprise__subitem}>
                    {sub}
                  </li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default OeuvreEntreprise;
