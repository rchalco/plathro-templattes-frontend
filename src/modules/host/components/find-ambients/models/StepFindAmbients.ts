import type Card from './CardModel'

export class StepFindAmbients {
  id: string = ''
  title: string = ''
  description: string = ''
  currentCard: Card | null = null

  constructor(id: string, title: string, description: string) {
    this.id = id
    this.title = title
    this.description = description
    this.currentCard = null
  }

  static stepsForSearch(): StepFindAmbients[] {
    return [
      new StepFindAmbients(
        'buscar-ambientes',
        'Buscar Ambientes',
        'Encuentra ambientes disponibles para unirte.',
      ),
      new StepFindAmbients(
        'detalles-ambiente',
        'Seleccionar Ambiente',
        'Elige un ambiente de la lista de resultados.',
      ),
      new StepFindAmbients(
        'pago-reserva',
        'Unirse al Ambiente',
        'Únete al ambiente seleccionado y comienza a interactuar.',
      ),
    ]
  }
}
