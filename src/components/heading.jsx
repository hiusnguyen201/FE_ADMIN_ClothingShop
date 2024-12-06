import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Heading(){
    return(
        <>
        <div className="items-start justify-between sm:flex">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Employee (20)</h2>
            <p className="text-sm text-muted-foreground">
              Manage employees (Server side table functionalities.)
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              to="/manageroles/create"
              className="space-x-1 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
              <Plus size={16} />
              <span>Add New</span>
            </Link>
          </div>
        </div>
        </>
    )
}

