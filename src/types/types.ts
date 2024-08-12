import { FieldValues } from "react-hook-form";
import { Option } from "react-multi-select-component";





export type CbArrayItem = {
    name: string;
    ab: {
      name: string;
      standards: {
        name: string;
        code: string;
        rateCards: RateCard;
      }[];
    }[];
  };


export type StateType = number;

type SetStateType = React.Dispatch<React.SetStateAction<StateType>>;
type SetCbArrayType = React.Dispatch<React.SetStateAction<CbArrayItem[]>>;

export interface ChildProps {
    setBaRecordCount: SetStateType;
    baData: BaData[];
    // setBaData: SetBaDataType;
    data: CbList[];
    cbArray:CbArrayItem[];
    setCbArray: SetCbArrayType
}

export interface RateCard {
    name: string;
    initial: string;
    annual: string;
    recirtification: string;
}

export interface Error {
    name: string;
    initial: string;
    annual: string;
    recirtification: string;
}

export interface RateCardData {
    initial: string;
    annual: string;
    recirtification: string;
}

export interface StandardData {
    name: string;
    code: string;
    rateCard: RateCardData;
}

export interface AbData {
    name: string;
    standards: [StandardData];
}

export interface BaData {
    name: string;
    ab: [AbData];
}

// Define types for the CB List items
export interface CBListItem {
    _id: string;
    cb: string;
}


// Define types for the form data
export interface FormData extends FieldValues {
    name: string;
    home_country: string;
    currency: string;
    gst: string;
    cerificate_language: string;
    other_certificate_languages: string;
    cb: string;
    ab: string;
    standard: Option[];
    [key: string]: string | Option[]; // Allow dynamic fields for the rates
}

export interface CbList {
    cb: string;
    ab: [AbData];
}


export interface StandardOptionsInterface {
    [key: string]: string; // or a more specific type instead of `any`
  }