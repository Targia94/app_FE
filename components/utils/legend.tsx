import ColoredSquare from "./sqaure";

interface LegendProps {
    color: string;
    size: number;
    label: string;
  }
  
  const LegendGraphic: React.FC<LegendProps> = ({ color, size, label }) => {
    return (
      <div className="flex items-center gap-2">
        {/* Quadrato colorato */}
        <ColoredSquare color={color} size={size} />
        {/* Etichetta */}
        <span>{label}</span>
      </div>
    );
  };
  
  export default LegendGraphic;
  