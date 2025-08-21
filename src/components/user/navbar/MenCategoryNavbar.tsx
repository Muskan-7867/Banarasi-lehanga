import CategoryNavbar from "./CategoryNavbar";

export const MenCategoryNavbar = () => {
  const categories = [
    "SEE ALL CATEGORIES",
    "WEDDING SHERVANIES",
    "DESIGNER COAT PENTS",
    "PARTY WEAR INDOWESTERN",
  
  ];

  const categoryRoutes: Record<string, string> = {
    "SEE ALL CATEGORIES": "/men/seeall",
    "WEDDING SHERVANIES": "/men/weddingshervanies",
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