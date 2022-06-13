import classes from "./BuildControl.module.scss";

const BuildControl = ({ label, addIng, removeIng, disabled }) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{label}</div>
            <button
                className={classes.Less}
                onClick={removeIng}
                disabled={disabled}
            >
                Less
            </button>
            <button className={classes.More} onClick={addIng}>
                More
            </button>
        </div>
    );
};

export default BuildControl;
