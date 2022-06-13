import classNames from "classnames";
import classes from "./Input.module.scss";

const Input = (props) => {
    let inputElement = null;
    const { inValid, shouldValidate, touched, clicked } = props;
    console.log("invalid: ", inValid);
    console.log("shouldValidate: ", shouldValidate);
    console.log("touched: ", touched);
    const inputClasses = classNames({
        [classes.InputElement]: true,
        [classes.Invalid]: inValid && shouldValidate && touched && clicked,
    });
    switch (props.elementType) {
        case "input":
            inputElement = (
                <input
                    className={inputClasses}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    onClick={clicked}
                />
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    className={inputClasses}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    onClick={clicked}

                />
            );
            break;
        case "select":
            inputElement = (
                <select
                    className={inputClasses}
                    style={{ cursor: "pointer" }}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map((option) => (
                        <option
                            key={option.value}
                            className={classes.option}
                            value={option.value}
                        >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
