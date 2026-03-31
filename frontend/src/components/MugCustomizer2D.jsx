import React from 'react';
import { FiImage, FiMove, FiType, FiUploadCloud } from 'react-icons/fi';

export default function MugCustomizer2D({
  uploadedImageUrl,
  customText,
  imageScale,
  imageOffsetX,
  imageOffsetY,
  textSize,
  onFileChange,
  onTextChange,
  onImageScaleChange,
  onImageOffsetXChange,
  onImageOffsetYChange,
  onTextSizeChange,
}) {
  return (
    <div className="glass-card grid gap-6 p-6 lg:grid-cols-[0.88fr_1.12fr]">
      <div className="flex items-center justify-center">
        <div className="relative h-[420px] w-[320px]">
          <div className="absolute bottom-6 left-1/2 h-8 w-48 -translate-x-1/2 rounded-full bg-slate-900/10 blur-md" />
          <div className="absolute inset-x-[48px] top-[62px] bottom-[54px] rounded-t-[2rem] rounded-b-[3rem] border border-slate-200 bg-gradient-to-b from-white to-[#f4f6fb] shadow-[0_25px_45px_rgba(15,23,42,0.12)]" />
          <div className="absolute right-[28px] top-[118px] h-[138px] w-[78px] rounded-r-[999px] border-[12px] border-l-0 border-slate-200" />
          <div className="absolute left-[82px] top-[118px] h-[170px] w-[148px] overflow-hidden rounded-[1.6rem] border border-dashed border-slate-300 bg-[#eef4f9]">
            {uploadedImageUrl ? (
              <img
                src={uploadedImageUrl}
                alt="Vista previa"
                className="absolute left-1/2 top-1/2 max-w-none"
                style={{
                  width: `${imageScale}%`,
                  transform: `translate(calc(-50% + ${imageOffsetX}px), calc(-50% + ${imageOffsetY}px))`,
                }}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center p-4 text-center text-xs font-medium text-slate-500">
                Sube tu logo o imagen
              </div>
            )}

            <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/85 px-3 py-2 text-center shadow-sm">
              <p
                className="font-semibold leading-tight text-[#184a53]"
                style={{ fontSize: `${textSize}px` }}
              >
                {customText || 'Escribe tu frase'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f8c93]">
            Personaliza tu taza
          </p>
          <h3 className="mt-3 font-display text-2xl font-black tracking-tight text-[#184a53]">
            Sube tu logo o imagen, escribe tu frase y ajusta la vista previa.
          </h3>
        </div>

        <label className="block space-y-2 text-sm font-medium text-[#28535b]">
          <span className="inline-flex items-center gap-2">
            <FiUploadCloud className="text-[#0f8c93]" />
            Sube tu logo o imagen
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="w-full rounded-2xl border border-[rgba(15,140,147,0.14)] bg-white/85 px-4 py-3 text-sm outline-none file:mr-3 file:rounded-full file:border-0 file:bg-[#0f8c93] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-[#28535b]">
          <span className="inline-flex items-center gap-2">
            <FiType className="text-[#0f8c93]" />
            Escribe tu frase
          </span>
          <input
            value={customText}
            onChange={(event) => onTextChange(event.target.value)}
            className="w-full rounded-2xl border border-[rgba(15,140,147,0.14)] bg-white/85 px-4 py-3 text-sm outline-none transition focus:border-[rgba(15,140,147,0.34)]"
            placeholder="Ej: Tu marca aqui"
          />
        </label>

        <div className="rounded-[24px] bg-white/65 p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#184a53]">
            <FiMove className="text-[#0f8c93]" />
            Ajusta la vista previa
          </p>
          <div className="mt-4 grid gap-4">
            <label className="space-y-2 text-sm text-[#56747b]">
              Tamano de imagen
              <input
                type="range"
                min="50"
                max="190"
                value={imageScale}
                onChange={(event) => onImageScaleChange(Number(event.target.value))}
                className="w-full accent-[#0f8c93]"
              />
            </label>
            <label className="space-y-2 text-sm text-[#56747b]">
              Mover horizontal
              <input
                type="range"
                min="-80"
                max="80"
                value={imageOffsetX}
                onChange={(event) => onImageOffsetXChange(Number(event.target.value))}
                className="w-full accent-[#0f8c93]"
              />
            </label>
            <label className="space-y-2 text-sm text-[#56747b]">
              Mover vertical
              <input
                type="range"
                min="-80"
                max="80"
                value={imageOffsetY}
                onChange={(event) => onImageOffsetYChange(Number(event.target.value))}
                className="w-full accent-[#0f8c93]"
              />
            </label>
            <label className="space-y-2 text-sm text-[#56747b]">
              Tamano de frase
              <input
                type="range"
                min="14"
                max="28"
                value={textSize}
                onChange={(event) => onTextSizeChange(Number(event.target.value))}
                className="w-full accent-[#0f8c93]"
              />
            </label>
          </div>
        </div>

        <div className="rounded-[24px] border border-dashed border-[rgba(15,140,147,0.16)] bg-[#f8fbfb] p-4 text-sm leading-7 text-[#56747b]">
          <p className="inline-flex items-center gap-2 font-semibold text-[#184a53]">
            <FiImage className="text-[#0f8c93]" />
            Vista previa referencial
          </p>
          <p className="mt-2">
            Usa esta vista para ubicar mejor tu imagen y tu frase antes de cotizar o agregar al carrito.
          </p>
        </div>
      </div>
    </div>
  );
}
