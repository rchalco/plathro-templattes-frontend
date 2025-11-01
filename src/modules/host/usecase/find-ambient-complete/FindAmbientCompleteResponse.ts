export class FindAmbientCompleteResponse {
  idAmbiente: number = 0
  city: string = ''
  zona: string = ''
  addressMap: string = ''
  latitud: string = ''
  longitud: string = ''
  observacion: string = ''
  nombreAmbiente: string = ''
  title: string = ''
  description: string = ''
  price: number = 0
  b64Images: ImageB64[] = [];
  services: ServiceAmbient[] = [];
}

export class ServiceAmbient {
  id: number = 0
  icon: string = ''
  label: string = ''
  cantidad: number = 0
}

export class ImageB64 {
  esFotoInicial: boolean = false;
  b64Images: string = ''
}
