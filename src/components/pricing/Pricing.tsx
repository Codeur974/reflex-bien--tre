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
          <p>Séances de 1 heure</p>
        </div>
        <div className={styles.pricing__infoItem}>
          <span className={styles.pricing__infoIcon}>💵</span>
          <p>Paiement en espèces</p>
        </div>
        <div className={styles.pricing__infoItem}>
          <span className={styles.pricing__infoIcon}>📍</span>
          <p>À domicile ou local de l'association</p>
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

      <h3 className={styles.pricing__sectionTitle}>Tarifs Solidaires</h3>
      <div className={styles.pricing__solidaryNote}>
        <p>
          💚 Parce que le bien-être doit être accessible à tous, nous proposons
          des tarifs adaptés pour certaines situations.
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
          title="Cancer du Sein"
          price="Gratuit"
          duration="4 séances"
          description="
           prises en charge par RunOdyssea"
          free={true}
          icon="🎗️"
        />
      </div>

      <div className={styles.pricing__events}>
        <p>
          N'hésitez pas à consulter la page des{" "}
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
