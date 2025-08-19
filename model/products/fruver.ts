import { z } from "zod";
const fruverCategories = ["frutas", "verduras", "hortalizas", "aromaticas_y_especias", "legumbres", "frutos_secos_y_semillas", "procesados_y_derivados", "otros"] as const;
const fruverTags = {
    frutas: [
        "tropicales",
        "citricas",
        "de_estacion",
        "exoticas",
        "de_hueso",
        "de_pepita",
        "de_bosque",
    ] as const,
    verduras: [
        "de_hoja_verde",
        "tuberculos",
        "cruciferas",
        "de_fruto",
        "de_flor",
        "bulbos",
        "raiz_comestible",
    ] as const,
    hortalizas: [
        "frescas",
        "cocidas_o_asadas",
        "rellenables",
    ] as const,
    aromaticas_y_especias: [
        "aromaticas_frescas",
        "especias_secas",
        "mezclas_o_infusiones"
    ] as const,
    legumbres: [
        "secas",
        "frescas",
        "procesadas",
    ] as const,
    frutos_secos_y_semillas: [
        "frutos_secos",
        "semillas",
        "aceites_y_derivados",
    ] as const,
    procesados_y_derivados: [
        "jugos_naturales",
        "mermeladas",
        "frutas_deshidratadas",
        "pulpas_congeladas"
    ] as const,
    otros: [
        ""
    ] as const,
} as const;

const measureUnits = ["kg", "g", "libra"] as const;

const measureUnitsSchema = z.enum(measureUnits)
const baseFruverSchema = z.object({
    _id: z.string().optional(),
    sku: z.string(),
    name: z.string(),
    image: z.string(),
    category: z.enum(fruverCategories),
    tags: z.array(z.string()).optional(),
    avrWeight: z.number(),
});

const tenantFruverSchema = z.object({
    type: z.literal("fruver"),
    show: z.boolean().optional(),
    cost: z.number().optional(),
    pricePerGram: z.number(),
    stockStatus: z.enum(["in", "out"]).optional(),
    stock: z.number().optional(),
    unit: measureUnitsSchema,
    unitQuantity: z.number(),
    sellingFormat: z.enum(["weight", "unit"]),
});

const fruverSchema = baseFruverSchema.merge(tenantFruverSchema);

type FruverProduct = z.infer<typeof fruverSchema>
type BaseFruverProduct = z.infer<typeof baseFruverSchema>;
type TenantFruverProduct = z.infer<typeof tenantFruverSchema>;
type Unit = z.infer<typeof fruverSchema>["unit"];
type SellingFormat = z.infer<typeof fruverSchema>["sellingFormat"];

export { baseFruverSchema, fruverCategories, fruverSchema, fruverTags, measureUnits };
export type {
    BaseFruverProduct, FruverProduct, SellingFormat, TenantFruverProduct, Unit
};
