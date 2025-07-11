
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Plus, Camera, Video, FileText, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IncidentModule: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const incidents = [
    {
      id: 'INC-001',
      title: 'Suspicious Activity',
      category: 'Security Breach',
      severity: 'high',
      location: 'Main Entrance',
      reportedBy: 'John Tan',
      reportedAt: '2024-12-10 14:30',
      status: 'investigating',
      description: 'Unidentified person attempting to access restricted area'
    },
    {
      id: 'INC-002',
      title: 'Fire Alarm Activation',
      category: 'Fire Safety',
      severity: 'critical',
      location: 'Level 3 Office',
      reportedBy: 'Sarah Lim',
      reportedAt: '2024-12-09 09:15',
      status: 'resolved',
      description: 'False alarm triggered by cooking smoke'
    },
    {
      id: 'INC-003',
      title: 'Theft Report',
      category: 'Theft',
      severity: 'medium',
      location: 'Parking Lot B',
      reportedBy: 'Ahmad Rahman',
      reportedAt: '2024-12-08 18:45',
      status: 'pending',
      description: 'Bicycle theft reported by tenant'
    }
  ];

  const handleSubmitIncident = () => {
    toast({
      title: "Incident Reported",
      description: "Incident report has been submitted and authorities notified.",
    });
    setIsDialogOpen(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'default';
      case 'investigating': return 'secondary';
      case 'pending': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-600">Open Incidents</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-gray-600">Pending Review</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">38</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-gray-600">Sites Covered</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report New Incident */}
      <Card>
        <CardHeader>
          <CardTitle>Report Incident</CardTitle>
          <CardDescription>Document security incidents with photos and details</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Report New Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Incident Report</DialogTitle>
                <DialogDescription>Provide detailed information about the incident</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="theft">Theft</SelectItem>
                        <SelectItem value="trespassing">Trespassing</SelectItem>
                        <SelectItem value="fire">Fire Safety</SelectItem>
                        <SelectItem value="medical">Medical Emergency</SelectItem>
                        <SelectItem value="vandalism">Vandalism</SelectItem>
                        <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Incident Title</Label>
                  <Input id="title" placeholder="Brief description of the incident..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Specific location where incident occurred..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide detailed description of what happened..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Media Attachments</Label>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      Add Photos
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="mr-2 h-4 w-4" />
                      Add Videos
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitIncident}>Submit Report</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>Track and manage incident reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div key={incident.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{incident.title}</div>
                    <div className="text-sm text-gray-500">ID: {incident.id}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                    <Badge variant={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Category</div>
                    <div>{incident.category}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Location</div>
                    <div>{incident.location}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Reported By</div>
                    <div>{incident.reportedBy}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Reported At</div>
                    <div>{incident.reportedAt}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm text-gray-500">Description</div>
                  <div className="text-sm">{incident.description}</div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Update Status</Button>
                  <Button size="sm" variant="outline">Add Comment</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentModule;
