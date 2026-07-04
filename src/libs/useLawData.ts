import useSWR from "swr";
import axios from "axios";
import { getExamList, getLawCode } from "../util/util";
import { examScopeOfProsKey } from "./examScopeOfProsKey";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const isProduction = import.meta.env.MODE === "production";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

//試験範囲(法令リスト)を取得するフック
//フックのルール(常に同じ順序で呼び出す)を満たすため useSWR は無条件に呼び出し、
//開発モードでは key に null を渡してフェッチを無効化する(SWRの条件付きフェッチ)
export const useExamList = (professionExam: number) => {
  const exam = examScopeOfProsKey[professionExam];
  const { data, error, isLoading } = useSWR(
    isProduction
      ? `https://tr-rest-api.vercel.app/api/examScopeOfPro/${exam}`
      : null,
    fetcher,
    swrOptions
  );

  if (!isProduction) {
    return {
      examList: getExamList(professionExam),
      error: undefined,
      isLoading: false,
    };
  }

  return { examList: data, error, isLoading };
};

//法令の全条文データを取得するフック
//開発モードではローカルJSON、本番モードではREST APIから取得する
export const useLawArticles = (lawId: string) => {
  const { data, error, isLoading } = useSWR(
    isProduction
      ? `https://tr-rest-api.vercel.app/api/lawArticles3/${lawId}`
      : null,
    fetcher,
    swrOptions
  );

  if (!isProduction) {
    return {
      articles: getLawCode(lawId),
      error: undefined,
      isLoading: false,
    };
  }

  return { articles: data?.[0], error, isLoading };
};
