import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";

// import { categoryMiddleware } from "../middlewares/category.middleware.js";
// import { checkPermission } from "../middlewares/check-permission.middleware.js";
// import { verifyToken } from "../middlewares/verify-token.middleware.js";
// import { wrapRequestHandler } from "../utils/handlers.util.js";

import express from "express";

const router = express.Router();

// create brand
router.post(
  "/create-category",
  createCategory
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // wrapRequestHandler(categoryMiddleware),
  // wrapRequestHandler(createCategory)
);
// get all
router.get(
  "/get-categories",
  getCategories
  // wrapRequestHandler(getCategories)
);
// get by id
router.get(
  "/get-category-by-id/:id",
  getCategoryById
  // wrapRequestHandler(getCategoryById)
);
// update
router.patch(
  "/update-category-by-id/:id",
  updateCategory
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // wrapRequestHandler(updateCategory)
);

// delete
router.delete(
  "/delete-category-by-id/:id",
  deleteCategory
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // wrapRequestHandler(deleteCategory)
);

export default router;
