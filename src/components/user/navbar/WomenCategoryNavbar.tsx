import CategoryNavbar from "./CategoryNavbar";

export const WomenCategoryNavbar = () => {
  const categories = [
    "BRIDAL LEHANGA",
    "PARTY WEAR",
    "GOWNS",
    "ARTIFICIAL JEWELLERY",
    "BRIDAL CLUTCHES",
    "FULKARIES",
    "SUITS",
 
    "INDO WESTERN",
   
  ];

  const categoryRoutes: Record<string, string> = {
    "BRIDAL LEHANGA": "/women/bridal-lehanga",
    "PARTY WEAR": "/women/partywear",
    GOWNS: "/women/gowns",
    "ARTIFICIAL JEWELLERY": "/women/artificialjewellery",
    "BRIDAL CLUTCHES": "/women/bridalclutches",
    FULKARIES: "/women/fulkaries",
    SUITS: "/women/suits",
  
    "INDO WESTERN": "/women/indowestern",
   
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
