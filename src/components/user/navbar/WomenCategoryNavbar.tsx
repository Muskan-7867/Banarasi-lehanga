import CategoryNavbar from "./CategoryNavbar";

export const WomenCategoryNavbar = () => {
  const categories = [
  
    "PARTY WEAR",
    "GOWNS",
    "ARTIFICIAL JEWELLERY",
    "BRIDAL CLUTCHES",
    "PHULKARIES",
    "SUITS",

    "INDO WESTERN"
  ];

  const categoryRoutes: Record<string, string> = {
    
    "PARTY WEAR": "/women/partywear",
    GOWNS: "/women/gowns",
    "ARTIFICIAL JEWELLERY": "/women/artificialjewellery",
    "BRIDAL CLUTCHES": "/women/bridalclutches",
    "PHULKARIES": "/women/phulkaries",
    SUITS: "/women/suits",

    "INDO WESTERN": "/women/indowestern"
  };
  return (
    <CategoryNavbar
      categories={categories}
      categoryRoutes={categoryRoutes}
      activeColor="app-text-color" // Optional customization
      borderColor="app-text-color" // Optional customization
      
    />
  );
};
