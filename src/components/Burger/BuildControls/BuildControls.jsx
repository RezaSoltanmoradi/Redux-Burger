import classes from "./BuildControls.module.scss";
import BuildControl from "./BuildControl/BuildControl";
import { controls } from "../../../helper/Types";

const BuildControls = ({
    addIng,
    removeIng,
    disabled,
    price,
    perchaseable,
    ordered,
}) => {
    return (
        <div className={classes.BuildControls}>
            <p>
                Current Price : <strong>${price}</strong>
            </p>
            {controls.map((ctrl) => {
                return (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        addIng={() => addIng(ctrl.type)}
                        removeIng={() => removeIng(ctrl.type)}
                        disabled={disabled[ctrl.type]}
                    />
                );
            })}
            <button
                className={classes.OrderButton}
                disabled={!perchaseable}
                onClick={ordered}
            >
                ORDER NOW
            </button>
        </div>
    );
};

export default BuildControls;
