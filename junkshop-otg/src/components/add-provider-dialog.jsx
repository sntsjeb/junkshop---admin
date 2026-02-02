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

export function AddProviderDialog({ open, onOpenChange, onAdd }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    address: "",
    junkshopName: "",
    location: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    // Reset state after submission
    setFormData({
      fullName: "",
      email: "",
      contactNo: "",
      address: "",
      junkshopName: "",
      location: ""
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset state on cancel
    setFormData({
      fullName: "",
      email: "",
      contactNo: "",
      address: "",
      junkshopName: "",
      location: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Provider</DialogTitle>
          <DialogDescription>
            Add a new junkshop provider to the system
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter full name"
                required
                className="rounded-lg border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="provider@email.com"
                required
                className="rounded-lg border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNo">Contact No.</Label>
              <Input
                id="contactNo"
                value={formData.contactNo}
                onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                placeholder="+63 XXX XXX XXXX"
                required
                className="rounded-lg border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street, City"
                required
                className="rounded-lg border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="junkshopName">Junkshop Name</Label>
              <Input
                id="junkshopName"
                value={formData.junkshopName}
                onChange={(e) => setFormData({ ...formData, junkshopName: e.target.value })}
                placeholder="Name of Junkshop"
                required
                className="rounded-lg border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Junkshop Location</Label>
              <Input
                id="location"
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