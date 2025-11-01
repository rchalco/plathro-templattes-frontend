// Template para pintar el ambiente con color y nombre
export default interface AppointmentModelData {
  appointmentData: {
    color: string
    text: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

// Item template para el select box de ambientes
export interface AmbienteItem {
  idAmbiente: number | 'all'
  title: string
  description: string
  location: string
}
