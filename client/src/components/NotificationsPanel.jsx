import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, CheckCheck, Clock, Sparkles, PlusCircle, RefreshCw, Info, AlertCircle, CheckCircle, Gift, Star, Zap } from 'lucide-react';

// Map icon name strings sent by AdminPanel → Lucide components
const ICON_MAP = {
  PlusCircle,
  RefreshCw,
  Info,
  AlertCircle,
  CheckCircle,
  Gift,
  Star,
  Zap,
  Sparkles,
  Bell,
};

function NotifIcon({ name, color, size = 18 }) {
  const Icon = ICON_MAP[name] || Info;
  return <Icon size={size} color={color} />;
}

// ── Simple global notification store using CustomEvent ───────────
// AdminPanel dispatches: new CustomEvent('scheme-notification', { detail: { title, message, icon, color, bg } })

export default function NotificationsPanel() {
  const [open,          setOpen]          = useState(false);
  const [notifications, setNotifications] = useState([]);
  const panelRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Listen for new scheme notifications fired by AdminPanel
  useEffect(() => {
    function handleNewScheme(e) {
      const { title, message, icon = 'Info', color = '#16a34a', bg = '#f0fdf4' } = e.detail || {};
      if (!title) return;
      setNotifications(prev => [
        {
          id: Date.now(),
          title,
          message,
          icon,
          color,
          bg,
          time: 'Just now',
          read: false,
        },
        ...prev,
      ]);
    }
    window.addEventListener('scheme-notification', handleNewScheme);
    return () => window.removeEventListener('scheme-notification', handleNewScheme);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markRead    = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = ()   => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss     = (id, e) => { e.stopPropagation(); setNotifications(prev => prev.filter(n => n.id !== id)); };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative transition-colors"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white px-0.5">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          style={{ animation: 'dropIn 0.15s ease-out' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-gray-100"
            style={{ background: 'linear-gradient(135deg, rgb(12, 51, 243) 0%, rgb(12, 51, 243) 100%)' }}
          >
            <div className="flex items-center gap-2">
              <Bell size={15} className="text-white" />
              <span className="text-white font-bold text-sm">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-[#a8c0fd] hover:text-white text-[11px] font-medium transition-colors"
              >
                <CheckCheck size={12} />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="overflow-y-auto max-h-96">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Sparkles size={28} className="text-gray-300" />
                <p className="text-sm text-gray-400 font-medium">No notifications yet</p>
                <p className="text-xs text-gray-400">New schemes added by admin will appear here.</p>
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`relative flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50 border-b border-gray-50
                    ${!n.read ? 'bg-[#e8effe]/40' : 'bg-white'}`}
                >
                  {/* Unread dot */}
                  {!n.read && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1a5dfe] rounded-full" />
                  )}

                  {/* Lucide Icon */}
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: n.bg }}
                  >
                    <NotifIcon name={n.icon} color={n.color} size={17} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-xs font-bold leading-tight ${!n.read ? 'text-gray-800' : 'text-gray-600'}`}>
                        {n.title}
                      </p>
                      <button
                        onClick={e => dismiss(n.id, e)}
                        className="flex-shrink-0 text-gray-300 hover:text-gray-500 transition-colors mt-0.5"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                      {n.message}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={9} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setNotifications([])}
                className="w-full text-center text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors py-0.5"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}