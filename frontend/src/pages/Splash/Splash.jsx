import './Splash.scss';
import Logo from '../../assets/images/logo.png';
import Splash from '../../assets/images/splash.png';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <div className="splash">
        <div className='splash__imageContainer'>
            <img className='splash__image' src={Splash} alt="Splash image"/>
        </div>
        <div className='splash__content'>
            <p className='splash__text'>
                Manage your Task with <span className='splash__text splash__text--yellow'>DayTask</span>
            </p>
            <Button 
                component={Link}
                to="/login"
                variant="contained"
                sx={{
                    width: '100%',
                    padding: '1.5rem',
                    backgroundColor: '#FED36A',
                    fontSize: '1.25rem',
                    color: '#000000',
                    textDecoration: 'none',
                    '&:hover': {
                    backgroundColor: '#2980b9',
                    }
                }}
                >
                Let´s Start
            </Button>
        </div>
    </div>
  )
}