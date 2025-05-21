const ColoredSquare = ({ color = "blue", size = 50 }) => {
    return (
        <div style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
        }}>
        </div>
    );
};

export default ColoredSquare;

