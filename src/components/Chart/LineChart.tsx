import {
  LineChart as LC,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type DataPoint = {
  name: string;
  value: number;
};

const data: DataPoint[] = [
  { name: "1 min", value: 12 },
  { name: "2 min", value: 19 },
  { name: "3 min", value: 8 },
  { name: "4 min", value: 15 },
  { name: "5 min", value: 22 },
];

export default function LineChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Messaggi/min</h3>

      <LC width={600} height={300} data={data}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} />
      </LC>
    </div>
  );
}
