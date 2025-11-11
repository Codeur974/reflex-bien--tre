import React from "react";
import styles from "./hero.module.scss";
import Image from "next/image";

const heroImage = "/images/foot.jpg";
const heroBlur =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAADAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCfAA//2Q==";

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__img}>
        <Image
          src={heroImage}
          alt="Séance de réflexologie plantaire"
          fill
          priority
          placeholder="blur"
          blurDataURL={heroBlur}
          sizes="100vw"
          fetchPriority="high"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.hero__title}>
        <h2>
          Vous souhaitez améliorer votre bien-être,
          <br />
          entretenir votre santé, votre vitalité
          <br />
          ou tout simplement vous détendre
        </h2>
      </div>
    </div>
  );
}

export default Hero;

