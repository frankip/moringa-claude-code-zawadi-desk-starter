type PageHeaderProps = {
  title: string;
  subtitle: string;
  variant?: 'default' | 'compact';
};

export function PageHeader({ title, subtitle, variant = 'default' }: PageHeaderProps) {
  return (
    <header className="hero">
      <p className="eyebrow">Moringa Claude Code Workshop</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}
