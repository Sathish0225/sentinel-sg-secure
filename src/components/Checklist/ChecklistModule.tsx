
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckSquare, Plus, FileText, Calendar, User, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ChecklistModule: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeInspection, setActiveInspection] = useState<string | null>(null);

  const checklistTemplates = [
    {
      id: 'TPL-001',
      name: 'Daily Guard Uniform Inspection',
      category: 'Uniform & Appearance',
      items: 8,
      lastUsed: '2024-12-10',
      frequency: 'Daily'
    },
    {
      id: 'TPL-002',
      name: 'SOP Compliance Check',
      category: 'Procedures',
      items: 12,
      lastUsed: '2024-12-09',
      frequency: 'Weekly'
    },
    {
      id: 'TPL-003',
      name: 'Site Cleanliness Audit',
      category: 'Maintenance',
      items: 15,
      lastUsed: '2024-12-08',
      frequency: 'Daily'
    }
  ];

  const inspectionItems = [
    { id: 1, item: 'Uniform is clean and properly pressed', checked: true, compliant: true, notes: '' },
    { id: 2, item: 'Security badge is visible and properly worn', checked: true, compliant: true, notes: '' },
    { id: 3, item: 'Footwear is appropriate and polished', checked: true, compliant: false, notes: 'Shoes need polishing' },
    { id: 4, item: 'Communication device is functional', checked: true, compliant: true, notes: '' },
    { id: 5, item: 'Post is clean and organized', checked: false, compliant: null, notes: '' },
    { id: 6, item: 'Visitor log is up to date', checked: false, compliant: null, notes: '' },
    { id: 7, item: 'Emergency procedures are accessible', checked: false, compliant: null, notes: '' },
    { id: 8, item: 'Incident reports are properly filed', checked: false, compliant: null, notes: '' }
  ];

  const recentInspections = [
    {
      id: 'INS-001',
      template: 'Daily Guard Uniform Inspection',
      inspector: 'Supervisor Chen',
      guard: 'John Tan',
      site: 'Orchard Mall',
      date: '2024-12-10 09:00',
      score: '87%',
      status: 'completed',
      issues: 1
    },
    {
      id: 'INS-002',
      template: 'SOP Compliance Check',
      inspector: 'Supervisor Lee',
      guard: 'Sarah Lim',
      site: 'CBD Office',
      date: '2024-12-09 14:30',
      score: '95%',
      status: 'completed',
      issues: 0
    },
    {
      id: 'INS-003',
      template: 'Site Cleanliness Audit',
      inspector: 'Supervisor Wong',
      guard: 'Ahmad Rahman',
      site: 'Marina Bay',
      date: '2024-12-08 16:00',
      score: '78%',
      status: 'follow-up',
      issues: 3
    }
  ];

  const handleStartInspection = (templateId: string) => {
    setActiveInspection(templateId);
    toast({
      title: "Inspection Started",
      description: "Checklist inspection has been initiated.",
    });
  };

  const handleCompleteInspection = () => {
    setActiveInspection(null);
    toast({
      title: "Inspection Completed",
      description: "Checklist has been completed and submitted for review.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'follow-up': return 'destructive';
      case 'in-progress': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-gray-600">Inspections Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-600">Active Templates</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-gray-600">Avg Compliance</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-gray-600">Follow-ups</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Inspection */}
      {activeInspection && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckSquare className="h-5 w-5 text-blue-600" />
              <span>Active Inspection - Daily Guard Uniform Inspection</span>
            </CardTitle>
            <CardDescription>Complete all items to finish the inspection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Guard Being Inspected</Label>
                  <Input placeholder="Select guard..." />
                </div>
                <div>
                  <Label>Site/Location</Label>
                  <Input value="Orchard Mall" readOnly />
                </div>
              </div>
              
              <div className="space-y-3">
                {inspectionItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox 
                      checked={item.checked}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.item}</div>
                      {item.checked && (
                        <div className="mt-2 flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox checked={item.compliant === true} />
                            <span className="text-sm text-green-600">Compliant</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox checked={item.compliant === false} />
                            <span className="text-sm text-red-600">Non-Compliant</span>
                          </div>
                        </div>
                      )}
                      {item.checked && item.compliant === false && (
                        <div className="mt-2">
                          <Textarea 
                            placeholder="Add notes for non-compliance..."
                            className="text-sm"
                            value={item.notes}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleCompleteInspection}>
                  Complete Inspection
                </Button>
                <Button variant="outline" onClick={() => setActiveInspection(null)}>
                  Save Draft
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Checklist Templates */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Inspection Templates</CardTitle>
              <CardDescription>Manage checklist templates for different inspection types</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create Inspection Template</DialogTitle>
                  <DialogDescription>Set up a new checklist template</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input id="template-name" placeholder="e.g., Daily Uniform Check" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="e.g., Uniform & Appearance" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Inspection Frequency</Label>
                    <Input id="frequency" placeholder="e.g., Daily, Weekly, Monthly" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Brief description of the inspection..." />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Create Template</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checklistTemplates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-gray-500">
                      {template.category} • {template.items} items • {template.frequency}
                    </div>
                    <div className="text-sm text-gray-400">Last used: {template.lastUsed}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!activeInspection && (
                    <Button size="sm" onClick={() => handleStartInspection(template.id)}>
                      Start Inspection
                    </Button>
                  )}
                  <Button size="sm" variant="outline">Edit Template</Button>
                  <Button size="sm" variant="outline">View History</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Inspections */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Inspections</CardTitle>
          <CardDescription>Track completed inspections and follow-ups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInspections.map((inspection) => (
              <div key={inspection.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium">{inspection.template}</div>
                    <div className="text-sm text-gray-600">
                      Inspector: {inspection.inspector} • Guard: {inspection.guard}
                    </div>
                    <div className="text-sm text-gray-500">
                      {inspection.site} • {inspection.date}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="font-medium text-lg">{inspection.score}</div>
                      <div className="text-sm text-orange-600">
                        {inspection.issues} issue{inspection.issues !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <Badge variant={getStatusColor(inspection.status)}>
                      {inspection.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">View Report</Button>
                  <Button size="sm" variant="outline">Digital Signature</Button>
                  {inspection.status === 'follow-up' && (
                    <Button size="sm">Create Follow-up</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChecklistModule;
