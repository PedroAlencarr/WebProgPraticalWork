import './Splash.scss';
import Splash from '../../assets/images/splash.png';
import CustomButton from '../../components/CustomButton/CustomButton';
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
            <CustomButton 
                component={Link}
                to="/login"
                fullWidth
                text="Let's Start"
                variantStyle="filled"/>
        </div>
    </div>
  )
}