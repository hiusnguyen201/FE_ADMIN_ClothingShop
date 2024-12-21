import React from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteRoleById } from "@/lib/slices/role.slice";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";


export default function DeleteRoleDialog({ role, onClose }) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();


  const handleDelete = async () => {
    try {
        await dispatch(deleteRoleById(role._id)); 
        onClose(); 
        toast({
            title: "Success!",
            description: "Role created successfully.",
          });
    } catch (error) {
        toast({
            title: "Error!",
            description: "Created role unsuccessfully",
            variant: "destructive",
          });
      
    }
  }



  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Role</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the role "{role.name}"?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 text-white border border-red-500 hover:bg-white hover:text-red-500 transition-colors"
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
