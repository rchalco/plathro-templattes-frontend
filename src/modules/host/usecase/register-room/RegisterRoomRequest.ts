// Interfaces para los tipos anidados
export interface EspecificacionAmbiente {
  idAmbiente: number
  idClasificador: number
  numeroAmbientes: number
  descripcionGeneral: string
}

export interface FotoAmbiente {
  idAmbiente: number
  esFotoInicial: number
  pathFoto: string
  b64Foto: string
  descripcionFoto: string
}

export default class RegisterRoomRequest {
  idSesion: number
  idAmbiente: number
  idPersona: number
  idTipoAmbiente: number
  nombreAmbiente: string
  idCountry: number
  city: string
  zona: string
  addressMap: string
  latitud: string
  longitud: string
  activo: number
  observacion: string
  disponible: number
  especificacionesAmbiente: EspecificacionAmbiente[]
  serviciosAmbiente: EspecificacionAmbiente[]
  fotos: FotoAmbiente[]
  idBank: number
  accountNumber: string
  idMoneda: number
  title: string
  description: string
  price: number

  constructor(
    idSesion: number = 0,
    idAmbiente: number = 0,
    idPersona: number = 0,
    idTipoAmbiente: number = 0,
    nombreAmbiente: string = '',
    idCountry: number = 0,
    city: string = '',
    zona: string = '',
    addressMap: string = '',
    latitud: string = '',
    longitud: string = '',
    activo: number = 0,
    observacion: string = '',
    disponible: number = 0,
    especificacionesAmbiente: EspecificacionAmbiente[] = [],
    serviciosAmbiente: EspecificacionAmbiente[] = [],
    fotos: FotoAmbiente[] = [],
    idBank: number = 0,
    accountNumber: string = '',
    idMoneda: number = 0,
    title: string = '',
    description: string = '',
    price: number = 0,
  ) {
    this.idSesion = idSesion
    this.idAmbiente = idAmbiente
    this.idPersona = idPersona
    this.idTipoAmbiente = idTipoAmbiente
    this.nombreAmbiente = nombreAmbiente
    this.idCountry = idCountry
    this.city = city
    this.zona = zona
    this.addressMap = addressMap
    this.latitud = latitud
    this.longitud = longitud
    this.activo = activo
    this.observacion = observacion
    this.disponible = disponible
    this.especificacionesAmbiente = especificacionesAmbiente
    this.serviciosAmbiente = serviciosAmbiente
    this.fotos = fotos
    this.idBank = idBank
    this.accountNumber = accountNumber
    this.idMoneda = idMoneda
    this.title = title
    this.description = description
    this.price = price
  }
}
