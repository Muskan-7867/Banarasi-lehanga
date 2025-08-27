import CategoryNavbar from "./CategoryNavbar";

export const BridalNavbar = () => {
  const categories = [
    "BRIDAL LEHNGA",

    "BRIDAL UNSTICHED SUITS",
    "BRIDAL  UNSTICHED PARTY SUITS"
  ];

  const categoryRoutes: Record<string, string> = {
    "BRIDAL LEHNGA": "/bridal/bridal-lehnga",

    "BRIDAL UNSTICHED SUITS": "/bridal/bridal-unstiched-suits",
    "BRIDAL  UNSTICHED PARTY SUITS": "/bridal/bridal-unstiched-party-suits"
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
