export function DashboardHeader({ title, subtitle }: {title: string, subtitle: string }) {

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </header>
  );
}