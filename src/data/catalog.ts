import {
  Armchair,
  Bath,
  BedDouble,
  ChefHat,
  Lamp,
  Sofa,
  Sparkles,
  Trees,
  WashingMachine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  material: string;
  dimensions: string;
  composition: string;
  collection: string;
  palette: string[];
  story: string;
};

export type Hotspot = {
  productId: string;
  x: number;
  y: number;
};

export type Environment = {
  id: string;
  title: string;
  image: string;
  icon: LucideIcon;
  mood: string;
  palette: string;
  offset: string;
  products: string[];
  hotspots: Hotspot[];
};

export type Collection = {
  name: string;
  tone: string;
  font: "display" | "sans";
  light: string;
  accent: string;
};

export const products: Product[] = [
  {
    id: "curtain-linho-aura",
    name: "Cortina Aura Linho",
    image: "products/curtain-linho-aura.png",
    category: "Cortinas",
    price: 1290,
    material: "Linho lavado",
    dimensions: "2,80 m x 2,60 m",
    composition: "Linho europeu, barra invisível e ilhós em aço escovado",
    collection: "Japandi",
    palette: ["#f5eee4", "#b7ab99", "#6f765f"],
    story: "Filtra a luz sem apagar o dia, criando movimento delicado nas salas abertas.",
  },
  {
    id: "sofa-modular-nord",
    name: "Sofá Modular Nord",
    image: "products/sofa-modular-nord.png",
    category: "Mobiliário leve",
    price: 6890,
    material: "Bouclé de algodão",
    dimensions: "3,20 m x 1,05 m",
    composition: "Estrutura em madeira certificada, espuma HR e tecido removível",
    collection: "Nordic",
    palette: ["#ebe0d2", "#1f1f1f", "#8b9474"],
    story: "Peças independentes que se reorganizam para receber, ler ou simplesmente ficar.",
  },
  {
    id: "mesa-circular-oma",
    name: "Mesa Circular Oma",
    image: "products/mesa-circular-oma.png",
    category: "Mesas",
    price: 4320,
    material: "Carvalho natural",
    dimensions: "1,35 m de diâmetro",
    composition: "Tampo laminado natural e base torneada em madeira maciça",
    collection: "Organic",
    palette: ["#c09062", "#f8f2e8", "#3d4b3f"],
    story: "Uma mesa de centro gravitacional para jantares longos e composições calmas.",
  },
  {
    id: "cadeira-yuki",
    name: "Cadeira Yuki",
    image: "products/cadeira-yuki.png",
    category: "Cadeiras",
    price: 1240,
    material: "Freijó e palha natural",
    dimensions: "54 cm x 78 cm",
    composition: "Madeira curvada, assento tramado e acabamento fosco",
    collection: "Japandi",
    palette: ["#ad8057", "#ede7dc", "#252827"],
    story: "Leve no olhar e firme no uso diário, pensada para mesas de jantar silenciosas.",
  },
  {
    id: "pendente-kumo",
    name: "Pendente Kumo",
    image: "products/pendente-kumo.png",
    category: "Luminárias",
    price: 980,
    material: "Papel de arroz e aço",
    dimensions: "60 cm de diâmetro",
    composition: "Cúpula artesanal, cabo têxtil e canopla em aço escovado",
    collection: "Minimal",
    palette: ["#fff8eb", "#838d93", "#513331"],
    story: "Luz difusa, quase flutuante, para suavizar superfícies e encontros.",
  },
  {
    id: "tapete-rio",
    name: "Tapete Rio Baixo",
    image: "products/tapete-rio.png",
    category: "Tapetes",
    price: 2190,
    material: "Lã e algodão",
    dimensions: "2,40 m x 3,00 m",
    composition: "Trama manual, bordas reforçadas e tingimento mineral",
    collection: "Mediterranean",
    palette: ["#d8c6a9", "#6a776f", "#2d4f60"],
    story: "Desenha zonas de permanência sem endurecer a planta livre.",
  },
  {
    id: "jogo-cama-neve",
    name: "Jogo de Cama Neve",
    image: "products/jogo-cama-neve.png",
    category: "Roupas de cama",
    price: 780,
    material: "Algodão egípcio",
    dimensions: "Queen",
    composition: "400 fios, fronhas envelope e lençol com elástico profundo",
    collection: "Modern Classic",
    palette: ["#ffffff", "#dce6e5", "#4e5961"],
    story: "Textura fresca, toque macio e caimento de hotel sem excesso de formalidade.",
  },
  {
    id: "vaso-mar",
    name: "Vaso Mar Alto",
    image: "products/vaso-mar.png",
    category: "Vasos",
    price: 420,
    material: "Cerâmica reativa",
    dimensions: "18 cm x 42 cm",
    composition: "Argila de alta temperatura, esmalte reativo e base feltro",
    collection: "Contemporary",
    palette: ["#44535a", "#8aa09b", "#f3eadb"],
    story: "Uma peça vertical para quebrar horizontes baixos e acolher ramos secos.",
  },
  {
    id: "toalha-felpuda-bruma",
    name: "Toalha Felpuda Bruma",
    image: "products/toalha-felpuda-bruma.png",
    category: "Toalhas",
    price: 189,
    material: "Algodão egípcio felpudo",
    dimensions: "70 cm x 140 cm",
    composition: "600 g/m², bordas overlock e gramatura densa para secagem rápida",
    collection: "Minimal",
    palette: ["#f5f1e8", "#c9c2b4", "#8a8378"],
    story: "Empilhada como pedra sobre o balcão, seca rápido e envelhece bem — a toalha que vira ritual.",
  },
  {
    id: "toalha-cozinha-terra",
    name: "Toalha de Cozinha Terra",
    image: "products/toalha-cozinha-terra.png",
    category: "Toalhas de cozinha",
    price: 89,
    material: "Linho e algodão trançado",
    dimensions: "50 cm x 70 cm",
    composition: "Trama dupla-face, barra em ponto reto e fio tingido em terra",
    collection: "Organic",
    palette: ["#e4d4bb", "#a98f6c", "#4a3c2c"],
    story: "Solta farinha, seca louça e ainda assim parece bonita pendurada na alça do forno.",
  },
  {
    id: "kit-utensilios-uma",
    name: "Tábua e Utensílios Uma",
    image: "products/kit-utensilios-uma.png",
    category: "Utensílios de cozinha",
    price: 340,
    material: "Madeira de teca e aço inox",
    dimensions: "Tábua 45 cm + conjunto de 4 utensílios",
    composition: "Teca maciça e peças torneadas à mão, cabo em aço escovado",
    collection: "Mediterranean",
    palette: ["#c79a5d", "#8a5a34", "#2d2115"],
    story: "Um conjunto que vive fora do armário, à vista, porque merece ser usado todo dia.",
  },
  {
    id: "tigelas-duna",
    name: "Jogo de Tigelas Duna",
    image: "products/tigelas-duna.png",
    category: "Louças",
    price: 260,
    material: "Cerâmica artesanal",
    dimensions: "Conjunto com 4 tigelas, 12 cm a 18 cm",
    composition: "Argila queimada em alta temperatura, esmalte fosco irregular",
    collection: "Contemporary",
    palette: ["#e8ddc9", "#b6a184", "#5c5346"],
    story: "Nenhuma tigela sai igual à outra — o gesto da mão fica, e é isso que interessa.",
  },
  {
    id: "cesto-junco",
    name: "Cesto Organizador Junco",
    image: "products/cesto-junco.png",
    category: "Organização",
    price: 220,
    material: "Junco natural trançado",
    dimensions: "38 cm de diâmetro x 42 cm de altura",
    composition: "Fibra natural trançada à mão, alças reforçadas",
    collection: "Nordic",
    palette: ["#c7a877", "#93733f", "#443318"],
    story: "Guarda toalhas, roupa suja ou lenha — muda de função conforme a estação.",
  },
];

export const PRODUCT_IMAGES: Record<string, string> = Object.fromEntries(
  products.map((product) => [product.id, product.image]),
);

export const environments: Environment[] = [
  {
    id: "living",
    title: "Living",
    image: "environment-living.png",
    icon: Sofa,
    mood: "Tecidos amplos, sombras longas e objetos que parecem ter acabado de ser tocados.",
    palette: "Linho, bouclé, mármore escuro",
    offset: "left 48%",
    products: ["sofa-modular-nord", "curtain-linho-aura", "tapete-rio", "vaso-mar"],
    hotspots: [
      { productId: "sofa-modular-nord", x: 22, y: 72 },
      { productId: "curtain-linho-aura", x: 10, y: 34 },
      { productId: "tapete-rio", x: 46, y: 82 },
      { productId: "vaso-mar", x: 34, y: 76 },
    ],
  },
  {
    id: "quarto",
    title: "Quarto",
    image: "environment-bedroom.png",
    icon: BedDouble,
    mood: "Camadas de algodão, madeira baixa e uma luz que desacelera a noite.",
    palette: "Algodão, freijó, vidro fumê",
    offset: "47% 50%",
    products: ["jogo-cama-neve", "curtain-linho-aura", "pendente-kumo"],
    hotspots: [
      { productId: "jogo-cama-neve", x: 43, y: 54 },
      { productId: "curtain-linho-aura", x: 54, y: 36 },
      { productId: "pendente-kumo", x: 69, y: 26 },
    ],
  },
  {
    id: "banheiro",
    title: "Banheiro",
    image: "environment-bathroom.png",
    icon: Bath,
    mood: "Superfícies minerais, algodão denso e reflexos frios em baixa intensidade.",
    palette: "Mármore, vidro, algodão",
    offset: "60% 52%",
    products: ["toalha-felpuda-bruma", "cesto-junco", "vaso-mar"],
    hotspots: [
      { productId: "toalha-felpuda-bruma", x: 38, y: 68 },
      { productId: "cesto-junco", x: 66, y: 74 },
      { productId: "vaso-mar", x: 22, y: 38 },
    ],
  },
  {
    id: "cozinha",
    title: "Cozinha",
    image: "environment-kitchen.png",
    icon: ChefHat,
    mood: "Bancadas livres, louças à mão e metais que capturam a manhã.",
    palette: "Mármore, aço escovado, cerâmica",
    offset: "28% 47%",
    products: ["kit-utensilios-uma", "tigelas-duna", "toalha-cozinha-terra", "pendente-kumo"],
    hotspots: [
      { productId: "kit-utensilios-uma", x: 26, y: 40 },
      { productId: "tigelas-duna", x: 40, y: 66 },
      { productId: "toalha-cozinha-terra", x: 10, y: 74 },
      { productId: "pendente-kumo", x: 68, y: 20 },
    ],
  },
  {
    id: "jantar",
    title: "Sala de Jantar",
    image: "environment-dining.png",
    icon: Armchair,
    mood: "Uma composição circular para receber sem teatralidade.",
    palette: "Carvalho, palha, papel de arroz",
    offset: "68% 50%",
    products: ["mesa-circular-oma", "cadeira-yuki", "tigelas-duna", "pendente-kumo"],
    hotspots: [
      { productId: "mesa-circular-oma", x: 66, y: 63 },
      { productId: "cadeira-yuki", x: 75, y: 69 },
      { productId: "tigelas-duna", x: 55, y: 55 },
      { productId: "pendente-kumo", x: 67, y: 28 },
    ],
  },
  {
    id: "lavanderia",
    title: "Lavanderia",
    image: "environment-laundry.png",
    icon: WashingMachine,
    mood: "Organização silenciosa, texturas naturais e o prazer de ver tudo respirar.",
    palette: "Aço, algodão, madeira clara",
    offset: "82% 53%",
    products: ["cesto-junco", "toalha-felpuda-bruma", "curtain-linho-aura"],
    hotspots: [
      { productId: "cesto-junco", x: 76, y: 68 },
      { productId: "toalha-felpuda-bruma", x: 60, y: 55 },
      { productId: "curtain-linho-aura", x: 79, y: 42 },
    ],
  },
  {
    id: "externa",
    title: "Área Externa",
    image: "environment-outdoor.png",
    icon: Trees,
    mood: "Verde filtrado, fibras laváveis e uma fronteira suave entre dentro e fora.",
    palette: "Linho, cerâmica, fibra natural",
    offset: "8% 48%",
    products: ["tapete-rio", "vaso-mar", "curtain-linho-aura"],
    hotspots: [
      { productId: "tapete-rio", x: 14, y: 82 },
      { productId: "vaso-mar", x: 22, y: 64 },
      { productId: "curtain-linho-aura", x: 8, y: 40 },
    ],
  },
];

export const collections: Collection[] = [
  { name: "Japandi", tone: "Silêncio tátil", font: "display", light: "#f6f1e8", accent: "#6e7a5d" },
  { name: "Minimal", tone: "Precisão leve", font: "sans", light: "#f8f8f5", accent: "#7d8a91" },
  { name: "Organic", tone: "Curvas naturais", font: "display", light: "#efe4d3", accent: "#b45f44" },
  { name: "Contemporary", tone: "Contraste sereno", font: "sans", light: "#e8eceb", accent: "#44535a" },
  { name: "Mediterranean", tone: "Sol filtrado", font: "display", light: "#f3eadb", accent: "#2d4f60" },
  { name: "Nordic", tone: "Calma funcional", font: "sans", light: "#eef2ee", accent: "#5b2636" },
  { name: "Modern Classic", tone: "Proporção e pausa", font: "display", light: "#f7f3ee", accent: "#1f1f1f" },
];

export const materialStudies = [
  { name: "Algodão", texture: "cotton", note: "fios longos, toque fresco" },
  { name: "Linho", texture: "linen", note: "trama aberta, queda natural" },
  { name: "Madeira", texture: "wood", note: "veios quentes, acabamento fosco" },
  { name: "Cerâmica", texture: "ceramic", note: "esmalte reativo, brilho irregular" },
  { name: "Vidro", texture: "glass", note: "reflexo suave, borda translúcida" },
  { name: "Mármore", texture: "marble", note: "veios minerais, massa fria" },
  { name: "Aço escovado", texture: "steel", note: "linhas finas, luz lateral" },
];

export const gallery = [
  "Manhã aberta sobre a sala",
  "Mesa posta sem cerimônia",
  "Bastidores de composição",
  "Dormitório em luz baixa",
  "Objetos antes da vitrine",
  "Varanda com vento leve",
];

export const galleryImages = [
  "environment-living.png",
  "environment-dining.png",
  "materials-macro.png",
  "environment-bedroom.png",
  "environment-kitchen.png",
  "environment-outdoor.png",
];

export const productById = (id: string) => products.find((product) => product.id === id) ?? products[0];

export const recommendations: Record<string, string[]> = {
  "mesa-circular-oma": [
    "cadeira-yuki",
    "pendente-kumo",
    "tapete-rio",
    "curtain-linho-aura",
    "vaso-mar",
    "tigelas-duna",
  ],
  "sofa-modular-nord": ["tapete-rio", "curtain-linho-aura", "vaso-mar", "pendente-kumo"],
  "jogo-cama-neve": ["curtain-linho-aura", "pendente-kumo", "vaso-mar", "toalha-felpuda-bruma"],
  "toalha-felpuda-bruma": ["cesto-junco", "vaso-mar", "jogo-cama-neve"],
  "kit-utensilios-uma": ["tigelas-duna", "toalha-cozinha-terra", "vaso-mar"],
};

export const defaultComposer = ["mesa-circular-oma", "cadeira-yuki", "pendente-kumo"];

export const SparkleIcon = Sparkles;
