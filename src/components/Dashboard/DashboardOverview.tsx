
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Shield,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const DashboardOverview: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Guards On Duty',
      value: '24',
      description: 'Currently active across 8 sites',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Incidents',
      value: '3',
      description: '2 high priority, 1 medium',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Completed Tours',
      value: '18',
      description: 'Out of 20 scheduled today',
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Leave Requests',
      value: '5',
      description: 'Awaiting approval',
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  const recentActivities = [
    {
      time: '09:30 AM',
      activity: 'Guard John Tan checked in at Orchard Mall',
      type: 'attendance',
      priority: 'normal'
    },
    {
      time: '09:15 AM',
      activity: 'Incident reported: Suspicious person at Block 123',
      type: 'incident',
      priority: 'high'
    },
    {
      time: '08:45 AM',
      activity: 'Tour completed: Marina Bay Financial Centre',
      type: 'tour',
      priority: 'normal'
    },
    {
      time: '08:30 AM',
      activity: 'Leave request approved for Sarah Lim',
      type: 'leave',
      priority: 'normal'
    }
  ];

  const upcomingTasks = user?.role === 'guard' ? [
    { task: 'Complete patrol route A', time: '10:00 AM', status: 'pending' },
    { task: 'Submit daily occurrence report', time: '6:00 PM', status: 'pending' },
    { task: 'Checkpoint scan due', time: '11:00 AM', status: 'overdue' }
  ] : [
    { task: 'Review incident reports', time: '10:30 AM', status: 'pending' },
    { task: 'Approve leave requests', time: '2:00 PM', status: 'pending' },
    { task: 'Site inspection: CBD Office', time: '3:00 PM', status: 'scheduled' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest system updates and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                  <div className="text-xs text-gray-500 w-16 flex-shrink-0 mt-1">
                    {activity.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.activity}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant={activity.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {activity.type}
                      </Badge>
                      {activity.priority === 'high' && (
                        <Badge variant="destructive" className="text-xs">
                          High Priority
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Upcoming Tasks</span>
            </CardTitle>
            <CardDescription>Your scheduled activities for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>
                  <Badge 
                    variant={
                      task.status === 'overdue' ? 'destructive' : 
                      task.status === 'pending' ? 'default' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Performance Overview</span>
          </CardTitle>
          <CardDescription>Key metrics for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Attendance Rate</span>
                <span className="text-sm text-gray-500">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Tour Completion</span>
                <span className="text-sm text-gray-500">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Incident Response</span>
                <span className="text-sm text-gray-500">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
