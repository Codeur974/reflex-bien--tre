import api from "../../doc.json";
import styles from "./paragraph.module.scss";

function Paragraph() {
  const section = api.find((item) => item.id === 5);

  if (!section || !section.paragraphs) return <div>Aucune donnée</div>;

  return (
    <div className={styles.paragraphContainer}>
      <h2 className={styles.paragraph__title}>{section.title}</h2>
      <div className={styles.paragraph__content}>
        {" "}
        {section.paragraphs.map((text, idx) => (
          <p key={idx} className={styles.paragraph__text}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Paragraph;
