import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const navItems: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" }
];

export default function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav>
      {navItems.map((item) => (
        <a
          key={item.name}
          href={`#${item.name}`}
          aria-current={current === item.name ? "page" : undefined}
          className={current === item.name ? "aktif" : ""}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.name);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}