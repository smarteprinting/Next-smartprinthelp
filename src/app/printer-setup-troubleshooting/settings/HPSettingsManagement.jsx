"use client";
import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';

const HPSettingsManagement = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [allowStartNow, setAllowStartNow] = useState(true);
  const [adminStatus, setAdminStatus] = useState('');
  const [loading, setLoading] = useState(true);

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem('hpAdminToken');
    if (token) {
      setAdminLoggedIn(true);
      fetchSettings(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchSettings = (token) => {
    fetch('/api/hp-setup/settings')
      .then(res => res.json())
      .then(data => {
        setAllowStartNow(data.allowStartNow !== false);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setAdminStatus('Failed to load settings.');
      });
  };

  const handleAdminLogin = (username, password) => {
    setLoginError('');
    fetch('/api/hp-setup/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid credentials');
        return res.json();
      })
      .then((data) => {
        localStorage.setItem('hpAdminToken', data.token);
        setAdminLoggedIn(true);
        setLoading(true);
        fetchSettings(data.token);
      })
      .catch(() => {
        setLoginError('Invalid username or password');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('hpAdminToken');
    setAdminLoggedIn(false);
  };

  const updateAllowStartNow = async (value) => {
    setAdminStatus('Updating...');
    const token = localStorage.getItem('hpAdminToken');
    if (!token) {
      setAdminStatus('Unauthorized. Please log in again.');
      setAdminLoggedIn(false);
      return;
    }

    try {
      const res = await fetch('/api/hp-setup/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ allowStartNow: value })
      });

      if (res.status === 401) {
        setAdminStatus('Session expired. Please login again.');
        setAdminLoggedIn(false);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setAllowStartNow(value);
        setAdminStatus(value ? 'HP Setup is now ENABLED.' : 'HP Setup is now DISABLED. All routes redirect to landing page.');
      } else {
        setAdminStatus('Failed to update setting.');
      }
    } catch (e) {
      setAdminStatus('Failed to update setting.');
    }
  };

  if (!adminLoggedIn) {
    return <AdminLogin onLogin={handleAdminLogin} error={loginError} />;
  }

  if (loading) return <div className="p-8">Loading HP settings...</div>;

  return (
    <div className="max-w-lg mx-auto mt-20 p-10 bg-white rounded-2xl shadow-lg relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition"
      >
        Logout
      </button>

      <h2 className="text-2xl font-bold mb-2">HP Printer Setup Control</h2>
      <p className="text-gray-500 text-sm mb-8">Toggle the HP printer setup flow independently from other printer setups.</p>

      {/* Big toggle card */}
      <div className={`rounded-xl border-2 p-6 flex items-center justify-between transition-all ${allowStartNow ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50'}`}>
        <div>
          <div className="font-bold text-lg text-gray-800">Allow HP Setup Flow</div>
          <div className={`text-sm mt-1 font-medium ${allowStartNow ? 'text-green-600' : 'text-red-500'}`}>
            {allowStartNow
              ? '✅ Enabled — HP setup flow is active'
              : '🔴 Disabled — Users redirected to landing page'}
          </div>
          {!allowStartNow && (
            <div className="text-xs text-gray-400 mt-1">All HP setup sub-routes redirect back to /printer-setup-troubleshooting/</div>
          )}
        </div>

        {/* Toggle switch */}
        <button
          onClick={() => updateAllowStartNow(!allowStartNow)}
          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none shadow-inner ${allowStartNow ? 'bg-green-500' : 'bg-gray-300'}`}
          aria-label="Toggle Allow HP Setup"
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${allowStartNow ? 'translate-x-9' : 'translate-x-1'}`}
          />
        </button>
      </div>

      {adminStatus && (
        <div className={`mt-4 text-sm px-4 py-2 rounded-lg ${adminStatus.includes('ENABLED') || adminStatus.includes('updated') ? 'bg-green-50 text-green-700 border border-green-200' : adminStatus.includes('DISABLED') ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {adminStatus}
        </div>
      )}
    </div>
  );
};

export default HPSettingsManagement;
