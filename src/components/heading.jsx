import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Heading({
  title,
  total,
  description,
  titleBtnAdd,
  link,
}) {
  return (
    <>
      <div className="sm:flex items-start justify-between ">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {title} ({total})
          </h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex justify-end">
          <Link
            to={link}
            className="space-x-1 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            <Plus size={16} />
            <span>{titleBtnAdd}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
