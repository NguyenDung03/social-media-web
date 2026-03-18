import express from "express";
import {
  CreatePaymentURL,
  ValidatePayment,
  VerifyPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create_payment_url", CreatePaymentURL);
router.get("/vnpay_ipn", ValidatePayment);
router.get("/vnpay_return", VerifyPayment);

export default router;
