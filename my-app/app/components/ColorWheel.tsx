export const tailwindColors = [
  { name: "Red", class: "bg-red-500", hex: "#ef4444" },
  { name: "Orange", class: "bg-orange-500", hex: "#f97316" },
  { name: "Yellow", class: "bg-yellow-500", hex: "#eab308" },
  { name: "Green", class: "bg-green-500", hex: "#22c55e" },
  { name: "Blue", class: "bg-blue-500", hex: "#3b82f6" },
  { name: "Purple", class: "bg-purple-500", hex: "#a855f7" },
  { name: "Pink", class: "bg-pink-500", hex: "#ec4899" },
  { name: "Brown", class: "bg-stone-700", hex: "#44403c" },
  { name: "Black", class: "bg-black", hex: "#000000" },
  { name: "White", class: "bg-white", hex: "#ffffff" },
];

interface ColorWheelProps {
  onColorSelect: (color: any) => void;
}

const ColorWheel: React.FC<ColorWheelProps> = ({ onColorSelect }) => {
  const handleColors = () => {
    return tailwindColors.map((color) => (
      <div
        key={color.name}
        className={`${color.class} font-semibold text-center w-full h-30 border`}
        title={color.name}
        onClick={() => {
          onColorSelect(color);
        }}
      >
        {color.name}
      </div>
    ));
  };
  return (
    <div className="flex items-center m-4">
      <h1 className="text-center font-bold text-2xl my-2">Color Wheel</h1>
      <div className="grid grid-flow-col grid-rows-4">{handleColors()}</div>
    </div>
  );
};

export default ColorWheel;
