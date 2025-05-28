import React from "react";
import styles from "./activity.module.scss";
import Slider from "../slider/Slider";
import doc from "@/doc.json"; // Assurez-vous que le chemin est correct
import LastNews from "../lastnews/LastNews";
import Notice from "../notice/Notice";

function Activity() {
  return (
    <div className={styles.container}>
      <div className={styles.activity}>
        <div className={styles.activity__actu}>
          <LastNews news={doc[0]} />
        </div>
        <div className={styles.activity__works}>
          <Slider items={doc} />
        </div>
      </div>

      <Notice />
    </div>
  );
}

export default Activity;
