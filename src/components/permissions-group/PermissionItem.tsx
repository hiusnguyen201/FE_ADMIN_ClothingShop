import { Tag } from "@/components/Tag";
import { Switch } from "@/components/ui/switch";

type PermissionItemProps = {
  name: string;
  description: string;
  checked: boolean;
  onCheckedChange: () => void;
};

export function PermissionItem({ name, checked, description, onCheckedChange }: PermissionItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="space-y-0.5">
        <div>
          <Tag className="text-sm">{name}</Tag>
        </div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={() => onCheckedChange()} aria-label={`Toggle ${name}`} />
    </div>
  );
}
