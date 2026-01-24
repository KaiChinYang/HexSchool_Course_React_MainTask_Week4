import ProductsTable from "../components/ProductsTable";
import ProductDetail from "../components/ProductDetail";

export default function AdminPage({
  products,
  tempProduct,
  tempImgUrl,
  setTempProduct,
  setTempImgUrl,
  checkLogin,
  updateProducts,
  deleteProduct,
}) {
  const handleUpdateProduct = async (product, type, closeModal) => {
    if (!product) {
      console.error("product is null");
      return;
    }
    try {
      await updateProducts(product.id, product, type);
      closeModal(); // ⭐ 成功後關 modal
    } catch (error) {
      alert("更新產品失敗，請稍後再試");
      console.error(error);
    }
  };
  const handleDeleteProduct = async (product, closeModal) => {
    try {
      await deleteProduct(product.id);
      closeModal(); // ⭐ 成功後關 modal
    } catch (error) {
      alert("刪除產品失敗，請稍後再試");
      console.error(error);
    }
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <ProductsTable
          products={products}
          checkLogin={checkLogin}
          onSelectProduct={(product) => {
            setTempProduct(product);
            setTempImgUrl(product.imageUrl);
          }}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
        {/* <ProductDetail
          products={products}
          product={tempProduct}
          tempImgUrl={tempImgUrl}
          setTempImgUrl={setTempImgUrl}
        /> */}
      </div>
    </div>
  );
}
