interface HeaderProps {
  title?: string;
  text?: string;
}

export default function Header({
  title = "Kampüs Etkinlikleri",
  text = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
}: HeaderProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}