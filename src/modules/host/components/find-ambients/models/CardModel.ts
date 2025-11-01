export default interface Card {
  idAmbient: number;
  fileNameImage: string;
  title: string;
  description: string;
  price: string;
  location: string;
  rating: number;
  city: string;
  zona: string;
  addressMap: string;
  latitud: string;
  longitud: string;
  observacion: string;
  nombreAmbiente: string;
  b64Images?: ImageB64[];
  services?: ServiceAmbient[];
}

export interface ServiceAmbient {
  id: number;
  icon: string;
  label: string;
  cantidad: number;
}

export interface ImageB64 {
  esFotoInicial: boolean;
  b64Images: string;
}
