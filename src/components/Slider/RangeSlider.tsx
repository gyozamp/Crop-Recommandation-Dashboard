import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type RangeSliderProps = {
  label: string;
  value: number[];
  onChange: (value: number | number[]) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  className?: string;
};

export default function RangeSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit = "",
  className = "",
}: RangeSliderProps) {
  // Calcola il numero di decimali da mostrare
  const formatValue = (val: number) =>
    step > 0.5 ? val.toFixed(0) : val.toFixed(1);

  return (
    <div className={`mb-6 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}:{" "}
        <span className="font-semibold text-indigo-700">
          {formatValue(value[0])}
          {unit} - {formatValue(value[1])}
          {unit}
        </span>
      </label>
      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        allowCross={false}
        trackStyle={[{ backgroundColor: "#4f46e5" }]}
        handleStyle={[
          {
            borderColor: "#4f46e5",
            boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.3)",
          },
          {
            borderColor: "#4f46e5",
            boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.3)",
          },
        ]}
      />
    </div>
  );
}
