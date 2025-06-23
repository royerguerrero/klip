export default function Footer() {
  return (
    <footer className="py-4">
      <div className="text-muted-foreground text-sm flex justify-between max-w-[1200px] m-auto px-4 py-3">
        <span>© Klip ⋅ {new Date().getFullYear()}</span>
        <span>Designed in LATAM by CodeNewt. Assembled in the web</span>
      </div>
    </footer>
  );
} 