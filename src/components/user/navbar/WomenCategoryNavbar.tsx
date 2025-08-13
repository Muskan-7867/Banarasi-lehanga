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
    "WEDDING SHERVANIES",
    "INDO WESTERN",
    "DESIGNER COAT PENTS"
  ];

  const categoryRoutes: Record<string, string> = {
    "BRIDAL LEHANGA": "/bridal-lehanga",
    "PARTY WEAR": "/partywear",
    GOWNS: "/gowns",
    "ARTIFICIAL JEWELLERY": "/artificialjewellery",
    "BRIDAL CLUTCHES": "/bridalclutches",
    FULKARIES: "/fulkaries",
    SUITS: "/suits",
    "WEDDING SHERVANIES": "/weddingshervanies",
    "INDO WESTERN": "/indowestern",
    "DESIGNER COAT PENTS": "/designercoatpents"
  };
  return (
    <CategoryNavbar
      categories={categories}
      categoryRoutes={categoryRoutes}
      activeColor="text-red-500" // Optional customization
      borderColor="border-red-500" // Optional customization
      maxVisibleItems={6} // Optional customization
    />
  );
};
