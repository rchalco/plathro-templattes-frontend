import { ref } from 'vue'

export interface Direccion {
  pais: string
  calle: string
  zona: string
  ciudad: string
}

export function useDireccion() {
  const direccion = ref<Direccion>({
    pais: 'BOLIVIA',
    calle: '',
    zona: '',
    ciudad: '',
  })

  const obtenerEtiqueta = (key: string): string => {
    return (
      ({
        pais: 'País o región',
        calle: 'Dirección',
        zona: 'Zona (si corresponde)',
        ciudad: 'Ciudad / municipio',
      }[key] as string) || key
    )
  }

  const obtenerPlaceholder = (key: string): string => {
    return (
      {
        calle: 'Ingresa tu dirección',
        zona: 'Nombre de la zona',
        ciudad: 'Ciudad',
      }[key] || ''
    )
  }

  return {
    direccion,
    obtenerEtiqueta,
    obtenerPlaceholder,
  }
}
