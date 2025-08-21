import CategoryNavbar from "./CategoryNavbar";

export const MenCategoryNavbar = () => {
  const categories = [

    "WEDDING SHERWANIS",
    "DESIGNER COAT PENTS",
    "PARTY WEAR INDOWESTERN",
  
  ];

  const categoryRoutes: Record<string, string> = {

    "WEDDING SHERWANIS": "/men/weddingsherwanis",
    "DESIGNER COAT PENTS": "/men/designercoatpents",
    "PARTY WEAR INDOWESTERN": "/men/partywearindowestern",
 
  };
  
  return (
    <CategoryNavbar
      categories={categories}
      categoryRoutes={categoryRoutes}
      activeColor="app-text-color"
      borderColor="border-app-color"
      maxVisibleItems={6}
      dropdownOnlyFor="SEE ALL CATEGORIES" 
    />
  );
};