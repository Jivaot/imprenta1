import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  FiClock,
  FiGift,
  FiMessageCircle,
  FiPackage,
  FiShoppingCart,
  FiTruck,
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';
import SectionHeading from '../components/SectionHeading';
import { addItem } from '../store/slices/cartSlice';
import {
  selectCatalogStatus,
  selectProductBySlug,
  selectProducts,
} from '../store/slices/productsSlice';
import { getRelatedProducts } from '../services/productRepository';
import { formatPrice } from '../utils/helpers';
import { buildProductMessage } from '../utils/whatsapp';

const MugCustomizer3D = React.lazy(() => import('../components/MugCustomizer3D'));

export default function ProductDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const status = useSelector(selectCatalogStatus);
  const products = useSelector(selectProducts);
  const product = useSelector((state) => selectProductBySlug(state, slug));
  const relatedProducts = product ? getRelatedProducts(products, product, 4) : [];
  const isCustomizable = Boolean(product?.isCustomizable);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedPackaging, setSelectedPackaging] = React.useState('');
  const [customText, setCustomText] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState('');
  const [imageScale, setImageScale] = React.useState(100);
  const [imageOffsetX, setImageOffsetX] = React.useState(0);
  const [imageOffsetY, setImageOffsetY] = React.useState(0);
  const [textSize, setTextSize] = React.useState(18);
  const [textColor, setTextColor] = React.useState('#184a53');
  const [textOffsetX, setTextOffsetX] = React.useState(0);
  const [textOffsetY, setTextOffsetY] = React.useState(0);
  const [designRotation, setDesignRotation] = React.useState(0);

  React.useEffect(() => {
    if (!product) {
      return;
    }

    setQuantity(product.min_qty || 1);
    setSelectedPackaging(product.packagingOptions[0] || '');
    setCustomText('');
    setNotes('');
    setFileName('');
    setUploadedImageUrl('');
    setImageScale(100);
    setImageOffsetX(0);
    setImageOffsetY(0);
    setTextSize(18);
    setTextColor('#184a53');
    setTextOffsetX(0);
    setTextOffsetY(0);
    setDesignRotation(0);
  }, [product]);

  React.useEffect(
    () => () => {
      if (uploadedImageUrl) {
        URL.revokeObjectURL(uploadedImageUrl);
      }
    },
    [uploadedImageUrl]
  );

  if (status === 'loading' && !product) {
    return (
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="glass-card mx-auto max-w-3xl p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#3f97d4]">
            Cargando producto
          </p>
          <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-[#184a53] sm:text-[2.2rem]">
            Estamos preparando la ficha de esta taza.
          </h1>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="glass-card mx-auto max-w-3xl p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#3f97d4]">
            Producto no encontrado
          </p>
          <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-[#184a53] sm:text-[2.2rem]">
            Este modelo ya no esta disponible.
          </h1>
          <Link
            to="/catalogo"
            className="brand-button-primary mt-8 inline-flex rounded-full px-5 py-3 text-sm font-semibold"
          >
            Volver
          </Link>
        </div>
      </section>
    );
  }

  const detailDescription =
    product.description.trim().toLowerCase() !== product.name.trim().toLowerCase()
      ? product.description
      : product.shortDescription || product.heroNote;

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }

    setFileName(file.name);
    setUploadedImageUrl(URL.createObjectURL(file));
  };

  const productMessage = buildProductMessage(
    product,
    isCustomizable
      ? `Cantidad: ${quantity}. Frase: ${customText || 'sin frase'}. Archivo: ${
          fileName || 'sin archivo'
        }.`
      : `Cantidad: ${quantity}.`
  );

  const resetCustomization = () => {
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }

    setFileName('');
    setUploadedImageUrl('');
    setCustomText('');
    setImageScale(100);
    setImageOffsetX(0);
    setImageOffsetY(0);
    setTextSize(18);
    setTextColor('#184a53');
    setTextOffsetX(0);
    setTextOffsetY(0);
    setDesignRotation(0);
  };

  const handleAddToCart = () => {
    dispatch(
      addItem({
        lineKey: [
          product.slug,
          selectedPackaging,
          customText,
          fileName,
          imageScale,
          imageOffsetX,
          imageOffsetY,
          textSize,
          textColor,
          textOffsetX,
          textOffsetY,
          designRotation,
        ]
          .join('|')
          .toLowerCase(),
        productId: product.id,
        productSlug: product.slug,
        name: product.name,
        image: product.image_url,
        unitPrice: product.price,
        quantity,
        categoryName: product.type,
        selectedPackaging,
        minQuantity: product.min_qty || 1,
        customText,
        uploadedFileName: fileName,
        notes,
        previewImageScale: imageScale,
        previewOffsetX: imageOffsetX,
        previewOffsetY: imageOffsetY,
        previewTextSize: textSize,
        previewTextColor: textColor,
        previewTextOffsetX: textOffsetX,
        previewTextOffsetY: textOffsetY,
        previewDesignRotation: designRotation,
      })
    );

    toast.success('Taza agregada al carrito');
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap gap-2 text-sm text-[#6a878c]">
          <Link to="/" className="hover:text-[#184a53]">
            Inicio
          </Link>
          <span>/</span>
          <Link to="/catalogo" className="hover:text-[#184a53]">
            Catalogo
          </Link>
          <span>/</span>
          <span className="text-[#184a53]">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div className="space-y-6">
            {isCustomizable ? (
              <React.Suspense
                fallback={
                  <div className="glass-card p-8 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3f97d4]">
                      Cargando vista 3D
                    </p>
                    <p className="mt-4 text-base leading-8 text-[#56747b]">
                      Estamos preparando el personalizador de tu taza.
                    </p>
                  </div>
                }
              >
                <MugCustomizer3D
                  productSlug={product.slug}
                  uploadedImageUrl={uploadedImageUrl}
                  customText={customText}
                  imageScale={imageScale}
                  imageOffsetX={imageOffsetX}
                  imageOffsetY={imageOffsetY}
                  textSize={textSize}
                  textColor={textColor}
                  textOffsetX={textOffsetX}
                  textOffsetY={textOffsetY}
                  designRotation={designRotation}
                  onFileChange={handleFileChange}
                  onTextChange={setCustomText}
                  onImageScaleChange={setImageScale}
                  onImageOffsetXChange={setImageOffsetX}
                  onImageOffsetYChange={setImageOffsetY}
                  onTextSizeChange={setTextSize}
                  onTextColorChange={setTextColor}
                  onTextOffsetXChange={setTextOffsetX}
                  onTextOffsetYChange={setTextOffsetY}
                  onDesignRotationChange={setDesignRotation}
                  onReset={resetCustomization}
                />
              </React.Suspense>
            ) : (
              <div className="glass-card overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="aspect-square w-full object-contain bg-[linear-gradient(180deg,rgba(238,246,255,0.96),rgba(227,239,248,0.82))] p-8 md:p-10"
                />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="glass-card p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#184a53]">
                  <FiPackage className="text-[#3f97d4]" />
                  Pedido minimo
                </p>
                <p className="mt-3 text-sm leading-7 text-[#56747b]">{product.minQtyLabel}</p>
              </div>
              <div className="glass-card p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#184a53]">
                  <FiClock className="text-[#3f97d4]" />
                  Produccion
                </p>
                <p className="mt-3 text-sm leading-7 text-[#56747b]">{product.production_time}</p>
              </div>
              <div className="glass-card p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#184a53]">
                  <FiGift className="text-[#3f97d4]" />
                  Uso ideal
                </p>
                <p className="mt-3 text-sm leading-7 text-[#56747b]">
                  {isCustomizable
                    ? 'Esta es nuestra taza principal para personalizacion.'
                    : 'Modelo predefinido listo para vender o regalar.'}
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3f97d4]">
                Detalles del modelo
              </p>
              <p className="mt-4 text-sm leading-7 text-[#56747b] sm:text-base sm:leading-8">
                {detailDescription}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7b9195]">Tipo</p>
                  <p className="mt-2 font-semibold text-[#184a53]">{product.type}</p>
                </div>
                <div className="rounded-[24px] bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7b9195]">Capacidad</p>
                  <p className="mt-2 font-semibold text-[#184a53]">{product.capacityLabel}</p>
                </div>
                <div className="rounded-[24px] bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7b9195]">Precio base</p>
                  <p className="mt-2 font-semibold text-[#184a53]">{formatPrice(product.price)}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.useCases.map((item) => (
                  <span key={item} className="brand-pill px-3 py-1 text-xs text-[#56747b]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card space-y-6 p-6 lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center gap-2">
              <span className="brand-pill px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#56747b]">
                {product.type}
              </span>
              <span className="rounded-full bg-[#e9f4ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#35628b]">
                {product.badge}
              </span>
              <span className="rounded-full bg-[#e9f4ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#3f97d4]">
                {product.capacityLabel}
              </span>
            </div>

            <div>
              <h1 className="font-display text-3xl font-black tracking-tight text-[#184a53] sm:text-[2.2rem]">
                {product.name}
              </h1>
              {product.shortDescription ? (
                <p className="mt-4 text-sm leading-7 text-[#56747b] sm:text-base">
                  {product.shortDescription}
                </p>
              ) : null}
            </div>

            <div className="rounded-[26px] bg-white/65 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[#7b9195]">Precio base</p>
              <div className="mt-2 flex items-end gap-3">
                <p className="font-display text-3xl font-black text-[#184a53] sm:text-[2.2rem]">
                  {formatPrice(product.price)}
                </p>
                {product.compareAtPrice ? (
                  <p className="pb-1 text-sm text-[#9ab0b4] line-through">
                    {formatPrice(product.compareAtPrice)}
                  </p>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-[#56747b]">
                {product.discountLabel ? `${product.discountLabel}. ` : ''}
                {product.priceNote}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <label className="space-y-2 text-sm font-medium text-[#28535b]">
                Presentacion
                <select
                  value={selectedPackaging}
                  onChange={(event) => setSelectedPackaging(event.target.value)}
                  className="w-full rounded-2xl border border-[rgba(63,151,212,0.14)] bg-white/85 px-4 py-3 text-sm outline-none transition focus:border-[rgba(63,151,212,0.34)]"
                >
                  {product.packagingOptions.map((packaging) => (
                    <option key={packaging} value={packaging}>
                      {packaging}
                    </option>
                  ))}
                </select>
              </label>
              <div className="space-y-2 text-sm font-medium text-[#28535b]">
                <span>Cantidad</span>
                <QuantitySelector value={quantity} min={product.min_qty} onChange={setQuantity} />
              </div>
            </div>

            {!isCustomizable ? (
              <div className="rounded-[24px] border border-dashed border-[rgba(63,151,212,0.16)] bg-[#f8fbfb] p-4 text-sm leading-7 text-[#56747b]">
                Este modelo se vende tal como aparece publicado. Si quieres personalizar una taza,
                te recomendamos nuestro producto estrella.
              </div>
            ) : (
              <label className="space-y-2 text-sm font-medium text-[#28535b]">
                Comentarios del pedido
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={4}
                  className="w-full rounded-[24px] border border-[rgba(63,151,212,0.14)] bg-white/85 px-4 py-3 text-sm outline-none transition focus:border-[rgba(63,151,212,0.34)]"
                  placeholder="Cuenta detalles sobre tu diseno, fecha ideal o entrega."
                />
              </label>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="brand-button-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold"
              >
                <FiShoppingCart />
                {isCustomizable ? 'Agregar personalizado al carrito' : 'Agregar al carrito'}
              </button>
              <a
                href={productMessage}
                target="_blank"
                rel="noreferrer"
                className="brand-button-accent inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold"
              >
                <FiMessageCircle />
                Pedir por WhatsApp
              </a>
            </div>
            <p className="text-xs leading-6 text-[#6b858a]">
              Si necesitas una cotizacion formal, te ayudamos por WhatsApp con este mismo modelo.
            </p>

            <div className="hidden">
              <div className="glass-card p-5 text-sm leading-7 text-[#56747b]">
                <p className="flex items-center gap-2 font-semibold text-[#184a53]">
                  <FiTruck className="text-[#3f97d4]" />
                  Entrega
                </p>
                <p className="mt-2">Retiro coordinado o despacho segun cantidad y destino.</p>
              </div>
              <div className="glass-card p-5 text-sm leading-7 text-[#56747b]">
                <p className="font-semibold text-[#184a53]">Usos sugeridos</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.useCases.map((item) => (
                    <span key={item} className="brand-pill px-3 py-1 text-xs text-[#56747b]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Relacionadas"
            title="Otros modelos de taza que pueden interesarte"
            description="Compara formatos y elige el que mejor se ajusta a tu pedido."
          />
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
