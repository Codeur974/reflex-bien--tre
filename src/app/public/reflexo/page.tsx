import Styles from "./reflexo.module.scss";
import Image from "next/image";
import SupportCare from "@/components/supportCare/SupportCare";
export default function ReflexoPage() {
  return (
    <div className={Styles.reflexo}>
      <p className={Styles.reflexo__info}>
        <span className={Styles.reflexo__important}>Important !</span> La
        pratique de la réflexologie ne peut en aucun cas être assimilée à des
        soins médicaux ou de kinésithérapie.
        <br />
        Il s&apos;agit d&apos;une technique de{" "}
        <strong>bien-être</strong> par la <strong>relaxation physique</strong>{" "}
        et la détente, favorisant la{" "}
        <strong>libération du stress</strong>.
      </p>
      <div className={Styles.reflexo__content}>
        <h2 id="definition" className={Styles.reflexo__textContainer}>
          Qu&apos;est-ce que la réflexologie plantaire ?
        </h2>
        <p className={Styles.reflexo__text}>
          <Image
            src="/images/reflexo.png"
            alt="Cartographie réflexologie plantaire"
            width={250}
            height={300}
            className={Styles.reflexo__imgFloat}
          />
          La réflexologie plantaire est une méthode naturelle qui vise à
          rétablir l&apos;équilibre global du corps.
        </p>
        <p className={Styles.reflexo__text}>
          Le principe est que chaque zone du pied correspond à un organe, une
          glande ou une partie spécifique du corps.
        </p>
        <p className={Styles.reflexo__text}>
          Les stimulations de ces zones dites « réflexes », aident le corps à
          se réguler aussi bien sur le plan physique, qu&apos;émotionnel.
        </p>

        <h3 id="energetique" className={Styles.reflexo__sportifSubtitleH3}>
          L&apos;énergétique Chinoise
        </h3>
        <div className={Styles.reflexo__energetiqueSection}>
          <div className={Styles.reflexo__energetiqueText}>
            <p className={Styles.reflexo__text}>
              Selon l&apos;énergétique chinoise, la réflexologie favorise une bonne
              circulation et répartition de l&apos;énergie vitale, le <strong>QI</strong>,
              au sein des différents systèmes du corps.
            </p>
            <p className={Styles.reflexo__text}>
              <strong>
                Lorsque l&apos;énergie circule librement, le corps peut mieux
                s&apos;adapter aux aléas du quotidien, aux changements de saison,
                aux bouleversements divers imposés par la vie.
              </strong>
            </p>
            <p className={Styles.reflexo__text}>
              L&apos;énergie circule dans notre corps en permanence. Le principe
              est de faciliter la circulation et distribution de l&apos;énergie au
              sein des différents systèmes du corps.
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 900 750"
            className={Styles.reflexo__energetiqueSvg}
            preserveAspectRatio="xMidYMid meet"
          >
            <style>{`
              .circle-label { font-family: Arial, sans-serif; font-weight: bold; font-size: 20px; text-anchor: middle; }
              .circle-season { font-family: Arial, sans-serif; font-size: 16px; text-anchor: middle; }
              .text-block { font-family: Arial, sans-serif; font-size: 18px; }
              .title { font-family: Arial, sans-serif; font-size: 18px; text-anchor: middle; }
            `}</style>

            <polygon
              points="400,180 561.7,297.5 499.9,487.5 300.1,487.5 238.3,297.5"
              fill="none"
              stroke="#004b8d"
              strokeWidth="4"
            />

            <polyline
              points="400,180 499.9,487.5 238.3,297.5 561.7,297.5 300.1,487.5 400,180"
              fill="none"
              stroke="#ff7f9d"
              strokeWidth="2"
              strokeDasharray="6,6"
            />

            <circle cx="400" cy="110" r="45" fill="#ff8080" />
            <text x="400" y="103" className="circle-label" fill="#ffffff">
              FEU
            </text>
            <text x="400" y="125" className="circle-season" fill="#ffffff">
              &Eacute;t&eacute;
            </text>
            <text x="400" y="175" className="title">
              C&oelig;ur / Intestin Gr&ecirc;le &middot; Syst&egrave;me nerveux central et cardio-vasculaire
            </text>

            <circle cx="180" cy="300" r="45" fill="#c7e8a2" />
            <text x="180" y="293" className="circle-label">
              BOIS
            </text>
            <text x="180" y="317" className="circle-season">
              Printemps
            </text>
            <text x="20" y="360" className="text-block">
              Syst&egrave;me articulo-musculaire
            </text>
            <text x="20" y="387" className="text-block">
              Foie / V&eacute;sicule biliaire
            </text>

            <circle cx="620" cy="300" r="45" fill="#ffe58a" />
            <text x="620" y="293" className="circle-label">
              TERRE
            </text>
            <text x="620" y="317" className="circle-season">
              Fin de l&apos;&eacute;t&eacute;
            </text>
            <text x="620" y="339" className="circle-season">
              Intersaisons
            </text>
            <text x="580" y="370" className="text-block">
              Syst&egrave;me digestif
            </text>
            <text x="580" y="397" className="text-block">
              Rate, Pancr&eacute;as / Estomac
            </text>

            <circle cx="260" cy="540" r="45" fill="#c7ddff" />
            <text x="260" y="533" className="circle-label">
              EAU
            </text>
            <text x="260" y="557" className="circle-season">
              Hiver
            </text>
            <text x="260" y="595" className="text-block" textAnchor="middle">
              Syst&egrave;me uro-g&eacute;nital
            </text>
            <text x="260" y="622" className="text-block" textAnchor="middle">
              Rein / Vessie
            </text>

            <circle cx="540" cy="540" r="45" fill="#d9d9d9" />
            <text x="540" y="533" className="circle-label">
              METAL
            </text>
            <text x="540" y="557" className="circle-season">
              Automne
            </text>
            <text x="540" y="595" className="text-block" textAnchor="middle">
              Syst&egrave;me respiratoire
            </text>
            <text x="540" y="622" className="text-block" textAnchor="middle">
              Poumon / Gros intestin
            </text>
          </svg>
        </div>

        <h3 id="deroulement" className={Styles.reflexo__sportifSubtitleH3}>
          Déroulement d&apos;une séance
        </h3>
        <p className={Styles.reflexo__text}>
          Chaque séance commence par un temps d&apos;échange :
        </p>
        <p className={Styles.reflexo__text}>
          Je vous pose quelques questions pour faire le point sur votre état
          général, vos besoins et les raisons de votre venue.
        </p>
        <p className={Styles.reflexo__text}>
          Je réalise ensuite votre <strong>bilan énergétique global et fonctionnel</strong>.
          Il est basé sur la <strong>loi universelle de l&apos;équilibre du Yin
          et du Yang et des 5 éléments</strong>.
        </p>
        <p className={Styles.reflexo__text}>
          Le bilan permet donc de repérer la fonction à réguler pour la
          travailler de façon ciblée.
        </p>
        <p className={Styles.reflexo__text}>
          Vous viendrez ensuite vous installer confortablement dans un transat
          et profiter de votre séance de réflexologie plantaire.
        </p>
        <p className={Styles.reflexo__text}>
          À la fin de la séance, nous prenons un moment pour échanger sur vos
          ressentis, les éventuelles zones sensibles ou à texture modifiée.
        </p>

        <h3 id="bienfaits" className={Styles.reflexo__sportifSubtitleH3}>Les bienfaits</h3>
        <p className={Styles.reflexo__text}>
          La réflexologie plantaire a pour objectif{" "}
          <strong>d&apos;accompagner le corps vers un meilleur équilibre</strong>.
          Elle s&apos;inscrit dans une démarche <strong>préventive</strong>. Je
          la vis personnellement comme faisant partie d&apos;une{" "}
          <strong>hygiène de vie</strong> ou une{" "}
          <strong>routine de santé et de bien-être</strong>.
        </p>
        <p className={Styles.reflexo__text}>
          Une séance vous apportera une{" "}
          <strong>
            <span className={Styles.reflexo__textHighlight}>détente profonde</span>
          </strong>
          .
        </p>
        <p className={Styles.reflexo__text}>
          Des séances régulières aideront à :
        </p>
        <ul className={Styles.reflexo__list}>
          <li>
            réduire le <strong>stress</strong> et l&apos;<strong>anxiété</strong> ;
            <br />
            (Combinée avec de la cohérence cardiaque, elle peut devenir un
            allié en cas de stress chronique)
          </li>
          <li>
            améliorer la <strong>qualité du sommeil</strong> ;
          </li>
          <li>
            soulager les <strong>douleurs chroniques</strong> ;
          </li>
          <li>
            renforcer le <strong>système immunitaire</strong> ;
          </li>
          <li>
            stimuler la <strong>circulation sanguine et lymphatique</strong>.
          </li>
        </ul>

        <div className={Styles.reflexo__tenueInfo}>
          <p>
            <strong>Tenue conseillée</strong> : une tenue confortable, qui permet
            de dégager les jambes jusqu&apos;aux genoux
          </p>
        </div>

        <div className={Styles.reflexo__sportifHeader}>
          <Image
            src="/images/sportifs/Image1-velo.jpg"
            alt="Cycliste"
            width={200}
            height={200}
            className={Styles.reflexo__sportifImage}
          />
          <div className={Styles.reflexo__sportifTitle}>
            <h2 id="sportif">Réflexologie du sportif</h2>
            <p className={Styles.reflexo__sportifSubtitle}>
              <strong>Sportifs amateurs et de haut niveau,</strong>
            </p>
            <p className={Styles.reflexo__sportifSubtitle}>
              <strong>La réflexologie sportive peut devenir un soutien précieux dans votre pratique.</strong>
            </p>
          </div>
          <Image
            src="/images/sportifs/Image-sport2.jpg"
            alt="Sport"
            width={200}
            height={200}
            className={Styles.reflexo__sportifImage}
          />
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
        <div className={Styles.reflexo__sportifContent}>
          <ul className={Styles.reflexo__list}>
            <li>Amélioration de la récupération (diminution des tensions et courbatures)</li>
            <li>Optimisation du souffle et de la gestion du stress</li>
            <li>Soutien à la concentration et à la préparation mentale</li>
            <li>Préservation de la souplesse et de la mobilité</li>
            <li>Accompagnement dans la prévention du surmenage et des blessures</li>
          </ul>
          <Image
            src="/images/sportifs/Image4-danse.jpg"
            alt="Danse"
            width={220}
            height={220}
            className={Styles.reflexo__sportifImgSmall}
          />
        </div>

        <h3 className={Styles.reflexo__sportifSubtitleH3}>La réflexologie dans la préparation sportive</h3>

        <p className={Styles.reflexo__text}>
          Chaque zone du pied correspond à une partie du corps.
          <br />
          En travaillant sur les zones réflexes, la réflexologie favorise :
        </p>

        <div className={Styles.reflexo__sportifContent}>
          <ul className={Styles.reflexo__list}>
            <li>un meilleur équilibre nerveux,</li>
            <li>une respiration plus fluide,</li>
            <li>une meilleure circulation,</li>
            <li>une récupération musculaire plus rapide.</li>
          </ul>
          <Image
            src="/images/sportifs/Image3-sport.jpg"
            alt="Sport"
            width={300}
            height={300}
            className={Styles.reflexo__sportifImgRight}
          />
        </div>

        <p className={Styles.reflexo__text}>
          Elle s&apos;intègre ainsi naturellement dans un programme d&apos;entraînement, que ce soit en période de
          progression, de compétition ou de récupération.
        </p>

        <h3 id="pack-compet" className={Styles.reflexo__sportifSubtitleH3}>Le Pack COMPÉT</h3>
        <p className={Styles.reflexo__textCentered}>
          <em>Idéal avant et après une compétition ou un événement sportif intense.</em>
        </p>

        <p className={Styles.reflexo__textNoMargin}>
          <strong>Objectifs :</strong>
        </p>
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

      <SupportCare />
    </div>
  );
}
