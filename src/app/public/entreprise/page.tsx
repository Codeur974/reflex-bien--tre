import Banner from "@/components/banner/Banner";
import styles from "./entreprise.module.scss";
import Image from "next/image";
import Styles from "../reflexo/reflexo.module.scss";
import Cards from "@/components/cards/cards";
import Paragraph from "@/components/paragraphe/Paragraph";

export default function EntrprisePage() {
  return (
    <div className={styles.entreprise}>
      <Banner imgSrc="/images/entreprise.jpg" />
      <h2 className={styles.entreprise__subtitle}>
        Faire appel à un professionnel du bien-être pour promouvoir la Qualité
        de Vie et des conditions de Travail (QVCT) peut offrir de nombreux
        avantages aux entreprises et avoir un impact significatif sur les
        salariés.
      </h2>
      <Cards />
      <Paragraph />

      <div className={Styles.reflexo__content}>
        {" "}
        <Image
          src="/images/Image3.jpg"
          alt="Logo"
          width={250}
          height={300}
          className={Styles.reflexo__imgFloat}
        />
        <h2 className={Styles.reflexo__textContainer}>
          Qu&apos;est-ce que la réflexologie plantaire ?
        </h2>
        <p className={Styles.reflexo__text}>
          La cohérence cardiaque est un état d’équilibre psychologique et
          physique obtenue par un exercice de respiration. La pratique régulière
          de la cohérence cardiaque amène un équilibre du système nerveux
          automatique …. C’est un formidable outil de gestion du stress, à
          condition d’être pratiquée régulièrement. La découverte, la
          compréhension puis la mise en œuvre régulière de la cohérence
          cardiaque peut améliorer grandement la qualité de vie de vos employés.
        </p>
      </div>
      <h2 className={styles.entreprise__title}>Facilité de mise en œuvre</h2>
      <ul>
        <li>- Un petit espace calme suffit</li>
        <li>- Séances courtes de 15 à 30 minutes</li>
        <li>- Intervention occasionnelle ou régulière</li>
        <li>- Horaires flexibles</li>
        <li>Je viens avec tout mon matériel.</li>
        <li>
          Je vous propose, au décours de séance de 15-20 min de :
          <ul>
            <li>
              Visualiser les effets de la respiration sur l’organisme grâce à
              l’utilisation d’un capteur et d’un logiciel spécialisé.
            </li>
            <li>
              D’expliquer le principe de cohérence cardiaque et ses effets
              bénéfiques sur la santé
            </li>
            <li>De pratiquer une session de 5 min de cohérence cardiaque</li>
            <li>D’inciter à une pratique de cohérence cardiaque</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
