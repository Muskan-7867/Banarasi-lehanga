// import SingleProdHeader from "@/components/user/products/components/SingleProdHeader";
import SingleProductScreen from "@/components/user/products/components/SingleProductScreen";

export default function ProductPage() {
  return (
    <div>
      {/* <SingleProdHeader /> */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-black">
        <SingleProductScreen />
      </div>
    </div>
  );
}