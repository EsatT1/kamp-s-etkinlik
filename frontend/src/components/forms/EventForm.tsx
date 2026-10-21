interface EventFormProps {
  onSubmit: () => void;
  isUpdate?: boolean;
}

export default function EventForm({ onSubmit, isUpdate = false }: EventFormProps) {
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <label htmlFor="title">Etkinlik Adı</label>
        <input id="title" name="title" maxLength={80} required />
      </div>

      <div>
        <label htmlFor="category">Kategori</label>
        <select id="category" name="category" required>
          <option value="">Seçiniz</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>
      </div>

      <div>
        <label htmlFor="date">Tarih</label>
        <input id="date" type="date" name="date" required />
      </div>

      <div>
        <label htmlFor="time">Saat</label>
        <input id="time" type="time" name="time" required />
      </div>

      <div>
        <label htmlFor="location">Yer</label>
        <input id="location" name="location" required />
      </div>

      <div>
        <label htmlFor="description">Açıklama</label>
        <textarea id="description" name="description" rows={5} />
      </div>

      <div>
        <label htmlFor="capacity">Kontenjan</label>
        <input id="capacity" type="number" name="capacity" min={1} max={1000} required />
      </div>

      <button type="submit" className="btn-ana">
        {isUpdate ? "Güncelle" : "Kaydet"}
      </button>
    </form>
  );
}