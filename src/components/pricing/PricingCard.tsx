import Link from "next/link";
import styles from "./pricing.module.scss";

export interface PricingCardProps {
  title: string;
  price: string;
  duration: string;
  description?: string;
  special?: boolean;
  free?: boolean;
  icon?: string;
  badge?: string;
}

export default function PricingCard({ title, price, duration, description, special, free, icon, badge }: PricingCardProps) {
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
