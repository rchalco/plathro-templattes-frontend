export class FindAmbientOutputDetail {
  idAmbiente: number = 0
  title: string = ''
  description: string = ''
  price: number = 0
  location: string = ''
  rating: number = 0
  pathImage: string = ''
  b64Images: string[] = []
}

export class FindAmbientsResponse {
  ambients: FindAmbientOutputDetail[] = []
}
