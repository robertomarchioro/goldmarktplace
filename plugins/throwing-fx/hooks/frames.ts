import type { SavataKind } from '../types'

export const FRAME_MS = 130

export const DIALECT_LINES: Readonly<Record<SavataKind, string>> = {
  minaccia: "Varda che te dago 'na savatà.",
  lancio: 'Desso te riva la savatà.',
}

const SLIPPER = '🩴'
const BOOM = '💥'
const SPLAT = "S'CIAF!"
const TRAIL = '·'
const TARGET = '*'
const SHAKE = '~'

const ARC_ROWS = 4
const MIN_WIDTH = 24
const MAX_WIDTH = 56
const TRAIL_LENGTH = 6

const FLIGHT_FRAMES = 18
const IMPACT_FRAMES = 8
const SHAKE_FRAMES = 18
const HOLD_FRAMES = 20

const WIDE_GLYPHS: ReadonlySet<string> = new Set([SLIPPER, BOOM])

export type Frame = {
  rows: readonly string[]
  isImpact: boolean
  isFading: boolean
}

type Mark = { row: number; col: number; glyph: string }

export function frameCount(kind: SavataKind): number {
  return kind === 'lancio'
    ? FLIGHT_FRAMES + IMPACT_FRAMES + HOLD_FRAMES
    : SHAKE_FRAMES + HOLD_FRAMES
}

export function frameFor(kind: SavataKind, frame: number, columns: number): Frame {
  const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, columns))

  return kind === 'lancio' ? launchFrame(frame, width) : threatFrame(frame)
}

function launchFrame(frame: number, width: number): Frame {
  if (frame < FLIGHT_FRAMES) {
    const trail = steps(Math.max(0, frame - TRAIL_LENGTH), frame).map(step => ({
      ...flightPoint(step, width),
      glyph: TRAIL,
    }))
    const marks = [
      ...trail,
      { row: ARC_ROWS - 1, col: width - 2, glyph: TARGET },
      { ...flightPoint(frame, width), glyph: SLIPPER },
    ]

    return { rows: render(marks), isImpact: false, isFading: false }
  }

  const sinceImpact = frame - FLIGHT_FRAMES
  const arc = steps(0, FLIGHT_FRAMES - 2).map(step => ({
    ...flightPoint(step, width),
    glyph: TRAIL,
  }))
  const marks = [
    ...arc,
    { row: ARC_ROWS - 2, col: width - SPLAT.length - 1, glyph: SPLAT },
    { ...flightPoint(FLIGHT_FRAMES - 1, width), glyph: BOOM },
  ]

  return {
    rows: render(marks),
    isImpact: sinceImpact < IMPACT_FRAMES && sinceImpact % 2 === 0,
    isFading: sinceImpact >= IMPACT_FRAMES,
  }
}

function threatFrame(frame: number): Frame {
  if (frame >= SHAKE_FRAMES) {
    return { rows: render([{ row: 0, col: 3, glyph: SLIPPER }]), isImpact: false, isFading: true }
  }

  const isUp = Math.floor(frame / 2) % 2 === 0
  const row = isUp ? 0 : 1
  const marks = [
    { row, col: isUp ? 0 : 6, glyph: SHAKE },
    { row, col: 3, glyph: SLIPPER },
    { row: row + 1, col: 4, glyph: '|' },
  ]

  return { rows: render(marks), isImpact: false, isFading: false }
}

function flightPoint(step: number, width: number): { row: number; col: number } {
  const t = step / (FLIGHT_FRAMES - 1)
  const height = 4 * t * (1 - t)

  return {
    row: Math.round((ARC_ROWS - 1) * (1 - height)),
    col: Math.round(t * (width - 4)),
  }
}

function steps(from: number, to: number): number[] {
  return Array.from({ length: Math.max(0, to - from) }, (_, i) => from + i)
}

function cellWidth(glyph: string): number {
  return WIDE_GLYPHS.has(glyph) ? 2 : [...glyph].length
}

// Later marks win a cell: they are drawn over the earlier ones they overlap.
function render(marks: readonly Mark[]): string[] {
  return steps(0, ARC_ROWS).map(row => {
    const kept = marks
      .filter(mark => mark.row === row)
      .reduce<readonly Mark[]>((drawn, mark) => [...drawn.filter(other => !overlaps(other, mark)), mark], [])

    return [...kept]
      .sort((a, b) => a.col - b.col)
      .reduce(
        ({ line, cursor }, mark) => ({
          line: line + ' '.repeat(mark.col - cursor) + mark.glyph,
          cursor: mark.col + cellWidth(mark.glyph),
        }),
        { line: '', cursor: 0 },
      ).line
  })
}

function overlaps(a: Mark, b: Mark): boolean {
  return a.col < b.col + cellWidth(b.glyph) && b.col < a.col + cellWidth(a.glyph)
}
