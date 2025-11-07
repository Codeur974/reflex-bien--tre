import Link from "next/link";
import styles from "./pricing.module.scss";

interface PricingCardProps {
  title: string;
  price: string;
  duration: string;
  description?: string;
  special?: boolean;
  free?: boolean;
  icon?: string;
  badge?: string;
}

function PricingCard({ title, price, duration, description, special, free, icon, badge }: PricingCardProps) {
  const cardClass = `${styles.pricing__card} ${special ? styles.pricing__special : ""} ${free ? styles.pricing__free : ""}`;

  return (
    <Link href="/public/contact" className={cardClass}>
      {badge && <span className={styles.pricing__badge}>{badge}</span>}
      {icon && <div className={styles.pricing__icon}>{icon}</div>}
      <h3 className={styles.pricing__cardTitle}>{title}</h3>
      <div className={styles.pricing__price}>{price}</div>
      <div className={styles.pricing__duration}>{duration}</div>
      {description && (
        <p className={styles.pricing__description}>{description}</p>
      )}
    </Link>
  );
}

export default function Pricing() {
  return (
    <div className={styles.pricing}>
      <h2 className={styles.pricing__title}>Choisissez la formule qui vous correspond</h2>

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

      <div className={styles.pricing__grid}>
        <PricingCard
          title="Séance Unique"
          price="60€"
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

        <PricingCard
          title="Tarif Solidaire"
          price="45€"
          duration="1 heure / séance"
          description="Pour les personnes en situation difficile"
          special={true}
          icon="🤝"
        />

        <PricingCard
          title="Adhérents VMTS"
          price="35€"
          duration="1 heure / séance"
          description="Pour les adhérents de l'association Vivre Mieux Tout Simplement"
          special={true}
          icon="👥"
        />

        <PricingCard
          title="Cancer du Sein"
          price="Gratuit"
          duration="1 heure / séance"
          description="Pour les personnes atteintes du cancer du sein"
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
