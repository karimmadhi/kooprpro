import Container from "components/Container";
import NavBar from "components/NavBar";
import {
  useBusinessQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useUpdateUserMutation,
} from "generated/graphql";
import { signOut } from "lib/auth";
import router from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import Button from "../../components/Button";
import Link from "next/link";
import TextInput from "components/TextInput";
import { gql, useQuery } from "@apollo/client";
import { BusinessHeader } from ".";
import BusinessLeftNavigation from "../../components/BusinessLeftNavigation";
import ActionBox from "components/ActionBox";
import { Table } from "components/Table";
import moment from "moment";
import { displayPrice } from "lib/displayPrice";
import { PlacesAutocompleteInput } from "components/PlacesAutocompleteInput";
import toast from "react-hot-toast";

const baseServices = [
  // {
  //   name: "Nourriture",
  //   content: {
  //     bio: false,
  //     vegan: false,
  //     halal: false,
  //     vegetarien: false,
  //     viande: false,
  //     poisson: false,
  //     "a emporter": false,
  //     autres: false,
  //   },
  // },

  {
    name: "Accessibilités",
    content: {
      "accès PMR et handicapés": false,
      "parking privé": false,
      langues: false,
      autres: false,
    },
  },
  // {
  //   name: "Boissons",
  //   content: {
  //     vin: false,
  //     cocktail: false,
  //     bière: false,
  //     soft: false,
  //     autres: false,
  //   },
  // },
  {
    name: "Labels",
    content: { "marque alsace": false, autres: false },
  },
  {
    name: "Services",
    content: {
      "wifi gratuit": false,
      "air conditioning": false,
      "chien autorisés": false,
      "espace fumeur": false,
      terrasse: false,
      // "chaise haute": false,
      "salle d'attente": false,
      "happy-hour": false,
      // SPA: false,
      // piscine: false,
      "lounge et bar": false,
      // "salle de sports": false,
      "espace de travail": false,
      "ordinateur à disposition": false,
      // restauration: false,
      // "petit déjeuner": false,
      // sauna: false,
      // hamam: false,
      "garde valise": false,
      // "room service": false,
      "fait maison": false,
      autres: false,
    },
  },
  {
    name: "Animation",
    content: {
      billiard: false,
      fléchètes: false,
      "jeu de cartes": false,
      pétanques: false,
      "jeu de société": false,
      "retransmission matchs": false,
      karaoké: false,
      concerts: false,
      "one man shows": false,
      DJ: false,
      autres: false,
      "salle caché": false,
      "roof-top": false,
    },
  },
];

const BusinessServicePage = ({ business }) => {
  if (!business) return null;
  const [errors, setErrors] = useState<any>({});
  const [state, setState] = useState<any>({ ...business });
  const [updateBusiness] = useUpdateBusinessMutation();
  const [services, setServices] = useState(business.services);
  useEffect(() => {
    if (services.length === 0) {
      setServices(baseServices);
    }
  }, []);
  return (
    <main>
      <BusinessHeader business={business} />
      <Container>
        <Section>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <BusinessLeftNavigation business={business} />
            <div className="px-8 space-y-6 lg:col-span-9">
              <h1 className="text-3xl uppercase font-medium leading-6 text-OFLO_orange"
              >Choissisez vos services</h1>
              <p>Sélectionnez les services que vous proposez dans votre établissement.</p>
              <div className="grid grid-cols-4">
                {services.map((service, index) => {
                  return (
                    <div key={index}>
                      <span className="text-lg font-bold">{service.name}</span>
                      <ul>
                        {Object.entries(service.content)
                          .sort()
                          .map(([item, value]) => {
                            return (
                              <li className="mt-1" key={item + value}>
                                <div className="flex items-center">
                                  <input
                                    id={service.name + item}
                                    name={service.name + item}
                                    type="checkbox"
                                    checked={value as boolean}
                                    onChange={async () => {
                                      let newServices = [...services];
                                      newServices[index] = {
                                        ...service,
                                        content: {
                                          ...services[index].content,
                                          [item]: !value,
                                        },
                                      };
                                      updateBusiness({
                                        variables: {
                                          updateBusinessId: business.id,
                                          updateBusinessServices: newServices,
                                        },
                                      });
                                      toast.success("Modification enregistrée");
                                      setServices(newServices);
                                    }}
                                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                  />
                                  <label
                                    htmlFor={service.name + item}
                                    className="block ml-2 text-sm font-light text-gray-900"
                                  >
                                    {item.charAt(0).toUpperCase() +
                                      item.slice(1)}
                                  </label>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
};

export default function BusinessTransfer({ me }) {
  useEffect(() => {
    if (!me) {
      router.replace("/signin");
    } else if (!me?.business) {
      router.replace("/createBusiness");
    }
  });
  if (!me || !me?.business) return <Loader />;
  const {
    data,
    loading: businessLoading,
    error,
  } = useBusinessQuery({
    variables: { id: me?.business?.id },
  });
  // if (businessLoading) return <Loader />;
  if (error) console.error(error);
  if (!data?.business) console.log("no business");
  return <BusinessServicePage business={data?.business} />;
}
