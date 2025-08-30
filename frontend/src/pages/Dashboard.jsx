import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

// AlertList Component
function AlertList({ alerts }) {
  const alertBgColors = {
    high: "bg-red-50 border-red-200 text-red-700",
    medium: "bg-orange-50 border-orange-200 text-orange-700",
    low: "bg-yellow-50 border-yellow-200 text-yellow-700"
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'storm': return 'fa-exclamation-triangle';
      case 'erosion': return 'fa-exclamation-circle';
      case 'pollution': return 'fa-info-circle';
      default: return 'fa-bell';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Current Threat Alerts</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {alerts.length} Active
        </span>
      </div>
      <div className="space-y-4">
        {alerts.map(alert => (
          <div 
            key={alert.id} 
            className={`${alertBgColors[alert.level]} flex items-start p-4 border rounded-lg`}
          >
            <div className="flex-shrink-0 mr-3 text-xl">
              <i className={`fas ${getAlertIcon(alert.type)}`}></i>
            </div>
            <div className="flex-1">
              <h4 className="font-bold">{alert.title}</h4>
              <p className="text-sm text-gray-600">{alert.description}</p>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <span><i className="fas fa-clock mr-1"></i> Updated {alert.time}</span>
                <span className="mx-2">•</span>
                <span><i className="fas fa-map-marker-alt mr-1"></i> {alert.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// MetricsPanel Component
function MetricsPanel({ metrics }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Environmental Metrics</h3>
      <div className="space-y-4">
        <MetricCard 
          icon="fas fa-temperature-high" 
          iconColor="text-blue-600" 
          bgColor="bg-blue-50" 
          borderColor="border-blue-200"
          label="Water Temp"
          value={`${metrics.waterTemp}°C`}
          subtext={<><i className="fas fa-arrow-up"></i> 1.2°C from yesterday</>}
        />
        <MetricCard 
          icon="fas fa-ruler-combined" 
          iconColor="text-green-600" 
          bgColor="bg-green-50" 
          borderColor="border-green-200"
          label="Sea Level"
          value={`${metrics.seaLevel}m`}
          subtext={<><i className="fas fa-arrow-up"></i> 0.08m from average</>}
        />
        <MetricCard 
          icon="fas fa-wind" 
          iconColor="text-purple-600" 
          bgColor="bg-purple-50" 
          borderColor="border-purple-200"
          label="Wind Speed"
          value={`${metrics.windSpeed} km/h`}
          subtext={`Direction: ${metrics.windDirection}`}
        />
      </div>
    </div>
  );
}

function MetricCard({ icon, iconColor, bgColor, borderColor, label, value, subtext }) {
  return (
    <div className={`${bgColor} p-4 rounded-lg border ${borderColor}`}>
      <div className="flex items-center">
        <div className={`rounded-full ${bgColor.replace('-50', '-100')} p-3 mr-4`}>
          <i className={`${icon} ${iconColor} text-xl`}></i>
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
      {subtext && <p className="text-xs mt-2 text-gray-600">{subtext}</p>}
    </div>
  );
}

// NotificationCenter Component
function NotificationCenter({ notifications }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Notification Center</h3>
      <div className="space-y-4">
        {notifications.map(notif => (
          <div key={notif.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium text-blue-700">{notif.title}</span>
              <span className="text-xs text-gray-500">{notif.time}</span>
            </div>
            <p className="text-sm mt-1">{notif.description}</p>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md text-sm">
        View All Notifications
      </button>
    </div>
  );
}

// QuickActions Component
function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-3 rounded-md text-sm flex items-center justify-center">
          <i className="fas fa-bullhorn mr-2"></i> Send Alert
        </button>
        <button className="bg-green-100 hover:bg-green-200 text-green-800 py-2 px-3 rounded-md text-sm flex items-center justify-center">
          <i className="fas fa-download mr-2"></i> Export Data
        </button>
        <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-3 rounded-md text-sm flex items-center justify-center">
          <i className="fas fa-chart-line mr-2"></i> Generate Report
        </button>
        <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-2 px-3 rounded-md text-sm flex items-center justify-center">
          <i className="fas fa-cog mr-2"></i> Settings
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [alerts, setAlerts] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const seaLevelRes = await axios.get("/api/data/sea-level");
        const seaLevel = seaLevelRes.data.data[0].v; // Example from NOAA response
        setMetrics(prev => ({ ...prev, seaLevel }));
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 15 * 60 * 1000); // refresh every 15 min
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Mock alerts
    setAlerts([
      {
        id: 1,
        type: 'storm',
        level: 'high',
        title: 'Storm Surge Warning',
        location: 'Sector 4B',
        time: '15 min ago',
        description: 'High probability of storm surge in Northern coastal areas. Expected within 24-36 hours.'
      },
      {
        id: 2,
        type: 'erosion',
        level: 'medium',
        title: 'Coastal Erosion Alert',
        location: 'South Beach',
        time: '2 hours ago',
        description: 'Increased erosion detected at South Beach. 15% more than seasonal average.'
      },
      {
        id: 3,
        type: 'pollution',
        level: 'low',
        title: 'Water Quality Advisory',
        location: 'Bay Area',
        time: '5 hours ago',
        description: 'Elevated bacteria levels detected. Avoid water activities in designated areas.'
      }
    ]);

    setMetrics({
      waterTemp: 24.5,
      seaLevel: 1.24,
      windSpeed: 18,
      windDirection: 'NW'
    });

    setNotifications([
      {
        id: 1,
        type: 'subscription',
        title: 'Alert Subscription',
        time: '10:42 AM',
        description: 'Fisherfolk community subscribed to storm alerts'
      },
      {
        id: 2,
        type: 'sensor',
        title: 'Sensor Online',
        time: '09:15 AM',
        description: 'Tide gauge #CT-42 is back online'
      },
      {
        id: 3,
        type: 'maintenance',
        title: 'Maintenance',
        time: 'Yesterday',
        description: 'Weather station #WS-18 scheduled for calibration'
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-water text-2xl"></i>
            <h1 className="text-xl font-bold">Coastal Threat Alert System</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm">Welcome, {user?.name}</span>
              <img 
                src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0D8ABC&color=fff`} 
                alt="User" 
                className="w-8 h-8 rounded-full"
              />
            </div>
            <button 
              className="bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded-md flex items-center"
              onClick={logout}
            >
              <i className="fas fa-sign-out-alt mr-1"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4">
            {['overview', 'alerts', 'metrics', 'map', 'reports'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-3 font-medium text-sm capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Coastal Monitoring Dashboard</h2>
          <p className="text-gray-600">Real-time monitoring of coastal threats and environmental metrics</p>
        </div>

        {/* Conditional Rendering per Tab */}
        {activeTab === 'alerts' && <AlertList alerts={alerts} />}
        {activeTab === 'metrics' && <MetricsPanel metrics={metrics} />}
        {activeTab === 'overview' && (
          <>
            <AlertList alerts={alerts} />
            <MetricsPanel metrics={metrics} />
            <NotificationCenter notifications={notifications} />
            <QuickActions />
            {/* Add map placeholder or component here if ready */}
          </>
        )}
        {/* Add placeholders for 'map' and 'reports' with future components */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Coastal Threat Alert System © 2023 | Protecting coastal ecosystems and communities</p>
          <p className="mt-1 text-gray-400">Data updates every 15 minutes | System status: <span className="text-green-400">Operational</span></p>
        </div>
      </footer>
    </div>
  );
}
