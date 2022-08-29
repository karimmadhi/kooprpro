import { gql, useMutation } from "@apollo/client";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import Button from "./Button";

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const hours = [
  { label: "0:00", value: "0:00" },
  { label: "0:30", value: "0:30" },
  { label: "1:00", value: "1:00" },
  { label: "1:30", value: "1:30" },
  { label: "2:00", value: "2:00" },
  { label: "2:30", value: "2:30" },
  { label: "3:00", value: "3:00" },
  { label: "3:30", value: "3:30" },
  { label: "4:00", value: "4:00" },
  { label: "4:30", value: "4:30" },
  { label: "5:00", value: "5:00" },
  { label: "5:30", value: "5:30" },
  { label: "6:00", value: "6:00" },
  { label: "6:30", value: "6:30" },
  { label: "7:00", value: "7:00" },
  { label: "7:30", value: "7:30" },
  { label: "8:00", value: "8:00" },
  { label: "8:30", value: "8:30" },
  { label: "9:00", value: "9:00" },
  { label: "9:30", value: "9:30" },
  { label: "10:00", value: "10:00" },
  { label: "10:30", value: "10:30" },
  { label: "11:00", value: "11:00" },
  { label: "11:30", value: "11:30" },
  { label: "12:00", value: "12:00" },
  { label: "12:30", value: "12:30" },
  { label: "13:00", value: "13:00" },
  { label: "13:30", value: "13:30" },
  { label: "14:00", value: "14:00" },
  { label: "14:30", value: "14:30" },
  { label: "15:00", value: "15:00" },
  { label: "15:30", value: "15:30" },
  { label: "16:00", value: "16:00" },
  { label: "16:30", value: "16:30" },
  { label: "17:00", value: "17:00" },
  { label: "17:30", value: "17:30" },
  { label: "18:00", value: "18:00" },
  { label: "18:30", value: "18:30" },
  { label: "19:00", value: "19:00" },
  { label: "19:30", value: "19:30" },
  { label: "20:00", value: "20:00" },
  { label: "20:30", value: "20:30" },
  { label: "21:00", value: "21:00" },
  { label: "21:30", value: "21:30" },
  { label: "22:00", value: "22:00" },
  { label: "22:30", value: "22:30" },
  { label: "23:00", value: "23:00" },
  { label: "23:30", value: "23:30" },
];

// mutation for updating the openingHours of the business
const UPDATE_BUSINESS_OPENING_HOURS_MUTATION = gql`
  mutation updateBusinessOpeningHours($id: Int!, $openingHours: JSONObject) {
    updateBusiness(id: $id, openingHours: $openingHours) {
      id
      openingHours
    }
  }
`;

// Component handlign the display and update of opening hours
export const EditableHours = ({ business }) => {
  const [updateBusiness, { loading }] = useMutation(
    UPDATE_BUSINESS_OPENING_HOURS_MUTATION
  );
  // react state containing the opening hours. If openingHours not set, use an empty array for default
  const [hours, setHours] = useState(business?.openingHours?.hours || []);
  return (
    <div /*className="w-full"*/>
      {days.map((day, index) => {
        return (
          <div key={index} className="grid grid-cols-4 space-y-4 sm:max-w-xs">
            <span
              className="text-gray-800 "
              style={{
                fontSize: 14,
              }}
            >
              {day}
            </span>
            <div className="col-span-3">
              <DayHours
                setHours={setHours}
                hours={hours}
                dayHours={hours[index] || []}
                day={index}
                setDayHours={(dayHours: any) => {
                  if (hours) {
                    let tmpHours = [...hours];
                    tmpHours[index] = dayHours;
                    setHours(tmpHours);
                  }
                }}
              />
            </div>
          </div>
        );
      })}
      <div className="flex justify-end mt-4">
        <Button
          loading={loading}
          onClick={async () => {
            try {
              // call the mutation to update the business opening hours json
              await updateBusiness({
                variables: {
                  id: business.id,
                  openingHours: { hours },
                },
              });
              // display toast with success after update
              toast.success("Les horaires ont été modifiés");
            } catch (e) {
              // display toast with error message to user
              toast.error(
                "Une erreur s'est produite. Impossible de modifier les horaires"
              );
            }
          }}
        >
          Modifier les horaires
        </Button>
      </div>
    </div>
  );
};

// Display the time slots and selector for each day
const DayHours = ({ hours, setHours, day, dayHours, setDayHours }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center"}}
    >
      {dayHours?.map((dailyHours: any, index: number) => {
        if (index < 2)
          return (
            <Fragment key={index}>
              {index === 1 && (
                <div style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
                  <span
                    style={{
                      color: "gray",
                      fontSize: 14,
                    }}
                  >
                    -
                  </span>
                </div>
              )}
              <TimeInput
                from={dailyHours.from}
                to={dailyHours.to}
                setHours={(value: any) => {
                  let tmpHours = [...dayHours];
                  tmpHours[index] = value;
                  setDayHours(tmpHours);
                }}
              />
            </Fragment>
          );
      })}
      {dayHours.length === 0 && (
        <span
          style={{
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            color: "black",
            fontSize: 17,
          }}
        >
          Fermé
        </span>
      )}
      {dayHours.length > 0 && (
        <>
          <div
            style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem"}}
            onClick={() => {
              let tmpHours = [...dayHours];
              if (tmpHours.length === 0) return;
              tmpHours.pop();
              setDayHours(tmpHours);
            }}
          >
            <span className="icon is-medium">
              <i className="fas fa-times" />
            </span>
          </div>
          <button
            onClick={() => {
              console.log("HOURS", hours);
              let tmpHours = [...hours];
              tmpHours[day] = null;
              setHours(tmpHours);
            }}
          >
            Supprimer
          </button>
        </>
      )}
      {dayHours.length < 2 && (
        <div style={{ paddingLeft: "1rem", minWidth: "2rem", }}>
          <a
            onClick={() => {
              let tmpHours = [...dayHours];
              if (tmpHours.length >= 2) return;
              tmpHours.push({ from: "", to: "" });
              setDayHours(tmpHours);
            }}
            style={{
              color: "blue", 
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Ajouter
          </a>
        </div>
      )}
    </div>
  );
};

// display the time selector
const TimeInput = (props: any) => {
  const { from, to, setHours } = props;
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div
        style={{
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          width: "10rem",
        }}
      >
        <Select
          className="basic-single"
          classNamePrefix="select"
          onChange={(option: any) => {
            if (option) {
              setHours({ from: option.value, to: to });
            } else {
              setHours({ from: "", to: to });
            }
          }}
          value={from ? { value: from, label: from } : null}
          defaultValue={hours[0]}
          isClearable={true}
          isSearchable={true}
          name="from"
          options={hours}
        />
      </div>
      <div style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
        <span
          style={{
            fontFamily: "avenir-book",
            color: "gray",
            fontSize: 14,
          }}
        >
          à
        </span>
      </div>
      <div
        style={{
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          width: "10rem",
        }}
      >
        <Select
          className="basic-single"
          classNamePrefix="select"
          onChange={(option: any) => {
            if (option) {
              setHours({ from: from, to: option.value });
            } else {
              setHours({ from: from, to: "" });
            }
          }}
          value={to ? { value: to, label: to } : null}
          defaultValue={hours[0]}
          isClearable={true}
          isSearchable={true}
          name="to"
          options={hours}
        />
      </div>
    </div>
  );
};
