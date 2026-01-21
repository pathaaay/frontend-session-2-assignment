interface StatCardProps {
  label: string;
  value: number | string;
}
export const StatsCard = ({ label, value }: StatCardProps) => {
  return (
    <div className="flex flex-col gap-2 bg-gray-200 rounded-md h-max p-2 px-4 grow">
      <div className="text-lg font-semibold text-gray-700">{label}</div>
      <div className="text-xl font-bold ">{value}</div>
    </div>
  );
};
