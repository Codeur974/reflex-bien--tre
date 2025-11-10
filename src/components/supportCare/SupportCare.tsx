import Image from "next/image";
import styles from "./supportCare.module.scss";

function SupportCare() {
  return (
    <div className={styles.supportCare}>
      <h2 id="soin-support" className={styles.supportCare__title}>
        Réflexologie plantaire comme soin de support
      </h2>

      <div className={styles.supportCare__intro}>
        <Image
          src="/images/Image1.png"
          alt="Réflexologie et cancer"
          width={250}
          height={250}
          className={styles.supportCare__image}
        />
        <div className={styles.supportCare__textContent}>
          <p>
            La réflexologie plantaire peut accompagner les personnes traversant
            une maladie ou un traitement médical ... en particulier lors des
            parcours de soins liés au cancer. Elle ne remplace en aucun cas les
            traitements médicaux, mais intervient en{" "}
            <strong>complément</strong>, afin de mieux vivre la maladie, les
            traitements et leurs effets secondaires.
          </p>

          <h3 className={styles.supportCare__subtitle}>
            Un accompagnement doux et personnalisé
          </h3>

          <p>
            Les traitements comme la chimiothérapie, la radiothérapie ou
            l&apos;hormonothérapie sont éprouvants physiquement et
            psychologiquement.
          </p>
          <p>
            La réflexologie propose un <strong>espace de relâchement</strong>,
            permettant au corps de mobiliser ses ressources naturelles et de
            retrouver un meilleur équilibre global.
          </p>
          <p>
            Chaque séance est adaptée à la <strong>vitalité du jour</strong>, au
            rythme des soins et aux sensations corporelles de la personne.
          </p>
        </div>
      </div>

      <h3 className={styles.supportCare__subtitle}>
        Les principaux bénéfices
      </h3>
      <ul className={styles.supportCare__list}>
        <li>Détente et réduction du stress</li>
        <li>Diminution de certains effets secondaires des traitements</li>
        <li>Amélioration de la qualité de vie physique et émotionnelle</li>
        <li>
          Contribution à l&apos;équilibre global (sommeil, digestion,
          circulation lymphatique/sanguine, système nerveux)
        </li>
      </ul>

      <p className={styles.supportCare__text}>
        La réflexologie plantaire permet d&apos;accéder à un mieux-être en
        passant justement par le corps. Elle aide à retrouver un{" "}
        <strong>ancrage</strong> lorsque le corps et l&apos;esprit sont
        éprouvés. Elle offre un temps de pause, un moment pour se déposer,
        respirer et être accueilli avec bienveillance.
      </p>

      <h3 className={styles.supportCare__subtitle}>Une séance en douceur</h3>

      <p className={styles.supportCare__text}>
        La séance se déroule en position confortable, toujours dans le respect
        du rythme et des besoins du moment. Les pressions sont adaptées pour ne
        jamais stimuler au-delà des capacités du corps.
      </p>

      <div className={styles.supportCare__seanceWrapper}>
        <div className={styles.supportCare__seanceTextBlock}>
          <p className={styles.supportCare__text}>
            Un échange en début de séance permet de faire le point sur :
          </p>
          <ul className={styles.supportCare__list}>
            <li>l&apos;état général du jour,</li>
            <li>la fatigue,</li>
            <li>les sensations physiques,</li>
            <li>l&apos;émotionnel,</li>
            <li>les traitements en cours.</li>
          </ul>
        </div>

        <Image
          src="/images/réflexologie_dans le_jardin.jpg"
          alt="Séance de réflexologie dans le jardin"
          width={300}
          height={300}
          className={styles.supportCare__seanceImage}
        />
      </div>

      <p className={styles.supportCare__textCentered}>
        <strong>
          Chaque séance est unique, pensée comme un soutien, un cocon et une
          respiration dans le parcours de soin.
        </strong>
      </p>

      <h3 className={styles.supportCare__subtitle}>
        Un accompagnement humain avant tout
      </h3>
      <p className={styles.supportCare__text}>
        Au-delà de la technique, la séance est un moment d&apos;écoute, de
        présence et de douceur. Elle vise à{" "}
        <strong>redonner place au bien-être</strong> dans une période souvent
        envahie par la lutte, les protocoles et la précipitation.
      </p>

      <p className={styles.supportCare__text}>
        La réflexologie devient alors :
      </p>
      <ul className={styles.supportCare__list}>
        <li>un appui,</li>
        <li>un soutien,</li>
        <li>une ressource intérieure.</li>
      </ul>

      <p className={styles.supportCare__cta}>
        Pour prendre rendez-vous et bénéficier d&apos;un accompagnement
        personnalisé,{" "}
        <a href="/public/contact" className={styles.supportCare__link}>
          contactez-moi
        </a>
        .
      </p>
    </div>
  );
}

export default SupportCare;
