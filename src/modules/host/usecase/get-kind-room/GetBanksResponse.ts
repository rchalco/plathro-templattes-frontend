export class GetKindRoomResponseDetail {
  idKindRoom: number | undefined
  kindNameRoom: string | undefined
  icon: IconDetail = { name: 'bi bi-house-heart-fill', color: 'text-white', background: 'success' }
}

export class GetKindRoomResponse {
  kindRooms: GetKindRoomResponseDetail[] = []
}

export class IconDetail {
  name: string = 'bi bi-house-heart-fill'
  color: string = 'text-white'
  background: string = 'success'
}
