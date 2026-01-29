import {
  createBrand,
  getBrandById,
  getBrands,
  updateBrand,
} from "../controllers/brand.controller.js";

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
// import { brandMiddleware } from "../middlewares/brand.middleware.js";
// import { checkPermission } from "../middlewares/check-permission.middleware.js";
// import { verifyToken } from "../middlewares/verify-token.middleware.js";
// import { wrapRequestHandler } from "../utils/handlers.util.js";

const router = express.Router();

router.use(protectRoute);

// create brand
router.post(
  "/create-brand",
  createBrand
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // wrapRequestHandler(brandMiddleware),
  // wrapRequestHandler(createBrand)
);
// get all
router.get(
  "/get-all-brands",
  getBrands
  // wrapRequestHandler(getBrands)
);
// get by id
router.get(
  "/get-brand-by-id/:brandId",
  getBrandById
  // wrapRequestHandler(getBrandById)
);
// update
router.patch(
  "/update-brand/:brandId",
  updateBrand
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  // wrapRequestHandler(updateBrand)
);

export default router;
