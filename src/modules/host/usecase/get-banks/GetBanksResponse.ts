export class GetListBanksResponseDetail {
  idBank: number | undefined
  nameBank: string | undefined
}

export class GetListBanksResponse {
  banks: GetListBanksResponseDetail[] = []
}
