import Banner from "@/components/banner/Banner";
import styles from "./entreprise.module.scss";

import Cards from "@/components/cards/cards";
import Paragraph from "@/components/paragraphe/Paragraph";
import OeuvreEntreprise from "@/components/oeuvreEntreprise/OeuvreEntreprise";

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
      <OeuvreEntreprise />
    </div>
  );
}
