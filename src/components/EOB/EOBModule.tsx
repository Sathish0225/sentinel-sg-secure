
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Plus, Search, Clock, User, Camera, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EOBModule: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const eobEntries = [
    {
      id: 'EOB-001',
      timestamp: '2024-12-10 14:30',
      author: 'John Tan',
      site: 'Orchard Mall',
      shift: 'Day Shift',
      entry: 'Routine patrol completed. All areas checked and secured. No incidents reported.',
      status: 'approved',
      hasMedia: false
    },
    {
      id: 'EOB-002',
      timestamp: '2024-12-10 13:15',
      author: 'Sarah Lim',
      site: 'CBD Office',
      shift: 'Day Shift',
      entry: 'Visitor logged for meeting at Level 15. ID checked and escort provided to reception.',
      status: 'pending',
      hasMedia: true
    },
    {
      id: 'EOB-003',
      timestamp: '2024-12-10 12:00',
      author: 'Ahmad Rahman',
      site: 'Marina Bay',
      shift: 'Day Shift',
      entry: 'Fire drill conducted at 12:00 PM. All occupants evacuated successfully in 3 minutes. Reset systems at 12:15 PM.',
      status: 'approved',
      hasMedia: false
    },
    {
      id: 'EOB-004',
      timestamp: '2024-12-10 11:45',
      author: 'Jennifer Wong',
      site: 'Shopping Centre',
      shift: 'Day Shift',
      entry: 'Lost child reported at Customer Service. Child reunited with parents after 10 minutes. Incident logged.',
      status: 'approved',
      hasMedia: true
    }
  ];

  const handleAddEntry = () => {
    toast({
      title: "EOB Entry Added",
      description: "Your occurrence book entry has been submitted for review.",
    });
    setIsDialogOpen(false);
  };

  const handleApproveEntry = (id: string) => {
    toast({
      title: "Entry Approved",
      description: `EOB entry ${id} has been approved by supervisor.`,
    });
  };

  const filteredEntries = eobEntries.filter(entry =>
    entry.entry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.site.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* EOB Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">47</div>
                <div className="text-sm text-gray-600">Total Entries</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-600">Pending Review</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">44</div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-gray-600">Contributors</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Entry */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Digital Occurrence Book</CardTitle>
              <CardDescription>Record daily events, incidents, and observations</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>New EOB Entry</DialogTitle>
                  <DialogDescription>Record an occurrence or observation in the digital logbook</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="site">Site/Location</Label>
                      <Input id="site" value={user?.site || ''} readOnly className="bg-gray-50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shift">Shift</Label>
                      <Input id="shift" placeholder="Day Shift / Night Shift" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entry">Occurrence Details</Label>
                    <Textarea 
                      id="entry" 
                      placeholder="Describe the occurrence, incident, or observation in detail..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Attachments (Optional)</Label>
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      Add Photos/Videos
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500 p-3 bg-blue-50 rounded-lg">
                    <strong>Note:</strong> All entries are automatically timestamped and will be reviewed by supervisors. 
                    Ensure accuracy and completeness of information.
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddEntry}>Submit Entry</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search entries by content, author, or site..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Entries List */}
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">{entry.author}</span>
                      <Badge variant="outline">{entry.site}</Badge>
                      <Badge variant="outline">{entry.shift}</Badge>
                      {entry.hasMedia && <Camera className="h-4 w-4 text-blue-500" />}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{entry.timestamp}</span>
                      <span>•</span>
                      <span>ID: {entry.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(entry.status)}>
                      {entry.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {entry.status}
                    </Badge>
                    {entry.status === 'pending' && (user?.role === 'supervisor' || user?.role === 'admin') && (
                      <Button size="sm" onClick={() => handleApproveEntry(entry.id)}>
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
                <div className="text-sm leading-relaxed">
                  {entry.entry}
                </div>
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Add Comment</Button>
                  {entry.hasMedia && (
                    <Button size="sm" variant="outline">
                      <Camera className="mr-1 h-3 w-3" />
                      View Media
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No entries found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Archive & Export */}
      <Card>
        <CardHeader>
          <CardTitle>Archive & Export</CardTitle>
          <CardDescription>Manage EOB records and generate reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Export Monthly Report
            </Button>
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Advanced Search
            </Button>
            <Button variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              View Archive
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EOBModule;
