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
    "SEE ALL CATEGORIES": "/men/seeall",
    "KURTA JACKET SETS": "/men/kurtajacketsets",
    "KURTA SETS": "/men/kurtasets",
    "INDOWESTERN": "/men/indowestern",
    "NEW ARRIVAL": "/men/newarrival",
    "SALE": "/men/sale",
    "KIDS": "/men/kids",
    "JODHPURIS": "/men/jodhpuries"
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