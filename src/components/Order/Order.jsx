import classes from "./Order.module.scss";
const Order = ({ price, ingredients }) => {
    const loadedIngredients = [];
    for (let ing in ingredients) {
        loadedIngredients.push({
            name: ing,
            amount: ingredients[ing],
        });
    }
    const ingredientOutPut = loadedIngredients.map((ig) => {
        return (
            <span
                key={ig.name}
                style={{
                    textTransform: "capitalize",
                    display: "inline-block",
                    margin: "0 8px",
                    border: "1px solid #ccc",
                    padding: "5px",
                }}
            >
                {ig.name}({ig.amount})
            </span>
        );
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutPut}</p>
            <p>
                Price: <strong>USD ${price}</strong>
            </p>
        </div>
    );
};

export default Order;
