
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Download, Calculator, TrendingUp, FileText, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PayrollModule: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const currentPayroll = {
    basicSalary: 3500,
    overtime: 420,
    allowances: 200,
    cpfEmployee: 700,
    cpfEmployer: 595,
    grossPay: 4120,
    netPay: 3420,
    workingDays: 22,
    overtimeHours: 15
  };

  const payslips = [
    { month: 'November 2024', grossPay: 4120, netPay: 3420, status: 'paid', cpfTotal: 1295 },
    { month: 'October 2024', grossPay: 3850, netPay: 3200, status: 'paid', cpfTotal: 1200 },
    { month: 'September 2024', grossPay: 4200, netPay: 3500, status: 'paid', cpfTotal: 1300 },
  ];

  const employees = [
    { id: 'EMP001', name: 'John Tan', basicSalary: 3500, overtime: 420, grossPay: 4120, status: 'processed' },
    { id: 'EMP002', name: 'Sarah Lim', basicSalary: 3200, overtime: 320, grossPay: 3720, status: 'pending' },
    { id: 'EMP003', name: 'Ahmad Rahman', basicSalary: 3800, overtime: 190, grossPay: 4180, status: 'processed' },
  ];

  const handleDownloadPayslip = (month: string) => {
    toast({
      title: "Payslip Downloaded",
      description: `Payslip for ${month} has been downloaded.`,
    });
  };

  const handleProcessPayroll = () => {
    toast({
      title: "Payroll Processed",
      description: "Monthly payroll has been processed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payslips">Payslips</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Current Month Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>December 2024 Payroll Summary</span>
              </CardTitle>
              <CardDescription>Current month earnings and deductions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    S${currentPayroll.basicSalary.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Basic Salary</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    S${currentPayroll.overtime.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Overtime ({currentPayroll.overtimeHours}h)</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    S${currentPayroll.grossPay.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Gross Pay</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    S${currentPayroll.netPay.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Net Pay</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CPF Contributions */}
          <Card>
            <CardHeader>
              <CardTitle>CPF Contributions (Based on Singapore CPF Rules)</CardTitle>
              <CardDescription>Monthly CPF calculations and contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-500">Employee CPF (20%)</div>
                    <div className="text-xl font-bold">S${currentPayroll.cpfEmployee}</div>
                    <div className="text-xs text-gray-400">Ordinary: S${Math.round(currentPayroll.cpfEmployee * 0.62)} | Special: S${Math.round(currentPayroll.cpfEmployee * 0.23)} | Medisave: S${Math.round(currentPayroll.cpfEmployee * 0.15)}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-500">Employer CPF (17%)</div>
                    <div className="text-xl font-bold">S${currentPayroll.cpfEmployer}</div>
                    <div className="text-xs text-gray-400">Ordinary: S${Math.round(currentPayroll.cpfEmployer * 0.62)} | Special: S${Math.round(currentPayroll.cpfEmployer * 0.08)} | Medisave: S${Math.round(currentPayroll.cpfEmployer * 0.30)}</div>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="text-sm text-gray-500">Total CPF</div>
                    <div className="text-xl font-bold text-blue-600">
                      S${currentPayroll.cpfEmployee + currentPayroll.cpfEmployer}
                    </div>
                    <div className="text-xs text-gray-400">Combined contributions</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Working Hours Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Working Hours Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold">{currentPayroll.workingDays}</div>
                  <div className="text-sm text-gray-600">Working Days</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold">{currentPayroll.workingDays * 8}</div>
                  <div className="text-sm text-gray-600">Regular Hours</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold">{currentPayroll.overtimeHours}</div>
                  <div className="text-sm text-gray-600">Overtime Hours</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold">{currentPayroll.workingDays * 8 + currentPayroll.overtimeHours}</div>
                  <div className="text-sm text-gray-600">Total Hours</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payslips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payslip History</CardTitle>
              <CardDescription>Download and view historical payslips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payslips.map((payslip, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{payslip.month}</div>
                      <div className="text-sm text-gray-600">
                        Gross: S${payslip.grossPay} | Net: S${payslip.netPay} | CPF: S${payslip.cpfTotal}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">{payslip.status}</Badge>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadPayslip(payslip.month)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          {(user?.role === 'admin' || user?.role === 'hr') && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Employee Payroll</CardTitle>
                    <CardDescription>Manage employee payroll and calculations</CardDescription>
                  </div>
                  <Button onClick={handleProcessPayroll}>
                    <Calculator className="mr-2 h-4 w-4" />
                    Process Payroll
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-gray-500">ID: {employee.id}</div>
                        </div>
                        <Badge variant={employee.status === 'processed' ? 'default' : 'secondary'}>
                          {employee.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <div className="text-gray-500">Basic Salary</div>
                          <div>S${employee.basicSalary}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Overtime</div>
                          <div>S${employee.overtime}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Gross Pay</div>
                          <div>S${employee.grossPay}</div>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" variant="outline">Edit Salary</Button>
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Generate Payslip</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Payroll Reports & Analytics</span>
              </CardTitle>
              <CardDescription>Generate payroll reports and compliance documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-16 justify-start">
                  <FileText className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Monthly Payroll Report</div>
                    <div className="text-sm text-gray-500">Detailed payroll summary</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-16 justify-start">
                  <FileText className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">CPF Contribution Report</div>
                    <div className="text-sm text-gray-500">CPF filing documents</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-16 justify-start">
                  <FileText className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">IR8A Forms</div>
                    <div className="text-sm text-gray-500">Annual tax declarations</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-16 justify-start">
                  <FileText className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Overtime Analysis</div>
                    <div className="text-sm text-gray-500">OT trends and patterns</div>
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

export default PayrollModule;
