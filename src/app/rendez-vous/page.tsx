import type { Metadata } from "next";
import Styles from "./rendezVous.module.scss";
import BookingCalendar from "@/components/booking/BookingCalendar";

export const metadata: Metadata = {
  title: "Prise de rendez-vous | Reflex'Bien-être",
  description:
    "Réservez votre séance de réflexologie avec Patricia Sermande : choisissez un jour et un créneau disponible.",
  openGraph: {
    title: "Prise de rendez-vous | Reflex'Bien-être",
    description:
      "Réservez votre séance de réflexologie avec Patricia Sermande : choisissez un jour et un créneau disponible.",
    type: "website",
  },
};

export default function RendezVousPage() {
  return (
    <div className={Styles.rendezVous}>
      <h1 className={Styles.rendezVous__title}>Prendre rendez-vous</h1>
      <p className={Styles.rendezVous__intro}>
        Choisissez un jour puis un créneau parmi ceux proposés. Votre demande
        sera envoyée à Patricia, qui vous recontactera pour la confirmer.
      </p>
      <div className={Styles.rendezVous__content}>
        <BookingCalendar />
      </div>
    </div>
  );
}
