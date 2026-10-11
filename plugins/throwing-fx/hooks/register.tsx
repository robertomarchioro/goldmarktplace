import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, Timer } from 'claude-code'

import type { SavataKind, SavataShow } from '../types'
import { DIALECT_LINES, FRAME_MS, frameCount, frameFor } from './frames'
import { EMPTY_TALLY, escalationNote, isSavataSkill, thrownKindIn } from './savata'

const tally = atom({ plugin: 'throwing-fx', key: 'tally' } as const, EMPTY_TALLY)
const show = atom({ plugin: 'throwing-fx', key: 'show' } as const, null)
// True between an invocation of /throwing:savata and the end of that turn:
// the only window in which the model's replies are read at all.
const isArmed = atom({ plugin: 'throwing-fx', key: 'isArmed' } as const, false)

// The running animation's timer; a reload drops it along with the module.
let animation: Timer | undefined

export const register: Register = on => {
  // The skill is read before the model weighs its two gates, so this only
  // tells it where the escalation stands and arms the reply watch; nothing
  // is drawn yet.
  on('skill.prompt', async ($, e, next) => {
    const computed = await next(e)
    if (!isSavataSkill(e.skill)) {
      return computed
    }

    await update($, isArmed, () => true)
    return { text: `${computed.text}\n\n${escalationNote(await read($, tally))}` }
  })

  // The savata is drawn once the model's reply actually throws it. Replies
  // are read only while armed, so any other session or turn goes unread.
  on('session.append', { door: 'response' }, async ($, e, next) => {
    const stored = await next(e)
    if (e.agentId !== undefined || !(await read($, isArmed))) {
      return stored
    }

    const kind = thrownKindIn(e.message.content)
    if (kind !== undefined) {
      await update($, isArmed, () => false)
      await throwSavata($, kind)
    }

    return stored
  }).catch(($, e, next) => next(e))

  on('turn.complete', async ($, e, next) => {
    if (e.agentId === undefined) {
      await update($, isArmed, () => false)
    }

    return next(e)
  })

  on('session.end', async ($, e, next) => {
    if (e.reason === 'clear') {
      stopAnimation()
      await update($, tally, () => EMPTY_TALLY)
      await update($, show, () => null)
      await update($, isArmed, () => false)
    }

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const shown = await read($, show)
    if (shown === null || e.props.hasSurvey) {
      return next(e)
    }

    const { Box, Text } = $.ui.resolve(e)
    const frame = frameFor(shown.kind, shown.frame, e.props.bodyColumns)

    return (
      <Box flexDirection="column">
        {frame.rows.map(row => (
          <Text bold={frame.isImpact} dimColor={frame.isFading} wrap="truncate">
            {row}
          </Text>
        ))}
        <Text bold={!frame.isFading} dimColor={frame.isFading} italic wrap="truncate">
          «{DIALECT_LINES[shown.kind]}»
        </Text>
      </Box>
    )
  })
}

function nextFrame(current: SavataShow | null): SavataShow | null {
  if (current === null || current.frame + 1 >= frameCount(current.kind)) {
    return null
  }

  return { ...current, frame: current.frame + 1 }
}

function stopAnimation(): void {
  animation?.cancel()
  animation = undefined
}

async function advance($: EngineInterface): Promise<void> {
  const shown = await update($, show, current => nextFrame(current))
  if (shown === null) {
    stopAnimation()
  }
}

async function throwSavata($: EngineInterface, kind: SavataKind): Promise<void> {
  stopAnimation()
  await update($, tally, current => ({ count: current.count + 1, last: kind }))
  await update($, show, () => ({ kind, frame: 0 }))
  animation = $.clock.every(FRAME_MS, () => void advance($))
}
