/**
 * Configuration for room services and amenities
 * This centralizes the service definitions to avoid duplication and improve maintainability
 */

export interface ServiceItem {
  id: string
  icon: string
  label: string
  cantidad: number
  requireCounter: boolean
  category: 'room' | 'amenity'
}

/**
 * Room specification services (require counters)
 */
export const roomSpecificationServices: ServiceItem[] = [
  { id: '15', icon: 'bi bi-door-closed', label: 'Dormitorio', cantidad: 0, requireCounter: true, category: 'room' },
  { id: '16', icon: 'bi bi-droplet-fill', label: 'Baño', cantidad: 0, requireCounter: true, category: 'room' },
  { id: '17', icon: 'bi bi-cup-hot-fill', label: 'Cocina', cantidad: 0, requireCounter: true, category: 'room' },
  { id: '18', icon: 'bi bi-box-seam', label: 'Baulera', cantidad: 0, requireCounter: true, category: 'room' },
  { id: '19', icon: 'bi bi-lamp', label: 'Living', cantidad: 0, requireCounter: true, category: 'room' },
  { id: '20', icon: 'bi bi-cup-straw', label: 'Comedor', cantidad: 0, requireCounter: true, category: 'room' },
  { id: '21', icon: 'bi bi-pencil-square', label: 'Escritorio', cantidad: 0, requireCounter: true, category: 'room' },
  { id: '22', icon: 'bi bi-tree', label: 'Patio', cantidad: 0, requireCounter: true, category: 'room' },
  { id: '23', icon: 'bi bi-car-front', label: 'Parqueo', cantidad: 0, requireCounter: true, category: 'room' }
]

/**
 * Amenity services (boolean selection)
 */
export const amenityServices: ServiceItem[] = [
  { id: '24', icon: 'bi bi-wifi', label: 'WIFI', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '25', icon: 'bi bi-tv', label: 'TV', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '26', icon: 'bi bi-fan', label: 'Aire ac.', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '27', icon: 'bi bi-water', label: 'Lavadora', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '28', icon: 'bi bi-droplet', label: 'Piscina', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '29', icon: 'bi bi-water', label: 'Jacuzzi', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '30', icon: 'bi bi-fire', label: 'Parrillero', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '31', icon: 'bi bi-bicycle', label: 'Gym', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '32', icon: 'bi bi-fire', label: 'Chimenea', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '33', icon: 'bi bi-music-note-beamed', label: 'Piano', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '34', icon: 'bi bi-circle-square', label: 'Mesa de billar', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '35', icon: 'bi bi-person-workspace', label: 'Dep empleada', cantidad: 0, requireCounter: false, category: 'amenity' },
  { id: '51', icon: 'bi bi-fan', label: 'Ventilador', cantidad: 0, requireCounter: false, category: 'amenity' }
]

/**
 * Get all services combined
 */
export const getAllServices = (): ServiceItem[] => {
  return [...roomSpecificationServices, ...amenityServices]
}

/**
 * Get services by category
 */
export const getServicesByCategory = (category: 'room' | 'amenity'): ServiceItem[] => {
  return category === 'room' ? roomSpecificationServices : amenityServices
}

/**
 * Get service by ID
 */
export const getServiceById = (id: string): ServiceItem | undefined => {
  return getAllServices().find(service => service.id === id)
}

/**
 * Initialize services with existing data
 */
export const initializeServices = (services: ServiceItem[], existingData: Array<{
  idClasificador: number
  numeroAmbientes: number
}>): ServiceItem[] => {
  const initializedServices = [...services]
  
  for (const item of existingData) {
    const index = initializedServices.findIndex(s => s.id === item.idClasificador.toString())
    if (index !== -1) {
      initializedServices[index].cantidad = item.numeroAmbientes
    }
  }
  
  return initializedServices
}