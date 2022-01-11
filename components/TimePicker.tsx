import moment from "moment";
import TextInput from "./TextInput";

export default function TimePicker({ date, setDate }) {
  return (
    <>
      <div className="flex flex-row items-center">
        <TextInput
          onChange={(e) => {
            setDate(moment(date).set("hour", parseInt(e.target.value)));
          }}
          value={moment(date).get("hour").toString().padStart(2, "0")}
          type="number"
          step={1}
          max={24}
          min={0}
        />
        <span className="px-2">:</span>
        <TextInput
          onChange={(e) => {
            setDate(moment(date).set("minute", parseInt(e.target.value)));
          }}
          value={moment(date).get("minute").toString().padStart(2, "0")}
          type="number"
          step={15}
          max={60}
          min={0}
        />
      </div>
    </>
  );
}
