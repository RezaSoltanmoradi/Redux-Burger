import classes from "./Button.module.scss";
import classNames from "classnames";
const Button = ({ btnType, children, clicked, disabled }) => {
    const btnClasses = classNames({
        [classes.Button]: true,
        [classes[btnType]]: true,
        [classes.Disabled]: disabled,
    });
    return (
        <button className={btnClasses} onClick={clicked} disabled={disabled}>
            {children}
        </button>
    );
};
export default Button;
