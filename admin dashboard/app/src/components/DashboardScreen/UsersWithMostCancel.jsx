import { PieChart, Pie, Tooltip } from "recharts";

const UsersWithMostCancel = ({ data, width }) => {
  return (
    <PieChart width={width * 0.4} height={400}>
      <Pie
        dataKey="value"
        data={data}
        isAnimationActive={false}
        cx={width * 0.2}
        cy={150}
        innerRadius={70}
        outerRadius={100}
        fill="#232730"
        label
      />
      <Tooltip />
    </PieChart>
  );
};

export default UsersWithMostCancel;
