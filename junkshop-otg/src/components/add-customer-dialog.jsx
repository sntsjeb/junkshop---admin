"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

export function AddCustomerDialog({ open, onOpenChange, onAdd }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    address: "",
    location: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    // Reset form after successful submission
    setFormData({
      fullName: "",
      email: "",
      contactNo: "",
      address: "",
      location: ""
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
    setFormData({
      fullName: "",
      email: "",
      contactNo: "",
      address: "",
      location: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Customer</DialogTitle>
          <DialogDescription>
            Add a new customer to the system
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer-fullName">Full Name</Label>
              <Input
                id="customer-fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter full name"
                required
                className="rounded-lg border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-email">Email</Label>
              <Input
                id="customer-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="customer@email.com"
                required
                className="rounded-lg border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-contactNo">Contact No.</Label>
              <Input
                id="customer-contactNo"
                value={formData.contactNo}
                onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                placeholder="+63 XXX XXX XXXX"
                required
                className="rounded-lg border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-address">Address</Label>
              <Input
                id="customer-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street, City"
                required
                className="rounded-lg border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-location">Location</Label>
              <Input
                id="customer-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City/Municipality"
                required
                className="rounded-lg border-gray-300"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleCancel} className="rounded-lg">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#7CB342] hover:bg-[#689F38] text-white rounded-lg">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}