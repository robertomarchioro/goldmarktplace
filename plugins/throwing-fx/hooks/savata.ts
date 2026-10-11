import type { SavataKind, SavataTally } from '../types'

type ContentBlock = { type: string; [field: string]: unknown }

const OPENER = '🩴'
const LAUNCH_MARK = /desso te riva la savat/i
const THREAT_MARK = /te dago ['’]na savat/i

export const EMPTY_TALLY: SavataTally = { count: 0, last: null }


// A savata counts as thrown only when the reply opens with the slipper and
// carries one of the two dialect lines: quoting the lines while discussing
// the skill does not throw one.
export function thrownKind(text: string): SavataKind | undefined {
  if (!text.trimStart().startsWith(OPENER)) {
    return undefined
  }
  if (LAUNCH_MARK.test(text)) {
    return 'lancio'
  }
  if (THREAT_MARK.test(text)) {
    return 'minaccia'
  }

  return undefined
}

export function thrownKindIn(content: readonly ContentBlock[]): SavataKind | undefined {
  return content
    .map(block => (block.type === 'text' && typeof block.text === 'string' ? thrownKind(block.text) : undefined))
    .find(kind => kind !== undefined)
}

export function escalationNote(tally: SavataTally): string {
  const header =
    'Nota della mod throwing-fx: contatore della sessione, affidabile anche dopo una compattazione. Usalo al posto della ricerca di 🩴 nel transcript.'

  const thrown = tally.count === 1 ? 'è già stata emessa una savata' : `sono già state emesse ${tally.count} savate`
  const state =
    tally.count === 0
      ? 'In questa sessione non è ancora stata emessa nessuna savata: se i due cancelli reggono, questa è la MINACCIA.'
      : `In questa sessione ${thrown} (l'ultima: ${tally.last}). Se l'attrito è lo stesso e i due cancelli reggono, questa è il LANCIO.`

  const drawing =
    "L'animazione la disegna la mod sopra il prompt: scrivi comunque il payload come da istruzioni, aprendo con 🩴 e con la riga in dialetto testuale."

  return [header, state, drawing].join('\n')
}
