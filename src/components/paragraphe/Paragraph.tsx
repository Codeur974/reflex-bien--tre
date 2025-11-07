import Image from "next/image";
import api from "../../doc.json";
import styles from "./paragraph.module.scss";

function Paragraph() {
  const section = api.find((item) => item.id === 5);

  if (!section) return <div>Aucune donnée</div>;

  const left = section.paragraphs || [];
  const right = section.paragraphs2 || [];

  const firstImage = left.find(para => para.coverImage)?.coverImage;

  return (
    <div className={styles.paragraphContainer}>
      <h2 className={styles.paragraph__title}>{section.title}</h2>
      <div className={styles.paragraph__row}>
        {/* Un seul grand bloc */}
        <div className={styles.paragraph__block}>
          <div className={styles.paragraph__textWrapper}>
            {firstImage && (
              <Image
                width={150}
                height={150}
                src={firstImage}
                alt="Illustration"
                className={styles.paragraph__image}
              />
            )}
            {left.map((para, idx) => (
              <span key={idx} className={styles.paragraph__text}>
                {para.text}{' '}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paragraph;
