import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './sidebar.module.scss';
import {
  AnalyticsIcon,
  AppLogo,
  CampaignsIcon,
  CollapseIcon,
  ConnectIcon,
  CustomersIcon,
  DashBoardIcon,
  ExpandIcon,
  GoogleIcon,
  InvoiceIcon,
  NotificationIcon,
  SettingsIcon,
  SupportIcon,
  TeamIcon
} from '@assets/icons/icons';
import Button from '@components/button/button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { removeAuthenticationDetails } from '@helpers/storage';

interface SidebarProps {
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
  collapseSidebar?: boolean;
}

export const Sidebar = ({
  className,
  isMobile,
  onClose,
  collapseSidebar,
  ...props
}: SidebarProps) => {
  //   const breakpoint_xl = useMediaQuery('(min-width: 1200px)', { noSsr: true });
  const navigate = useNavigate();

  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    const spaceEl = document.getElementById('sidebar-space');
    if (spaceEl) {
      if (collapse) {
        spaceEl.style['marginLeft'] = '60px';
      } else {
        spaceEl.style['marginLeft'] = '240px';
      }
    }
  }, [collapse, isMobile, window.location.pathname]);

  const getMenuList = (): {
    label: string;
    icon: any;
    to: string;
    have_space?: boolean;
    have_divider?: boolean;
    have_heading?: boolean;
  }[] => {
    const menuList = [
      {
        label: 'Dashboard',
        icon: DashBoardIcon,
        to: '/dashboard'
      },

      {
        label: 'Customers',
        icon: CustomersIcon,
        to: '/customers'
      },
      {
        label: 'Analytics',
        icon: AnalyticsIcon,
        to: '/analytics'
      },
      {
        label: 'Notifications',
        icon: NotificationIcon,
        to: '/notifications',
        have_space: true
      },
      {
        label: 'Settings',
        icon: SettingsIcon,
        to: '/settings',
        have_heading: true
      },
      {
        label: 'Teams',
        icon: TeamIcon,
        to: '/teams'
      },
      {
        label: 'Connect',
        icon: ConnectIcon,
        to: '/connect'
      },
      {
        label: 'Invoices',
        icon: InvoiceIcon,
        to: '/invoices'
      },
      {
        label: 'Support',
        icon: SupportIcon,
        to: '/support'
      }
    ];

    return menuList;
  };

  const getLogoutButton = () => {
    return (
      <div
        className={styles.logoutBtn}
        onClick={async () => {
          await removeAuthenticationDetails();
          navigate('/login');
        }}
      >
        <GoogleIcon />
        Log out
      </div>
    );
  };

  return (
    <nav
      className={clsx(
        styles.root,
        className,
        isMobile && styles.is_mobile,
        collapse && styles.collapse
      )}
    >
      <div className={styles.rootInner}>
        <div className={styles.app_logo_wrap}>
          <div className={!isMobile ? styles.logo : ''}>
            <AppLogo />
          </div>

          {isMobile && (
            <Button
              onClick={onClose}
              size="sm"
              variant="outlined"
              className={styles.closeIcon}
              //   ghost
            >
              {/* <CloseIcon /> */}
              close
            </Button>
          )}
        </div>

        <ul className={styles.menu_list}>
          {getMenuList().map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={index}
                className={clsx(
                  styles.menu_item,
                  item?.have_space && styles.have_space,
                  item?.have_divider && styles.have_divider,
                  item?.have_heading && styles.have_heading
                )}
              >
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={active => {
                    return clsx(
                      styles.link_item,
                      active.isActive && styles.active
                    );
                  }}
                >
                  <div className={styles.iconWrap}>
                    <Icon />
                  </div>
                  <div className={clsx(styles.link_item_label)}>
                    {item.label}
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className={styles.bottom}>
          <div className={styles.dropdownMetaInfoWrap}>{getLogoutButton()}</div>
        </div>
      </div>
    </nav>
  );
};
export default Sidebar;
