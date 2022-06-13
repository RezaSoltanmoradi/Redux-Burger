import burgerLogo from "../../assets/images/download.jpg";
import classes from "./Logo.module.scss";
const Logo = ({ heigth }) => {
    return (
        <div className={classes.Logo} style={{ height: heigth }}>
            <img src={`${burgerLogo}`} alt="MyBurger" />
        </div>
    );
};

export default Logo;
