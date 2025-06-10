import Image from "next/image";
import api from "../../doc.json";
import styles from "./paragraph.module.scss";

function Paragraph() {
  const section = api.find((item) => item.id === 5);

  if (!section) return <div>Aucune donnée</div>;

  const left = section.paragraphs || [];
  const right = section.paragraphs2 || [];

  return (
    <div className={styles.paragraphContainer}>
      <h2 className={styles.paragraph__title}>{section.title}</h2>
      <div className={styles.paragraph__row}>
        {/* Colonne de gauche */}
        <div className={styles.paragraph__col}>
          {left.map((para, idx) => (
            <div key={idx} className={styles.paragraph__block}>
              {para.coverImage && (
                <Image
                  width={100}
                  height={100}
                  src={para.coverImage}
                  alt={`Illustration gauche ${idx + 1}`}
                  className={styles.paragraph__image}
                />
              )}
              <p className={styles.paragraph__text}>{para.text}</p>
            </div>
          ))}
        </div>
        {/* Colonne de droite */}
        <div className={styles.paragraph__col}>
          {right.map((para, idx) => (
            <div key={idx} className={styles.paragraph__block}>
              {para.coverImage2 && (
                <Image
                  width={100}
                  height={100}
                  src={para.coverImage2}
                  alt={`Illustration droite ${idx + 1}`}
                  className={styles.paragraph__image}
                />
              )}
              <p className={styles.paragraph__text}>{para.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Paragraph;
