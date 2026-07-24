import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  Facebook,
  Heart,
  Home,
  Instagram,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  Ruler,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { type CSSProperties, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Collection,
  Environment,
  Product,
  collections,
  defaultComposer,
  environments,
  gallery,
  galleryImages,
  materialStudies,
  productById,
  products,
  recommendations,
} from "./data/catalog";

const asset = (path: string) => `/assets/${path}`;

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const anchorFor = (label: string) =>
  `#${label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}`;

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [quickProduct, setQuickProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [selectedCollection, setSelectedCollection] = useState<Collection>(collections[0]);
  const [composerItems, setComposerItems] = useState<string[]>(defaultComposer);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  const suggestedIds = useMemo(() => {
    const ids = composerItems.flatMap((id) => recommendations[id] ?? []);
    return [...new Set(ids)].filter((id) => !composerItems.includes(id));
  }, [composerItems]);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(".hero-film", {
        scale: 1.08,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".hero-title", {
        yPercent: -24,
        letterSpacing: "0.04em",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".environment-frame").forEach((frame) => {
        gsap.fromTo(
          frame.querySelector(".environment-image"),
          { scale: 1.14 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".split-line").forEach((line) => {
        gsap.fromTo(
          line,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 82%",
              end: "top 42%",
              scrub: 0.8,
            },
          },
        );
      });
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", refresh);
    return () => {
      window.removeEventListener("orientationchange", refresh);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const hasOverlay = cartOpen || quickProduct !== null;
    document.body.style.overflow = hasOverlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, quickProduct]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setQuickProduct(null);
      setCartOpen(false);
      setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const addToCart = (product: Product) => {
    setCart((current) => [...current, product]);
    setCartOpen(true);
  };

  const toggleComposerItem = (id: string) => {
    setComposerItems((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const moveMagnet = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-bone text-ink"
      style={
        {
          "--collection-light": selectedCollection.light,
          "--collection-accent": selectedCollection.accent,
        } as CSSProperties
      }
    >
      <Header
        cartCount={cart.length}
        menuOpen={menuOpen}
        onMenu={() => setMenuOpen((open) => !open)}
        onCart={() => setCartOpen(true)}
      />

      <main>
        <Hero onMagnet={moveMagnet} />

        <EnvironmentNav />

        <section className="story-band px-5 py-24 md:px-10 lg:px-16" id="ambientes" data-nav-light>
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow">Ambientes</p>
            <h2 className="split-line max-w-5xl font-display text-5xl leading-[0.96] md:text-8xl">
              A casa não se divide por categoria. Ela se revela por clima, luz e permanência.
            </h2>
          </div>
        </section>

        {environments.map((environment, index) => (
          <EnvironmentStage
            key={environment.id}
            environment={environment}
            index={index}
            onQuick={(product) => {
              setQuickProduct(product);
              setSelectedProduct(product);
            }}
            onAdd={addToCart}
          />
        ))}

        <HomeComposer
          items={composerItems}
          suggestions={suggestedIds}
          onToggle={toggleComposerItem}
          onAdd={addToCart}
        />

        <EditorialCatalog
          onSelect={(product) => {
            setSelectedProduct(product);
            setQuickProduct(product);
          }}
          onAdd={addToCart}
        />

        <AllProducts
          cartCount={cart.length}
          onCart={() => setCartOpen(true)}
          onSelect={(product) => {
            setSelectedProduct(product);
            setQuickProduct(product);
          }}
          onAdd={addToCart}
        />

        <Collections
          selected={selectedCollection}
          onSelect={setSelectedCollection}
          onAdd={addToCart}
        />

        <Materials />

        <ProductStory
          product={selectedProduct}
          onSelect={setSelectedProduct}
          onAdd={addToCart}
        />

        <Gallery />
      </main>

      <Footer />

      <AnimatePresence>
        {quickProduct && (
          <QuickView
            product={quickProduct}
            onClose={() => setQuickProduct(null)}
            onAdd={addToCart}
            onDeepDive={() => {
              setSelectedProduct(quickProduct);
              setQuickProduct(null);
              document.getElementById("produto")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            cart={cart}
            total={cartTotal}
            checkoutStep={checkoutStep}
            onStep={setCheckoutStep}
            onClose={() => setCartOpen(false)}
            onRemove={(index) => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

type HeaderProps = {
  cartCount: number;
  menuOpen: boolean;
  onMenu: () => void;
  onCart: () => void;
};

function Header({ cartCount, menuOpen, onMenu, onCart }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [onLight, setOnLight] = useState(false);
  const links = ["Ambientes", "Composer", "Produtos", "Coleções", "Materiais"];

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let ticking = false;
    const evaluate = () => {
      ticking = false;
      const rect = header.getBoundingClientRect();
      const x = window.innerWidth / 2;
      const y = rect.top + rect.height / 2;
      const previousPointerEvents = header.style.pointerEvents;
      header.style.pointerEvents = "none";
      const target = document.elementFromPoint(x, y);
      header.style.pointerEvents = previousPointerEvents;
      setOnLight(!!target?.closest("[data-nav-light]"));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8${onLight ? " header-on-light" : ""}`}
    >
      <nav className="nav-shell mx-auto flex max-w-7xl items-center justify-between">
        <a href="#" className="brand-mark" aria-label="CASA NORD">
          <span>CASA</span>
          <span>NORD</span>
        </a>

        <div className="nav-links-shell hidden items-center gap-1 rounded-full p-1 text-sm backdrop-blur-xl md:flex">
          {links.map((link) => (
            <a key={link} href={anchorFor(link)} className="nav-link">
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="icon-btn" type="button" aria-label="Buscar">
            <Search size={18} />
          </button>
          <button className="icon-btn relative" type="button" aria-label="Abrir carrinho" onClick={onCart}>
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="cart-dot">{cartCount}</span>}
          </button>
          <button
            className="icon-btn md:hidden"
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={onMenu}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu mx-auto mt-3 max-w-7xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {links.map((link) => (
              <a key={link} href={anchorFor(link)} onClick={onMenu}>
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ onMagnet }: { onMagnet: (event: MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <section className="hero relative min-h-[100svh] overflow-hidden px-4 pb-8 pt-24 md:px-8">
      <video
        className="hero-film absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={asset("environment-living.png")}
      >
        <source src={asset("casa-nord-film.mp4")} type="video/mp4" />
      </video>
      <div className="hero-vignette absolute inset-0" />
      <motion.div
        className="light-reactor"
        animate={{ x: [0, 28, -18, 0], y: [0, -12, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl grid-rows-[1fr_auto]">
        <div className="grid items-end gap-8 pb-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow text-white/82">Showroom digital de casa e decoração</p>
            <h1 className="hero-title font-display text-[clamp(4rem,12vw,11.5rem)] leading-[0.78] text-white">
              CASA
              <br />
              NORD
            </h1>
          </div>

          <div className="hero-editorial ml-auto max-w-md">
            <p>
              Um passeio por ambientes compostos com cortinas, mesa, cama, louça, luz e textura no
              mesmo ritmo visual.
            </p>
            <button className="magnetic-btn mt-6" onMouseMove={onMagnet}>
              <span>Explorar a casa</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="hero-depth grid gap-3 md:grid-cols-3">
          {["Luz acompanha o scroll", "Tecidos em movimento", "Produtos por composição"].map((item) => (
            <motion.div
              key={item}
              className="depth-tile"
              whileHover={{ y: -6, rotateX: 4, rotateY: -3 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnvironmentNav() {
  return (
    <aside className="environment-rail hidden xl:block" aria-label="Ambientes">
      {environments.map((environment) => {
        const Icon = environment.icon;
        return (
          <a key={environment.id} href={`#${environment.id}`} aria-label={environment.title}>
            <Icon size={16} />
          </a>
        );
      })}
    </aside>
  );
}

type EnvironmentStageProps = {
  environment: Environment;
  index: number;
  onQuick: (product: Product) => void;
  onAdd: (product: Product) => void;
};

function EnvironmentStage({ environment, index, onQuick, onAdd }: EnvironmentStageProps) {
  const Icon = environment.icon;

  return (
    <section id={environment.id} className="environment-stage">
      <div className="environment-frame">
        <div
          className="environment-image"
          style={{
            backgroundImage: `url(${asset(environment.image)})`,
            backgroundPosition: environment.offset,
          }}
        />
        <div className="environment-shade" />

        {environment.hotspots.map((hotspot) => {
          const product = productById(hotspot.productId);
          return (
            <button
              key={`${environment.id}-${hotspot.productId}`}
              className="hotspot group"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              onClick={() => onQuick(product)}
              aria-label={`Ver ${product.name}`}
            >
              <span className="hotspot-ring" />
              <span className="hotspot-card">
                <strong>{product.name}</strong>
                <small>{money.format(product.price)}</small>
                <em>Visualização rápida</em>
              </span>
            </button>
          );
        })}

        <div className="environment-copy">
          <div className="flex items-center gap-3">
            <Icon size={22} />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3>{environment.title}</h3>
          <p>{environment.mood}</p>
          <div className="material-pill">{environment.palette}</div>
        </div>

        <div className="environment-products">
          {environment.products.slice(0, 3).map((id) => {
            const product = productById(id);
            return (
              <button key={id} onClick={() => onAdd(product)}>
                <Plus size={14} />
                <span>{product.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type HomeComposerProps = {
  items: string[];
  suggestions: string[];
  onToggle: (id: string) => void;
  onAdd: (product: Product) => void;
};

function HomeComposer({ items, suggestions, onToggle, onAdd }: HomeComposerProps) {
  const chosen = items.map(productById);
  const harmony = chosen
    .flatMap((item) => item.palette)
    .slice(0, 6);

  return (
    <section id="composer" className="composer-section px-5 py-24 md:px-10 lg:px-16" data-nav-light>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="composer-copy">
          <p className="eyebrow">Home Composer</p>
          <h2 className="font-display text-5xl leading-none md:text-7xl">Monte um ambiente inteiro.</h2>
          <p>
            As peças entram em cena como camadas. A composição reorganiza proporções, materiais,
            luz e sugestões complementares a cada escolha.
          </p>
          <div className="harmony-row">
            {harmony.map((color, index) => (
              <span key={`${color}-${index}`} style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>

        <div className="composer-studio">
          <div
            className="studio-scene"
            style={{
              backgroundImage: `linear-gradient(0deg, rgb(22 22 22 / 0.12), transparent 40%), url(${asset(chosen[0]?.image ?? "environment-dining.png")})`,
            }}
          >
            <div className="studio-window" />
            <AnimatePresence>
              {chosen.map((product, index) => (
                <motion.button
                  key={product.id}
                  className={`scene-object scene-object-${index % 6}`}
                  initial={{ opacity: 0, scale: 0.8, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.84, y: 18 }}
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
                  onClick={() => onToggle(product.id)}
                >
                  <span>{product.name}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <div className="composer-controls">
            <div>
              <span className="panel-label">Peças em composição</span>
              <div className="chip-wrap">
                {products.map((product) => (
                  <button
                    key={product.id}
                    className={items.includes(product.id) ? "chip active" : "chip"}
                    onClick={() => onToggle(product.id)}
                  >
                    {items.includes(product.id) ? <Check size={14} /> : <Plus size={14} />}
                    {product.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="panel-label">Sugestões harmônicas</span>
              <div className="recommendation-list">
                {suggestions.slice(0, 5).map((id) => {
                  const product = productById(id);
                  return (
                    <motion.button
                      key={id}
                      layout
                      className="recommendation-item"
                      onClick={() => onToggle(id)}
                    >
                      <Sparkles size={15} />
                      <span>{product.name}</span>
                      <em>{product.material}</em>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <button className="composer-cart" onClick={() => chosen.forEach(onAdd)}>
            <ShoppingBag size={18} />
            Adicionar ambiente completo
          </button>
        </div>
      </div>
    </section>
  );
}

type ProductActions = {
  onSelect: (product: Product) => void;
  onAdd: (product: Product) => void;
};

function EditorialCatalog({ onSelect, onAdd }: ProductActions) {
  return (
    <section id="catalogo" className="catalog-section px-5 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="section-heading">
          <p className="eyebrow">Catálogo editorial</p>
          <h2 className="font-display text-5xl leading-none md:text-7xl">Produtos como parte da cena.</h2>
        </div>

        <div className="editorial-layout">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              className={`product-editorial product-editorial-${index % 4}`}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
            >
              <div
                className="product-image"
                style={{
                  backgroundImage: `url(${asset(product.image)})`,
                  backgroundPosition: `${12 + index * 11}% ${45 + (index % 3) * 10}%`,
                }}
              />
              <div className="product-info">
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.story}</p>
                <div className="product-actions">
                  <button onClick={() => onSelect(product)}>Ver ficha</button>
                  <button aria-label={`Adicionar ${product.name}`} onClick={() => onAdd(product)}>
                    <ShoppingBag size={17} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

type AllProductsProps = ProductActions & {
  cartCount: number;
  onCart: () => void;
};

function AllProducts({ cartCount, onCart, onSelect, onAdd }: AllProductsProps) {
  const categories = ["Todos", ...new Set(products.map((product) => product.category))];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const visibleProducts =
    activeCategory === "Todos"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section id="produtos" className="all-products-section px-5 py-24 md:px-10 lg:px-16" data-nav-light>
      <div className="mx-auto max-w-7xl">
        <div className="product-store-header">
          <div>
            <p className="eyebrow">Todos os produtos</p>
            <h2 className="font-display text-5xl leading-none md:text-7xl">
              Uma vitrine completa, sem perder o clima de showroom.
            </h2>
          </div>
          <button className="store-cart-button" onClick={onCart}>
            <ShoppingBag size={18} />
            Carrinho
            <span>{cartCount}</span>
          </button>
        </div>

        <div className="product-filter-bar" aria-label="Filtrar produtos por categoria">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="store-product-grid">
          {visibleProducts.map((product) => (
            <motion.article
              key={product.id}
              className="store-product-card"
              layout
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
            >
              <button
                className="store-product-media"
                style={{ backgroundImage: `url(${asset(product.image)})` }}
                onClick={() => onSelect(product)}
                aria-label={`Ver detalhes de ${product.name}`}
              >
                <span>{product.collection}</span>
              </button>

              <div className="store-product-body">
                <div>
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.material}</p>
                </div>

                <div className="store-product-footer">
                  <strong>{money.format(product.price)}</strong>
                  <div>
                    <button onClick={() => onSelect(product)}>Ver</button>
                    <button onClick={() => onAdd(product)} aria-label={`Adicionar ${product.name} ao carrinho`}>
                      <ShoppingBag size={17} />
                      Carrinho
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

type CollectionsProps = {
  selected: Collection;
  onSelect: (collection: Collection) => void;
  onAdd: (product: Product) => void;
};

function Collections({ selected, onSelect, onAdd }: CollectionsProps) {
  const collectionProducts = products.filter((product) => product.collection === selected.name);
  const featured = collectionProducts[0] ?? products[0];

  return (
    <section id="colecoes" className="collection-section px-5 py-24 md:px-10 lg:px-16" data-nav-light>
      <div className="mx-auto max-w-7xl">
        <div className="collection-shell">
          <div>
            <p className="eyebrow">Coleções</p>
            <h2 className={`collection-title ${selected.font === "display" ? "font-display" : "font-sans"}`}>
              {selected.name}
            </h2>
            <p className="collection-tone">{selected.tone}</p>
          </div>

          <div className="collection-tabs" role="tablist" aria-label="Coleções">
            {collections.map((collection) => (
              <button
                key={collection.name}
                className={selected.name === collection.name ? "active" : ""}
                onClick={() => onSelect(collection)}
                role="tab"
                aria-selected={selected.name === collection.name}
              >
                {collection.name}
              </button>
            ))}
          </div>

          <div className="collection-atmosphere">
            <div
              className="collection-image"
              style={{
                backgroundImage: `url(${asset(featured.image)})`,
                backgroundPosition: selected.name === "Nordic" ? "18% 48%" : "50% 52%",
              }}
            />
            <div className="collection-product">
              <span>{featured.collection}</span>
              <h3>{featured.name}</h3>
              <p>{featured.material}</p>
              <button onClick={() => onAdd(featured)}>
                <Plus size={16} />
                {money.format(featured.price)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Materials() {
  const [light, setLight] = useState({ x: 50, y: 40 });

  return (
    <section id="materiais" className="materials-section px-5 py-24 md:px-10 lg:px-16" data-nav-light>
      <div className="mx-auto max-w-7xl">
        <div className="section-heading">
          <p className="eyebrow">Materiais</p>
          <h2 className="split-line font-display text-5xl leading-none md:text-7xl">
            Macrotexturas que respondem à luz.
          </h2>
        </div>
        <div
          className="materials-grid"
          style={
            {
              "--light-x": `${light.x}%`,
              "--light-y": `${light.y}%`,
            } as CSSProperties
          }
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            setLight({
              x: ((event.clientX - rect.left) / rect.width) * 100,
              y: ((event.clientY - rect.top) / rect.height) * 100,
            });
          }}
        >
          {materialStudies.map((material, index) => (
            <article
              key={material.name}
              className={`material-card texture-${material.texture}`}
              style={{
                backgroundImage: `url(${asset("materials-macro.png")})`,
                backgroundPosition: `${12 + index * 13}% ${34 + (index % 3) * 18}%`,
              }}
            >
              <div className="material-light" />
              <span>{material.name}</span>
              <p>{material.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type ProductStoryProps = {
  product: Product;
  onSelect: (product: Product) => void;
  onAdd: (product: Product) => void;
};

function ProductStory({ product, onSelect, onAdd }: ProductStoryProps) {
  const [finish, setFinish] = useState(product.palette[0]);
  const complement = products.filter((item) => item.id !== product.id).slice(0, 3);

  useEffect(() => {
    setFinish(product.palette[0]);
  }, [product]);

  return (
    <section id="produto" className="product-story px-5 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="product-story-hero">
          <div>
            <p className="eyebrow">Produto</p>
            <h2 className="font-display text-5xl leading-none md:text-8xl">{product.name}</h2>
            <p>{product.story}</p>
            <button onClick={() => onAdd(product)} className="primary-action">
              <ShoppingBag size={18} />
              {money.format(product.price)}
            </button>
          </div>
          <div className="product-video">
            <video autoPlay muted loop playsInline poster={asset(product.image)}>
              <source src={asset("casa-nord-film.mp4")} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="product-detail-grid">
          <article>
            <Ruler size={20} />
            <span>Dimensões</span>
            <p>{product.dimensions}</p>
          </article>
          <article>
            <Layers3 size={20} />
            <span>Composição</span>
            <p>{product.composition}</p>
          </article>
          <article>
            <ShieldCheck size={20} />
            <span>Garantia</span>
            <p>5 anos para estrutura, 18 meses para acabamento e assistência dedicada.</p>
          </article>
        </div>

        <div className="finish-lab">
          <div>
            <p className="eyebrow">Visualização</p>
            <h3>Acabamentos em tempo real</h3>
            <div className="swatches">
              {product.palette.map((color) => (
                <button
                  key={color}
                  className={finish === color ? "active" : ""}
                  style={{ backgroundColor: color }}
                  aria-label={`Selecionar acabamento ${color}`}
                  onClick={() => setFinish(color)}
                />
              ))}
            </div>
          </div>
          <motion.div
            className="finish-preview"
            animate={{ backgroundColor: finish }}
            transition={{ duration: 0.35 }}
          >
            <span>{product.material}</span>
          </motion.div>
        </div>

        <div className="supporting-products">
          <div>
            <p className="eyebrow">Complementares</p>
            <h3>Peças que continuam a composição</h3>
          </div>
          {complement.map((item) => (
            <button key={item.id} onClick={() => onSelect(item)}>
              <span>{item.name}</span>
              <ChevronRight size={17} />
            </button>
          ))}
        </div>

        <div className="review-faq">
          <article>
            <Heart size={20} />
            <blockquote>
              "A sala parece ter sido desenhada em volta das peças. Chegou tudo com cuidado de
              atelier."
            </blockquote>
            <span>Marina V., arquiteta</span>
          </article>
          <article>
            <PackageCheck size={20} />
            <h4>Perguntas frequentes</h4>
            <p>Entrega em até 12 dias úteis nas capitais, montagem opcional e troca assistida.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="gallery-section px-5 py-24 md:px-10 lg:px-16" data-nav-light>
      <div className="mx-auto max-w-7xl">
        <div className="section-heading">
          <p className="eyebrow">Galeria</p>
          <h2 className="font-display text-5xl leading-none md:text-7xl">Arquitetura, bastidor e permanência.</h2>
        </div>
        <div className="gallery-strip">
          {gallery.map((item, index) => (
            <article
              key={item}
              className="gallery-item"
              style={{
                backgroundImage: `url(${asset(galleryImages[index] ?? "environment-living.png")})`,
                backgroundPosition: `${index * 17}% ${42 + (index % 2) * 16}%`,
              }}
            >
              <span>{item}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "Ambientes", href: "#ambientes" },
    { label: "Composer", href: "#composer" },
    { label: "Coleções", href: "#colecoes" },
    { label: "Materiais", href: "#materiais" },
  ];

  const supportLinks = [
    { label: "Contato", href: "#" },
    { label: "Trocas e devoluções", href: "#" },
    { label: "Perguntas frequentes", href: "#" },
    { label: "Assistência técnica", href: "#" },
  ];

  return (
    <footer className="site-footer px-5 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="footer-cta">
          <div>
            <p className="eyebrow text-white/60">Fale com o showroom</p>
            <h2 className="font-display text-4xl leading-none md:text-6xl">
              Vamos compor a sua casa?
            </h2>
          </div>
          <form
            className="footer-newsletter"
            onSubmit={(event) => event.preventDefault()}
          >
            <input type="email" placeholder="Seu e-mail" aria-label="E-mail" required />
            <button type="submit">
              Assinar
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="brand-mark" aria-label="CASA NORD">
              <span>CASA</span>
              <span>NORD</span>
            </a>
            <p>
              Showroom digital de casa e decoração. Ambientes compostos com cortinas, mesa,
              cama, louça, luz e textura no mesmo ritmo visual.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="WhatsApp">
                <Phone size={18} />
              </a>
            </div>
          </div>

          <nav className="footer-links" aria-label="Navegação">
            <span className="panel-label">Navegação</span>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <nav className="footer-links" aria-label="Atendimento">
            <span className="panel-label">Atendimento</span>
            {supportLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer-contact">
            <span className="panel-label">Showroom</span>
            <p>
              <MapPin size={16} />
              Rua Harmonia, 210 — São Paulo, SP
            </p>
            <p>
              <Phone size={16} />
              +55 11 4002-8922
            </p>
            <p>
              <Mail size={16} />
              ola@casanord.com.br
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} CASA NORD. Todos os direitos reservados.</span>
          <div className="footer-legal">
            <a href="#">Política de privacidade</a>
            <a href="#">Termos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

type QuickViewProps = {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product) => void;
  onDeepDive: () => void;
};

function QuickView({ product, onClose, onAdd, onDeepDive }: QuickViewProps) {
  return (
    <motion.aside
      className="quick-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="quick-backdrop" onClick={onClose} aria-label="Fechar ficha" />
      <motion.div
        className="quick-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 190 }}
      >
        <button className="icon-btn self-end" onClick={onClose} aria-label="Fechar">
          <X size={18} />
        </button>
        <div
          className="quick-image"
          style={{
            backgroundImage: `url(${asset(product.image)})`,
            backgroundPosition: "center",
          }}
        />
        <span className="eyebrow">{product.category}</span>
        <h2>{product.name}</h2>
        <p>{product.story}</p>
        <div className="quick-specs">
          <span>{product.material}</span>
          <span>{product.dimensions}</span>
          <span>{product.collection}</span>
        </div>
        <div className="quick-actions">
          <button onClick={() => onAdd(product)}>
            <ShoppingBag size={18} />
            {money.format(product.price)}
          </button>
          <button onClick={onDeepDive}>Ficha completa</button>
        </div>
      </motion.div>
    </motion.aside>
  );
}

type CartDrawerProps = {
  cart: Product[];
  total: number;
  checkoutStep: number;
  onStep: (step: number) => void;
  onClose: () => void;
  onRemove: (index: number) => void;
};

function CartDrawer({ cart, total, checkoutStep, onStep, onClose, onRemove }: CartDrawerProps) {
  const steps = [
    { id: 1, label: "Entrega", icon: Truck },
    { id: 2, label: "Pagamento", icon: CreditCard },
    { id: 3, label: "Confirmação", icon: ShieldCheck },
  ];

  return (
    <motion.aside className="cart-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="quick-backdrop" onClick={onClose} aria-label="Fechar carrinho" />
      <motion.div
        className="cart-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 190 }}
      >
        <div className="cart-header">
          <div>
            <span className="eyebrow">Carrinho</span>
            <h2>Composição selecionada</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Nenhuma peça adicionada ainda.</p>
          ) : (
            cart.map((item, index) => (
              <article key={`${item.id}-${index}`} className="cart-item">
                <div
                  className="cart-thumb"
                  style={{ backgroundImage: `url(${asset(item.image)})` }}
                />
                <div>
                  <h3>{item.name}</h3>
                  <span>{item.material}</span>
                  <strong>{money.format(item.price)}</strong>
                </div>
                <button onClick={() => onRemove(index)} aria-label={`Remover ${item.name}`}>
                  <Minus size={15} />
                </button>
              </article>
            ))
          )}
        </div>

        <div className="checkout-flow">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                className={checkoutStep === step.id ? "active" : ""}
                onClick={() => onStep(step.id)}
              >
                <Icon size={16} />
                {step.label}
              </button>
            );
          })}
        </div>

        <div className="cart-summary">
          <div>
            <span>Entrega premium</span>
            <strong>Montagem e embalagem retornável</strong>
          </div>
          <div>
            <span>Garantia CASA NORD</span>
            <strong>Troca assistida em 30 dias</strong>
          </div>
          <div className="total-row">
            <span>Total</span>
            <strong>{money.format(total)}</strong>
          </div>
          <button className="primary-action w-full justify-center">
            <Check size={18} />
            Finalizar pedido
          </button>
        </div>
      </motion.div>
    </motion.aside>
  );
}

export default App;
