import express from "express";
import { productController } from "../controllers/product.controller.js";
// import { checkPermission } from "../middlewares/check-permission.middleware.js";
// import { productMiddleware } from "../middlewares/product.middleware.js";
// import { verifyToken } from "../middlewares/verify-token.middleware.js";
// import { wrapRequestHandler } from "../utils/handlers.util.js";

const router = express.Router();
//1
router.post(
  "/add-product",
  productController.addProduct
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // wrapRequestHandler(productMiddleware),
  // wrapRequestHandler(productController.addProduct)
);
//2
// router to get all products
router.get(
  "/get-all-product",
  productController.getAllProduct
  // wrapRequestHandler(productController.getAllProduct)
);
// 3 router to get product by id
router.get(
  "/get-product-by-id/:id",
  productController.getProductById
  // wrapRequestHandler(productController.getProductById)
);
// 4 router get product with status
router.get(
  "/get-product-with-status/:status/:deleted",
  productController.getProductWithStatus
  // wrapRequestHandler(productController.getProductWithStatus)
);

//done

//5  router update status
router.patch(
  "/update-product-status/:productId",
  productController.updateStatus
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // wrapRequestHandler(productController.updateStatus)
);

// 6
// router update product
router.put(
  "/update-product/:productId",
  productController.updateProduct
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // wrapRequestHandler(productMiddleware),
  // wrapRequestHandler(productController.updateProduct)
);

// 7 router delete product
router.delete(
  "/delete-product/:productId",
  productController.deleteProduct
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // wrapRequestHandler(productController.deleteProduct)
);

// 8 xoá cứng nhiều sản phẩm
router.delete(
  `/hard-delete-multiple-product`,
  productController.deleteMultiple
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // productController.deleteMultiple
);

// 9 xoá mềm nhiều sản phẩm
router.patch(
  `/soft-delete-multiple-product`,
  productController.updateManyProduct
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // productController.updateManyProduct
);

//10 xóa mềm 1 sản phẩm
router.patch(
  "/soft-delete-product/:productId",
  productController.softDeleteProduct
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // wrapRequestHandler(productController.softDeleteProduct)
);
export default router;
