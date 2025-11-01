export default class FindAmbientsRequest {
  location?: string
  checkIn?: string ='' // formato ISO 8601
  checkOut?: string = '' // formato ISO 8601
  adults?: number
  childrens?: number
  rooms?: number
  //[key: string]: unknown; // Para permitir campos adicionales si es necesario
}
