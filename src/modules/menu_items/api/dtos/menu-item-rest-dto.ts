import { z } from "zod";

import { menuItemDtoSchema } from "./menu-item-dto";

const menuItemIdSchema = menuItemDtoSchema.shape.id;
const restaurantIdSchema = menuItemDtoSchema.shape.restaurantId;
const priceSchema = menuItemDtoSchema.shape.price;

const getMenuItemsByRestaurantResponseDtoSchema = z.object({
  restaurantId: restaurantIdSchema,
  items: z.array(menuItemDtoSchema),
});

export type GetMenuItemsByRestaurantResponseDto = z.infer<
  typeof getMenuItemsByRestaurantResponseDtoSchema
>;

export const getMenuItemsByIdsRequestDtoSchema = z.object({
  menuItemIds: z.array(menuItemIdSchema),
});

export type GetMenuItemsByIdsRequestDto = z.infer<
  typeof getMenuItemsByIdsRequestDtoSchema
>;

const getMenuItemsByIdsResponseDtoSchema = z.object({
  items: z.array(menuItemDtoSchema),
  unavailableItemIds: z.array(menuItemIdSchema),
  totalPrice: priceSchema,
});

export type GetMenuItemsByIdsResponseDto = z.infer<
  typeof getMenuItemsByIdsResponseDtoSchema
>;

export const addMenuItemRequestDtoSchema = menuItemDtoSchema.omit({
  id: true,
}).extend({
  isAvailable: menuItemDtoSchema.shape.isAvailable.optional(),
});

export type AddMenuItemRequestDto = z.infer<typeof addMenuItemRequestDtoSchema>;

const addMenuItemResponseDtoSchema = z.object({
  item: menuItemDtoSchema,
});

export type AddMenuItemResponseDto = z.infer<typeof addMenuItemResponseDtoSchema>;

export const editMenuItemRequestDtoSchema = menuItemDtoSchema.omit({
  id: true,
  restaurantId: true,
}).partial();

export type EditMenuItemRequestDto = z.infer<typeof editMenuItemRequestDtoSchema>;

const editMenuItemResponseDtoSchema = z.object({
  item: menuItemDtoSchema,
});

export type EditMenuItemResponseDto = z.infer<
  typeof editMenuItemResponseDtoSchema
>;
