export class Ambients {
  idAmbiente: string = ''
  title: string = ''
  description: string = ''
  location: string = ''
  //idOrder: number = 0
}
export class Reservation {
  idReservaAmbiente: number = 0
  idAmbiente: string = ''
  title: string = ''
  checkIn: string = ''
  checkOut: string = ''
  location: string = ''
  idOrder: number = 0
}

export class HostSchedulerResponse {
  ambients: Ambients[] = []
  reservations: Reservation[] = []
}
