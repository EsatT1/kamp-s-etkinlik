import { useState, type ChangeEvent, type FormEvent } from "react";
import type { EventFormData } from "../../types/campus-event";
import { validateEvent, type EventFormErrors } from "../../utils/validate-event";

interface EventFormProps {
  initialData?: EventFormData;
  submitText?: string;
  onSubmit: (data: EventFormData) => void;
}

const defaultEmptyForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  location: "",
  capacity: "",
  description: "",
  imageUrl: "",
};

export default function EventForm({
  initialData,
  submitText = "Kaydet",
  onSubmit,
}: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData || defaultEmptyForm);
  const [errors, setErrors] = useState<EventFormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);

    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  };

  return (
    <form className="event-form" noValidate onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Etkinlik Adı</label>
        <input
          id="title"
          name="title"
          type="text"
          value={data.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
        />
        {errors.title && <span className="hata-metni">{errors.title}</span>}
      </div>

      <div>
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz...</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Spor">Spor</option>
          <option value="Konser">Konser</option>
          <option value="Kulüp">Kulüp</option>
        </select>
        {errors.category && <span className="hata-metni">{errors.category}</span>}
      </div>

      <div>
        <label htmlFor="date">Tarih</label>
        <input
          id="date"
          name="date"
          type="date"
          value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        {errors.date && <span className="hata-metni">{errors.date}</span>}
      </div>

      <div>
        <label htmlFor="location">Yer</label>
        <input
          id="location"
          name="location"
          type="text"
          value={data.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
        />
        {errors.location && <span className="hata-metni">{errors.location}</span>}
      </div>

      <div>
        <label htmlFor="capacity">Kontenjan</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
        />
        {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
      </div>

      <div>
        <label htmlFor="imageUrl">Görsel URL</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          value={data.imageUrl}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        />
        {errors.description && <span className="hata-metni">{errors.description}</span>}
      </div>

      <button type="submit" className="btn-ana">
        {submitText}
      </button>
    </form>
  );
}