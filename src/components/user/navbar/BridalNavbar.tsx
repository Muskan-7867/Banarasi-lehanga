import CategoryNavbar from "./CategoryNavbar";

export const BridalNavbar = () => {
  const categories = [
    "BRIDAL LEHANGA",
    "BRIDAL SHERVANIES",
    "BRIDAL UNSTICHED SUITS",
    "BridaL UNSTICHED PARTY SUITS"
   
  ];

  const categoryRoutes: Record<string, string> = {
    "BRIDAL LEHANGA": "/women/bridal-lehanga",
    "BRIDAL SHERVANIES": "/men/bridal-shervanies",
  
    "BRIDAL UNSTICHED SUITS": "/women/bridal-unstiched-suits",
    "BridaL UNSTICHED PARTY SUITS": "/women/bridal-unstiched-party-suits",

  };
  return (
    <CategoryNavbar
      categories={categories}
      categoryRoutes={categoryRoutes}
      activeColor="app-text-color" // Optional customization
      borderColor="app-text-color" // Optional customization
      maxVisibleItems={6} // Optional customization
    />
  );
};
