import React from 'react'

export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Mi Cuenta</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <aside className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">Menú</h3>
          {/* Opciones de menú */}
        </aside>

        {/* Contenido */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          {/* Perfil del usuario */}
        </div>
      </div>
    </div>
  )
}
