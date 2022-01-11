import moment from "moment";
import {
  CursorClickIcon,
  ShoppingCartIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";
export default function ChangePeriod({
  start,
  setStart,
  end,
  setEnd,
  loading,
}) {
  return (
    <div className="flex flex-row items-center">
      <div
        className="w-10 cursor-pointer"
        onClick={() => {
          if (loading) return;
          setStart(moment(start).subtract(1, "month").toDate());
          setEnd(moment(end).subtract(1, "month").toDate());
        }}
      >
        <ArrowCircleLeftIcon />
      </div>
      <div className="w-40 text-center">
        {moment(start).format("MMMM YYYY")}
      </div>
      <div
        onClick={() => {
          if (loading) return;
          if (moment(start).add(1, "month").isAfter(new Date())) return;
          setStart(moment(start).add(1, "month").toDate());
          setEnd(moment(end).add(1, "month").toDate());
        }}
        className="w-10 cursor-pointer"
      >
        <ArrowCircleRightIcon />
      </div>
    </div>
  );
}
