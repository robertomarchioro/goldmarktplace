# throwing-fx

Optional effects for the [`throwing`](../throwing) plugin. When Claude throws a
`/throwing:savata`, this plugin draws it: an ASCII animation in the band above
the prompt.

- **Threat** (first savata): the slipper is raised and shakes, under
  «Varda che te dago 'na savatà.» — about 5 seconds.
- **Launch** (second savata): the slipper flies along a parabola with a dotted
  trail, lands on 💥 **S'CIAF!**, then fades out under
  «Desso te riva la savatà.» — about 6 seconds.

```
             · · · · · ·
      · ·  ·             ·  · ·
  · ·                           S'CIAF!
·                                   💥
«Desso te riva la savatà.»
```

It also makes the savata's escalation reliable. Without it, the skill decides
threat vs launch by searching the transcript for 🩴, which a compaction can
erase. With it, the skill's prompt carries the session's own count.

## Install

```bash
/plugin install throwing@goldmarktplace
/plugin install throwing-fx@goldmarktplace
```

`throwing-fx` does nothing on its own: it reacts to the `savata` skill of the
`throwing` plugin. `throwing` works the same with or without it.

## Requirements

- Claude Code with **function hooks** (mods). Built and tested on 2.1.296.
  The function-hooks API is early access and may change between releases.
- The animation draws in the band above the prompt, which the terminal and
  the desktop app show. Other surfaces get the escalation count only.

## How it works

| Hook | What it does |
| :--- | :--- |
| `session.start` | Clears a frame a reload may have left behind. |
| `skill.prompt` (only `throwing:savata`) | When the savata is invoked, appends the session's savata count to its prompt and **arms** the reply watch. Its matcher selects that one skill: no other skill's prompt ever reaches the hook. |
| `session.append` (responses) | **Only while armed**: checks whether the model's reply opens with 🩴 and carries one of the two dialect lines. If so, counts it, starts the animation and disarms. Otherwise the reply is not read. |
| `turn.complete` | Disarms at the end of the turn, whether a savata was thrown or not. |
| `session.end` | On `/clear`, resets the count. |
| `ui.render` (band above the prompt) | Draws the current frame while an animation runs; otherwise leaves the band to the engine. |

The skill is invoked *before* Claude checks its two gates (clean hands,
receipt), and Claude may still decide not to throw. That is why the animation
starts on the reply, not on the invocation: nothing is drawn for a savata
that was held back.

## Disclosure

- Makes **no network calls** and reads or writes **no files**.
- Registers **function hooks** (listed above).
- Reads the text of the model's replies in the main conversation **only
  between an invocation of `/throwing:savata` and the end of that turn**, in
  memory, to recognise a thrown savata. Nothing is stored or sent anywhere.
  Replies in any other turn, and subagents' replies, are never read.
- Keeps three values in Claude Code's own session state: the savata count,
  the running animation frame, and whether the reply watch is armed. They
  last for the session; `/clear` resets them.
- Appends one short note to the prompt of `/throwing:savata`: the escalation
  count, and a reminder to use that count instead of searching the transcript
  and to still write the savata's payload as the skill says. It never changes
  any other skill, prompt or reply.
- Edge case: if a subagent preloads `/throwing:savata`, the main
  conversation's watch is armed for the rest of that turn too (the event does
  not say which loop loaded the skill). Subagents' own replies are still
  never read.

## Development

```bash
claude plugin validate plugins/throwing-fx
claude plugin test plugins/throwing-fx
```

## License

[MIT](../../LICENSE) © Roberto Marchioro.

---

## 🇮🇹 Italiano

Effetti opzionali per il plugin [`throwing`](../throwing). Quando Claude lancia
una `/throwing:savata`, questo plugin la disegna: un'animazione ASCII nella
banda sopra il prompt.

- **Minaccia** (prima savata): la ciabatta alzata che trema, sotto
  «Varda che te dago 'na savatà.» — circa 5 secondi.
- **Lancio** (seconda savata): la ciabatta fa la parabola con una scia di
  puntini, atterra su 💥 **S'CIAF!** e poi si spegne piano, sotto
  «Desso te riva la savatà.» — circa 6 secondi.

Rende anche affidabile l'escalation della savata. Senza questo plugin, la
skill decide tra minaccia e lancio cercando 🩴 nella conversazione, e una
compattazione del contesto può cancellarlo. Con il plugin, il prompt della
skill riceve il conteggio della sessione.

### Installazione

```bash
/plugin install throwing@goldmarktplace
/plugin install throwing-fx@goldmarktplace
```

`throwing-fx` da solo non fa nulla: reagisce alla skill `savata` del plugin
`throwing`. `throwing` funziona allo stesso modo con o senza.

### Requisiti

- Claude Code con le **function hook** (mod). Costruito e provato sulla
  2.1.296. L'API delle function hook è in anteprima e può cambiare tra una
  versione e l'altra.
- L'animazione compare nella banda sopra il prompt, che terminale e app
  desktop mostrano. Sulle altre superfici arriva solo il conteggio
  dell'escalation.

### Come funziona

| Hook | Cosa fa |
| :--- | :--- |
| `session.start` | Pulisce un fotogramma rimasto a metà dopo un ricaricamento. |
| `skill.prompt` (solo `throwing:savata`) | Quando viene invocata la savata, aggiunge al suo prompt il conteggio delle savate della sessione e **arma** l'osservazione delle risposte. Il filtro seleziona solo quella skill: il prompt di nessun'altra skill arriva mai all'hook. |
| `session.append` (risposte) | **Solo se armato**: controlla se la risposta del modello comincia con 🩴 e contiene una delle due righe in dialetto. Se sì, la conta, avvia l'animazione e disarma. Altrimenti la risposta non viene letta. |
| `turn.complete` | Disarma alla fine del turno, che la savata sia partita o no. |
| `session.end` | Con `/clear`, azzera il conteggio. |
| `ui.render` (banda sopra il prompt) | Disegna il fotogramma corrente mentre l'animazione gira; altrimenti lascia la banda al motore. |

La skill viene invocata *prima* che Claude controlli i due cancelli (mani
pulite, scontrino), e Claude può ancora decidere di non lanciarla. Per questo
l'animazione parte dalla risposta e non dall'invocazione: per una savata
trattenuta non si disegna niente.

### Disclosure

- **Nessuna chiamata di rete**, nessuna lettura o scrittura di **file**.
- Registra **function hook** (elencate sopra).
- Legge il testo delle risposte del modello nella conversazione principale
  **solo tra un'invocazione di `/throwing:savata` e la fine di quel turno**,
  in memoria, per riconoscere una savata lanciata. Niente viene salvato o
  inviato altrove. Le risposte degli altri turni e quelle dei subagent non
  vengono mai lette.
- Tiene tre valori nello stato di sessione di Claude Code: il conteggio delle
  savate, il fotogramma dell'animazione in corso e se l'osservazione è
  armata. Durano quanto la sessione; `/clear` li azzera.
- Aggiunge una breve nota al prompt di `/throwing:savata`: il conteggio
  dell'escalation e un promemoria di usare quel conteggio invece di cercare
  nella conversazione, scrivendo comunque il payload della savata come dice
  la skill. Non modifica mai altre skill, prompt o risposte.
- Caso limite: se un subagent precarica `/throwing:savata`, l'osservazione
  della conversazione principale resta armata anche per il resto di quel
  turno (l'evento non dice quale ciclo ha caricato la skill). Le risposte
  dei subagent continuano a non essere mai lette.

### Sviluppo

```bash
claude plugin validate plugins/throwing-fx
claude plugin test plugins/throwing-fx
```

### Licenza

[MIT](../../LICENSE) © Roberto Marchioro.
