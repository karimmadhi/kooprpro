import CategoriesSelector from "components/CategoriesSelector";
import Container from "components/Container";
import { ErrorNotification } from "components/ErrorNotification";
import FileInput from "components/FileInput";
import SearchInput from "components/SearchInput";
import Section from "components/Section";
import TextInput from "components/TextInput";
import TimePicker from "components/TimePicker";
import { useCreateOfferMutation, useImageBanksQuery } from "generated/graphql";
import { displayPrice } from "lib/displayPrice";
import moment from "moment";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { SingleDatePicker } from "react-dates";
import Loader from "../../components/Loader";
import { gql } from "@apollo/client";
import AddressesSelector from "components/AddressesSelector";
import GridPicture from "components/GridPicture";
import toast from "react-hot-toast";
import Button from "components/Button";
import DatePicker, { registerLocale } from "react-datepicker";
import { fr } from "date-fns/locale";
registerLocale("fr", fr);

const IMAGE_BANKS_QUERY = gql`
  query imageBanks(
    $imageBanksTagNames: String
    $imageBanksTake: Int
    $imageBanksSkip: Int
  ) {
    imageBanks(
      tagName: $imageBanksTagNames
      take: $imageBanksTake
      skip: $imageBanksSkip
    ) {
      id
      key
      url
      cdnUrl
      tags {
        name
        id
      }
    }
  }
`;

const IMAGE_TAGS_QUERY = gql`
  query imageTags {
    imageTags {
      name
      id
    }
  }
`;

const CREATE_OFFER_MUTATION = gql`
  mutation createOffer(
    $createOfferName: String!
    $createOfferDescription: String!
    $createOfferBusinessId: Int!
    $createOfferQuantity: Int!
    $createOfferExpireAt: date!
    $createOfferOriginalPrice: Int!
    $createOfferDiscount: Int!
    $createOfferCouponValidUntil: Int!
    $createOfferCategoryIds: [Int!]
    $createOfferImageUrl: String!
    $createOfferAdressId: Int!
    $createOfferFile: Upload
    $isEvent: Boolean
  ) {
    createOffer(
      name: $createOfferName
      description: $createOfferDescription
      businessId: $createOfferBusinessId
      quantity: $createOfferQuantity
      expireAt: $createOfferExpireAt
      originalPrice: $createOfferOriginalPrice
      discount: $createOfferDiscount
      couponValidUntil: $createOfferCouponValidUntil
      categoryIds: $createOfferCategoryIds
      imageUrl: $createOfferImageUrl
      addressId: $createOfferAdressId
      file: $createOfferFile
      isEvent: $isEvent
    ) {
      id
      expireAt
      name
      quantity
      price
      discount
      couponValidUntil
      business {
        id
      }
    }
  }
`;

const ImageBankSection = ({ state, setState, errors }) => {
  const [search, setSearch] = useState("");
  const [take, setTake] = useState(8);
  const {
    data: imageBanksData,
    loading: imageBanksLoading,
    fetchMore,
  } = useImageBanksQuery({
    variables: {
      imageBanksTake: take,
      imageBanksTagNames: search || undefined,
    },
  });
  return (
    <div className={`pt-8 min-h-[${take * 10}px]`}>
      <div>
        <h3 className="text-lg font-medium leading-6">
          Selectionnez une photo de l'offre
        </h3>
      </div>
      <ErrorNotification
        error={errors?.imageUrl && "Veuillez choisir la photo de l'offre"}
      />
      <div className="p-4 rounded-md shadow-md">
        <p>Cliquez sur la photo pour la sélectionner</p>
        <div className="max-w-md mt-4">
          <SearchInput
            placeholder="Recherche par mot clés"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </div>
        <div className="mt-4">
          <ErrorNotification
            error={
              imageBanksData?.imageBanks?.length === 0 &&
              "Aucune d'images trouvées"
            }
          />
        </div>
        <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-12">
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {imageBanksData?.imageBanks?.map((image) => {
                return (
                  <GridPicture
                    key={image.id}
                    file={image}
                    state={state}
                    setState={setState}
                  />
                );
              })}
            </ul>
            <div className="flex justify-center mt-8">
              <Button
                loading={imageBanksLoading}
                onClick={async (e) => {
                  setTake(take + 8);
                }}
              >
                Charger plus d'images
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function createOffer({ me }) {
  useEffect(() => {
    if (!me?.id) {
      router.replace("/signin");
    } else if (!me?.business?.isValidated) {
      router.replace("/business");
    }
  });
  if (!me?.id || !me?.business?.isValidated) return <Loader />;
  const [imageType, setImageType] = useState(0);
  const [state, setState] = useState({
    createOfferCategoryIds: [],
    createOfferBusinessId: null,
    name: "",
    description: "",
    quantity: "",
    price: "",
    discount: "",
    startAt: moment(),
    expireAt: "24",
    expireAtEvent: moment().add(1, "week"),
    couponValidUntil: "10",
    imageUrl: "",
    address: null,
    file: null,
    fileUrl: null,
    isEvent: false,
    imageBanksTake: 8,
  });
  const [errors, setErrors] = useState<any>();
  const [startFocus, setStartFocus] = useState(false);
  const [endFocus, setEndFocus] = useState(false);

  const [createOffer, { loading, error }] = useCreateOfferMutation();
  if (error) toast.error(error.message);
  return (
    <main>
      <div className="py-12">
        <Container>
          <Section>
            <form
              className="space-y-8 divide-y divide-gray-200"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="space-y-8 divide-y divide-gray-200">
                <div>
                  <div>
                    <h3 className="text-lg font-medium leading-6">
                      Créer une nouvelle offre
                    </h3>
                    <p className="mt-1 text-sm ">
                      Ces informations seront affichées dans l'offre
                    </p>
                  </div>
                  {me?.business?.hasEvents === true && (
                    <div className="mt-6 sm:col-span-6">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            checked={state.isEvent}
                            onChange={(e) => {
                              setState({ ...state, isEvent: !state.isEvent });
                            }}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="comments" className="font-medium">
                            L'offre est un bon plan
                          </label>
                          <p className="text-gray-500">
                            Celle-ci ne pourra pas être achetée sur
                            l’application
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <TextInput
                        required={true}
                        label="Nom de l'offre"
                        onChange={(e) => {
                          setState({ ...state, name: e.target.value });
                        }}
                        value={state.name}
                        error={errors?.name}
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium "
                      >
                        Description de l'offre
                      </label>
                      <div className="mt-1">
                        <textarea
                          required={true}
                          name="description"
                          rows={6}
                          value={state.description}
                          onChange={(e) =>
                            setState({ ...state, description: e.target.value })
                          }
                          className={
                            "block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" +
                            (errors?.description && " border-red-500")
                          }
                        ></textarea>
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium ">
                        Ajouter une photo à la description de l'offre
                        (optionnel, doit représenter le produit et sera ajouté à
                        la description)
                      </label>
                      <FileInput
                        fileUrl={state.fileUrl}
                        tmpFileUrl={state.fileUrl}
                        onChange={(file, fileUrl) => {
                          setState({
                            ...state,
                            file,
                            fileUrl,
                          });
                        }}
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <p>Selectionner les catégories de l'offre</p>
                      <CategoriesSelector
                        onSelection={(options) => {
                          setState({
                            ...state,
                            createOfferCategoryIds: options,
                          });
                        }}
                        error={errors?.categoryIds}
                        value={state?.createOfferCategoryIds}
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <p>Selectionner l'adresse de l'offre</p>
                      <AddressesSelector
                        businessId={me?.business.id}
                        onSelection={(option) => {
                          setState({
                            ...state,
                            address: option,
                          });
                        }}
                        error={errors?.address}
                        value={state?.address}
                      />
                    </div>
                  </div>
                </div>
                <ImageBankSection
                  state={state}
                  setState={setState}
                  errors={errors}
                />
                <div className="pt-8">
                  <div>
                    <h3 className="text-lg font-medium leading-6">
                      Informations sur la disponibilité
                    </h3>
                    <p>
                      Ces informations seront demandés lors de la validation
                    </p>
                  </div>
                  {state.isEvent === false && (
                    <div className="grid grid-cols-6 mt-6 gap-y-6 gap-x-4">
                      <div className="col-span-6 sm:col-span-3 md:col-span-2">
                        <TextInput
                          type="number"
                          inputMode="decimal"
                          onChange={(e) => {
                            setState({
                              ...state,
                              price: e.target.value,
                            });
                          }}
                          label="Prix de base (sans réduction, en €)"
                          min={0}
                          value={state.price}
                          error={errors?.price}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 md:col-span-2">
                        <TextInput
                          type="number"
                          inputMode="decimal"
                          value={state.discount}
                          onChange={(e) => {
                            setState({ ...state, discount: e.target.value });
                            if (
                              parseInt(e.target.value) < 5 ||
                              parseInt(e.target.value) > 100
                            ) {
                              setErrors({ discount: true });
                            } else {
                              setErrors({ discount: false });
                            }
                          }}
                          label={"Réduction appliquée (en %, minimum 5%)"}
                          error={errors?.discount}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 md:col-span-2">
                        <TextInput
                          value={displayPrice(
                            (parseFloat(state.price) -
                              parseFloat(state.price) *
                                (parseInt(state.discount) / 100)) *
                              100
                          )}
                          disabled={true}
                          onChange={(e) => {}}
                          label="Prix de vente (en €)"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 md:col-span-2">
                        <TextInput
                          type="number"
                          inputMode="numeric"
                          value={state.quantity}
                          label={"Quantité disponible"}
                          onChange={(e) => {
                            if (
                              e.target.value.includes(",") ||
                              e.target.value.includes(".")
                            )
                              return;
                            setState({ ...state, quantity: e.target.value });
                          }}
                          error={errors?.quantity}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 md:col-span-2">
                        <TextInput
                          type="number"
                          inputMode="decimal"
                          disabled={true}
                          value={state.couponValidUntil}
                          onChange={(e) =>
                            setState({
                              ...state,
                              couponValidUntil: e.target.value,
                            })
                          }
                          error={errors?.couponValidUntil}
                          label="Coupon valide après achat pendant : (en jours)"
                        />
                      </div>
                    </div>
                  )}
                  {/* <div className="grid grid-cols-6 mt-6 gap-y-6 gap-x-4">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        // htmlFor="street_address"
                        className="block text-sm font-medium "
                      >
                        Date de mise en ligne
                      </label>
                      <SingleDatePicker
                        isOutsideRange={() => false}
                        id="startDateDatePicker"
                        date={state.startAt}
                        onDateChange={(newDate) => {
                          setState({
                            ...state,
                            startAt: newDate as moment.Moment,
                          });
                        }}
                        focused={startFocus}
                        onFocusChange={() => {
                          setStartFocus(!startFocus);
                        }}
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-3 md:col-span-2">
                      <label
                        // htmlFor="street_address"
                        className="block text-sm font-medium "
                      >
                        Heure de mise en ligne
                      </label>
                      <div className="w-40 md:w-40">
                        <TimePicker
                          date={state.startAt}
                          setDate={(e) => {
                            setState({
                              ...state,
                              startAt: e,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div> */}
                  {state.isEvent === false && (
                    <div className="grid grid-cols-6 mt-6 gap-y-6 gap-x-4">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          // htmlFor="street_address"
                          className="block text-sm font-medium "
                        >
                          Durée de diffusion
                        </label>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center">
                            <input
                              checked={state.expireAt === "24"}
                              onChange={(e) =>
                                setState({ ...state, expireAt: "24" })
                              }
                              id="24h"
                              name="24h"
                              type="radio"
                              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="24h"
                              className="block ml-3 text-sm font-medium text-gray-700"
                            >
                              24h
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              checked={state.expireAt === "48"}
                              onChange={(e) =>
                                setState({ ...state, expireAt: "48" })
                              }
                              id="48h"
                              name="48h"
                              type="radio"
                              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="48h"
                              className="block ml-3 text-sm font-medium text-gray-700"
                            >
                              48h
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              checked={state.expireAt === "72"}
                              onChange={(e) =>
                                setState({ ...state, expireAt: "72" })
                              }
                              id="72h"
                              name="72h"
                              type="radio"
                              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="72h"
                              className="block ml-3 text-sm font-medium text-gray-700"
                            >
                              72h
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {state.isEvent === true && (
                    <div className="grid grid-cols-6 mt-6 gap-y-6 gap-x-4">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          // htmlFor="street_address"
                          className="block text-sm font-medium "
                        >
                          Date d'expiration
                        </label>
                        <DatePicker
                          showPopperArrow={false}
                          selected={
                            state.expireAtEvent.toDate() ||
                            moment().add(1, "day").toDate()
                          }
                          locale="fr"
                          dateFormat="dd/MM/yyyy"
                          onChange={(newDate) => {
                            setState({
                              ...state,
                              expireAtEvent: moment(newDate as Date),
                            });
                          }}
                        />
                        {/* <SingleDatePicker
                          isOutsideRange={() => false}
                          id="endDateDatePicker"
                          date={state.expireAtEvent}
                          onDateChange={(newDate) => {
                            setState({
                              ...state,
                              expireAtEvent: newDate as moment.Moment,
                            });
                          }}
                          focused={endFocus}
                          onFocusChange={() => {
                            setEndFocus(!endFocus);
                          }}
                        /> */}
                      </div>
                      <div className="col-span-3 sm:col-span-3 md:col-span-2">
                        <label
                          // htmlFor="street_address"
                          className="block text-sm font-medium "
                        >
                          Heure d'expiration
                        </label>
                        <div className="w-40 md:w-40">
                          <TimePicker
                            date={state.expireAtEvent}
                            setDate={(e) => {
                              setState({
                                ...state,
                                expireAtEvent: e,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    onClick={async (e) => {
                      e.preventDefault();
                      setErrors({});
                      let errorsState: any = {};
                      if (!state.name || state.name === "") {
                        errorsState.name = true;
                      }
                      if (!state.description || state.description === "") {
                        errorsState.description = true;
                      }
                      if (moment(state?.expireAtEvent).isBefore(moment())) {
                        // if the expiredAt date of the offer is in the past, throw an error. Only expired date in the futur are allowed
                        toast.error("La date ne peut pas être passée");
                        errorsState.expireAtEvent;
                      }
                      // when the offer is not an event, some more verification are needed
                      if (state.isEvent === false) {
                        if (
                          !state.quantity ||
                          state.quantity === "" ||
                          parseInt(state.quantity) === 0
                        ) {
                          errorsState.quantity = true;
                        }
                        if (!state.couponValidUntil) {
                          errorsState.couponValidUntil = true;
                        }
                        if (
                          !state.price ||
                          state.price === "" ||
                          parseInt(state.price) === 0
                        ) {
                          errorsState.price = true;
                        }
                        if (
                          !state.discount ||
                          state.discount === "" ||
                          isNaN(parseFloat(state.discount)) ||
                          parseFloat(state.discount) < 5 ||
                          parseFloat(state.discount) > 100
                        ) {
                          errorsState.discount = true;
                        }
                      }
                      if (state?.createOfferCategoryIds?.length === 0) {
                        errorsState.categoryIds = true;
                      }

                      if (!state.address) {
                        errorsState.address = true;
                      }
                      if (!state.imageUrl) {
                        errorsState.imageUrl = true;
                      }
                      if (Object.keys(errorsState).length > 0) {
                        setErrors(errorsState);
                        toast.error(
                          "Impossible de créer une offre. Certains champs ne sont pas remplis"
                        );
                        return;
                      }
                      const { data } = await createOffer({
                        variables: {
                          createOfferAdressId: state.address.value,
                          createOfferBusinessId: me?.business?.id,
                          createOfferCategoryIds:
                            state.createOfferCategoryIds.map(
                              (category) => category.value
                            ),
                          createOfferDescription: state.description,
                          createOfferExpireAt: state.isEvent
                            ? state.expireAtEvent.toDate()
                            : moment().add(state.expireAt, "hours"),
                          createOfferName: state.name,
                          createOfferImageUrl: state.imageUrl,
                          createOfferFile: state.file || undefined,
                          createOfferOriginalPrice:
                            (parseFloat(state.price) || 0) * 100,
                          createOfferDiscount:
                            parseInt(state.discount, 10) || 0,
                          createOfferQuantity:
                            parseInt(state.quantity, 10) || 0,
                          createOfferCouponValidUntil:
                            parseInt(state.couponValidUntil, 10) || 0,
                          isEvent: state.isEvent,
                        },
                      });
                      if (data?.createOffer?.id) {
                        toast.success("L'offre a été créee.");
                        window.location.replace(
                          "/offer/" + data?.createOffer?.id
                        );
                      }
                    }}
                  >
                    {loading ? "Chargement..." : "Créer l'offre"}
                  </button>
                </div>
              </div>
            </form>
          </Section>
        </Container>
      </div>
    </main>
  );
}
