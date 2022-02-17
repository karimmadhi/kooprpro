import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  date: any;
  json: any;
};




export type Address = {
  __typename?: 'Address';
  address: Scalars['String'];
  business?: Maybe<Business>;
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['date'];
  fullAddress: Scalars['String'];
  id: Scalars['Int'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  offers?: Maybe<Array<Maybe<Offer>>>;
  updatedAt?: Maybe<Scalars['date']>;
  zipCode: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Business = {
  __typename?: 'Business';
  addToCartCount: Scalars['Int'];
  address?: Maybe<Scalars['String']>;
  addresses?: Maybe<Array<Maybe<Address>>>;
  averageOrderAmount?: Maybe<Scalars['Int']>;
  backgroundImageUrl?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  codeAPE?: Maybe<Scalars['String']>;
  companyType?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  coupon?: Maybe<Coupon>;
  coupons?: Maybe<Array<Maybe<Coupon>>>;
  createdAt: Scalars['date'];
  description?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<Maybe<Scalars['json']>>>;
  etAccount?: Maybe<Scalars['json']>;
  etActivity?: Maybe<Scalars['json']>;
  etBusinessId?: Maybe<Scalars['String']>;
  favoritedBy?: Maybe<Array<Maybe<User>>>;
  fidelityCards?: Maybe<Array<Maybe<FidelityCard>>>;
  fidelityCount: Scalars['Int'];
  fidelityPercentage: Scalars['Int'];
  hasEvents?: Maybe<Scalars['Boolean']>;
  hasFidelity: Scalars['Boolean'];
  iban?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isFavorited?: Maybe<Scalars['Boolean']>;
  isValidated: Scalars['Boolean'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  logoUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  offers?: Maybe<Array<Maybe<Offer>>>;
  offersViewCount: Scalars['Int'];
  openingHours?: Maybe<Scalars['json']>;
  orderDetail?: Maybe<OrderBusinessDetail>;
  orderDetails?: Maybe<Array<Maybe<OrderBusinessDetail>>>;
  ordersAmount: Scalars['Int'];
  ordersCount: Scalars['Int'];
  owner?: Maybe<User>;
  percentageKoopr?: Maybe<Scalars['Int']>;
  percentageKooprLg: Scalars['Int'];
  percentageKooprMd: Scalars['Int'];
  percentageKooprSm: Scalars['Int'];
  phone?: Maybe<Scalars['String']>;
  services?: Maybe<Scalars['json']>;
  siret?: Maybe<Scalars['String']>;
  siteUrl?: Maybe<Scalars['String']>;
  transfers?: Maybe<Array<Maybe<Transfer>>>;
  updatedAt?: Maybe<Scalars['date']>;
  viewCount: Scalars['Int'];
  zipCode?: Maybe<Scalars['String']>;
};


export type BusinessAddToCartCountArgs = {
  from?: Maybe<Scalars['date']>;
  to?: Maybe<Scalars['date']>;
};


export type BusinessAverageOrderAmountArgs = {
  from?: Maybe<Scalars['date']>;
  to?: Maybe<Scalars['date']>;
};


export type BusinessCouponArgs = {
  couponId: Scalars['Int'];
};


export type BusinessCouponsArgs = {
  search?: Maybe<Scalars['String']>;
};


export type BusinessDocumentsArgs = {
  documentType?: Maybe<Scalars['String']>;
};


export type BusinessOffersArgs = {
  admin?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};


export type BusinessOffersViewCountArgs = {
  from?: Maybe<Scalars['date']>;
  to?: Maybe<Scalars['date']>;
};


export type BusinessOrderDetailArgs = {
  orderId: Scalars['Int'];
};


export type BusinessOrderDetailsArgs = {
  from?: Maybe<Scalars['date']>;
  orderBy?: Maybe<Scalars['json']>;
  to?: Maybe<Scalars['date']>;
};


export type BusinessOrdersAmountArgs = {
  from?: Maybe<Scalars['date']>;
  to?: Maybe<Scalars['date']>;
};


export type BusinessOrdersCountArgs = {
  from?: Maybe<Scalars['date']>;
  to?: Maybe<Scalars['date']>;
};


export type BusinessTransfersArgs = {
  transferId?: Maybe<Scalars['Int']>;
};


export type BusinessViewCountArgs = {
  from?: Maybe<Scalars['date']>;
  to?: Maybe<Scalars['date']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['date'];
  favoritedBy?: Maybe<Array<Maybe<User>>>;
  id: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
  index: Scalars['Int'];
  isFavorited?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  offers?: Maybe<Array<Maybe<Offer>>>;
  updatedAt?: Maybe<Scalars['date']>;
};

export type City = {
  __typename?: 'City';
  id: Scalars['Int'];
  name: Scalars['String'];
  offers?: Maybe<Array<Maybe<Offer>>>;
};

export type Coupon = {
  __typename?: 'Coupon';
  createdAt: Scalars['date'];
  expiredAt: Scalars['date'];
  id: Scalars['Int'];
  offer?: Maybe<Offer>;
  order?: Maybe<Order>;
  status: Scalars['String'];
  uid?: Maybe<Scalars['String']>;
  updatedAt: Scalars['date'];
  usedAt?: Maybe<Scalars['date']>;
  user?: Maybe<User>;
};

export enum CouponStatus {
  Created = 'created',
  Used = 'used'
}


export type Event = {
  __typename?: 'Event';
  id: Scalars['Int'];
};

export type FidelityCard = {
  __typename?: 'FidelityCard';
  amount: Scalars['Int'];
  business?: Maybe<Business>;
  couponCount: Scalars['Int'];
  createdAt: Scalars['date'];
  id: Scalars['Int'];
  updatedAt?: Maybe<Scalars['date']>;
  user?: Maybe<User>;
};

export type ImageBank = {
  __typename?: 'ImageBank';
  cdnUrl: Scalars['String'];
  createdAt: Scalars['date'];
  id: Scalars['Int'];
  key: Scalars['String'];
  tags?: Maybe<Array<Maybe<ImageTag>>>;
  url: Scalars['String'];
};

export type ImageTag = {
  __typename?: 'ImageTag';
  createdAt: Scalars['date'];
  id: Scalars['Int'];
  imageCount: Scalars['Int'];
  images?: Maybe<Array<Maybe<ImageBank>>>;
  name: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  addAddressToBusiness?: Maybe<Address>;
  addCard?: Maybe<User>;
  addDocumentOnBusiness?: Maybe<Business>;
  addOwnerToBusiness?: Maybe<Business>;
  createBusiness?: Maybe<Business>;
  createCategory?: Maybe<Category>;
  createImageBank?: Maybe<ImageBank>;
  createImageTag?: Maybe<ImageTag>;
  createOffer?: Maybe<Offer>;
  createOrder?: Maybe<Order>;
  createSection?: Maybe<Section>;
  /** delete a payment card on EasyTransac */
  deleteCard?: Maybe<User>;
  deleteCategory?: Maybe<Category>;
  deleteImageBank?: Maybe<ImageBank>;
  deleteOffer?: Maybe<Offer>;
  deleteSection?: Maybe<Section>;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  resetPassword?: Maybe<Scalars['Boolean']>;
  setFavoriteBusiness?: Maybe<User>;
  setFavoriteCategory?: Maybe<User>;
  signIn?: Maybe<AuthPayload>;
  signInWithApple?: Maybe<AuthPayload>;
  signInWithFacebook?: Maybe<AuthPayload>;
  signInWithGoogle?: Maybe<AuthPayload>;
  signUp?: Maybe<AuthPayload>;
  updateBusiness?: Maybe<Business>;
  updateBusinessEtActivity?: Maybe<Business>;
  updateCategory?: Maybe<Category>;
  updateManyCategories?: Maybe<Array<Maybe<Category>>>;
  updateManySections?: Maybe<Array<Maybe<Section>>>;
  updateOffer?: Maybe<Offer>;
  updateSection?: Maybe<Section>;
  updateUser?: Maybe<User>;
  uploadBackgroundImageOnBusiness?: Maybe<Business>;
  uploadLogoOnBusiness?: Maybe<Business>;
  useCoupon?: Maybe<Coupon>;
};


export type MutationAddAddressToBusinessArgs = {
  address: Scalars['String'];
  businessId: Scalars['Int'];
  city: Scalars['String'];
  country: Scalars['String'];
  fullAddress: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  zipCode: Scalars['String'];
};


export type MutationAddCardArgs = {
  cardCVV: Scalars['String'];
  cardMonth: Scalars['String'];
  cardNumber: Scalars['String'];
  cardOwner: Scalars['String'];
  cardYear: Scalars['String'];
  clientIp: Scalars['String'];
};


export type MutationAddDocumentOnBusinessArgs = {
  businessId: Scalars['Int'];
  documentType?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
};


export type MutationAddOwnerToBusinessArgs = {
  businessId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationCreateBusinessArgs = {
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fullAddress?: Maybe<Scalars['String']>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  name: Scalars['String'];
  phone: Scalars['String'];
  siret?: Maybe<Scalars['String']>;
  zipCode: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
};


export type MutationCreateImageBankArgs = {
  file: Scalars['Upload'];
  tagNames: Array<Scalars['String']>;
};


export type MutationCreateImageTagArgs = {
  name: Scalars['String'];
};


export type MutationCreateOfferArgs = {
  addressId: Scalars['Int'];
  businessId: Scalars['Int'];
  categoryIds?: Maybe<Array<Scalars['Int']>>;
  couponValidUntil: Scalars['Int'];
  description: Scalars['String'];
  discount: Scalars['Int'];
  expireAt: Scalars['date'];
  file?: Maybe<Scalars['Upload']>;
  imageUrl: Scalars['String'];
  isEvent?: Maybe<Scalars['Boolean']>;
  isFlagship?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  originalPrice: Scalars['Int'];
  quantity: Scalars['Int'];
};


export type MutationCreateOrderArgs = {
  cardAlias?: Maybe<Scalars['String']>;
  cardCVV?: Maybe<Scalars['String']>;
  cardMonth?: Maybe<Scalars['String']>;
  cardNumber?: Maybe<Scalars['String']>;
  cardOwner?: Maybe<Scalars['String']>;
  cardYear?: Maybe<Scalars['String']>;
  cart: Scalars['json'];
  clientIp: Scalars['String'];
  credit?: Maybe<Scalars['Boolean']>;
  fidelity?: Maybe<Scalars['Boolean']>;
  saveCard?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateSectionArgs = {
  name: Scalars['String'];
};


export type MutationDeleteCardArgs = {
  cardAlias: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteImageBankArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteOfferArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSectionArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  resetPasswordToken: Scalars['String'];
};


export type MutationSetFavoriteBusinessArgs = {
  businessId: Scalars['Int'];
};


export type MutationSetFavoriteCategoryArgs = {
  categoryId: Scalars['Int'];
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignInWithAppleArgs = {
  token?: Maybe<Scalars['String']>;
};


export type MutationSignInWithFacebookArgs = {
  token?: Maybe<Scalars['String']>;
};


export type MutationSignInWithGoogleArgs = {
  token?: Maybe<Scalars['String']>;
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type MutationUpdateBusinessArgs = {
  companyType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fidelityCount?: Maybe<Scalars['Int']>;
  fidelityPercentage?: Maybe<Scalars['Int']>;
  hasEvents?: Maybe<Scalars['Boolean']>;
  hasFidelity?: Maybe<Scalars['Boolean']>;
  iban?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isValidated?: Maybe<Scalars['Boolean']>;
  openingHours?: Maybe<Scalars['JSONObject']>;
  percentageKooprLg?: Maybe<Scalars['Int']>;
  percentageKooprMd?: Maybe<Scalars['Int']>;
  percentageKooprSm?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['String']>;
  services?: Maybe<Scalars['json']>;
  siteUrl?: Maybe<Scalars['String']>;
};


export type MutationUpdateBusinessEtActivityArgs = {
  activityDescription?: Maybe<Scalars['String']>;
  expectedVolumes?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationUpdateCategoryArgs = {
  file?: Maybe<Scalars['Upload']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationUpdateManyCategoriesArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationUpdateManySectionsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationUpdateOfferArgs = {
  businessId?: Maybe<Scalars['Int']>;
  categoryIds?: Maybe<Array<Scalars['Int']>>;
  couponValidUntil?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Int']>;
  expireAt?: Maybe<Scalars['date']>;
  id: Scalars['Int'];
  isActive?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  originalPrice?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
};


export type MutationUpdateSectionArgs = {
  displayType?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  offerIds?: Maybe<Array<Scalars['Int']>>;
};


export type MutationUpdateUserArgs = {
  birthDate?: Maybe<Scalars['date']>;
  cityId?: Maybe<Scalars['Int']>;
  credit?: Maybe<Scalars['Int']>;
  favoriteCategoryIds?: Maybe<Array<Scalars['Int']>>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
};


export type MutationUploadBackgroundImageOnBusinessArgs = {
  file: Scalars['Upload'];
  id: Scalars['Int'];
};


export type MutationUploadLogoOnBusinessArgs = {
  file: Scalars['Upload'];
  id: Scalars['Int'];
};


export type MutationUseCouponArgs = {
  id: Scalars['Int'];
};

export type Offer = {
  __typename?: 'Offer';
  addToCartCount: Scalars['Int'];
  address?: Maybe<Address>;
  business?: Maybe<Business>;
  categories?: Maybe<Array<Maybe<Category>>>;
  couponCount?: Maybe<Scalars['Int']>;
  couponValidUntil?: Maybe<Scalars['Int']>;
  createdAt: Scalars['date'];
  description: Scalars['String'];
  discount?: Maybe<Scalars['Int']>;
  distance?: Maybe<Scalars['Int']>;
  expireAt?: Maybe<Scalars['date']>;
  id: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  isDisplayed: Scalars['Boolean'];
  isEvent: Scalars['Boolean'];
  isFlagship: Scalars['Boolean'];
  name: Scalars['String'];
  orderDetail?: Maybe<OrderBusinessDetail>;
  orders?: Maybe<Array<Maybe<Order>>>;
  originalPrice: Scalars['Int'];
  photoUrl?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  quantity: Scalars['Int'];
  quantityLeft?: Maybe<Scalars['Int']>;
  sections?: Maybe<Array<Maybe<Section>>>;
  updatedAt?: Maybe<Scalars['date']>;
  viewCount: Scalars['Int'];
};

export type Order = {
  __typename?: 'Order';
  CardNumber?: Maybe<Scalars['String']>;
  amount: Scalars['Int'];
  amountRefunded?: Maybe<Scalars['Int']>;
  amountWithFTU: Scalars['Int'];
  cardType?: Maybe<Scalars['String']>;
  cart?: Maybe<Scalars['json']>;
  clientIp?: Maybe<Scalars['String']>;
  coupons?: Maybe<Array<Maybe<Coupon>>>;
  createdAt: Scalars['date'];
  creditAmount?: Maybe<Scalars['Int']>;
  etSecureUrl?: Maybe<Scalars['String']>;
  etTotalFees?: Maybe<Scalars['Int']>;
  fidelityAmount?: Maybe<Scalars['Int']>;
  ftuAmount?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  kooprTotalFees?: Maybe<Scalars['Int']>;
  offers?: Maybe<Array<Maybe<Offer>>>;
  refundedAt?: Maybe<Scalars['date']>;
  status?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['date']>;
  user?: Maybe<User>;
};


export type OrderCouponsArgs = {
  businessId?: Maybe<Scalars['Int']>;
};

export type OrderBusinessDetail = {
  __typename?: 'OrderBusinessDetail';
  FTUAmount: Scalars['Int'];
  amount: Scalars['Int'];
  business?: Maybe<Business>;
  createdAt: Scalars['date'];
  creditAmount: Scalars['Int'];
  etFees: Scalars['Int'];
  fidelityAmount: Scalars['Int'];
  id: Scalars['Int'];
  kooprFees: Scalars['Int'];
  offers?: Maybe<Array<Maybe<Offer>>>;
  offersInfo?: Maybe<Scalars['json']>;
  order?: Maybe<Order>;
  updatedAt?: Maybe<Scalars['date']>;
  virAmount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  Order?: Maybe<Order>;
  business?: Maybe<Business>;
  businesses?: Maybe<Array<Maybe<Business>>>;
  businessesCount?: Maybe<Scalars['Int']>;
  businessesNotValidated?: Maybe<Array<Maybe<Business>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  checkSurname?: Maybe<Scalars['Boolean']>;
  cities?: Maybe<Array<Maybe<City>>>;
  hasFidelity?: Maybe<FidelityCard>;
  imageBanks?: Maybe<Array<Maybe<ImageBank>>>;
  imageTag?: Maybe<ImageTag>;
  imageTags?: Maybe<Array<Maybe<ImageTag>>>;
  lastMinute?: Maybe<Array<Maybe<Offer>>>;
  me?: Maybe<User>;
  offer?: Maybe<Offer>;
  offers?: Maybe<Array<Maybe<Offer>>>;
  offersCount?: Maybe<Scalars['Int']>;
  orderStatus?: Maybe<Order>;
  orders?: Maybe<Array<Maybe<Order>>>;
  ordersCount?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['json']>;
  section?: Maybe<Section>;
  sections?: Maybe<Array<Maybe<Section>>>;
  transfers?: Maybe<Array<Maybe<Transfer>>>;
  updateManySections?: Maybe<Array<Maybe<Section>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  usersCount?: Maybe<Scalars['Int']>;
};


export type QueryOrderArgs = {
  id: Scalars['Int'];
};


export type QueryBusinessArgs = {
  id: Scalars['Int'];
};


export type QueryBusinessesArgs = {
  city?: Maybe<Scalars['String']>;
  isValidated?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryBusinessesCountArgs = {
  city?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryCheckSurnameArgs = {
  surname: Scalars['String'];
};


export type QueryHasFidelityArgs = {
  cart: Scalars['json'];
};


export type QueryImageBanksArgs = {
  skip?: Maybe<Scalars['Int']>;
  tagName?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryImageTagArgs = {
  id: Scalars['Int'];
};


export type QueryImageTagsArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryLastMinuteArgs = {
  take?: Maybe<Scalars['Int']>;
};


export type QueryOfferArgs = {
  id: Scalars['Int'];
};


export type QueryOffersArgs = {
  categoryId?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  uid?: Maybe<Scalars['String']>;
};


export type QueryOffersCountArgs = {
  categoryId?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryOrderStatusArgs = {
  orderId: Scalars['Int'];
};


export type QueryOrdersArgs = {
  from?: Maybe<Scalars['date']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  to?: Maybe<Scalars['date']>;
};


export type QueryOrdersCountArgs = {
  from?: Maybe<Scalars['date']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  to?: Maybe<Scalars['date']>;
};


export type QuerySearchArgs = {
  searchString: Scalars['String'];
};


export type QuerySectionArgs = {
  id: Scalars['Int'];
};


export type QueryTransfersArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryUpdateManySectionsArgs = {
  ids: Array<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  search?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryUsersCountArgs = {
  search?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Section = {
  __typename?: 'Section';
  createdAt: Scalars['date'];
  displayType?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  index: Scalars['Int'];
  name: Scalars['String'];
  offers?: Maybe<Array<Maybe<Offer>>>;
  updatedAt?: Maybe<Scalars['date']>;
};


export type SectionOffersArgs = {
  take?: Maybe<Scalars['Int']>;
};

export type Transfer = {
  __typename?: 'Transfer';
  amount: Scalars['Int'];
  createdAt: Scalars['date'];
  end?: Maybe<Scalars['date']>;
  id: Scalars['Int'];
  offersInfo?: Maybe<Scalars['json']>;
  orders?: Maybe<Array<Maybe<Order>>>;
  start?: Maybe<Scalars['date']>;
  transferDetails?: Maybe<Scalars['json']>;
  updatedAt?: Maybe<Scalars['date']>;
};


export type User = {
  __typename?: 'User';
  birthDate?: Maybe<Scalars['date']>;
  business?: Maybe<Business>;
  cards?: Maybe<Array<Maybe<Scalars['json']>>>;
  city?: Maybe<City>;
  coupons?: Maybe<Array<Maybe<Coupon>>>;
  createdAt: Scalars['date'];
  credit: Scalars['Int'];
  email: Scalars['String'];
  favoriteBusinesses?: Maybe<Array<Maybe<Business>>>;
  favoriteCategories?: Maybe<Array<Maybe<Category>>>;
  fidelityCards?: Maybe<Array<Maybe<FidelityCard>>>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  isOwner: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Maybe<Order>>>;
  phone?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['date']>;
};


export type UserCouponsArgs = {
  expired?: Maybe<Scalars['Boolean']>;
  expiredAt?: Maybe<Scalars['Boolean']>;
  status?: Maybe<CouponStatus>;
};



export type BusinessAddressesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BusinessAddressesQuery = (
  { __typename?: 'Query' }
  & { business?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id'>
    & { addresses?: Maybe<Array<Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'fullAddress'>
    )>>> }
  )> }
);

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories?: Maybe<Array<Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'imageUrl'>
  )>>> }
);

export type UpdateBusinessOpeningHoursMutationVariables = Exact<{
  id: Scalars['Int'];
  openingHours?: Maybe<Scalars['JSONObject']>;
}>;


export type UpdateBusinessOpeningHoursMutation = (
  { __typename?: 'Mutation' }
  & { updateBusiness?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id' | 'openingHours'>
  )> }
);

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  resetPasswordToken: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPassword'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
    & { business?: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, 'id' | 'name' | 'isValidated' | 'hasEvents'>
    )> }
  )> }
);

export type AddAddressToBusinessMutationVariables = Exact<{
  addAddressToBusinessBusinessId: Scalars['Int'];
  addAddressToBusinessFullAddress: Scalars['String'];
  addAddressToBusinessAddress: Scalars['String'];
  addAddressToBusinessCity: Scalars['String'];
  addAddressToBusinessCountry: Scalars['String'];
  addAddressToBusinessZipCode: Scalars['String'];
  addAddressToBusinessLat: Scalars['Float'];
  addAddressToBusinessLng: Scalars['Float'];
}>;


export type AddAddressToBusinessMutation = (
  { __typename?: 'Mutation' }
  & { addAddressToBusiness?: Maybe<(
    { __typename?: 'Address' }
    & Pick<Address, 'id'>
  )> }
);

export type BusinessDocumentsQueryVariables = Exact<{
  id: Scalars['Int'];
  documentType?: Maybe<Scalars['String']>;
}>;


export type BusinessDocumentsQuery = (
  { __typename?: 'Query' }
  & { business?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id' | 'name' | 'isValidated' | 'companyType' | 'documents'>
  )> }
);

export type AddDocumentOnBusinessMutationVariables = Exact<{
  addDocumentOnBusinessBusinessId: Scalars['Int'];
  addDocumentOnBusinessFile: Scalars['Upload'];
  addDocumentOnBusinessDocumentType?: Maybe<Scalars['String']>;
}>;


export type AddDocumentOnBusinessMutation = (
  { __typename?: 'Mutation' }
  & { addDocumentOnBusiness?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id' | 'documents'>
  )> }
);

export type BusinessQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BusinessQuery = (
  { __typename?: 'Query' }
  & { business?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id' | 'name' | 'address' | 'siret' | 'city' | 'zipCode' | 'description' | 'phone' | 'documents' | 'siteUrl' | 'country' | 'createdAt' | 'isValidated' | 'companyType' | 'logoUrl' | 'hasFidelity' | 'fidelityPercentage' | 'fidelityCount' | 'services' | 'backgroundImageUrl' | 'etActivity' | 'iban' | 'openingHours'>
    & { transfers?: Maybe<Array<Maybe<(
      { __typename?: 'Transfer' }
      & Pick<Transfer, 'id' | 'amount' | 'offersInfo' | 'createdAt'>
    )>>>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'phone'>
    )>, addresses?: Maybe<Array<Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'createdAt' | 'fullAddress'>
    )>>> }
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  updateUserId: Scalars['Int'];
  updateUserFirstName?: Maybe<Scalars['String']>;
  updateUserLastName?: Maybe<Scalars['String']>;
  updateUserPhone?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'phone'>
  )> }
);

export type UpdateBusinessEtActivityMutationVariables = Exact<{
  id: Scalars['Int'];
  expectedVolumes?: Maybe<Scalars['String']>;
  activityDescription?: Maybe<Scalars['String']>;
}>;


export type UpdateBusinessEtActivityMutation = (
  { __typename?: 'Mutation' }
  & { updateBusinessEtActivity?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id'>
  )> }
);

export type UpdateBusinessMutationVariables = Exact<{
  updateBusinessId: Scalars['Int'];
  updateBusinessIsValidated?: Maybe<Scalars['Boolean']>;
  updateBusinessPhone?: Maybe<Scalars['String']>;
  updateBusinessSiteUrl?: Maybe<Scalars['String']>;
  updateBusinessDescription?: Maybe<Scalars['String']>;
  updateBusinessCompanyType?: Maybe<Scalars['String']>;
  updateBusinessServices?: Maybe<Scalars['json']>;
  updateBusinessHasFidelity?: Maybe<Scalars['Boolean']>;
  iban?: Maybe<Scalars['String']>;
}>;


export type UpdateBusinessMutation = (
  { __typename?: 'Mutation' }
  & { updateBusiness?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'isValidated' | 'phone' | 'siteUrl' | 'companyType' | 'description' | 'services' | 'hasFidelity' | 'fidelityCount' | 'fidelityPercentage' | 'iban'>
  )> }
);

export type UploadLogoOnBusinessMutationVariables = Exact<{
  file: Scalars['Upload'];
  id: Scalars['Int'];
}>;


export type UploadLogoOnBusinessMutation = (
  { __typename?: 'Mutation' }
  & { uploadLogoOnBusiness?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id' | 'logoUrl'>
  )> }
);

export type UploadbackgroundImageOnBusinessMutationVariables = Exact<{
  file: Scalars['Upload'];
  id: Scalars['Int'];
}>;


export type UploadbackgroundImageOnBusinessMutation = (
  { __typename?: 'Mutation' }
  & { uploadBackgroundImageOnBusiness?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id' | 'backgroundImageUrl'>
  )> }
);

export type BusinessTransfersQueryVariables = Exact<{
  id: Scalars['Int'];
  transferId?: Maybe<Scalars['Int']>;
}>;


export type BusinessTransfersQuery = (
  { __typename?: 'Query' }
  & { business?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id' | 'name' | 'address' | 'siret' | 'city' | 'zipCode' | 'description' | 'phone' | 'documents' | 'siteUrl' | 'country' | 'createdAt' | 'isValidated' | 'companyType' | 'logoUrl' | 'backgroundImageUrl'>
    & { transfers?: Maybe<Array<Maybe<(
      { __typename?: 'Transfer' }
      & Pick<Transfer, 'id' | 'start' | 'end' | 'createdAt' | 'amount' | 'offersInfo' | 'transferDetails'>
      & { orders?: Maybe<Array<Maybe<(
        { __typename?: 'Order' }
        & Pick<Order, 'id' | 'uid'>
      )>>> }
    )>>> }
  )> }
);

export type BusinessCouponQueryVariables = Exact<{
  businessId: Scalars['Int'];
  couponId: Scalars['Int'];
}>;


export type BusinessCouponQuery = (
  { __typename?: 'Query' }
  & { business?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id'>
    & { coupon?: Maybe<(
      { __typename?: 'Coupon' }
      & Pick<Coupon, 'id' | 'uid' | 'status' | 'createdAt' | 'expiredAt'>
      & { offer?: Maybe<(
        { __typename?: 'Offer' }
        & Pick<Offer, 'id' | 'name'>
        & { orderDetail?: Maybe<(
          { __typename?: 'OrderBusinessDetail' }
          & Pick<OrderBusinessDetail, 'id'>
        )> }
      )>, order?: Maybe<(
        { __typename?: 'Order' }
        & Pick<Order, 'id' | 'uid' | 'createdAt'>
      )> }
    )> }
  )> }
);

export type BusinessCouponsQueryVariables = Exact<{
  id: Scalars['Int'];
  search?: Maybe<Scalars['String']>;
}>;


export type BusinessCouponsQuery = (
  { __typename?: 'Query' }
  & { business?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id'>
    & { coupons?: Maybe<Array<Maybe<(
      { __typename?: 'Coupon' }
      & Pick<Coupon, 'id' | 'uid' | 'status' | 'createdAt' | 'expiredAt'>
      & { offer?: Maybe<(
        { __typename?: 'Offer' }
        & Pick<Offer, 'id' | 'name'>
      )> }
    )>>> }
  )> }
);

export type CreateBusinessMutationVariables = Exact<{
  createBusinessName: Scalars['String'];
  createBusinessAddress: Scalars['String'];
  createBusinessCity: Scalars['String'];
  createBusinessCountry: Scalars['String'];
  createBusinessLat: Scalars['Float'];
  createBusinessLng: Scalars['Float'];
  createBusinessZipCode: Scalars['String'];
  createBusinessPhone: Scalars['String'];
  createBusinessSiret?: Maybe<Scalars['String']>;
  createBusinessFullAddress?: Maybe<Scalars['String']>;
}>;


export type CreateBusinessMutation = (
  { __typename?: 'Mutation' }
  & { createBusiness?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id'>
  )> }
);

export type BusinessDashboardQueryVariables = Exact<{
  id: Scalars['Int'];
  from?: Maybe<Scalars['date']>;
  to?: Maybe<Scalars['date']>;
}>;


export type BusinessDashboardQuery = (
  { __typename?: 'Query' }
  & { business?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id' | 'name' | 'viewCount' | 'addToCartCount' | 'offersViewCount' | 'ordersCount' | 'ordersAmount' | 'averageOrderAmount'>
    & { offers?: Maybe<Array<Maybe<(
      { __typename?: 'Offer' }
      & Pick<Offer, 'id'>
    )>>>, orderDetails?: Maybe<Array<Maybe<(
      { __typename?: 'OrderBusinessDetail' }
      & Pick<OrderBusinessDetail, 'id' | 'createdAt' | 'updatedAt' | 'virAmount' | 'amount' | 'FTUAmount' | 'kooprFees' | 'etFees'>
      & { order?: Maybe<(
        { __typename?: 'Order' }
        & Pick<Order, 'id' | 'uid' | 'status' | 'etTotalFees' | 'kooprTotalFees'>
      )> }
    )>>> }
  )> }
);

export type OfferQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type OfferQuery = (
  { __typename?: 'Query' }
  & { offer?: Maybe<(
    { __typename?: 'Offer' }
    & Pick<Offer, 'id' | 'name' | 'expireAt' | 'description' | 'quantity' | 'quantityLeft' | 'couponValidUntil' | 'couponCount' | 'isActive' | 'isDeleted' | 'price' | 'originalPrice' | 'discount' | 'imageUrl' | 'viewCount' | 'addToCartCount' | 'isFlagship' | 'isEvent'>
  )> }
);

export type UpdateOfferMutationVariables = Exact<{
  updateOfferId: Scalars['Int'];
  updateOfferIsActive?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateOfferMutation = (
  { __typename?: 'Mutation' }
  & { updateOffer?: Maybe<(
    { __typename?: 'Offer' }
    & Pick<Offer, 'id' | 'isActive'>
  )> }
);

export type ImageBanksQueryVariables = Exact<{
  imageBanksTagNames?: Maybe<Scalars['String']>;
  imageBanksTake?: Maybe<Scalars['Int']>;
  imageBanksSkip?: Maybe<Scalars['Int']>;
}>;


export type ImageBanksQuery = (
  { __typename?: 'Query' }
  & { imageBanks?: Maybe<Array<Maybe<(
    { __typename?: 'ImageBank' }
    & Pick<ImageBank, 'id' | 'key' | 'url' | 'cdnUrl'>
    & { tags?: Maybe<Array<Maybe<(
      { __typename?: 'ImageTag' }
      & Pick<ImageTag, 'name' | 'id'>
    )>>> }
  )>>> }
);

export type ImageTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type ImageTagsQuery = (
  { __typename?: 'Query' }
  & { imageTags?: Maybe<Array<Maybe<(
    { __typename?: 'ImageTag' }
    & Pick<ImageTag, 'name' | 'id'>
  )>>> }
);

export type CreateOfferMutationVariables = Exact<{
  createOfferName: Scalars['String'];
  createOfferDescription: Scalars['String'];
  createOfferBusinessId: Scalars['Int'];
  createOfferQuantity: Scalars['Int'];
  createOfferExpireAt: Scalars['date'];
  createOfferOriginalPrice: Scalars['Int'];
  createOfferDiscount: Scalars['Int'];
  createOfferCouponValidUntil: Scalars['Int'];
  createOfferCategoryIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  createOfferImageUrl: Scalars['String'];
  createOfferAdressId: Scalars['Int'];
  createOfferFile?: Maybe<Scalars['Upload']>;
  isEvent?: Maybe<Scalars['Boolean']>;
}>;


export type CreateOfferMutation = (
  { __typename?: 'Mutation' }
  & { createOffer?: Maybe<(
    { __typename?: 'Offer' }
    & Pick<Offer, 'id' | 'expireAt' | 'name' | 'quantity' | 'price' | 'discount' | 'couponValidUntil'>
    & { business?: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, 'id'>
    )> }
  )> }
);

export type BusinessOffersQueryVariables = Exact<{
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
}>;


export type BusinessOffersQuery = (
  { __typename?: 'Query' }
  & { business?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id' | 'name'>
    & { offers?: Maybe<Array<Maybe<(
      { __typename?: 'Offer' }
      & Pick<Offer, 'id' | 'name' | 'createdAt' | 'isActive' | 'price' | 'quantity' | 'quantityLeft'>
    )>>> }
  )> }
);

export type BusinessOrderQueryVariables = Exact<{
  id: Scalars['Int'];
  orderId: Scalars['Int'];
}>;


export type BusinessOrderQuery = (
  { __typename?: 'Query' }
  & { business?: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'id'>
    & { orderDetail?: Maybe<(
      { __typename?: 'OrderBusinessDetail' }
      & Pick<OrderBusinessDetail, 'id' | 'etFees' | 'amount' | 'kooprFees' | 'virAmount' | 'offersInfo'>
      & { order?: Maybe<(
        { __typename?: 'Order' }
        & Pick<Order, 'id' | 'uid' | 'status' | 'createdAt'>
        & { coupons?: Maybe<Array<Maybe<(
          { __typename?: 'Coupon' }
          & Pick<Coupon, 'id' | 'uid' | 'status' | 'expiredAt'>
          & { offer?: Maybe<(
            { __typename?: 'Offer' }
            & Pick<Offer, 'name'>
          )> }
        )>>> }
      )>, offers?: Maybe<Array<Maybe<(
        { __typename?: 'Offer' }
        & Pick<Offer, 'id' | 'name' | 'price'>
      )>>> }
    )> }
  )> }
);

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'isOwner'>
    )> }
  )> }
);

export type SignUpMutationVariables = Exact<{
  signUpEmail: Scalars['String'];
  signUpPassword: Scalars['String'];
  signUpFirstName?: Maybe<Scalars['String']>;
  signUpLastName?: Maybe<Scalars['String']>;
  signUpPhone?: Maybe<Scalars['String']>;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )> }
);


export const BusinessAddressesDocument = gql`
    query businessAddresses($id: Int!) {
  business(id: $id) {
    id
    addresses {
      id
      fullAddress
    }
  }
}
    `;

/**
 * __useBusinessAddressesQuery__
 *
 * To run a query within a React component, call `useBusinessAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessAddressesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBusinessAddressesQuery(baseOptions: Apollo.QueryHookOptions<BusinessAddressesQuery, BusinessAddressesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessAddressesQuery, BusinessAddressesQueryVariables>(BusinessAddressesDocument, options);
      }
export function useBusinessAddressesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessAddressesQuery, BusinessAddressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessAddressesQuery, BusinessAddressesQueryVariables>(BusinessAddressesDocument, options);
        }
export type BusinessAddressesQueryHookResult = ReturnType<typeof useBusinessAddressesQuery>;
export type BusinessAddressesLazyQueryHookResult = ReturnType<typeof useBusinessAddressesLazyQuery>;
export type BusinessAddressesQueryResult = Apollo.QueryResult<BusinessAddressesQuery, BusinessAddressesQueryVariables>;
export const CategoriesDocument = gql`
    query categories {
  categories {
    id
    name
    imageUrl
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const UpdateBusinessOpeningHoursDocument = gql`
    mutation updateBusinessOpeningHours($id: Int!, $openingHours: JSONObject) {
  updateBusiness(id: $id, openingHours: $openingHours) {
    id
    openingHours
  }
}
    `;
export type UpdateBusinessOpeningHoursMutationFn = Apollo.MutationFunction<UpdateBusinessOpeningHoursMutation, UpdateBusinessOpeningHoursMutationVariables>;

/**
 * __useUpdateBusinessOpeningHoursMutation__
 *
 * To run a mutation, you first call `useUpdateBusinessOpeningHoursMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBusinessOpeningHoursMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBusinessOpeningHoursMutation, { data, loading, error }] = useUpdateBusinessOpeningHoursMutation({
 *   variables: {
 *      id: // value for 'id'
 *      openingHours: // value for 'openingHours'
 *   },
 * });
 */
export function useUpdateBusinessOpeningHoursMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBusinessOpeningHoursMutation, UpdateBusinessOpeningHoursMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBusinessOpeningHoursMutation, UpdateBusinessOpeningHoursMutationVariables>(UpdateBusinessOpeningHoursDocument, options);
      }
export type UpdateBusinessOpeningHoursMutationHookResult = ReturnType<typeof useUpdateBusinessOpeningHoursMutation>;
export type UpdateBusinessOpeningHoursMutationResult = Apollo.MutationResult<UpdateBusinessOpeningHoursMutation>;
export type UpdateBusinessOpeningHoursMutationOptions = Apollo.BaseMutationOptions<UpdateBusinessOpeningHoursMutation, UpdateBusinessOpeningHoursMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($password: String!, $resetPasswordToken: String!) {
  resetPassword(password: $password, resetPasswordToken: $resetPasswordToken)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      resetPasswordToken: // value for 'resetPasswordToken'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    email
    business {
      id
      name
      isValidated
      hasEvents
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const AddAddressToBusinessDocument = gql`
    mutation addAddressToBusiness($addAddressToBusinessBusinessId: Int!, $addAddressToBusinessFullAddress: String!, $addAddressToBusinessAddress: String!, $addAddressToBusinessCity: String!, $addAddressToBusinessCountry: String!, $addAddressToBusinessZipCode: String!, $addAddressToBusinessLat: Float!, $addAddressToBusinessLng: Float!) {
  addAddressToBusiness(
    businessId: $addAddressToBusinessBusinessId
    fullAddress: $addAddressToBusinessFullAddress
    address: $addAddressToBusinessAddress
    city: $addAddressToBusinessCity
    country: $addAddressToBusinessCountry
    zipCode: $addAddressToBusinessZipCode
    lat: $addAddressToBusinessLat
    lng: $addAddressToBusinessLng
  ) {
    id
  }
}
    `;
export type AddAddressToBusinessMutationFn = Apollo.MutationFunction<AddAddressToBusinessMutation, AddAddressToBusinessMutationVariables>;

/**
 * __useAddAddressToBusinessMutation__
 *
 * To run a mutation, you first call `useAddAddressToBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAddressToBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAddressToBusinessMutation, { data, loading, error }] = useAddAddressToBusinessMutation({
 *   variables: {
 *      addAddressToBusinessBusinessId: // value for 'addAddressToBusinessBusinessId'
 *      addAddressToBusinessFullAddress: // value for 'addAddressToBusinessFullAddress'
 *      addAddressToBusinessAddress: // value for 'addAddressToBusinessAddress'
 *      addAddressToBusinessCity: // value for 'addAddressToBusinessCity'
 *      addAddressToBusinessCountry: // value for 'addAddressToBusinessCountry'
 *      addAddressToBusinessZipCode: // value for 'addAddressToBusinessZipCode'
 *      addAddressToBusinessLat: // value for 'addAddressToBusinessLat'
 *      addAddressToBusinessLng: // value for 'addAddressToBusinessLng'
 *   },
 * });
 */
export function useAddAddressToBusinessMutation(baseOptions?: Apollo.MutationHookOptions<AddAddressToBusinessMutation, AddAddressToBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAddressToBusinessMutation, AddAddressToBusinessMutationVariables>(AddAddressToBusinessDocument, options);
      }
export type AddAddressToBusinessMutationHookResult = ReturnType<typeof useAddAddressToBusinessMutation>;
export type AddAddressToBusinessMutationResult = Apollo.MutationResult<AddAddressToBusinessMutation>;
export type AddAddressToBusinessMutationOptions = Apollo.BaseMutationOptions<AddAddressToBusinessMutation, AddAddressToBusinessMutationVariables>;
export const BusinessDocumentsDocument = gql`
    query businessDocuments($id: Int!, $documentType: String) {
  business(id: $id) {
    id
    name
    isValidated
    companyType
    documents(documentType: $documentType)
  }
}
    `;

/**
 * __useBusinessDocumentsQuery__
 *
 * To run a query within a React component, call `useBusinessDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessDocumentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      documentType: // value for 'documentType'
 *   },
 * });
 */
export function useBusinessDocumentsQuery(baseOptions: Apollo.QueryHookOptions<BusinessDocumentsQuery, BusinessDocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessDocumentsQuery, BusinessDocumentsQueryVariables>(BusinessDocumentsDocument, options);
      }
export function useBusinessDocumentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessDocumentsQuery, BusinessDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessDocumentsQuery, BusinessDocumentsQueryVariables>(BusinessDocumentsDocument, options);
        }
export type BusinessDocumentsQueryHookResult = ReturnType<typeof useBusinessDocumentsQuery>;
export type BusinessDocumentsLazyQueryHookResult = ReturnType<typeof useBusinessDocumentsLazyQuery>;
export type BusinessDocumentsQueryResult = Apollo.QueryResult<BusinessDocumentsQuery, BusinessDocumentsQueryVariables>;
export const AddDocumentOnBusinessDocument = gql`
    mutation addDocumentOnBusiness($addDocumentOnBusinessBusinessId: Int!, $addDocumentOnBusinessFile: Upload!, $addDocumentOnBusinessDocumentType: String) {
  addDocumentOnBusiness(
    businessId: $addDocumentOnBusinessBusinessId
    file: $addDocumentOnBusinessFile
    documentType: $addDocumentOnBusinessDocumentType
  ) {
    id
    documents
  }
}
    `;
export type AddDocumentOnBusinessMutationFn = Apollo.MutationFunction<AddDocumentOnBusinessMutation, AddDocumentOnBusinessMutationVariables>;

/**
 * __useAddDocumentOnBusinessMutation__
 *
 * To run a mutation, you first call `useAddDocumentOnBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDocumentOnBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDocumentOnBusinessMutation, { data, loading, error }] = useAddDocumentOnBusinessMutation({
 *   variables: {
 *      addDocumentOnBusinessBusinessId: // value for 'addDocumentOnBusinessBusinessId'
 *      addDocumentOnBusinessFile: // value for 'addDocumentOnBusinessFile'
 *      addDocumentOnBusinessDocumentType: // value for 'addDocumentOnBusinessDocumentType'
 *   },
 * });
 */
export function useAddDocumentOnBusinessMutation(baseOptions?: Apollo.MutationHookOptions<AddDocumentOnBusinessMutation, AddDocumentOnBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDocumentOnBusinessMutation, AddDocumentOnBusinessMutationVariables>(AddDocumentOnBusinessDocument, options);
      }
export type AddDocumentOnBusinessMutationHookResult = ReturnType<typeof useAddDocumentOnBusinessMutation>;
export type AddDocumentOnBusinessMutationResult = Apollo.MutationResult<AddDocumentOnBusinessMutation>;
export type AddDocumentOnBusinessMutationOptions = Apollo.BaseMutationOptions<AddDocumentOnBusinessMutation, AddDocumentOnBusinessMutationVariables>;
export const BusinessDocument = gql`
    query business($id: Int!) {
  business(id: $id) {
    id
    name
    address
    siret
    city
    zipCode
    description
    phone
    documents
    siteUrl
    country
    createdAt
    isValidated
    companyType
    logoUrl
    hasFidelity
    fidelityPercentage
    fidelityCount
    services
    backgroundImageUrl
    etActivity
    iban
    openingHours
    transfers {
      id
      amount
      offersInfo
      createdAt
    }
    owner {
      id
      email
      firstName
      lastName
      phone
    }
    addresses {
      id
      createdAt
      fullAddress
    }
  }
}
    `;

/**
 * __useBusinessQuery__
 *
 * To run a query within a React component, call `useBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBusinessQuery(baseOptions: Apollo.QueryHookOptions<BusinessQuery, BusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessQuery, BusinessQueryVariables>(BusinessDocument, options);
      }
export function useBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessQuery, BusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessQuery, BusinessQueryVariables>(BusinessDocument, options);
        }
export type BusinessQueryHookResult = ReturnType<typeof useBusinessQuery>;
export type BusinessLazyQueryHookResult = ReturnType<typeof useBusinessLazyQuery>;
export type BusinessQueryResult = Apollo.QueryResult<BusinessQuery, BusinessQueryVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($updateUserId: Int!, $updateUserFirstName: String, $updateUserLastName: String, $updateUserPhone: String) {
  updateUser(
    id: $updateUserId
    firstName: $updateUserFirstName
    lastName: $updateUserLastName
    phone: $updateUserPhone
  ) {
    id
    firstName
    lastName
    phone
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserId: // value for 'updateUserId'
 *      updateUserFirstName: // value for 'updateUserFirstName'
 *      updateUserLastName: // value for 'updateUserLastName'
 *      updateUserPhone: // value for 'updateUserPhone'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateBusinessEtActivityDocument = gql`
    mutation updateBusinessEtActivity($id: Int!, $expectedVolumes: String, $activityDescription: String) {
  updateBusinessEtActivity(
    id: $id
    expectedVolumes: $expectedVolumes
    activityDescription: $activityDescription
  ) {
    id
  }
}
    `;
export type UpdateBusinessEtActivityMutationFn = Apollo.MutationFunction<UpdateBusinessEtActivityMutation, UpdateBusinessEtActivityMutationVariables>;

/**
 * __useUpdateBusinessEtActivityMutation__
 *
 * To run a mutation, you first call `useUpdateBusinessEtActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBusinessEtActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBusinessEtActivityMutation, { data, loading, error }] = useUpdateBusinessEtActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      expectedVolumes: // value for 'expectedVolumes'
 *      activityDescription: // value for 'activityDescription'
 *   },
 * });
 */
export function useUpdateBusinessEtActivityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBusinessEtActivityMutation, UpdateBusinessEtActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBusinessEtActivityMutation, UpdateBusinessEtActivityMutationVariables>(UpdateBusinessEtActivityDocument, options);
      }
export type UpdateBusinessEtActivityMutationHookResult = ReturnType<typeof useUpdateBusinessEtActivityMutation>;
export type UpdateBusinessEtActivityMutationResult = Apollo.MutationResult<UpdateBusinessEtActivityMutation>;
export type UpdateBusinessEtActivityMutationOptions = Apollo.BaseMutationOptions<UpdateBusinessEtActivityMutation, UpdateBusinessEtActivityMutationVariables>;
export const UpdateBusinessDocument = gql`
    mutation updateBusiness($updateBusinessId: Int!, $updateBusinessIsValidated: Boolean, $updateBusinessPhone: String, $updateBusinessSiteUrl: String, $updateBusinessDescription: String, $updateBusinessCompanyType: String, $updateBusinessServices: json, $updateBusinessHasFidelity: Boolean, $iban: String) {
  updateBusiness(
    id: $updateBusinessId
    isValidated: $updateBusinessIsValidated
    phone: $updateBusinessPhone
    siteUrl: $updateBusinessSiteUrl
    description: $updateBusinessDescription
    companyType: $updateBusinessCompanyType
    services: $updateBusinessServices
    hasFidelity: $updateBusinessHasFidelity
    iban: $iban
  ) {
    isValidated
    phone
    siteUrl
    companyType
    description
    services
    hasFidelity
    fidelityCount
    fidelityPercentage
    iban
  }
}
    `;
export type UpdateBusinessMutationFn = Apollo.MutationFunction<UpdateBusinessMutation, UpdateBusinessMutationVariables>;

/**
 * __useUpdateBusinessMutation__
 *
 * To run a mutation, you first call `useUpdateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBusinessMutation, { data, loading, error }] = useUpdateBusinessMutation({
 *   variables: {
 *      updateBusinessId: // value for 'updateBusinessId'
 *      updateBusinessIsValidated: // value for 'updateBusinessIsValidated'
 *      updateBusinessPhone: // value for 'updateBusinessPhone'
 *      updateBusinessSiteUrl: // value for 'updateBusinessSiteUrl'
 *      updateBusinessDescription: // value for 'updateBusinessDescription'
 *      updateBusinessCompanyType: // value for 'updateBusinessCompanyType'
 *      updateBusinessServices: // value for 'updateBusinessServices'
 *      updateBusinessHasFidelity: // value for 'updateBusinessHasFidelity'
 *      iban: // value for 'iban'
 *   },
 * });
 */
export function useUpdateBusinessMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBusinessMutation, UpdateBusinessMutationVariables>(UpdateBusinessDocument, options);
      }
export type UpdateBusinessMutationHookResult = ReturnType<typeof useUpdateBusinessMutation>;
export type UpdateBusinessMutationResult = Apollo.MutationResult<UpdateBusinessMutation>;
export type UpdateBusinessMutationOptions = Apollo.BaseMutationOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>;
export const UploadLogoOnBusinessDocument = gql`
    mutation uploadLogoOnBusiness($file: Upload!, $id: Int!) {
  uploadLogoOnBusiness(file: $file, id: $id) {
    id
    logoUrl
  }
}
    `;
export type UploadLogoOnBusinessMutationFn = Apollo.MutationFunction<UploadLogoOnBusinessMutation, UploadLogoOnBusinessMutationVariables>;

/**
 * __useUploadLogoOnBusinessMutation__
 *
 * To run a mutation, you first call `useUploadLogoOnBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadLogoOnBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadLogoOnBusinessMutation, { data, loading, error }] = useUploadLogoOnBusinessMutation({
 *   variables: {
 *      file: // value for 'file'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUploadLogoOnBusinessMutation(baseOptions?: Apollo.MutationHookOptions<UploadLogoOnBusinessMutation, UploadLogoOnBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadLogoOnBusinessMutation, UploadLogoOnBusinessMutationVariables>(UploadLogoOnBusinessDocument, options);
      }
export type UploadLogoOnBusinessMutationHookResult = ReturnType<typeof useUploadLogoOnBusinessMutation>;
export type UploadLogoOnBusinessMutationResult = Apollo.MutationResult<UploadLogoOnBusinessMutation>;
export type UploadLogoOnBusinessMutationOptions = Apollo.BaseMutationOptions<UploadLogoOnBusinessMutation, UploadLogoOnBusinessMutationVariables>;
export const UploadbackgroundImageOnBusinessDocument = gql`
    mutation uploadbackgroundImageOnBusiness($file: Upload!, $id: Int!) {
  uploadBackgroundImageOnBusiness(file: $file, id: $id) {
    id
    backgroundImageUrl
  }
}
    `;
export type UploadbackgroundImageOnBusinessMutationFn = Apollo.MutationFunction<UploadbackgroundImageOnBusinessMutation, UploadbackgroundImageOnBusinessMutationVariables>;

/**
 * __useUploadbackgroundImageOnBusinessMutation__
 *
 * To run a mutation, you first call `useUploadbackgroundImageOnBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadbackgroundImageOnBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadbackgroundImageOnBusinessMutation, { data, loading, error }] = useUploadbackgroundImageOnBusinessMutation({
 *   variables: {
 *      file: // value for 'file'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUploadbackgroundImageOnBusinessMutation(baseOptions?: Apollo.MutationHookOptions<UploadbackgroundImageOnBusinessMutation, UploadbackgroundImageOnBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadbackgroundImageOnBusinessMutation, UploadbackgroundImageOnBusinessMutationVariables>(UploadbackgroundImageOnBusinessDocument, options);
      }
export type UploadbackgroundImageOnBusinessMutationHookResult = ReturnType<typeof useUploadbackgroundImageOnBusinessMutation>;
export type UploadbackgroundImageOnBusinessMutationResult = Apollo.MutationResult<UploadbackgroundImageOnBusinessMutation>;
export type UploadbackgroundImageOnBusinessMutationOptions = Apollo.BaseMutationOptions<UploadbackgroundImageOnBusinessMutation, UploadbackgroundImageOnBusinessMutationVariables>;
export const BusinessTransfersDocument = gql`
    query businessTransfers($id: Int!, $transferId: Int) {
  business(id: $id) {
    id
    name
    address
    siret
    city
    zipCode
    description
    phone
    documents
    siteUrl
    country
    createdAt
    isValidated
    companyType
    logoUrl
    backgroundImageUrl
    transfers(transferId: $transferId) {
      id
      start
      end
      createdAt
      amount
      offersInfo
      transferDetails
      orders {
        id
        uid
      }
    }
  }
}
    `;

/**
 * __useBusinessTransfersQuery__
 *
 * To run a query within a React component, call `useBusinessTransfersQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessTransfersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessTransfersQuery({
 *   variables: {
 *      id: // value for 'id'
 *      transferId: // value for 'transferId'
 *   },
 * });
 */
export function useBusinessTransfersQuery(baseOptions: Apollo.QueryHookOptions<BusinessTransfersQuery, BusinessTransfersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessTransfersQuery, BusinessTransfersQueryVariables>(BusinessTransfersDocument, options);
      }
export function useBusinessTransfersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessTransfersQuery, BusinessTransfersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessTransfersQuery, BusinessTransfersQueryVariables>(BusinessTransfersDocument, options);
        }
export type BusinessTransfersQueryHookResult = ReturnType<typeof useBusinessTransfersQuery>;
export type BusinessTransfersLazyQueryHookResult = ReturnType<typeof useBusinessTransfersLazyQuery>;
export type BusinessTransfersQueryResult = Apollo.QueryResult<BusinessTransfersQuery, BusinessTransfersQueryVariables>;
export const BusinessCouponDocument = gql`
    query businessCoupon($businessId: Int!, $couponId: Int!) {
  business(id: $businessId) {
    id
    coupon(couponId: $couponId) {
      id
      uid
      status
      createdAt
      expiredAt
      offer {
        id
        name
        orderDetail {
          id
        }
      }
      order {
        id
        uid
        createdAt
      }
    }
  }
}
    `;

/**
 * __useBusinessCouponQuery__
 *
 * To run a query within a React component, call `useBusinessCouponQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessCouponQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessCouponQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      couponId: // value for 'couponId'
 *   },
 * });
 */
export function useBusinessCouponQuery(baseOptions: Apollo.QueryHookOptions<BusinessCouponQuery, BusinessCouponQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessCouponQuery, BusinessCouponQueryVariables>(BusinessCouponDocument, options);
      }
export function useBusinessCouponLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessCouponQuery, BusinessCouponQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessCouponQuery, BusinessCouponQueryVariables>(BusinessCouponDocument, options);
        }
export type BusinessCouponQueryHookResult = ReturnType<typeof useBusinessCouponQuery>;
export type BusinessCouponLazyQueryHookResult = ReturnType<typeof useBusinessCouponLazyQuery>;
export type BusinessCouponQueryResult = Apollo.QueryResult<BusinessCouponQuery, BusinessCouponQueryVariables>;
export const BusinessCouponsDocument = gql`
    query businessCoupons($id: Int!, $search: String) {
  business(id: $id) {
    id
    coupons(search: $search) {
      id
      uid
      status
      createdAt
      expiredAt
      offer {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useBusinessCouponsQuery__
 *
 * To run a query within a React component, call `useBusinessCouponsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessCouponsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessCouponsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useBusinessCouponsQuery(baseOptions: Apollo.QueryHookOptions<BusinessCouponsQuery, BusinessCouponsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessCouponsQuery, BusinessCouponsQueryVariables>(BusinessCouponsDocument, options);
      }
export function useBusinessCouponsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessCouponsQuery, BusinessCouponsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessCouponsQuery, BusinessCouponsQueryVariables>(BusinessCouponsDocument, options);
        }
export type BusinessCouponsQueryHookResult = ReturnType<typeof useBusinessCouponsQuery>;
export type BusinessCouponsLazyQueryHookResult = ReturnType<typeof useBusinessCouponsLazyQuery>;
export type BusinessCouponsQueryResult = Apollo.QueryResult<BusinessCouponsQuery, BusinessCouponsQueryVariables>;
export const CreateBusinessDocument = gql`
    mutation createBusiness($createBusinessName: String!, $createBusinessAddress: String!, $createBusinessCity: String!, $createBusinessCountry: String!, $createBusinessLat: Float!, $createBusinessLng: Float!, $createBusinessZipCode: String!, $createBusinessPhone: String!, $createBusinessSiret: String, $createBusinessFullAddress: String) {
  createBusiness(
    name: $createBusinessName
    address: $createBusinessAddress
    city: $createBusinessCity
    country: $createBusinessCountry
    lat: $createBusinessLat
    lng: $createBusinessLng
    zipCode: $createBusinessZipCode
    phone: $createBusinessPhone
    siret: $createBusinessSiret
    fullAddress: $createBusinessFullAddress
  ) {
    id
  }
}
    `;
export type CreateBusinessMutationFn = Apollo.MutationFunction<CreateBusinessMutation, CreateBusinessMutationVariables>;

/**
 * __useCreateBusinessMutation__
 *
 * To run a mutation, you first call `useCreateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBusinessMutation, { data, loading, error }] = useCreateBusinessMutation({
 *   variables: {
 *      createBusinessName: // value for 'createBusinessName'
 *      createBusinessAddress: // value for 'createBusinessAddress'
 *      createBusinessCity: // value for 'createBusinessCity'
 *      createBusinessCountry: // value for 'createBusinessCountry'
 *      createBusinessLat: // value for 'createBusinessLat'
 *      createBusinessLng: // value for 'createBusinessLng'
 *      createBusinessZipCode: // value for 'createBusinessZipCode'
 *      createBusinessPhone: // value for 'createBusinessPhone'
 *      createBusinessSiret: // value for 'createBusinessSiret'
 *      createBusinessFullAddress: // value for 'createBusinessFullAddress'
 *   },
 * });
 */
export function useCreateBusinessMutation(baseOptions?: Apollo.MutationHookOptions<CreateBusinessMutation, CreateBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBusinessMutation, CreateBusinessMutationVariables>(CreateBusinessDocument, options);
      }
export type CreateBusinessMutationHookResult = ReturnType<typeof useCreateBusinessMutation>;
export type CreateBusinessMutationResult = Apollo.MutationResult<CreateBusinessMutation>;
export type CreateBusinessMutationOptions = Apollo.BaseMutationOptions<CreateBusinessMutation, CreateBusinessMutationVariables>;
export const BusinessDashboardDocument = gql`
    query businessDashboard($id: Int!, $from: date, $to: date) {
  business(id: $id) {
    id
    name
    viewCount
    addToCartCount(from: $from, to: $to)
    offersViewCount(from: $from, to: $to)
    ordersCount(from: $from, to: $to)
    ordersAmount(from: $from, to: $to)
    averageOrderAmount(from: $from, to: $to)
    offers {
      id
    }
    orderDetails(from: $from, to: $to) {
      id
      createdAt
      updatedAt
      virAmount
      amount
      FTUAmount
      kooprFees
      etFees
      order {
        id
        uid
        status
        etTotalFees
        kooprTotalFees
      }
    }
  }
}
    `;

/**
 * __useBusinessDashboardQuery__
 *
 * To run a query within a React component, call `useBusinessDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessDashboardQuery({
 *   variables: {
 *      id: // value for 'id'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useBusinessDashboardQuery(baseOptions: Apollo.QueryHookOptions<BusinessDashboardQuery, BusinessDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessDashboardQuery, BusinessDashboardQueryVariables>(BusinessDashboardDocument, options);
      }
export function useBusinessDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessDashboardQuery, BusinessDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessDashboardQuery, BusinessDashboardQueryVariables>(BusinessDashboardDocument, options);
        }
export type BusinessDashboardQueryHookResult = ReturnType<typeof useBusinessDashboardQuery>;
export type BusinessDashboardLazyQueryHookResult = ReturnType<typeof useBusinessDashboardLazyQuery>;
export type BusinessDashboardQueryResult = Apollo.QueryResult<BusinessDashboardQuery, BusinessDashboardQueryVariables>;
export const OfferDocument = gql`
    query offer($id: Int!) {
  offer(id: $id) {
    id
    name
    expireAt
    description
    quantity
    quantityLeft
    couponValidUntil
    couponCount
    isActive
    isDeleted
    price
    originalPrice
    discount
    imageUrl
    viewCount
    addToCartCount
    isFlagship
    isEvent
  }
}
    `;

/**
 * __useOfferQuery__
 *
 * To run a query within a React component, call `useOfferQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfferQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOfferQuery(baseOptions: Apollo.QueryHookOptions<OfferQuery, OfferQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OfferQuery, OfferQueryVariables>(OfferDocument, options);
      }
export function useOfferLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OfferQuery, OfferQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OfferQuery, OfferQueryVariables>(OfferDocument, options);
        }
export type OfferQueryHookResult = ReturnType<typeof useOfferQuery>;
export type OfferLazyQueryHookResult = ReturnType<typeof useOfferLazyQuery>;
export type OfferQueryResult = Apollo.QueryResult<OfferQuery, OfferQueryVariables>;
export const UpdateOfferDocument = gql`
    mutation updateOffer($updateOfferId: Int!, $updateOfferIsActive: Boolean) {
  updateOffer(id: $updateOfferId, isActive: $updateOfferIsActive) {
    id
    isActive
  }
}
    `;
export type UpdateOfferMutationFn = Apollo.MutationFunction<UpdateOfferMutation, UpdateOfferMutationVariables>;

/**
 * __useUpdateOfferMutation__
 *
 * To run a mutation, you first call `useUpdateOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOfferMutation, { data, loading, error }] = useUpdateOfferMutation({
 *   variables: {
 *      updateOfferId: // value for 'updateOfferId'
 *      updateOfferIsActive: // value for 'updateOfferIsActive'
 *   },
 * });
 */
export function useUpdateOfferMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOfferMutation, UpdateOfferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOfferMutation, UpdateOfferMutationVariables>(UpdateOfferDocument, options);
      }
export type UpdateOfferMutationHookResult = ReturnType<typeof useUpdateOfferMutation>;
export type UpdateOfferMutationResult = Apollo.MutationResult<UpdateOfferMutation>;
export type UpdateOfferMutationOptions = Apollo.BaseMutationOptions<UpdateOfferMutation, UpdateOfferMutationVariables>;
export const ImageBanksDocument = gql`
    query imageBanks($imageBanksTagNames: String, $imageBanksTake: Int, $imageBanksSkip: Int) {
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

/**
 * __useImageBanksQuery__
 *
 * To run a query within a React component, call `useImageBanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageBanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageBanksQuery({
 *   variables: {
 *      imageBanksTagNames: // value for 'imageBanksTagNames'
 *      imageBanksTake: // value for 'imageBanksTake'
 *      imageBanksSkip: // value for 'imageBanksSkip'
 *   },
 * });
 */
export function useImageBanksQuery(baseOptions?: Apollo.QueryHookOptions<ImageBanksQuery, ImageBanksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImageBanksQuery, ImageBanksQueryVariables>(ImageBanksDocument, options);
      }
export function useImageBanksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageBanksQuery, ImageBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImageBanksQuery, ImageBanksQueryVariables>(ImageBanksDocument, options);
        }
export type ImageBanksQueryHookResult = ReturnType<typeof useImageBanksQuery>;
export type ImageBanksLazyQueryHookResult = ReturnType<typeof useImageBanksLazyQuery>;
export type ImageBanksQueryResult = Apollo.QueryResult<ImageBanksQuery, ImageBanksQueryVariables>;
export const ImageTagsDocument = gql`
    query imageTags {
  imageTags {
    name
    id
  }
}
    `;

/**
 * __useImageTagsQuery__
 *
 * To run a query within a React component, call `useImageTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useImageTagsQuery(baseOptions?: Apollo.QueryHookOptions<ImageTagsQuery, ImageTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImageTagsQuery, ImageTagsQueryVariables>(ImageTagsDocument, options);
      }
export function useImageTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageTagsQuery, ImageTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImageTagsQuery, ImageTagsQueryVariables>(ImageTagsDocument, options);
        }
export type ImageTagsQueryHookResult = ReturnType<typeof useImageTagsQuery>;
export type ImageTagsLazyQueryHookResult = ReturnType<typeof useImageTagsLazyQuery>;
export type ImageTagsQueryResult = Apollo.QueryResult<ImageTagsQuery, ImageTagsQueryVariables>;
export const CreateOfferDocument = gql`
    mutation createOffer($createOfferName: String!, $createOfferDescription: String!, $createOfferBusinessId: Int!, $createOfferQuantity: Int!, $createOfferExpireAt: date!, $createOfferOriginalPrice: Int!, $createOfferDiscount: Int!, $createOfferCouponValidUntil: Int!, $createOfferCategoryIds: [Int!], $createOfferImageUrl: String!, $createOfferAdressId: Int!, $createOfferFile: Upload, $isEvent: Boolean) {
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
export type CreateOfferMutationFn = Apollo.MutationFunction<CreateOfferMutation, CreateOfferMutationVariables>;

/**
 * __useCreateOfferMutation__
 *
 * To run a mutation, you first call `useCreateOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOfferMutation, { data, loading, error }] = useCreateOfferMutation({
 *   variables: {
 *      createOfferName: // value for 'createOfferName'
 *      createOfferDescription: // value for 'createOfferDescription'
 *      createOfferBusinessId: // value for 'createOfferBusinessId'
 *      createOfferQuantity: // value for 'createOfferQuantity'
 *      createOfferExpireAt: // value for 'createOfferExpireAt'
 *      createOfferOriginalPrice: // value for 'createOfferOriginalPrice'
 *      createOfferDiscount: // value for 'createOfferDiscount'
 *      createOfferCouponValidUntil: // value for 'createOfferCouponValidUntil'
 *      createOfferCategoryIds: // value for 'createOfferCategoryIds'
 *      createOfferImageUrl: // value for 'createOfferImageUrl'
 *      createOfferAdressId: // value for 'createOfferAdressId'
 *      createOfferFile: // value for 'createOfferFile'
 *      isEvent: // value for 'isEvent'
 *   },
 * });
 */
export function useCreateOfferMutation(baseOptions?: Apollo.MutationHookOptions<CreateOfferMutation, CreateOfferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOfferMutation, CreateOfferMutationVariables>(CreateOfferDocument, options);
      }
export type CreateOfferMutationHookResult = ReturnType<typeof useCreateOfferMutation>;
export type CreateOfferMutationResult = Apollo.MutationResult<CreateOfferMutation>;
export type CreateOfferMutationOptions = Apollo.BaseMutationOptions<CreateOfferMutation, CreateOfferMutationVariables>;
export const BusinessOffersDocument = gql`
    query businessOffers($id: Int!, $name: String) {
  business(id: $id) {
    id
    name
    offers(name: $name, admin: true) {
      id
      name
      createdAt
      isActive
      price
      quantity
      quantityLeft
    }
  }
}
    `;

/**
 * __useBusinessOffersQuery__
 *
 * To run a query within a React component, call `useBusinessOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessOffersQuery({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useBusinessOffersQuery(baseOptions: Apollo.QueryHookOptions<BusinessOffersQuery, BusinessOffersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessOffersQuery, BusinessOffersQueryVariables>(BusinessOffersDocument, options);
      }
export function useBusinessOffersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessOffersQuery, BusinessOffersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessOffersQuery, BusinessOffersQueryVariables>(BusinessOffersDocument, options);
        }
export type BusinessOffersQueryHookResult = ReturnType<typeof useBusinessOffersQuery>;
export type BusinessOffersLazyQueryHookResult = ReturnType<typeof useBusinessOffersLazyQuery>;
export type BusinessOffersQueryResult = Apollo.QueryResult<BusinessOffersQuery, BusinessOffersQueryVariables>;
export const BusinessOrderDocument = gql`
    query businessOrder($id: Int!, $orderId: Int!) {
  business(id: $id) {
    id
    orderDetail(orderId: $orderId) {
      id
      etFees
      amount
      kooprFees
      virAmount
      order {
        id
        uid
        status
        createdAt
        coupons(businessId: $id) {
          id
          uid
          status
          expiredAt
          offer {
            name
          }
        }
      }
      offersInfo
      offers {
        id
        name
        price
      }
    }
  }
}
    `;

/**
 * __useBusinessOrderQuery__
 *
 * To run a query within a React component, call `useBusinessOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useBusinessOrderQuery(baseOptions: Apollo.QueryHookOptions<BusinessOrderQuery, BusinessOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessOrderQuery, BusinessOrderQueryVariables>(BusinessOrderDocument, options);
      }
export function useBusinessOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessOrderQuery, BusinessOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessOrderQuery, BusinessOrderQueryVariables>(BusinessOrderDocument, options);
        }
export type BusinessOrderQueryHookResult = ReturnType<typeof useBusinessOrderQuery>;
export type BusinessOrderLazyQueryHookResult = ReturnType<typeof useBusinessOrderLazyQuery>;
export type BusinessOrderQueryResult = Apollo.QueryResult<BusinessOrderQuery, BusinessOrderQueryVariables>;
export const SignInDocument = gql`
    mutation signIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    token
    user {
      id
      isOwner
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($signUpEmail: String!, $signUpPassword: String!, $signUpFirstName: String, $signUpLastName: String, $signUpPhone: String) {
  signUp(
    email: $signUpEmail
    password: $signUpPassword
    firstName: $signUpFirstName
    lastName: $signUpLastName
    phone: $signUpPhone
    type: "owner"
  ) {
    token
    user {
      id
    }
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      signUpEmail: // value for 'signUpEmail'
 *      signUpPassword: // value for 'signUpPassword'
 *      signUpFirstName: // value for 'signUpFirstName'
 *      signUpLastName: // value for 'signUpLastName'
 *      signUpPhone: // value for 'signUpPhone'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;