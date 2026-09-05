import Styles from "./rendezVous.module.scss";
import BookingCalendar from "@/components/booking/BookingCalendar";

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
