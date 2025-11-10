import Image from "next/image";
import Link from "next/link";
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
        <div className={styles.oeuvreEntreprise__background}>
          <Image
            src="/images/materiel_de_reflexologie.jpg"
            alt="Matériel de réflexologie plantaire"
            fill
            className={styles.oeuvreEntreprise__backgroundImage}
          />
        </div>
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
          <div className={styles.oeuvreEntreprise__contact}>
            <div className={styles.oeuvreEntreprise__contactWrapper}>
              <span className={styles.oeuvreEntreprise__arrowTop}>↓</span>
              <Link href="/public/contact" className={styles.oeuvreEntreprise__contactLink}>
                Prenez votre rendez-vous ici, je suis à votre écoute
              </Link>
              <span className={styles.oeuvreEntreprise__arrowBottom}>↑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OeuvreEntreprise;
