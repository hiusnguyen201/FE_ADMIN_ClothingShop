import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { CategoryListTable } from "@/components/form/category/CategoryListTable";
import { categoryColumns } from "./category-columns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateCategoryDialogForm } from "@/components/form/category/CreateCategoryForm";

export function ListCategoryPage() {
  return (
    <ContentWrapper>
      <Heading
        title="Categories"
        description="View categories for your applications."
        actionRight={
          <CreateCategoryDialogForm>
            <Button>
              <Plus size={14} />
              Create Category
            </Button>
          </CreateCategoryDialogForm>
        }
      />

      <CategoryListTable columns={categoryColumns} />
    </ContentWrapper>
  );
}

// export function ListCategoryPage() {
//   // State to track expanded categories
//   const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({
//     1: true, // Default expanded state for each top-level category
//     5: true,
//     7: true,
//   });

//   // Function to toggle category expansion
//   const toggleCategory = (categoryId: number) => {
//     setExpandedCategories((prev) => ({
//       ...prev,
//       [categoryId]: !prev[categoryId],
//     }));
//   };

//   // Function to expand all categories
//   const expandAll = () => {
//     const expanded: Record<number, boolean> = {};

//     const setExpanded = (cats: Category[]) => {
//       cats.forEach((cat) => {
//         expanded[cat.id] = true;
//         if (cat.children?.length) {
//           setExpanded(cat.children);
//         }
//       });
//     };

//     setExpanded(categories);
//     setExpandedCategories(expanded);
//   };

//   // Function to collapse all categories
//   const collapseAll = () => {
//     setExpandedCategories({});
//   };

//   // Count total categories (including children)
//   const countTotalCategories = (cats: Category[]): number => {
//     return cats.reduce((count, category) => {
//       return count + 1 + (category.children ? countTotalCategories(category.children) : 0);
//     }, 0);
//   };

//   const totalCategories = countTotalCategories(categories);

//   return (
//     <div className="container mx-auto py-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
//         <Button>
//           <Plus className="h-4 w-4 mr-2" />
//           Add Category
//         </Button>
//       </div>

//       <div className="flex items-center gap-2">
//         <div className="relative flex-1 max-w-sm">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input placeholder="Search categories..." className="pl-8" />
//         </div>
//         <Button variant="outline">Filter</Button>
//       </div>

//       <div className="border rounded-md">
//         <div className="flex justify-end p-2 border-b">
//           <Button variant="ghost" size="sm" className="text-xs" onClick={collapseAll}>
//             <ChevronUp className="h-3 w-3 mr-1" />
//             Collapse All
//           </Button>
//           <Button variant="ghost" size="sm" className="text-xs" onClick={expandAll}>
//             <ChevronDown className="h-3 w-3 mr-1" />
//             Expand All
//           </Button>
//         </div>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[300px]">Name</TableHead>
//               <TableHead>Level</TableHead>
//               <TableHead>ID</TableHead>
//               <TableHead>Parent</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>{categories.map((category) => <CategoryRow category={category} depth={dep}/>)}</TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="text-sm text-muted-foreground">
//           Showing <strong>{totalCategories}</strong> categories
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" disabled>
//             Previous
//           </Button>
//           <Button variant="outline" size="sm">
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Function to render a category row with its children
//  function   CategoryRow ({category, depth }: {category: Category, depth: number})  {
//     const hasChildren = category.children && category.children.length > 0;
//     const isExpanded = expandedCategories[category.id] || false;

//     return (
//       <React.Fragment key={category.id}>
//         <TableRow className="group hover:bg-muted/50">
//           <TableCell className="font-medium">
//             <div className="flex items-center">
//               <div style={{ width: `${depth * 24}px` }} className="flex-shrink-0" />

//               {hasChildren ? (
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-6 w-6 p-0 mr-2"
//                   onClick={() => toggleCategory(category.id)}
//                 >
//                   {isExpanded ? (
//                     <ChevronDown className="h-4 w-4 text-muted-foreground" />
//                   ) : (
//                     <ChevronRight className="h-4 w-4 text-muted-foreground" />
//                   )}
//                 </Button>
//               ) : (
//                 <div className="w-6 mr-2" />
//               )}

//               {category.image ? (
//                 <img
//                   src={category.image || "/placeholder.svg?height=32&width=32"}
//                   alt={category.name}
//                   width={32}
//                   height={32}
//                   className="mr-2 rounded-md object-cover"
//                 />
//               ) : (
//                 <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center mr-2">
//                   <FolderTree className="h-4 w-4 text-muted-foreground" />
//                 </div>
//               )}

//               {category.name}
//             </div>
//           </TableCell>
//           <TableCell>
//             <Badge variant="outline">{`Level ${category.level}`}</Badge>
//           </TableCell>
//           <TableCell>{category.id}</TableCell>
//           <TableCell>{category.parent || "-"}</TableCell>
//           <TableCell>
//             <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//               <Button variant="outline" size="sm" className="h-8">
//                 Edit
//               </Button>
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </TableCell>
//         </TableRow>

//         {/* Render children if expanded */}
//         {isExpanded && hasChildren && category.children?.map((child) => renderCategoryRow(child, depth + 1))}
//       </React.Fragment>
//     );
//   };
