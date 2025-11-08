import Styles from "./reflexo.module.scss";
import Image from "next/image";
export default function ReflexoPage() {
  return (
    <div className={Styles.reflexo}>
      <p className={Styles.reflexo__info}>
        <span className={Styles.reflexo__important}>Important!!</span>: En ne
        substitue en rien de la médecine. Aucun diagnostique n’est étalbli,il ne
        remplace pas les traitement médical.{" "}
      </p>
      <div className={Styles.reflexo__content}>
        <h2 className={Styles.reflexo__textContainer}>
          Qu&apos;est-ce que la réflexologie plantaire ?
        </h2>
        <p className={Styles.reflexo__text}>
          <Image
            src="/images/reflexo.png"
            alt="Logo"
            width={250}
            height={300}
            className={Styles.reflexo__imgFloat}
          />
          La réflexologie plantaire est une technique naturelle visant à
          harmoniser l'ensemble du corps.
          <br /> Le principe est que chaque zone du pied, correspond à un
          organe, une glande ou une partie spécifique du corps. Les stimulations
          de ces zones réflexes aident le corps à se réguler aussi bien sur le
          plan physique, qu'émotionnel Elle permet de conserver une bonne
          circulation de l'énergie vitale, le QI. L'énergie circule dans notre
          corps en permanence. Le principe est de facilité la circulation et
          distribution de l'énergie au sein des différents systèmes du corps La
          réflexologie plantaire va aider l'énergie (le QI) à circuler de
          manière fluide entre les différents L'aider à s'adapter aux
          changements de saison passer les changements deaussi bien physique,
          psychique que émotionnelle
        </p>

        <div className={Styles.reflexo__sportifHeader}>
          <div className={Styles.reflexo__sportifTitle}>
            <h2>Réflexologie du sportif</h2>
            <p className={Styles.reflexo__sportifSubtitle}>
              <strong>Sportifs amateurs et de haut niveau,</strong>
            </p>
            <p className={Styles.reflexo__sportifSubtitle}>
              <strong>La réflexologie sportive peut devenir un soutien précieux dans votre pratique.</strong>
            </p>
          </div>
        </div>

        <p className={Styles.reflexo__text}>
          Elle accompagne la préparation, optimise la récupération et contribue à limiter les risques de
          blessures grâce à l&apos;activation naturelle des mécanismes d&apos;équilibre du corps.
        </p>

        <h3 className={Styles.reflexo__sportifSubtitleH3}>Pourquoi intégrer la réflexologie dans votre pratique sportive ?</h3>

        <p className={Styles.reflexo__text}>
          L&apos;activité physique sollicite intensément l&apos;organisme : tensions musculaires, fatigue nerveuse, stress
          de performance...
          <br />
          La réflexologie plantaire, en stimulant des zones réflexes spécifiques du pied, favorise l&apos;homéostasie
          et aide le corps à mobiliser ses capacités naturelles de régénération.
        </p>

        <h3 className={Styles.reflexo__sportifSubtitleH3}>Ses bienfaits :</h3>
        <ul className={Styles.reflexo__list}>
          <li>Amélioration de la récupération (diminution des tensions et courbatures)</li>
          <li>Optimisation du souffle et de la gestion du stress</li>
          <li>Soutien à la concentration et à la préparation mentale</li>
          <li>Préservation de la souplesse et de la mobilité</li>
          <li>Accompagnement dans la prévention du surmenage et des blessures</li>
        </ul>

        <h3 className={Styles.reflexo__sportifSubtitleH3}>La réflexologie dans la préparation sportive</h3>

        <p className={Styles.reflexo__text}>
          Chaque zone du pied correspond à une partie du corps.
          <br />
          En travaillant sur les zones réflexes, la réflexologie favorise :
        </p>

        <ul className={Styles.reflexo__list}>
          <li>un meilleur équilibre nerveux,</li>
          <li>une respiration plus fluide,</li>
          <li>une meilleure circulation,</li>
          <li>une récupération musculaire plus rapide.</li>
        </ul>

        <p className={Styles.reflexo__text}>
          Elle s&apos;intègre ainsi naturellement dans un programme d&apos;entraînement, que ce soit en période de
          progression, de compétition ou de récupération.
        </p>

        <h3 className={Styles.reflexo__sportifSubtitleH3}>Le Pack COMPÉT</h3>
        <p className={Styles.reflexo__text}>
          <em>Idéal avant et après une compétition ou un événement sportif intense.</em>
        </p>

        <h3 className={Styles.reflexo__sportifSubtitleH3}>Objectifs :</h3>
        <ul className={Styles.reflexo__list}>
          <li>Préparer le corps et le mental</li>
          <li>Optimiser les capacités le jour J</li>
          <li>Favoriser une récupération rapide et complète</li>
        </ul>

        <div className={Styles.reflexo__timelineContainer}>
          <div className={Styles.reflexo__timeline}>
            <div className={Styles.reflexo__timelineBox}>Séance N°1</div>
            <div className={Styles.reflexo__timelineBox}>Séance N°2</div>
            <div className={Styles.reflexo__timelineEventLabel}>
              <div className={Styles.reflexo__redTriangle}></div>
              <div className={Styles.reflexo__timelineEventText}>
                Événement<br />sportif
              </div>
            </div>
            <div className={Styles.reflexo__timelineBox}>Séance N°3</div>
            <div className={Styles.reflexo__timelineArrowContainer}>
              <div className={Styles.reflexo__timelineArrowBox}></div>
              <div className={Styles.reflexo__timelineArrowPoint}></div>
            </div>
          </div>
        </div>

        <div className={Styles.reflexo__table}>
          <div className={Styles.reflexo__tableRow}>
            <div className={Styles.reflexo__tableHeader}>Séance</div>
            <div className={Styles.reflexo__tableHeader}>Moment</div>
            <div className={Styles.reflexo__tableHeader}>Objectif</div>
            <div className={Styles.reflexo__tableHeader}>Contenu</div>
          </div>

          <div className={Styles.reflexo__tableRow}>
            <div className={Styles.reflexo__tableCell} data-label="Séance">1. Rééquilibrage global</div>
            <div className={Styles.reflexo__tableCell} data-label="Moment">En amont de la compétition</div>
            <div className={Styles.reflexo__tableCell} data-label="Objectif">Activer l&apos;ensemble des systèmes du corps</div>
            <div className={Styles.reflexo__tableCell} data-label="Contenu">Bilan énergétique et fonctionnel + séance complète + zones spécifiques selon le bilan</div>
          </div>

          <div className={Styles.reflexo__tableRow}>
            <div className={Styles.reflexo__tableCell} data-label="Séance">2. Dynamisation & optimisation</div>
            <div className={Styles.reflexo__tableCell} data-label="Moment">1 jour ou 2 avant l&apos;événement préparé</div>
            <div className={Styles.reflexo__tableCell} data-label="Objectif">Améliorer sommeil, respiration, concentration</div>
            <div className={Styles.reflexo__tableCell} data-label="Contenu">Stimulation des systèmes nerveux, respiratoire et circulatoire</div>
          </div>

          <div className={Styles.reflexo__tableRow}>
            <div className={Styles.reflexo__tableCell} data-label="Séance">3. Récupération post-compétition</div>
            <div className={Styles.reflexo__tableCell} data-label="Moment">24h à 4 jours après l&apos;événement</div>
            <div className={Styles.reflexo__tableCell} data-label="Objectif">Rétablir l&apos;équilibre et favoriser la réparation</div>
            <div className={Styles.reflexo__tableCell} data-label="Contenu">Travail ciblé sur les tensions, régulation nerveuse, stimulation des fonctions d&apos;élimination</div>
          </div>
        </div>

        <p className={Styles.reflexo__text}>
          Ce pack s&apos;adresse aussi aux personnes pratiquant un sport de façon régulière et souhaitant soutenir
          leurs capacités physiques de manière naturelle.
        </p>

        <p className={Styles.reflexo__text}>
          Il est également possible d&apos;effectuer uniquement la préparation physique : séance 1 et 2 ou la séance
          de récupération seule
        </p>
      </div>
    </div>
  );
}
