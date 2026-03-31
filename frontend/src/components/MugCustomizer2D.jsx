import React from 'react';

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
    <div className="glass-card grid gap-8 p-4 sm:p-6 lg:grid-cols-2">
      {/* Preview de la Taza - Simplificado */}
      <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-6 sm:p-8">
        <div className="relative w-full max-w-sm">
          {/* Sombra */}
          <div className="absolute -bottom-4 left-1/2 h-6 w-40 -translate-x-1/2 rounded-full bg-black/5 blur-lg" />
          
          {/* Taza - Simplificada */}
          <div className="relative aspect-square flex items-center justify-center">
            {/* Cuerpo de la taza */}
            <div className="absolute inset-0 rounded-3xl border-8 border-slate-200 bg-white shadow-2xl" />
            
            {/* Asa de la taza */}
            <div className="absolute -right-8 top-1/4 h-20 w-16 rounded-r-3xl border-8 border-slate-200 bg-white" />
            
            {/* Área de imagen - GRANDE Y CLARA */}
            <div className="absolute inset-8 sm:inset-10 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-slate-50 border-2 border-slate-100">
              {uploadedImageUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={uploadedImageUrl}
                    alt="Vista previa"
                    className="w-full h-full object-contain p-4"
                    style={{
                      transform: `translate(${imageOffsetX * 0.5}px, ${imageOffsetY * 0.5}px) scale(${imageScale / 100})`,
                      transformOrigin: 'center',
                    }}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <svg className="w-12 h-12 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs sm:text-sm font-medium text-slate-500">Sube tu imagen</p>
                </div>
              )}
            </div>

            {/* Texto en la taza */}
            {customText && (
              <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                <p
                  className="font-bold text-slate-700 drop-shadow-sm"
                  style={{ fontSize: `${Math.min(textSize * 0.6, 10)}px` }}
                >
                  {customText}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controles - Simplificados */}
      <div className="space-y-5">
        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 p-4 border border-blue-200/50">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-1">
            Personaliza tu Taza
          </p>
          <h3 className="font-display text-lg sm:text-xl font-black tracking-tight text-slate-800">
            Sube tu diseño y ajusta lo que necesites
          </h3>
        </div>

        {/* Paso 1: Subir imagen */}
        <div className="space-y-2">
          <label className="block space-y-2 font-bold text-slate-700">
            <span className="inline-flex items-center gap-2 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">1</div>
              Sube tu imagen o logo
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="w-full rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/50 px-4 py-4 text-sm outline-none hover:bg-blue-100/50 transition file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-xs file:font-bold file:text-white file:cursor-pointer hover:file:bg-blue-700"
          />
          <p className="text-xs text-slate-500">PNG, JPG o GIF - Hasta 10MB</p>
        </div>

        {/* Paso 2: Texto */}
        <div className="space-y-2">
          <label className="block space-y-2 font-bold text-slate-700">
            <span className="inline-flex items-center gap-2 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">2</div>
              Texto (opcional)
            </span>
          </label>
          <input
            value={customText}
            onChange={(event) => onTextChange(event.target.value)}
            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Ej: Mi empresa"
            maxLength="20"
          />
          <p className="text-xs text-slate-500">{customText.length}/20 caracteres</p>
        </div>

        {/* Paso 3: Ajustes - Más compacto */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-4">
          <p className="inline-flex items-center gap-2 font-bold text-slate-800 text-sm">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">3</div>
            Ajusta tu diseño
          </p>

          <div className="space-y-3">
            <label className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Tamaño</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">{imageScale}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={imageScale}
                onChange={(event) => onImageScaleChange(Number(event.target.value))}
                className="w-full accent-blue-600 h-2 rounded-lg appearance-none bg-slate-200"
              />
            </label>

            <label className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Mover Horizontal</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">{imageOffsetX > 0 ? '+' : ''}{imageOffsetX}</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={imageOffsetX}
                onChange={(event) => onImageOffsetXChange(Number(event.target.value))}
                className="w-full accent-blue-600 h-2 rounded-lg appearance-none bg-slate-200"
              />
            </label>

            <label className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Mover Vertical</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">{imageOffsetY > 0 ? '+' : ''}{imageOffsetY}</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={imageOffsetY}
                onChange={(event) => onImageOffsetYChange(Number(event.target.value))}
                className="w-full accent-blue-600 h-2 rounded-lg appearance-none bg-slate-200"
              />
            </label>

            <label className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Tamaño Texto</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">{textSize}px</span>
              </div>
              <input
                type="range"
                min="10"
                max="20"
                value={textSize}
                onChange={(event) => onTextSizeChange(Number(event.target.value))}
                className="w-full accent-blue-600 h-2 rounded-lg appearance-none bg-slate-200"
              />
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-xs leading-relaxed text-slate-600">
          <p className="inline-flex items-center gap-2 font-bold text-green-700 mb-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Esto es lo que verá el cliente
          </p>
          Usa esta vista previa para comprobar cómo se vería tu diseño en la taza real.
        </div>
      </div>
    </div>
  );
}
