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
        {" "}
        <Image
          src="/images/reflexo.png"
          alt="Logo"
          width={250}
          height={300}
          className={Styles.reflexo__imgFloat}
        />
        <h2 className={Styles.reflexo__textContainer}>
          Qu&apos;est-ce que la réflexologie plantaire ?
        </h2>
        <p className={Styles.reflexo__text}>
          La réflexologie plantaire est une technique naturelle visant à
          harmoniser l’ensemble du corps.
          <br /> Le principe est que chaque zone du pied, correspond à un
          organe, une glande ou une partie spécifique du corps. Les stimulations
          de ces zones réflexes aident le corps à se réguler aussi bien sur le
          plan physique, qu’émotionnel Elle permet de conserver une bonne
          circulation de l’énergie vitale, le QI. L’énergie circule dans notre
          corps en permanence. Le principe est de facilité la circulation et
          distribution de l’énergie au sein des différents systèmes du corps La
          réflexologie plantaire va aider l’énergie (le QI) à circuler de
          manière fluide entre les différents L’aider à s’adapter aux
          changements de saison passer les changements deaussi bien physique,
          psychique que émotionnelle
        </p>
      </div>
    </div>
  );
}
