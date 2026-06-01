import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Shield, Receipt, Gift,
  CreditCard, FileText, Settings, ScrollText, Grid3X3,
} from 'lucide-react';
import './Sidebar.css';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Teams', icon: Users, to: '/teams' },
  { label: 'Roles', icon: Shield, to: '/roles' },
  { label: 'Expense', icon: Receipt, to: '/', base: '/expenses' },
  { label: 'Rewards', icon: Gift, to: '/rewards' },
  { label: 'Smart Cards', icon: CreditCard, to: '/smart-cards' },
  { label: 'Reports', icon: FileText, to: '/reports' },
];

const BOTTOM_ITEMS = [
  { label: 'Settings', icon: Settings, to: '/settings' },
  { label: 'Terms & Conditions', icon: ScrollText, to: '/terms' },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="sb-sidebar">
      <div className="sb-logo">
        <div className="sb-logoIcon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{ position: "relative", zIndex: 3 }}
          >
            <circle cx="10" cy="10" r="10" fill="white" />
            <circle
              cx="1.5"
              cy="10"
              r="6"
              fill="white"
              style={{
                position: "relative",
                left: "-3px",
                zIndex: 2,
              }}
            ></circle>
          </svg>
        </div>
        <span className="sb-logoText">OptiFii</span>
        <Grid3X3 size={16} className="sb-gridIcon" />
      </div>

      <nav className="sb-nav">
        {NAV_ITEMS.map(({ label, icon: Icon, to, base }) => (
          <NavLink
            key={label}
            to={to}
            className={() => {
              const isActive = base
                ? location.pathname.startsWith(base)
                : location.pathname === to;
              return `sb-navItem${isActive ? " sb-active" : ""}`;
            }}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}

        <div className="sb-divider" />

        {BOTTOM_ITEMS.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `sb-navItem${isActive ? " sb-active" : ""}`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sb-footer">
        <div className="sb-footerAvatar" />
        <div className="sb-footerInfo">
          <div className="sb-footerName">Giftryt Ventures Pvt. Ltd.</div>
          <div className="sb-footerEmail">team@giftryt.com</div>
        </div>
      </div>
    </aside>
  );
}
