import React from 'react';
import { IconContext } from 'react-icons';
import { BsArrowRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState, Client } from '../../types/interfaces/store';
import styles from './profilebtn.module.scss';

const ProfileBtn = () => {
  // get data from store
  const { avatar, name } = useSelector<AppState, Client>(({ auth }) => auth.client!);
  return (
    <Link to="/profile">
      <div className={`${styles.profile} rounded-2xl shadow-main`}>
        <div className={styles.img}>
          <img src={avatar} alt="" />
        </div>
        <h4>
          <span className={styles.name}>{name}</span>
          <IconContext.Provider value={{ color: 'gray' }}>
            <BsArrowRight />
          </IconContext.Provider>
        </h4>
      </div>
    </Link>
  );
};

export default ProfileBtn;
