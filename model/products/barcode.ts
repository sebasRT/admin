import { z } from "zod";

const categories = ["alimentos_basicos", "cuidado_e_higiene", "mecato", "licor", "aseo", "bebidas", "carnicos", "frutas_y_verduras", "mascotas", "otra"] as const;
type Category = (typeof categories)[number];

const CATEGORIES: Record<Category, string> = {
    "alimentos_basicos": "alimentos básicos",
    "cuidado_e_higiene": "cuidado e higiene",
    "mecato": "mecato",
    "licor": "licor",
    "aseo": "aseo",
    "bebidas": "bebidas",
    "carnicos": "cárnicos",
    "frutas_y_verduras": "frutas y verduras",
    "mascotas": "mascotas",
    "otra": "otra"
} as const;

const subcategories: { [K in Category]: readonly string[]; } = {
    "alimentos_basicos": [
        'parva',
        'arepas',
        'granos',
        'lácteos',
        'enlatados',
        'harinas y cereales',
        'aceites y untables',
        'condimentos',
        'café y chocolate',
        'pulverizados',
        'otros'
    ] as const,

    "carnicos": [
        "carnes rojas",
        "carnes blancas",
        "embutidos",
        "procesados",
        "otros"
    ],
    "frutas_y_verduras": [
        'frutas',
        'verduras',
        'legumbres',
        'frutas secos',
        'refrigeradas',
        'otros'
    ],
    "cuidado_e_higiene": [
        'crema dental',
        'jabón',
        'shampoo y acondicionador',
        'desodorante',
        'toallas higiénicas',
        'cepillo de dientes',
        'papel higiénico',
        'afeitado y rasuradoras',
        'cuidado bucal', // Incluye enjuague bucal e hilo dental
        'cuidado del cabello', // Incluye gel, cera y lociones
        'otros'
    ] as const,

    "mecato": [
        'lonchera',
        'paquetes',
        'helados',
        'gomitas',
        'chocolates',
        'galletas',
        'snacks',
        'dulces',
        'ponqués',
        'otros'
    ] as const,

    "licor": [
        'cerveza',
        'ron',
        'aguardiente',
        'vino',
        'whisky',
        'tequila',
        'vodka',
        'champaña',
        'otros'
    ] as const,

    "aseo": [
        'productos de limpieza', // Incluye jabones, lavaloza, cloro, detergente, desinfectantes, etc.
        'utensilios de limpieza', // Incluye trapeadores, escobas, recogedores, guantes, esponjas
        'ambientadores',
        'cuidado de ropa',
        'bolsas de basura',
        'otros'
    ] as const,

    "bebidas": [
        'gaseosas',
        'jugos',
        'energéticas',
        'hidratantes',
        'refrescos instantáneos',
        'lácteas',
        'otros'
    ] as const,

    "mascotas": [
        'juguetes',
        'alimento',
        'accesorios',
        'ropa',
        'higiene y cuidado',
        'otros'
    ] as const,

    "otra": [
        'tecnología',
        'papelería',
        'farmacia',
        'decoración',
        'iluminación',
        'herramientas',
        'desechables',
        'deportes',
        'repostería',
        'otros'
    ] as const
} as const;
const stockStatus = ["out", "low", "available"] as const;
type Subcategory = typeof subcategories[Category][number];

const baseProductSchema = z.object({
    _id: z.string().optional(),
    barcode: z.string().optional(),
    name: z.string(),
    measure: z.string(),
    brand: z.string(),
    image: z.string(),
    category: z.enum(categories),
    subcategory: z.string(),
    tags: z.array(z.string()).optional(),
    searchString: z.string(),
});

const tenantProductSchema = z.object({
    type: z.literal("barcode").optional(),
    barcode: z.string(),
    show: z.boolean().optional(),
    cost: z.number().optional(),
    price: z.number(),
    stockStatus: z.enum(stockStatus).default("available"),
    stock: z.number().optional(),
})

const barcodeSchema = baseProductSchema.merge(tenantProductSchema);
const barcodeCartItemSchema = barcodeSchema.extend({
    quantity: z.number().min(1),
})

const newBarcodeSchema = baseProductSchema.pick({ name: true, barcode: true, brand: true, measure: true }).extend({ tenants: z.array(z.string()).optional(), price: z.union([z.string(), z.number()]), cost: z.number().positive().optional() });

type CartItem = z.infer<typeof barcodeCartItemSchema>;
type BaseBarcodeProduct = z.infer<typeof baseProductSchema>;
type TenantBarcodeProduct = z.infer<typeof tenantProductSchema>;
type BarcodeProduct = z.infer<typeof barcodeSchema>;
type NewBarcodeProduct = z.infer<typeof newBarcodeSchema>;

export {
    barcodeCartItemSchema, barcodeSchema, baseProductSchema, categories,
    CATEGORIES, newBarcodeSchema, stockStatus,
    subcategories, tenantProductSchema, type Category, type Subcategory
};
export type {
    BarcodeProduct, BaseBarcodeProduct, CartItem, NewBarcodeProduct, TenantBarcodeProduct
};

