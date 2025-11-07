import Image from "next/image";
import api from "../../doc.json";
import styles from "./oeuvreEntreprise.module.scss";

function OeuvreEntreprise() {
  const section = api.find((item) => item.id === 6);

  if (!section) return <div>Aucune donnée</div>;
  if (!section.list) return <div>Aucune liste à afficher</div>;

  // Filtrer pour enlever le dernier élément (cohérence cardiaque)
  const filteredList = section.list.slice(0, -1);

  return (
    <div className={styles.oeuvreEntreprise}>
      <h2 className={styles.oeuvreEntreprise__title}>{section.title}</h2>
      <div className={styles.oeuvreEntreprise__wrapper}>
        <div className={styles.oeuvreEntreprise__content}>
          <ul className={styles.oeuvreEntreprise__list}>
            {filteredList.map((item, idx) =>
              typeof item === "string" ? (
                <li key={idx}>{item}</li>
              ) : (
                <li key={idx} className={styles.oeuvreEntreprise__item}>
                  {item.text}
                </li>
              )
            )}
          </ul>
          <div className={styles.oeuvreEntreprise__imageContainer}>
            <Image
              src="/images/matériel_de_réflexologie.jpg"
              alt="Matériel de réflexologie plantaire"
              width={400}
              height={350}
              className={styles.oeuvreEntreprise__image}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OeuvreEntreprise;
