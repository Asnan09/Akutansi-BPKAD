type HistoryPageTitleProps = {
  title: string;
  subtitle: string;
};

export default function HistoryPageTitle({
  title,
  subtitle,
}: HistoryPageTitleProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
