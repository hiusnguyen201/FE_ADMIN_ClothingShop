// "use client";

// import { useState } from "react";
// import { Check, Copy, Mail, QrCode } from "lucide-react";

// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Order } from "@/types/order";

// interface OrderSuccessModalProps {
//   order: Order;
//   onClose: () => void;
// }

// export function OrderSuccessModal({ order, onClose }: OrderSuccessModalProps) {
//   const [copied, setCopied] = useState(false);

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(order.payment.paymentUrl);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-center text-xl">Order Created Successfully!</DialogTitle>
//           <DialogDescription className="text-center">
//             The order has been created and is waiting for payment.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="space-y-6 py-4">
//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <span className="text-gray-500">Order Code:</span>
//               <span className="font-medium">{order.payment.orderId}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-500">Status:</span>
//               <span className="font-medium text-amber-600">{orderDetails.status}</span>
//             </div>
//           </div>

//           <div className="border rounded-md p-4 space-y-4">
//             <h3 className="font-medium">MoMo Payment Link</h3>
//             <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
//               <span className="text-sm truncate mr-2">{orderDetails.paymentLink}</span>
//               <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 px-2">
//                 {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//               </Button>
//             </div>

//             <div className="flex justify-center">
//               <div className="border p-4 rounded-md bg-white">
//                 <QrCode className="h-32 w-32" />
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-2">
//             <Button className="flex-1" onClick={copyToClipboard}>
//               {copied ? "Copied!" : "Copy Link"}
//             </Button>
//             <Button variant="outline" className="flex-1">
//               <Mail className="mr-2 h-4 w-4" />
//               Send via Email
//             </Button>
//             <Button variant="outline" className="flex-1" onClick={onClose}>
//               Back to Orders
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
