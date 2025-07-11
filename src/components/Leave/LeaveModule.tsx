
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
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LeaveModule: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const leaveRequests = [
    { id: 1, employee: 'John Tan', type: 'Annual Leave', startDate: '2024-12-15', endDate: '2024-12-17', days: 3, status: 'pending', reason: 'Family vacation' },
    { id: 2, employee: 'Sarah Lim', type: 'Medical Leave', startDate: '2024-12-10', endDate: '2024-12-12', days: 3, status: 'approved', reason: 'Doctor appointment' },
    { id: 3, employee: 'Ahmad Rahman', type: 'Urgent Leave', startDate: '2024-12-08', endDate: '2024-12-08', days: 1, status: 'rejected', reason: 'Personal emergency' },
  ];

  const leaveBalance = {
    annual: { used: 8, total: 14 },
    medical: { used: 3, total: 14 },
    urgent: { used: 1, total: 3 }
  };

  const handleSubmitLeave = () => {
    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted for approval.",
    });
    setIsDialogOpen(false);
  };

  const handleApproveReject = (id: number, action: 'approve' | 'reject') => {
    toast({
      title: `Leave Request ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `Leave request #${id} has been ${action}d.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Leave Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Leave Balance - {new Date().getFullYear()}</span>
          </CardTitle>
          <CardDescription>Your current leave entitlements (based on MOM policies)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {leaveBalance.annual.total - leaveBalance.annual.used}
              </div>
              <div className="text-sm text-gray-600">Annual Leave Remaining</div>
              <div className="text-xs text-gray-500">
                Used: {leaveBalance.annual.used}/{leaveBalance.annual.total} days
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {leaveBalance.medical.total - leaveBalance.medical.used}
              </div>
              <div className="text-sm text-gray-600">Medical Leave Remaining</div>
              <div className="text-xs text-gray-500">
                Used: {leaveBalance.medical.used}/{leaveBalance.medical.total} days
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {leaveBalance.urgent.total - leaveBalance.urgent.used}
              </div>
              <div className="text-sm text-gray-600">Urgent Leave Remaining</div>
              <div className="text-xs text-gray-500">
                Used: {leaveBalance.urgent.used}/{leaveBalance.urgent.total} days
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Apply for Leave */}
      <Card>
        <CardHeader>
          <CardTitle>Apply for Leave</CardTitle>
          <CardDescription>Submit new leave applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Apply for Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Leave Application</DialogTitle>
                <DialogDescription>Fill in the details for your leave request</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="leave-type">Leave Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual Leave</SelectItem>
                      <SelectItem value="medical">Medical Leave</SelectItem>
                      <SelectItem value="urgent">Urgent Leave</SelectItem>
                      <SelectItem value="maternity">Maternity Leave</SelectItem>
                      <SelectItem value="paternity">Paternity Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea id="reason" placeholder="Please provide reason for leave..." />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitLeave}>Submit Application</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Leave Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>Manage leave applications and approvals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="font-medium">{request.employee}</div>
                    <div className="text-sm text-gray-600">{request.type}</div>
                    <div className="text-sm text-gray-500">
                      {request.startDate} to {request.endDate} ({request.days} days)
                    </div>
                    <div className="text-sm">{request.reason}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      request.status === 'approved' ? 'default' : 
                      request.status === 'rejected' ? 'destructive' : 'secondary'
                    }>
                      {request.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {request.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                      {request.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {request.status}
                    </Badge>
                    {request.status === 'pending' && (user?.role === 'supervisor' || user?.role === 'admin') && (
                      <div className="space-x-1">
                        <Button size="sm" onClick={() => handleApproveReject(request.id, 'approve')}>
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleApproveReject(request.id, 'reject')}>
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveModule;
