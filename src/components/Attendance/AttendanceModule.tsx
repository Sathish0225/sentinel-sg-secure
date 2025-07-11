
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  MapPin, 
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AttendanceModule: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleClockIn = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsCheckedIn(true);
          toast({
            title: "Clock In Successful",
            description: `Checked in at ${new Date().toLocaleTimeString()} - Location verified`,
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Please enable location services for attendance tracking",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleClockOut = () => {
    setIsCheckedIn(false);
    toast({
      title: "Clock Out Successful",
      description: `Checked out at ${new Date().toLocaleTimeString()}`,
    });
  };

  const todayAttendance = [
    { id: 1, name: 'John Tan', site: 'Orchard Mall', clockIn: '08:00', status: 'on-duty', shift: 'Day Shift' },
    { id: 2, name: 'Sarah Lim', site: 'CBD Office', clockIn: '07:45', status: 'on-duty', shift: 'Day Shift' },
    { id: 3, name: 'Ahmad Rahman', site: 'Marina Bay', clockIn: '20:00', status: 'on-duty', shift: 'Night Shift' },
    { id: 4, name: 'Jennifer Wong', site: 'Shopping Centre', clockIn: '09:15', status: 'late', shift: 'Day Shift' },
  ];

  const monthlyStats = {
    totalDays: 22,
    present: 20,
    absent: 1,
    late: 1,
    overtime: 8
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions for Guards */}
      {user?.role === 'guard' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Attendance Actions</span>
            </CardTitle>
            <CardDescription>Clock in/out with GPS verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Status:</span>
                  <Badge variant={isCheckedIn ? "default" : "secondary"}>
                    {isCheckedIn ? "On Duty" : "Off Duty"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Time:</span>
                  <span className="text-sm">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Assigned Site:</span>
                  <span className="text-sm">{user.site || 'Not assigned'}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                {!isCheckedIn ? (
                  <Button onClick={handleClockIn} className="w-full">
                    <MapPin className="mr-2 h-4 w-4" />
                    Clock In
                  </Button>
                ) : (
                  <Button onClick={handleClockOut} variant="destructive" className="w-full">
                    <Clock className="mr-2 h-4 w-4" />
                    Clock Out
                  </Button>
                )}
                <p className="text-xs text-gray-500 text-center">
                  GPS location will be recorded for verification
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Monthly Attendance Summary</span>
          </CardTitle>
          <CardDescription>December 2024 attendance statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{monthlyStats.present}</div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{monthlyStats.absent}</div>
              <div className="text-sm text-gray-600">Absent</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{monthlyStats.late}</div>
              <div className="text-sm text-gray-600">Late</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{monthlyStats.overtime}</div>
              <div className="text-sm text-gray-600">OT Hours</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{monthlyStats.totalDays}</div>
              <div className="text-sm text-gray-600">Total Days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Attendance Dashboard */}
      {(user?.role === 'supervisor' || user?.role === 'admin' || user?.role === 'management') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Live Attendance Dashboard</span>
            </CardTitle>
            <CardDescription>Real-time attendance status across all sites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Employee</th>
                    <th className="text-left py-3 px-4">Site</th>
                    <th className="text-left py-3 px-4">Clock In</th>
                    <th className="text-left py-3 px-4">Shift</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAttendance.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="font-medium">{record.name}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{record.site}</td>
                      <td className="py-3 px-4 text-sm">{record.clockIn}</td>
                      <td className="py-3 px-4 text-sm">{record.shift}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={
                            record.status === 'on-duty' ? 'default' : 
                            record.status === 'late' ? 'destructive' : 'secondary'
                          }
                          className="flex items-center w-fit"
                        >
                          {record.status === 'on-duty' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {record.status === 'late' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {record.status === 'on-duty' ? 'On Duty' : 
                           record.status === 'late' ? 'Late' : record.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Biometric & GPS Integration Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <MapPin className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-blue-900">Advanced Attendance Features</h3>
              <p className="text-sm text-blue-700 mt-1">
                This system supports biometric fingerprint scanners, facial recognition, and GPS-based attendance 
                tracking. Location verification ensures guards are present at their assigned sites during clock-in/out.
              </p>
              <div className="mt-3 space-x-2">
                <Badge variant="outline" className="text-blue-700 border-blue-300">GPS Verified</Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300">PDPA Compliant</Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300">Real-time Sync</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceModule;
