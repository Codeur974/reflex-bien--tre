import Link from "next/link";
import styles from "./pricing.module.scss";
import PricingCard from "./PricingCard";

export default function Pricing() {
  return (
    <div className={styles.pricing}>
      <h2 className={styles.pricing__title}>
        Choisissez la formule qui vous correspond
      </h2>

      <div className={styles.pricing__info}>
        <div className={styles.pricing__infoItem}>
          <span className={styles.pricing__infoIcon}>⏱️</span>
          <p>Séances de 1h00 à 1h15</p>
        </div>
        <div className={styles.pricing__infoItem}>
          <span className={styles.pricing__infoIcon}>💵</span>
          <p>Paiement en espèces</p>
        </div>
        <div className={styles.pricing__infoItem}>
          <span className={styles.pricing__infoIcon}>📍</span>
          <p>À domicile ou en extérieur</p>
        </div>
      </div>

      <h3 className={styles.pricing__sectionTitle}>Tarifs</h3>
      <div className={styles.pricing__grid}>
        <PricingCard
          title="Séance Unique"
          price="65€"
          duration="1 heure / séance"
          description="Idéal pour découvrir la réflexologie"
          icon="💆"
        />

        <PricingCard
          title="Suivi Mensuel"
          price="50€"
          duration="1 heure / séance"
          description="Engagement régulier pour un bien-être durable"
          icon="🔄"
          badge="Recommandé"
        />
      </div>

      <h3 className={styles.pricing__sectionTitle}>Tarifs de Groupe</h3>
      <div className={styles.pricing__grid}>
        <PricingCard
          title="Séance de groupe - 2 personnes"
          price="120€"
          duration="1 heure / pers"
          description="Partagez un moment de détente à deux"
          special={true}
          icon="👥"
        />

        <PricingCard
          title="Séance de groupe - 3 personnes"
          price="165€"
          duration="1 heure / pers"
          description="Bien-être en petit groupe"
          special={true}
          icon="👥"
        />

        <PricingCard
          title="Séance de groupe - 4 personnes"
          price="200€"
          duration="1 heure / pers"
          description="Partagez une expérience collective"
          special={true}
          icon="👥"
        />
      </div>

      <h3 className={styles.pricing__sectionTitle}>Tarifs Sportifs</h3>
      <div className={styles.pricing__grid}>
        <PricingCard
          title="Pack COMPÉT"
          price="180€"
          duration="3 séances"
          description="Préparation et récupération pour sportifs"
          special={true}
          icon="🏆"
        />

        <PricingCard
          title="Préparation physique"
          price="125€"
          duration="Séances 1 et 2"
          description="Pour optimiser vos performances"
          special={true}
          icon="💪"
        />

        <PricingCard
          title="Séance de récupération"
          price="65€"
          duration="1 heure / séance"
          description="Récupération post-effort"
          special={true}
          icon="🧘"
        />
      </div>

      <h3 className={styles.pricing__sectionTitle}>Tarifs Solidaires</h3>
      <div className={styles.pricing__solidaryNote}>
        <p>
          💚 Parce que le bien-être doit être accessible à tous, je propose des
          tarifs adaptés pour certaines situations.
        </p>
      </div>
      <div className={styles.pricing__grid}>
        <PricingCard
          title="Tarif Solidaire"
          price="45€"
          duration="1 heure / séance"
          description="Pour les personnes atteintes de cancer"
          special={true}
          icon="🤝"
        />

        <PricingCard
          title="Adhérents Vivre Mieux Tout Simplement"
          price="35€"
          duration="1 heure / séance"
          description="Pour les adhérents de l'association"
          special={true}
          icon="👥"
        />

        <PricingCard
          title="Personne atteinte d'un cancer du sein"
          price=""
          duration="4 séances"
          description="prises en charge par RunOdyssea"
          free={true}
          icon="🎗️"
        />
      </div>

      <h3 className={styles.pricing__sectionTitle}>Offres de Parrainage</h3>
      <div className={styles.pricing__referralSection}>
        <div className={styles.pricing__referralCard}>
          <div className={styles.pricing__referralIcon}>🎁</div>
          <h4>Parrainez vos proches et profitez d&apos;avantages exclusifs !</h4>
          <ul className={styles.pricing__referralList}>
            <li>
              <strong>-50% sur votre prochaine séance</strong> pour le parrainage d&apos;un nouveau client
              <span className={styles.pricing__referralValidity}>(valable 3 mois)</span>
            </li>
            <li>
              <strong>Une séance gratuite</strong> pour le parrainage de 2 nouveaux clients
              <span className={styles.pricing__referralValidity}>(valable 3 mois)</span>
            </li>
          </ul>
        </div>
      </div>

      <h3 className={styles.pricing__sectionTitle}>Tarifs Entreprise</h3>
      <div className={styles.pricing__enterpriseCard}>
        <div className={styles.pricing__enterpriseIcon}>🏢</div>
        <h4>Bien-être en entreprise - QVCT</h4>
        <p className={styles.pricing__enterpriseText}>
          Vous souhaitez offrir à vos collaborateurs des moments de détente et
          améliorer la qualité de vie au travail ? Je vous propose des
          interventions sur mesure adaptées aux besoins de votre entreprise :
          séances de réflexologie plantaire, animations bien-être...
        </p>
        <div className={styles.pricing__enterprisePrice}>
          <strong>Tarif sur devis personnalisé</strong>
        </div>
        <p className={styles.pricing__enterpriseContact}>
          Contactez-moi pour échanger sur votre projet et recevoir une
          proposition adaptée à vos besoins.
        </p>
        <Link
          href="/public/contact"
          className={styles.pricing__enterpriseButton}
        >
          Demander un devis
        </Link>
      </div>

      <div className={styles.pricing__events}>
        <p>
          N&apos;hésitez pas à consulter la page des{" "}
          <Link href="/#evenements" className={styles.pricing__eventsLink}>
            futurs événements liés au bien-être
          </Link>
        </p>
      </div>

      <div className={styles.pricing__contact}>
        <p>Prêt à prendre soin de vous ?</p>
        <Link href="/public/contact" className={styles.pricing__contactLink}>
          Réserver une séance
        </Link>
      </div>
    </div>
  );
}
