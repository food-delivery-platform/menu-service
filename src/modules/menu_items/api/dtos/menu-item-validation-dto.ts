import { z } from "zod";

import { menuItemDtoSchema } from "./menu-item-dto";

const menuItemIdSchema = menuItemDtoSchema.shape.id;
const restaurantIdSchema = menuItemDtoSchema.shape.restaurantId;
const priceSchema = menuItemDtoSchema.shape.price;

const validateMenuItemsForOrderItemRequestDtoSchema = z.object({
  menuItemId: menuItemIdSchema,
  quantity: z.number().int().positive(),
  expectedPrice: priceSchema,
  currency: z.string(),
});

export const validateMenuItemsForOrderRequestDtoSchema = z.object({
  restaurantId: restaurantIdSchema,
  items: z.array(validateMenuItemsForOrderItemRequestDtoSchema),
});

export type ValidateMenuItemsForOrderRequestDto = z.infer<
  typeof validateMenuItemsForOrderRequestDtoSchema
>;

const validatedOrderMenuItemDtoSchema = z.object({
  menuItemId: menuItemIdSchema,
  restaurantId: restaurantIdSchema,

  name: z.string(),
  quantity: z.number().int().positive(),

  price: priceSchema,
  currency: z.string(),

  totalPrice: priceSchema,
});

export type ValidatedOrderMenuItemDto = z.infer<
  typeof validatedOrderMenuItemDtoSchema
>;

const menuValidationErrorCodeSchema = z.enum([
  "ITEM_NOT_FOUND",
  "ITEM_UNAVAILABLE",
  "ITEM_RESTAURANT_MISMATCH",
  "PRICE_CHANGED",
  "INVALID_QUANTITY",
  "CURRENCY_MISMATCH",
]);

export type MenuValidationErrorCode = z.infer<
  typeof menuValidationErrorCodeSchema
>;

const menuValidationErrorDtoSchema = z.object({
  menuItemId: menuItemIdSchema.optional(),

  code: menuValidationErrorCodeSchema,
  message: z.string(),

  currentPrice: priceSchema.optional(),
  expectedPrice: priceSchema.optional(),
});

export type MenuValidationErrorDto = z.infer<
  typeof menuValidationErrorDtoSchema
>;

const validateMenuItemsForOrderResponseDtoSchema = z.object({
  valid: z.boolean(),

  restaurantId: restaurantIdSchema,

  items: z.array(validatedOrderMenuItemDtoSchema),

  totalPrice: priceSchema,
  currency: z.string(),

  errors: z.array(menuValidationErrorDtoSchema),
});

export type ValidateMenuItemsForOrderResponseDto = z.infer<
  typeof validateMenuItemsForOrderResponseDtoSchema
>;
