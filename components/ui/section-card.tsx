type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function SectionCard({
  title,
  children,
}: SectionCardProps) {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
      <div className="card-body p-0">
        <h3 className="card-title h5 fw-semibold mb-4 text-dark">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}