import useCartStore from "../store/Cart.store";

const useCart = () => {
  const {
    cartCount,
    cartItems,
    addToCart,
    removeFromCart,
    syncCartFromStorage
  } = useCartStore();

  const addProductToCart = (id: string) => {
    addToCart(id);
  };

  const RemoveProductFromCart = (id: string) => {
    removeFromCart(id);
  };

  const getCartProductIds = () => {
    return cartItems;
  };

  return {
    addProductToCart,
    RemoveProductFromCart,
    cartCount,
    getCartProductIds,
    syncCartFromStorage // Make sure this is returned
  };
};

export default useCart;