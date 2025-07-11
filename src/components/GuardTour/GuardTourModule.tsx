
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, QrCode, Clock, CheckCircle, XCircle, AlertTriangle, Plus, Scan } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GuardTourModule: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTour, setCurrentTour] = useState<string | null>(null);

  const tourRoutes = [
    {
      id: 'ROUTE-001',
      name: 'Main Building Patrol',
      site: 'Orchard Mall',
      checkpoints: 8,
      duration: '45 min',
      frequency: 'Every 2 hours',
      status: 'active',
      lastCompleted: '2024-12-10 14:30'
    },
    {
      id: 'ROUTE-002',
      name: 'Perimeter Check',
      site: 'CBD Office',
      checkpoints: 12,
      duration: '60 min',
      frequency: 'Every 4 hours',
      status: 'overdue',
      lastCompleted: '2024-12-10 08:15'
    },
    {
      id: 'ROUTE-003',
      name: 'Fire Safety Inspection',
      site: 'Marina Bay',
      checkpoints: 6,
      duration: '30 min',
      frequency: 'Daily',
      status: 'completed',
      lastCompleted: '2024-12-10 16:00'
    }
  ];

  const checkpoints = [
    { id: 'CP-001', name: 'Main Entrance', qrCode: 'QR001', status: 'completed', timestamp: '14:30' },
    { id: 'CP-002', name: 'Reception Area', qrCode: 'QR002', status: 'completed', timestamp: '14:35' },
    { id: 'CP-003', name: 'Emergency Exit A', qrCode: 'QR003', status: 'completed', timestamp: '14:40' },
    { id: 'CP-004', name: 'Parking Entrance', qrCode: 'QR004', status: 'missed', timestamp: null },
    { id: 'CP-005', name: 'Fire Panel', qrCode: 'QR005', status: 'pending', timestamp: null },
    { id: 'CP-006', name: 'Roof Access', qrCode: 'QR006', status: 'pending', timestamp: null }
  ];

  const handleStartTour = (routeId: string) => {
    setCurrentTour(routeId);
    toast({
      title: "Tour Started",
      description: "Guard tour has been initiated. Please scan checkpoints.",
    });
  };

  const handleScanCheckpoint = () => {
    toast({
      title: "Checkpoint Scanned",
      description: "QR code scanned successfully. Proceeding to next checkpoint.",
    });
  };

  const handleCompleteTour = () => {
    setCurrentTour(null);
    toast({
      title: "Tour Completed",
      description: "Guard tour completed successfully. Report submitted.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'active': return 'secondary';
      case 'overdue': return 'destructive';
      case 'missed': return 'destructive';
      case 'pending': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tour Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-600">Active Routes</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-gray-600">Tours Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-gray-600">Missed Checkpoints</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-gray-600">Overdue Tours</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Tour */}
      {currentTour && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scan className="h-5 w-5 text-blue-600" />
              <span>Active Tour - {tourRoutes.find(r => r.id === currentTour)?.name}</span>
            </CardTitle>
            <CardDescription>Scan QR codes at each checkpoint to complete the tour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {checkpoints.map((checkpoint) => (
                  <div key={checkpoint.id} className={`p-3 rounded-lg border ${
                    checkpoint.status === 'completed' ? 'bg-green-50 border-green-200' :
                    checkpoint.status === 'missed' ? 'bg-red-50 border-red-200' :
                    'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{checkpoint.name}</div>
                        <div className="text-xs text-gray-500">{checkpoint.qrCode}</div>
                        {checkpoint.timestamp && (
                          <div className="text-xs text-gray-500">{checkpoint.timestamp}</div>
                        )}
                      </div>
                      <Badge variant={getStatusColor(checkpoint.status)} className="text-xs">
                        {checkpoint.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {checkpoint.status === 'missed' && <XCircle className="w-3 h-3 mr-1" />}
                        {checkpoint.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleScanCheckpoint}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan Next Checkpoint
                </Button>
                <Button variant="outline" onClick={handleCompleteTour}>
                  Complete Tour
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tour Routes */}
      <Card>
        <CardHeader>
          <CardTitle>Guard Tour Routes</CardTitle>
          <CardDescription>Manage patrol routes and checkpoint schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tourRoutes.map((route) => (
              <div key={route.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium">{route.name}</div>
                    <div className="text-sm text-gray-500">Route ID: {route.id}</div>
                    <div className="text-sm text-gray-600">{route.site}</div>
                  </div>
                  <Badge variant={getStatusColor(route.status)}>
                    {route.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <div className="text-gray-500">Checkpoints</div>
                    <div>{route.checkpoints}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div>{route.duration}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Frequency</div>
                    <div>{route.frequency}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Last Completed</div>
                    <div>{route.lastCompleted}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!currentTour && (
                    <Button size="sm" onClick={() => handleStartTour(route.id)}>
                      Start Tour
                    </Button>
                  )}
                  <Button size="sm" variant="outline">View Route</Button>
                  <Button size="sm" variant="outline">Edit Schedule</Button>
                  <Button size="sm" variant="outline">View History</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create New Route */}
      {(user?.role === 'supervisor' || user?.role === 'admin') && (
        <Card>
          <CardHeader>
            <CardTitle>Route Management</CardTitle>
            <CardDescription>Create and manage guard tour routes</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Route
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create Guard Tour Route</DialogTitle>
                  <DialogDescription>Set up a new patrol route with checkpoints</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="route-name">Route Name</Label>
                    <Input id="route-name" placeholder="e.g., Main Building Patrol" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site">Site</Label>
                    <Input id="site" placeholder="Site location" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input id="duration" type="number" placeholder="45" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Input id="frequency" placeholder="Every 2 hours" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Create Route</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GuardTourModule;
