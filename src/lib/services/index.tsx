import { ProductsResponse } from "@/app/admin/products/page";
import { products } from "@/data/products";
import {   ProductT } from "@/types";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const base_url = "http://localhost:8001/api/v1";

const getToken = () => {
  return Cookies.get("token");
};

const createCategory = async (name: string) => {
  try {
    const resp = await axios.post(
      `${base_url}/category`,
      { name },
      {
        headers: {
          authorization: getToken()
        }
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

const getCategories = async () => {
  try {
    const resp = await axios.get(
      `${base_url}/category`
      // {
      //   headers: {
      //     authorization: getToken(),
      //   },
      // }
    );
    console.log("from getcategory", resp.data);
    return resp.data.data;
  } catch (error) {
    return error;
  }
};

const deleteCategory = async (id: string) => {
  try {
    const resp = await axios.delete(
      `${base_url}/category/${id}`

      // {
      //   headers: {
      //     authorization: getToken(),
      //   },
      // }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

const createSubCategory = async (name: string, parentCategoryId: string) => {
  try {
    const resp = await axios.post(
      `${base_url}/subcategory`,
      { name, parentCategoryId },
      {
        headers: {
          authorization: getToken()
        }
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

const createSize = async (name: string, categoryId: string) => {
  try {
    const resp = await axios.post(
      `${base_url}/size`,
      { name, categoryId },
      {
        headers: {
          authorization: getToken()
        }
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

const getSizes = async () => {
  try {
    const resp = await axios.get(`${base_url}/size`, {
      headers: {
        authorization: getToken()
      }
    });
    return resp.data.data;
  } catch (error) {
    return error;
  }
};
const deleteSize = async (id: string) => {
  try {
    const resp = await axios.delete(`${base_url}/size/${id}`, {
      headers: {
        authorization: getToken()
      }
    });
    return resp;
  } catch (error) {
    return error;
  }
};

const updateSize = async (id: string, name: string, categoryId: string) => {
  try {
    const resp = await axios.put(
      `${base_url}/size/${id}`,
      { name, categoryId },
      {
        headers: {
          authorization: getToken()
        }
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

const getQuality = async () => {
  try {
    const resp = await axios.get(`${base_url}/quality`, {
      headers: {
        authorization: getToken()
      }
    });
    return resp.data.data;
  } catch (error) {
    return error;
  }
};

const updateQuality = async (id: string, name: string) => {
  try {
    const resp = await axios.put(
      `${base_url}/quality/${id}`,
      { name },
      {
        headers: {
          authorization: getToken()
        }
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

const deleteQuality = async (id: string) => {
  try {
    const resp = await axios.delete(`${base_url}/quality/${id}`, {
      headers: {
        authorization: getToken()
      }
    });
    return resp;
  } catch (error) {
    return error;
  }
};

const createQuality = async (name: string) => {
  try {
    const resp = await axios.post(
      `${base_url}/quality`,
      { name },
      {
        headers: {
          authorization: getToken()
        }
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

const createColor = async (name: string) => {
  try {
    const resp = await axios.post(
      `${base_url}/color`,
      { name },
      {
        headers: {
          authorization: getToken()
        }
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

const getColor = async () => {
  try {
    const resp = await axios.get(`${base_url}/color`, {
      headers: {
        authorization: getToken()
      }
    });
    return resp.data.data;
  } catch (error) {
    return error;
  }
};

const updateColor = async (id: string, name: string) => {
  try {
    const resp = await axios.put(
      `${base_url}/color/${id}`,
      { name },
      {
        headers: {
          authorization: getToken()
        }
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

const deleteColor = async (id: string) => {
  try {
    const resp = await axios.delete(`${base_url}/color/${id}`, {
      headers: {
        authorization: getToken()
      }
    });
    return resp;
  } catch (error) {
    return error;
  }
};



const deleteProduct = async (id: string) => {
  try {
    const resp = await axios.delete(`${base_url}/product/${id}`, {
      headers: {
        authorization: getToken()
      }
    });
    return resp;
  } catch (error) {
    return error;
  }
};

const fetchProductById = async (id: string): Promise<ProductT> => {
  try {
    const resp = await axios.get(`${base_url}/product/single/${id}`, {
      headers: {
        authorization: getToken()
      }
    });
    if (!resp.data.success) {
      toast.error("failed to fetch product");
      throw new Error(resp.data.message || "Failed to fetch products");
    }
    return resp.data.data;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id: string, product: ProductT) => {
  console.log(id, products);

  try {
    const resp = await axios.put(
      `${base_url}/product/update/${id}`,
      { product },
      {
        headers: {
          authorization: getToken()
        }
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

 const fetchAllProducts = async (params?: {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  category?: string;
}): Promise<ProductsResponse> => {
  try {
    const resp = await axios.get(`${base_url}/product`, {
      headers: {
        authorization: getToken()
      },
      params: {
        page: params?.page,
        limit: params?.pageSize,
        search: params?.searchTerm,
        category: params?.category
      }
    });
    
    if (!resp.data.success) {
      throw new Error(resp.data.message || "Failed to fetch products");
    }
     console.log("from fetchprods", resp.data)
    return {
      products: resp.data.data.products,
      count: resp.data.data.count
    };
  } catch  {
    throw new Error("Failed to fetch products");
  }
};

export {
  createCategory,
  createSubCategory,
  getCategories,
  deleteCategory,
  createSize,
  getSizes,
  deleteSize,
  updateSize,
  getQuality,
  updateQuality,
  deleteQuality,
  createQuality,
  createColor,
  getColor,
  updateColor,
  deleteColor,

  deleteProduct,
  fetchProductById,
  updateProduct,
  fetchAllProducts
};
