interface PageHeadingProps {
  title: string;
  description: string;
}

export default function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
