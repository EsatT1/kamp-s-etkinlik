import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";
import type { EventFormData } from "../types/campus-event";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  location: "",
  capacity: "",
  description: "",
  imageUrl: "",
};

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <div className="add-event-page">
      <h2 className="bolum-baslik">Yeni Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </div>
  );
}