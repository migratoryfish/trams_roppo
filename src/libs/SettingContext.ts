import { useState, createContext } from "react";

type BHCType = {
  isBracketHighLight: boolean;
  setIsBracketHighLight: (value: boolean) => void;
};
// const [isBracketHighLight, setIsBracketHighLight] = useState(true);
export const BracketHighLightContext = createContext<BHCType>({} as BHCType);

type PopUpACType = {
  isPopUpArticle: boolean;
  setIsPopUpArticle: (value: boolean) => void;
};

// const [isPopUpArticle, setIsPopUpArticle] = useState(true);
export const PopUpArticleContext = createContext<PopUpACType>(
  {} as PopUpACType
);
