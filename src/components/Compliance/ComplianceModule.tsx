
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle, Clock, FileText, Award, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ComplianceModule: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const licenseStatus = {
    securityLicense: {
      status: 'active',
      expiryDate: '2025-06-15',
      licenseNumber: 'SL-2024-001234',
      daysToExpiry: 187
    },
    guardLicenses: [
      { employee: 'John Tan', licenseNo: 'GL-001', expiry: '2025-03-20', status: 'active', daysLeft: 100 },
      { employee: 'Sarah Lim', licenseNo: 'GL-002', expiry: '2025-04-15', status: 'active', daysLeft: 126 },
      { employee: 'Ahmad Rahman', licenseNo: 'GL-003', expiry: '2025-01-30', status: 'expiring', daysLeft: 51 },
      { employee: 'Jennifer Wong', licenseNo: 'GL-004', expiry: '2024-12-20', status: 'expired', daysLeft: -10 }
    ]
  };

  const momRequirements = [
    {
      requirement: 'Security Agency License',
      status: 'compliant',
      lastChecked: '2024-12-01',
      nextReview: '2025-06-01',
      description: 'Valid security agency license from MOM'
    },
    {
      requirement: 'Guard Licensing',
      status: 'action-required',
      lastChecked: '2024-12-10',
      nextReview: '2024-12-20',
      description: '1 guard license expired, 1 expiring soon'
    },
    {
      requirement: 'Training Records',
      status: 'compliant',
      lastChecked: '2024-11-15',
      nextReview: '2025-05-15',
      description: 'All guards have completed mandatory training'
    },
    {
      requirement: 'Work Pass Compliance',
      status: 'compliant',
      lastChecked: '2024-12-05',
      nextReview: '2025-01-05',
      description: 'Foreign worker passes are valid and up to date'
    },
    {
      requirement: 'Insurance Coverage',
      status: 'compliant',
      lastChecked: '2024-11-30',
      nextReview: '2025-11-30',
      description: 'Professional indemnity and public liability insurance active'
    },
    {
      requirement: 'CPF Contributions',
      status: 'compliant',
      lastChecked: '2024-12-01',
      nextReview: '2025-01-01',
      description: 'All CPF contributions are up to date'
    }
  ];

  const trainingRecords = [
    { employee: 'John Tan', course: 'Basic Security Training', completed: '2024-06-15', expiry: '2026-06-15', status: 'valid' },
    { employee: 'Sarah Lim', course: 'First Aid Certification', completed: '2024-08-20', expiry: '2026-08-20', status: 'valid' },
    { employee: 'Ahmad Rahman', course: 'Fire Safety Training', completed: '2024-09-10', expiry: '2025-09-10', status: 'valid' },
    { employee: 'Jennifer Wong', course: 'Customer Service Training', completed: '2024-07-05', expiry: '2025-07-05', status: 'valid' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'active':
      case 'valid': return 'default';
      case 'action-required':
      case 'expiring': return 'destructive';
      case 'expired': return 'destructive';
      default: return 'secondary';
    }
  };

  const getCompliancePercentage = () => {
    const compliant = momRequirements.filter(req => req.status === 'compliant').length;
    return Math.round((compliant / momRequirements.length) * 100);
  };

  const handleRenewLicense = (licenseNo: string) => {
    toast({
      title: "License Renewal Initiated",
      description: `Renewal process started for license ${licenseNo}`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Compliance Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>MOM Compliance Dashboard</span>
              </CardTitle>
              <CardDescription>Monitor compliance with Ministry of Manpower requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{getCompliancePercentage()}%</div>
                  <div className="text-gray-600 mb-4">Overall Compliance Score</div>
                  <Progress value={getCompliancePercentage()} className="w-full max-w-md mx-auto" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">5</div>
                    <div className="text-sm text-gray-600">Compliant Items</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">1</div>
                    <div className="text-sm text-gray-600">Action Required</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">2</div>
                    <div className="text-sm text-gray-600">Expiring Soon</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* MOM Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>MOM Compliance Requirements</CardTitle>
              <CardDescription>Track all mandatory compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {momRequirements.map((req, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{req.requirement}</div>
                        <div className="text-sm text-gray-600">{req.description}</div>
                      </div>
                      <Badge variant={getStatusColor(req.status)}>
                        {req.status === 'compliant' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {req.status === 'action-required' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {req.status === 'compliant' ? 'Compliant' : 'Action Required'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>Last Checked: {req.lastChecked}</div>
                      <div>Next Review: {req.nextReview}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-6">
          {/* Security Agency License */}
          <Card>
            <CardHeader>
              <CardTitle>Security Agency License</CardTitle>
              <CardDescription>Main business license status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-medium">Security Agency License</div>
                    <div className="text-sm text-gray-600">License No: {licenseStatus.securityLicense.licenseNumber}</div>
                  </div>
                  <Badge variant={getStatusColor(licenseStatus.securityLicense.status)}>
                    {licenseStatus.securityLicense.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Expiry Date</div>
                    <div>{licenseStatus.securityLicense.expiryDate}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Days to Expiry</div>
                    <div>{licenseStatus.securityLicense.daysToExpiry} days</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guard Licenses */}
          <Card>
            <CardHeader>
              <CardTitle>Individual Guard Licenses</CardTitle>
              <CardDescription>Track security guard license status for all employees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {licenseStatus.guardLicenses.map((license, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{license.employee}</div>
                        <div className="text-sm text-gray-600">License No: {license.licenseNo}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(license.status)}>
                          {license.status}
                        </Badge>
                        {(license.status === 'expired' || license.status === 'expiring') && (
                          <Button size="sm" onClick={() => handleRenewLicense(license.licenseNo)}>
                            Renew
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Expiry Date</div>
                        <div>{license.expiry}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Days Left</div>
                        <div className={license.daysLeft < 0 ? 'text-red-600' : license.daysLeft < 60 ? 'text-orange-600' : ''}>
                          {license.daysLeft < 0 ? `Expired ${Math.abs(license.daysLeft)} days ago` : `${license.daysLeft} days`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Training & Certification Records</span>
              </CardTitle>
              <CardDescription>Track mandatory training completion and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingRecords.map((record, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{record.employee}</div>
                        <div className="text-sm text-gray-600">{record.course}</div>
                      </div>
                      <Badge variant={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>Completed: {record.completed}</div>
                      <div>Expires: {record.expiry}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Compliance Reports</span>
              </CardTitle>
              <CardDescription>Generate compliance reports for MOM submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-16 justify-start">
                  <FileText className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Monthly Compliance Report</div>
                    <div className="text-sm text-gray-500">Comprehensive compliance status</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-16 justify-start">
                  <Calendar className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">License Renewal Schedule</div>
                    <div className="text-sm text-gray-500">Upcoming renewals and deadlines</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-16 justify-start">
                  <Award className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Training Compliance Report</div>
                    <div className="text-sm text-gray-500">Training status for all staff</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-16 justify-start">
                  <Shield className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Audit Preparation Report</div>
                    <div className="text-sm text-gray-500">Ready for MOM inspection</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceModule;
