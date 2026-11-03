import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  };

  return (
    <div className="admin-page">
      <h2 className="bolum-baslik">Etkinlik Yönetimi</h2>
      <Link to="/admin/new" className="btn-ana" style={{ marginBottom: "20px", display: "inline-block" }}>
        + Yeni Etkinlik
      </Link>

      {events.length === 0 ? (
        <p className="empty-message">Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td data-baslik="Etkinlik">{e.title}</td>
                <td data-baslik="Tarih">{formatDate(e.date)}</td>
                <td data-baslik="Kategori">{e.category}</td>
                <td data-baslik="İşlemler" className="islemler">
                  <Link to={`/admin/${e.id}/edit`} className="btn-ana">
                    Düzenle
                  </Link>
                  <button
                    type="button"
                    className="buton-sil"
                    onClick={() => handleDelete(e.id, e.title)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}