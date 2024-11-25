import './Profile.scss';
import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ProfilePic from '../../assets/images/profile-placeholder.png';
import Arrow from '../../assets/images/arrow-icon.png';
import Edit from '../../assets/images/edit-icon.png';
import UserIcon from '../../assets/images/user-icon.png';
import EmailIcon from '../../assets/images/email-icon.png';
import PassIcon from '../../assets/images/pass-icon.png';
import TasksIcon from '../../assets/images/task-icon.png';
import PrivacyIcon from '../../assets/images/security-icon.png';
import SettingsIcon from '../../assets/images/settings-icon.png';
import LogoutIcon from '../../assets/images/logout-icon.png';


export default function Profile() {

  return (
        <section className='profile__section'>
            <h1>Profile</h1>
            <img className='profile__pic' src={ProfilePic} alt="Profile Pic" />
            <div className='field'>
                <img className="icon" src={UserIcon} alt="" />
                <div className='text__div'>
                    <p></p>
                </div>
                <img className="icon" src={Edit} alt="" />
            </div>
            <div className='field'>
                <img className="icon" src={EmailIcon} alt="" />
                <div className='text__div'>
                    <p></p>
                </div>
                <img className="icon" src={Edit} alt="" />
            </div>
            <div className='field'>
                <img className="icon" src={PassIcon} alt="" />
                <div className='text__div'>
                    <p>Password</p>
                </div>
                <img className="icon" src={Edit} alt="" />
            </div>
            <div className='field'>
                <img className="icon" src={TasksIcon} alt="" />
                <div className='text__div'>
                    <p>My Tasks</p>
                </div>
                <img className="icon" src={Arrow} alt="" />
            </div>
            <div className='field'>
                <img className="icon" src={PrivacyIcon} alt="" />
                <div className='text__div'>
                    <p>Privacy</p>
                </div>
                <img className="icon" src={Arrow} alt="" />
            </div>
            <div className='field'>
                <img className="icon" src={SettingsIcon} alt="" />
                <div className='text__div'>
                    <p>Settings</p>
                </div>
                <img className="icon" src={Arrow} alt="" />
            </div>
            <div className='logout'>
                <img src={LogoutIcon} alt="" />
                Logout
            </div>
        </section>
  )
}