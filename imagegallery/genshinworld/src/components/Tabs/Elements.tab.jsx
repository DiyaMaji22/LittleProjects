// ─────────────────────────────────────────────────────────────
//  ElementsTab.jsx
//  Tab 1: shows the 7-element grid.
//  Clicking a card opens ElementDetail in place of the grid.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { ELEMENTS } from '../constants/elements.data'
import ElementCard from '../Elementscard'
import ElementDetail from '../ELementsdetails'

export default function ElementsTab() {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {selected ? (
        // ── Detail view ──
        <div
          className="el-noscroll"
          style={{ overflowY: 'auto', flex: 1, animation: 'el-scaleIn .3s ease both' }}
        >
          <ElementDetail el={selected} onClose={() => setSelected(null)} />
        </div>
      ) : (
        // ── Grid view ──
        <div className="el-noscroll" style={{ overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', minHeight: 0, paddingBottom: 24 }}>
            {/* Top row — 4 elements */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 16,
              flex: 1,
              minHeight: 0,
            }}>
              {ELEMENTS.slice(0, 4).map((el, i) => (
                <ElementCard key={el.id} el={el} index={i} onClick={setSelected} />
              ))}
            </div>

            {/* Bottom row — 3 elements, centered */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 16,
              width: '75%',
              margin: '0 auto',
              flex: 1,
              minHeight: 0,
            }}>
              {ELEMENTS.slice(4).map((el, i) => (
                <ElementCard key={el.id} el={el} index={i + 4} onClick={setSelected} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}