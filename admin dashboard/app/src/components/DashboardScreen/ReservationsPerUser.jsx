import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ReservationsPerUser = ({ data, width }) => {
  return (
    <LineChart
      width={width * 0.6}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 5,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="username" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Valid" stroke="#232730" />
      <Line type="monotone" dataKey="Invalid" stroke="#e63946" />
    </LineChart>
  );
};

export default ReservationsPerUser;
