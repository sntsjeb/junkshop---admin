"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Input } from "@/app/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Menu, X, Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { AddProviderDialog } from "@/app/components/add-provider-dialog";
import { AddCustomerDialog } from "@/app/components/add-customer-dialog";
import logoImage from "figma:asset/27921de5b421e209e1b81a21de81508c26adc895.png";

const mockProviders = [
  {
    id: 1,
    fullName: "Juan dela Cruz",
    address: "123 Main St, Quezon City",
    contactNo: "+63 912 345 6789",
    email: "juan@junkshop.ph",
    junkshopName: "Cruz Junkshop",
    location: "Quezon City",
    status: "Active"
  },
  {
    id: 2,
    fullName: "Maria Santos",
    address: "456 Rizal Ave, Manila",
    contactNo: "+63 923 456 7890",
    email: "maria@junkshop.ph",
    junkshopName: "Santos Recycling Center",
    location: "Manila",
    status: "Active"
  },
  {
    id: 3,
    fullName: "Pedro Reyes",
    address: "789 Luna St, Makati",
    contactNo: "+63 934 567 8901",
    email: "pedro@junkshop.ph",
    junkshopName: "Reyes Scrap Yard",
    location: "Makati",
    status: "Pending"
  },
  {
    id: 4,
    fullName: "Ana Garcia",
    address: "321 Bonifacio St, Pasig",
    contactNo: "+63 945 678 9012",
    email: "ana@junkshop.ph",
    junkshopName: "Garcia Eco Hub",
    location: "Pasig",
    status: "Active"
  },
  {
    id: 5,
    fullName: "Roberto Cruz",
    address: "654 Mabini Ave, Taguig",
    contactNo: "+63 956 789 0123",
    email: "roberto@junkshop.ph",
    junkshopName: "Green Valley Junkshop",
    location: "Taguig",
    status: "Disabled"
  }
];

const mockCustomers = [
  {
    id: 1,
    fullName: "Carlos Mendoza",
    address: "101 Sampaguita St, Quezon City",
    location: "Quezon City",
    contactNo: "+63 917 123 4567",
    email: "carlos@email.com",
    status: "Active"
  },
  {
    id: 2,
    fullName: "Linda Ramos",
    address: "202 Narra Ave, Manila",
    location: "Manila",
    contactNo: "+63 928 234 5678",
    email: "linda@email.com",
    status: "Active"
  },
  {
    id: 3,
    fullName: "Miguel Torres",
    address: "303 Acacia Rd, Makati",
    location: "Makati",
    contactNo: "+63 939 345 6789",
    email: "miguel@email.com",
    status: "Active"
  },
  {
    id: 4,
    fullName: "Sofia Lim",
    address: "404 Mahogany Blvd, Pasig",
    location: "Pasig",
    contactNo: "+63 940 456 7890",
    email: "sofia@email.com",
    status: "Pending"
  },
  {
    id: 5,
    fullName: "David Tan",
    address: "505 Pine St, Taguig",
    location: "Taguig",
    contactNo: "+63 951 567 8901",
    email: "david@email.com",
    status: "Active"
  },
  {
    id: 6,
    fullName: "Elena Villanueva",
    address: "606 Cedar Lane, Mandaluyong",
    location: "Mandaluyong",
    contactNo: "+63 962 678 9012",
    email: "elena@email.com",
    status: "Active"
  },
  {
    id: 7,
    fullName: "Rafael Aquino",
    address: "707 Oak Street, Pasay",
    location: "Pasay",
    contactNo: "+63 973 789 0123",
    email: "rafael@email.com",
    status: "Disabled"
  }
];

export function AdminDashboard() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addProviderOpen, setAddProviderOpen] = useState(false);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [providers, setProviders] = useState(mockProviders);
  const [customers, setCustomers] = useState(mockCustomers);

  const totalProviders = providers.length;
  const totalCustomers = customers.length;
  const newRegistrationsToday = 3;

  const getStatusBadge = (status) => {
    if (status === "Active") {
      return <Badge className="bg-[#7CB342] hover:bg-[#689F38] text-white">Active</Badge>;
    } else if (status === "Pending") {
      return <Badge className="bg-[#FF9800] hover:bg-[#F57C00] text-white">Pending</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-gray-400 hover:bg-gray-500 text-white">Disabled</Badge>;
    }
  };

  const filteredProviders = providers.filter(p => 
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCustomers = customers.filter(c => 
    c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProvider = (provider) => {
    const newProvider = {
      ...provider,
      id: providers.length + 1,
      status: "Pending"
    };
    setProviders([...providers, newProvider]);
    setAddProviderOpen(false);
  };

  const handleAddCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: customers.length + 1,
      status: "Pending"
    };
    setCustomers([...customers, newCustomer]);
    setAddCustomerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center py-2 px-1 transition-all duration-150 hover:scale-105 cursor-pointer group"
              aria-label="Go to Dashboard"
            >
              <img 
                src={logoImage} 
                alt="JunkShop On-The-Go" 
                className="h-8 w-auto object-contain transition-all duration-150 group-hover:drop-shadow-[0_0_8px_rgba(124,179,66,0.4)]"
              />
            </button>

            {/* Desktop Admin Info */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm text-gray-600">Admin</span>
              <Avatar className="size-9 bg-[#7CB342]">
                <AvatarFallback className="bg-[#7CB342] text-white">A</AvatarFallback>
              </Avatar>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 flex items-center gap-3">
              <Avatar className="size-9 bg-[#7CB342]">
                <AvatarFallback className="bg-[#7CB342] text-white">A</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">Admin</span>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="pt-6">
              <div>
                <p className="text-gray-600 text-sm">Total Providers</p>
                <p className="text-3xl font-semibold text-[#7CB342] mt-1">{totalProviders}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="pt-6">
              <div>
                <p className="text-gray-600 text-sm">Total Customers</p>
                <p className="text-3xl font-semibold text-[#7CB342] mt-1">{totalCustomers}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="pt-6">
              <div>
                <p className="text-gray-600 text-sm">New Registrations Today</p>
                <p className="text-3xl font-semibold text-[#FF6B35] mt-1">{newRegistrationsToday}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Accounts Management</h1>
              <p className="text-gray-600 mt-1">Manage providers and customers registered in the system</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={() => setAddProviderOpen(true)}
                className="bg-[#7CB342] hover:bg-[#689F38] text-white rounded-lg h-10"
              >
                <Plus className="size-4 mr-2" />
                Add Provider
              </Button>
              <Button 
                onClick={() => setAddCustomerOpen(true)}
                variant="outline"
                className="border-[#7CB342] text-[#7CB342] hover:bg-[#7CB342] hover:text-white rounded-lg h-10"
              >
                <Plus className="size-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Filter Tabs */}
              <Tabs value={filter} onValueChange={(value) => setFilter(value)} className="flex-1">
                <TabsList className="w-full sm:w-auto bg-gray-100 h-10">
                  <TabsTrigger 
                    value="all" 
                    className="flex-1 sm:flex-none data-[state=active]:bg-[#7CB342] data-[state=active]:text-white"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="providers" 
                    className="flex-1 sm:flex-none data-[state=active]:bg-[#7CB342] data-[state=active]:text-white"
                  >
                    Providers
                  </TabsTrigger>
                  <TabsTrigger 
                    value="customers" 
                    className="flex-1 sm:flex-none data-[state=active]:bg-[#7CB342] data-[state=active]:text-white"
                  >
                    Customers
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Search Bar */}
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-lg border-gray-300 h-10"
                />
              </div>
            </div>

            {/* Desktop Tables */}
            <div className="hidden md:block overflow-x-auto">
              {(filter === "all" || filter === "providers") && filteredProviders.length > 0 && (
                <div className="mb-8">
                  {filter === "all" && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Providers</h3>
                  )}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                          <TableHead className="font-semibold text-gray-700">Full Name</TableHead>
                          <TableHead className="font-semibold text-gray-700">Address</TableHead>
                          <TableHead className="font-semibold text-gray-700">Contact No.</TableHead>
                          <TableHead className="font-semibold text-gray-700">Email</TableHead>
                          <TableHead className="font-semibold text-gray-700">Junkshop Name</TableHead>
                          <TableHead className="font-semibold text-gray-700">Location</TableHead>
                          <TableHead className="font-semibold text-gray-700">Status</TableHead>
                          <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProviders.map((provider) => (
                          <TableRow key={provider.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{provider.fullName}</TableCell>
                            <TableCell>{provider.address}</TableCell>
                            <TableCell>{provider.contactNo}</TableCell>
                            <TableCell>{provider.email}</TableCell>
                            <TableCell>{provider.junkshopName}</TableCell>
                            <TableCell>{provider.location}</TableCell>
                            <TableCell>{getStatusBadge(provider.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="icon" variant="ghost" className="size-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                  <Eye className="size-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="size-8 text-gray-600 hover:text-gray-700 hover:bg-gray-100">
                                  <Edit className="size-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="size-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {(filter === "all" || filter === "customers") && filteredCustomers.length > 0 && (
                <div>
                  {filter === "all" && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Customers</h3>
                  )}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                          <TableHead className="font-semibold text-gray-700">Full Name</TableHead>
                          <TableHead className="font-semibold text-gray-700">Address</TableHead>
                          <TableHead className="font-semibold text-gray-700">Location</TableHead>
                          <TableHead className="font-semibold text-gray-700">Contact No.</TableHead>
                          <TableHead className="font-semibold text-gray-700">Email</TableHead>
                          <TableHead className="font-semibold text-gray-700">Status</TableHead>
                          <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomers.map((customer) => (
                          <TableRow key={customer.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{customer.fullName}</TableCell>
                            <TableCell>{customer.address}</TableCell>
                            <TableCell>{customer.location}</TableCell>
                            <TableCell>{customer.contactNo}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{getStatusBadge(customer.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="icon" variant="ghost" className="size-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                  <Eye className="size-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="size-8 text-gray-600 hover:text-gray-700 hover:bg-gray-100">
                                  <Edit className="size-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="size-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {(filter === "all" || filter === "providers") && filteredProviders.length > 0 && (
                <div className="space-y-3">
                  {filter === "all" && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Providers</h3>
                  )}
                  {filteredProviders.map((provider) => (
                    <Card key={provider.id} className="shadow-sm border border-gray-200">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{provider.fullName}</p>
                            <p className="text-sm text-gray-600 mt-1">{provider.junkshopName}</p>
                          </div>
                          {getStatusBadge(provider.status)}
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="text-gray-600"><span className="font-medium">Address:</span> {provider.address}</p>
                          <p className="text-gray-600"><span className="font-medium">Location:</span> {provider.location}</p>
                          <p className="text-gray-600"><span className="font-medium">Contact:</span> {provider.contactNo}</p>
                          <p className="text-gray-600"><span className="font-medium">Email:</span> {provider.email}</p>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-gray-200">
                          <Button size="sm" variant="outline" className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50">
                            <Eye className="size-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="size-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
                            <Trash2 className="size-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {(filter === "all" || filter === "customers") && filteredCustomers.length > 0 && (
                <div className="space-y-3">
                  {filter === "all" && (
                    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Customers</h3>
                  )}
                  {filteredCustomers.map((customer) => (
                    <Card key={customer.id} className="shadow-sm border border-gray-200">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <p className="font-semibold text-gray-900">{customer.fullName}</p>
                          {getStatusBadge(customer.status)}
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="text-gray-600"><span className="font-medium">Address:</span> {customer.address}</p>
                          <p className="text-gray-600"><span className="font-medium">Location:</span> {customer.location}</p>
                          <p className="text-gray-600"><span className="font-medium">Contact:</span> {customer.contactNo}</p>
                          <p className="text-gray-600"><span className="font-medium">Email:</span> {customer.email}</p>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-gray-200">
                          <Button size="sm" variant="outline" className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50">
                            <Eye className="size-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="size-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
                            <Trash2 className="size-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      <AddProviderDialog 
        open={addProviderOpen} 
        onOpenChange={setAddProviderOpen}
        onAdd={handleAddProvider}
      />
      <AddCustomerDialog 
        open={addCustomerOpen} 
        onOpenChange={setAddCustomerOpen}
        onAdd={handleAddCustomer}
      />
    </div>
  );
}