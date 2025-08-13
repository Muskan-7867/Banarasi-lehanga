import CategoryNavbar from "./CategoryNavbar";

export const MenCategoryNavbar = () => {
  const categories = [
    "SEE ALL CATEGORIES",
    "KURTA JACKET SETS",
    "KURTA SETS",
    "INDOWESTERN",
    "NEW ARRIVAL",
    "SALE",
    "KIDS",
    "JODHPURIS"
  ];

  const categoryRoutes: Record<string, string> = {
    "SEE ALL CATEGORIES": "/seeall",
    "KURTA JACKET SETS": "/kurta-jacket-sets",
    "KURTA SETS": "/kurtasets",
    "INDOWESTERN": "/indowestern",
    "NEW ARRIVAL": "/newarrival",
    "SALE": "/sale",
    "KIDS": "/kids",
    "JODHPURIS": "/jodhpuries"
  };
  
  return (
    <CategoryNavbar
      categories={categories}
      categoryRoutes={categoryRoutes}
      activeColor="text-red-500"
      borderColor="border-red-500"
      maxVisibleItems={6}
      dropdownOnlyFor="SEE ALL CATEGORIES" 
    />
  );
};