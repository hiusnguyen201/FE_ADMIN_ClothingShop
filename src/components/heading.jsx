export function Heading({ title, description, actionRight }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">{title}</h1>
        {actionRight}
      </div>
      <p className="mt-4 text-gray-600 text-sm">{description}</p>
    </div>
  );
}
