import { describe, expect, mock, test } from 'claude-code/testing'
import type { On } from 'claude-code'

import { FRAME_MS, frameCount, frameFor } from '../hooks/frames'
import { EMPTY_TALLY, escalationNote, thrownKind } from '../hooks/savata'

const THREAT = "🩴 «Varda che te dago 'na savatà.»\nScontrino: ..."
const LAUNCH = '🩴 «Desso te riva la savatà.»\nScontrino: ...'

function reply(text: string, uuid: string) {
  return {
    message: { type: 'assistant' as const, role: 'assistant' as const, content: [{ type: 'text', text }] },
    door: 'response' as const,
    origin: { kind: 'model' as const, model: 'test' },
    uuid,
  }
}

function skillBottom(on: On): void {
  on('skill.prompt', (_$, e) => ({ text: e.text }))
}

describe('thrownKind', () => {
  test('reads the threat and the launch from the dialect line', () => {
    expect(thrownKind(THREAT)).toBe('minaccia')
    expect(thrownKind(LAUNCH)).toBe('lancio')
    expect(thrownKind('🩴 Varda che te dago ’na savatà.')).toBe('minaccia')
  })

  test('ignores a reply that only quotes the lines', () => {
    expect(thrownKind("La minaccia è «Varda che te dago 'na savatà.»")).toBeUndefined()
    expect(thrownKind('🩴 una ciabatta qualsiasi')).toBeUndefined()
  })
})

describe('frames', () => {
  test('every frame of both kinds stays inside the band width', () => {
    for (const kind of ['minaccia', 'lancio'] as const) {
      for (const columns of [10, 30, 80]) {
        const width = Math.max(24, Math.min(56, columns))
        for (let frame = 0; frame < frameCount(kind); frame += 1) {
          const { rows } = frameFor(kind, frame, columns)
          expect(rows.length).toBe(4)
          for (const row of rows) {
            expect([...row].length).toBeLessThanOrEqual(width)
          }
        }
      }
    }
  })

  test("the launch lands on S'CIAF! after the flight", () => {
    const landed = frameFor('lancio', frameCount('lancio') - 1, 60).rows.join('\n')
    expect(landed).toContain("S'CIAF!")
    expect(landed).toContain('💥')
    expect(frameFor('lancio', 0, 60).rows.join('\n')).toContain('🩴')
  })
})

describe('escalationNote', () => {
  test('names the threat first and the launch after one was thrown', () => {
    expect(escalationNote(EMPTY_TALLY)).toContain('MINACCIA')
    expect(escalationNote({ count: 1, last: 'minaccia' })).toContain('LANCIO')
  })
})

test('the savata skill prompt carries the session tally', async ($, on) => {
  skillBottom(on)
  const other = await $.skill.prompt({ skill: 'commit', text: 'body' })
  expect(other.text).toBe('body')

  const savata = await $.skill.prompt({ skill: 'throwing:savata', text: 'body' })
  expect(savata.text).toContain('body')
  expect(savata.text).toContain('MINACCIA')
})

async function noteFor($: { skill: { prompt: (e: { skill: string; text: string }) => Promise<{ text: string }> } }) {
  return (await $.skill.prompt({ skill: 'throwing:savata', text: 'body' })).text
}

test('replies are read only between a savata invocation and the end of its turn', async ($, on) => {
  mock.session(on)
  skillBottom(on)
  on('turn.complete', (_$, e) => ({ text: e.answer }))

  await $.session.append(reply(THREAT, 'row-1'))
  expect(await noteFor($)).toContain('nessuna savata')

  await $.turn.complete({ answer: '', durationMs: 1, isAborted: false, turnId: 't1', reason: 'answer' })
  await $.session.append(reply(THREAT, 'row-2'))
  expect(await noteFor($)).toContain('nessuna savata')
})

test('a thrown savata counts, animates above the prompt, then clears', async ($, on) => {
  const clock = mock.clock(on)
  mock.session(on)
  skillBottom(on)
  on('ui.render', { component: 'AbovePrompt' }, ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text>engine band</Text>
  })

  expect(await noteFor($)).toContain('nessuna savata')
  await $.session.append(reply('Nessuna savata qui.', 'row-1'))
  await $.session.append(reply(THREAT, 'row-2'))

  const band = await $.ui.mount({
    plugin: 'throwing-fx',
    surface: 'terminal',
    component: 'AbovePrompt',
    props: {
      hasSurvey: false,
      isWorking: false,
      maxRows: 12,
      bodyColumns: 60,
      scroll: { offset: 0, bodyRows: 11 },
      view: {},
    },
  })
  expect(await band.find({ type: 'Text', text: /Varda che te dago/ })).toBeDefined()

  await clock.advance(FRAME_MS * frameCount('minaccia'))
  expect(await band.find({ type: 'Text', text: /Varda che te dago/ })).toBeUndefined()
  expect(await band.find({ type: 'Text', text: 'engine band' })).toBeDefined()
  await band.unmount()

  // One throw disarms the watch: a second reply counts only after a new invocation.
  await $.session.append(reply(LAUNCH, 'row-3'))
  expect(await noteFor($)).toContain("è già stata emessa una savata (l'ultima: minaccia)")

  await $.session.append(reply(LAUNCH, 'row-4'))
  expect(await noteFor($)).toContain("sono già state emesse 2 savate (l'ultima: lancio)")
})

test("another plugin's savata skill is left alone", async ($, on) => {
  skillBottom(on)
  const foreign = await $.skill.prompt({ skill: 'other:savata', text: 'body' })
  expect(foreign.text).toBe('body')
})

test("a subagent's reply is never read, even while armed", async ($, on) => {
  mock.session(on)
  skillBottom(on)

  expect(await noteFor($)).toContain('nessuna savata')
  await $.session.append({ ...reply(THREAT, 'row-1'), agentId: 'agent-1' })
  expect(await noteFor($)).toContain('nessuna savata')
})

test('an interrupted turn disarms the watch too', async ($, on) => {
  mock.session(on)
  skillBottom(on)
  on('turn.complete', (_$, e) => ({ text: e.answer }))

  expect(await noteFor($)).toContain('nessuna savata')
  await $.turn.complete({ answer: '', durationMs: 1, isAborted: true, turnId: 't1', reason: 'aborted' })
  await $.session.append(reply(THREAT, 'row-1'))
  expect(await noteFor($)).toContain('nessuna savata')
})

test('/clear resets the count', async ($, on) => {
  mock.session(on)
  skillBottom(on)
  on('session.end', (_$, e) => ({ sessionId: e.sessionId }))

  await noteFor($)
  await $.session.append(reply(THREAT, 'row-1'))
  expect(await noteFor($)).toContain('una savata')

  await $.session.end({ reason: 'clear', sessionId: 's1', resume: { id: 's1' } })
  expect(await noteFor($)).toContain('nessuna savata')
})

test('a reload clears a frame left behind by a dropped timer', async ($, on) => {
  mock.clock(on)
  mock.session(on)
  skillBottom(on)
  on('session.start', () => ({ cwd: '/' }))
  on('ui.render', { component: 'AbovePrompt' }, ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text>engine band</Text>
  })

  await noteFor($)
  await $.session.append(reply(LAUNCH, 'row-1'))
  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })

  const band = await $.ui.mount({
    plugin: 'throwing-fx',
    surface: 'terminal',
    component: 'AbovePrompt',
    props: { hasSurvey: false, isWorking: false, maxRows: 12, bodyColumns: 60, scroll: { offset: 0, bodyRows: 11 }, view: {} },
  })
  expect(await band.find({ type: 'Text', text: 'engine band' })).toBeDefined()
  await band.unmount()
})
