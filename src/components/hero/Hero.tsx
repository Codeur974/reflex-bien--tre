import React from "react";
import styles from "./hero.module.scss";
import Image from "next/image";

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__img}>
        <Image
          src="/images/foot.jpg"
          alt="Logo"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.hero__title}>
        <h2>
          Vous souhaitez améliorer votre bien-être,
          <br />
          entretenir votre santé,votre vitalité
          <br />
          ou tout simplement vous détendre
        </h2>
      </div>
    </div>
  );
}

export default Hero;
