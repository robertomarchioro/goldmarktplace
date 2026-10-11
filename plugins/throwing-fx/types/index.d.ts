export type SavataKind = 'minaccia' | 'lancio'

export type SavataTally = { count: number; last: SavataKind | null }

export type SavataShow = { kind: SavataKind; frame: number }

declare module 'claude-code' {
  interface PluginState {
    'throwing-fx': { tally: SavataTally; show: SavataShow | null; isArmed: boolean }
  }
}
