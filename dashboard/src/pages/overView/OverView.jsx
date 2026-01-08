import AppointmentsList from "./AppointmentsList";
import StatsCard from "./StatsCard";

const Overview=() =>{
  return (
    <>
      <h2 className="font-bold text-[40px] font-secondary mt-4">Overview</h2>
      <StatsCard />
      <AppointmentsList />
    </>
  );
}
export default Overview;