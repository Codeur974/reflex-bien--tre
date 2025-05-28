import React from "react";
import styles from "./about.module.scss";
import Image from "next/image";

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <div className={styles.about__img}>
          <Image
            src="/images/pat.picture.jpg"
            alt="Logo"
            priority
            width={250}
            height={250}
            className={styles.about__imgElement}
          />
        </div>
        <div className={styles.about__content}>
          <div className={styles.about__text}>
            <h2 className={styles.about__title}>Qui suis-je?</h2>
            <p>
              Je suis praticienne en réflexologie plantaire et en cohérence
              cardiaque. J’ai toujours voulu aider les gens à se sentir/aller
              mieux. Après 20 années d&apos;expériences en tant qu’infirmière,
              j’ai souhaité continuer à prendre soins grâce à des méthodes
              naturelles qui favorisent le rétablissement de l&apos;organisme au
              mieux de ses possibilités physiques et émotionnelles.
            </p>
            <h2 className={styles.about__title}>
              Pourquoi la réflexologie plantaire?
            </h2>
            <p>
              J’ai découvert la réflexologie plantaire par hasard … Au départ
              une découverte de vacances et maintenant une pratique ancrée dans
              mon quotidien. Souvenir de Malacca en Malaisie. Nous sommes en
              2018. Il pleut. Pourquoi ne pas en profiter pour délasser nos
              petits pieds fatigués ? Et hop ! Un « foot massage » pour moi et
              ma fille dans un centre commercial (rien de glamour). La masseuse
              m’explique le principe. On retrouve tous les organes du corps sous
              les pieds. Si ça fait mal c’est qu’il y a un problème que l’on est
              en train de régler. Image : carte du pied ou photo de Malaisie
              Elle commence. Lorsqu’elle arrive au bout de mes orteils, je
              DOUILLE. J’ouvre les yeux et regarde à quoi ça correspond sur la
              carte. Ce sont les sinus. Il se trouve que j’ai fait plusieurs
              sinusites dans l’année et que j’avais une narine bouchée quasi
              enpermanence…Je trouve ça fou. Je serre les dents et je supporte.
              Je jette un coup d’œil à ma fille, de 5 ans à l’époque, pour voir
              si tout se passe bien pour elle. Et miracle … elle, qui était
              hyper agacée à ce moment-là, est à présent toute détendue. Son
              masseur me dit qu’on pourrait l’utiliser pour faire la publicité
              de leur salon. L’image de la félicité. Ça a été une révélation. De
              retour à la Réunion je me dis qu’il faut absolument que j’apprenne
              !
            </p>
            <h2 className={styles.about__title}>Formation</h2>
            <p>
              Novembre 2022 : Je trouve une école qui correspond à ce que je
              recherche : Yin Yang formation
              <br />
              Janvier 2024 : J’obtiens ma certification de réflexologue
              plantaire basée sur l&apos;énergétique chinoise avec Yin Yang
              Formation.
              <br /> Depuis, je continue à me former :<br /> - Réflexologie du
              sportif - novembre 2024 - Yin Yang Formation – Véronique TILIN
              pour optimiser la préparation et la récupération physiques mais
              aussi émotionnelles pour prévenir les blessures et soulager la
              douleur des traumatismes.
              <br /> - Cohérence Cardiaque – 2025 – Dr David O’HARE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
