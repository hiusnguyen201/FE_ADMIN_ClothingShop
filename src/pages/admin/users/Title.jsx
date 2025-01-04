import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
const Title = ({title, titleBtn, linkRoute}) => {
    return (
        <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 className="text-lg" style={{ fontWeight: "bold" }}>
          {title}
        </h1>
        <Link to= {linkRoute}>
          <Button variant="outline" style={{ backgroundColor: "#ddb49f" }}>
            <Plus/> {titleBtn}
          </Button>
        </Link>
      </div>
    )
}
export default Title