import { queryOptions } from "@tanstack/react-query";
import fetchProductsByTag, { fetchAllProducts, fetchProductById,  getCategories, getColor, getQuality, getSizes } from "../services";


const getCategoriesQuery = () => {
  return queryOptions({
    queryKey: ["CategoriesQuery"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const getSizesQuery = () => {
  return queryOptions({
    queryKey: ["SizesQuery"],
    queryFn: getSizes,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
const getQuanlityQuery = () => {
  return queryOptions({
    queryKey: ["QualityQuery"],
    queryFn: getQuality,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const getColorQuery = () => {
  return queryOptions({
    queryKey: ["ColorQuery"],
    queryFn: getColor,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
const getProductByIdQuery = (id:string) => {
  return queryOptions({
    queryKey: ["ProductByIdQuery", id],
    queryFn: ()=>fetchProductById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};


const getProductsQuery = (params?: {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  category?: string;
}) => {
  return {
    queryKey: ["products", params],
    queryFn: () => fetchAllProducts(params),
    staleTime: 1000 * 60 * 5,
  };
};

 const getProductsByTagQuery = (tag: string,) => {
  return {
    queryKey: ["products", "tag", tag],
    queryFn: () => fetchProductsByTag(tag),
    staleTime: 1000 * 60 * 5,
    
  };
};

export { getCategoriesQuery, getSizesQuery, getQuanlityQuery, getColorQuery,getProductsQuery, getProductByIdQuery, getProductsByTagQuery };
