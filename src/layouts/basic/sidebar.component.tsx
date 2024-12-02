import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/icon/icon.component';
import Button from 'components/button/button.component';
import './basic.style.scss';

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const routes = ['user-groups', 'users'];

  return (
    <div className="basicLayout__sidebar">
      <nav className="basicLayout__menu">
        <ul>
          {routes.map((route) => (
            <li key={route} className={location.pathname.includes(route) ? 'active' : ''}>
              <Link to={`/${route}`}>{t(`navigation.${route}`)}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Button onClick={() => navigate('/auth')} secondary>
        {t('navigation.logOut')}
        <Icon name={'LogOut'} size={18} />
      </Button>
    </div>
  );
};

export default Sidebar;
