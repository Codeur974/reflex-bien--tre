import styles from "./banner.module.scss";
import Image from "next/image";

interface BannerProps {
  imgSrc?: string;
  title?: string;
}

function Banner({ imgSrc, title }: BannerProps) {
  return (
    <div className={styles.banner}>
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={title || "Bannière"}
          fill
          style={{ objectFit: "cover" }}
          className={styles.banner__img}
        />
      )}
      {title && <div className={styles.banner__title}>{title}</div>}
    </div>
  );
}

export default Banner;
