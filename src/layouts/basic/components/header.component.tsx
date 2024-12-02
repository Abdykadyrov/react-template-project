import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/icon/icon.component';
import Button from 'components/button/button.component';
import '../basic.style.scss';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const routes = ['link-1', 'link-2'];

  return (
    <div className="basicLayout__header">
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

export default Header;
