// ─────────────────────────────────────────────────────────────
//  data/characters.js
//
//  THIS IS THE ONLY FILE YOU EDIT TO ADD / MODIFY CHARACTERS.
//
//  HOW TO ADD A CHARACTER
//  ──────────────────────
//  1. Import your image at the top.
//  2. Call createCharacter({ ...yourData }) and push it to the array.
//  3. Required fields: id, name, title, archon, region, vision,
//     weapon, rarity, constellation, img, accent,
//     quote, lore, tags, stats[], abilities[]
//  4. Everything else (backgrounds, glow colours, particle colour)
//     is auto-generated from `accent`. Override any field manually
//     if you want a custom look.
//
//  STAT VALUES are 0–100 (visual scale only, not raw game values).
// ─────────────────────────────────────────────────────────────

import { createCharacter } from './defaults'

// ── Image imports ─────────────────────────────────────────────
import ventiImg   from '../assets/venti.png'
import zhongliImg from '../assets/zhongli.webp'
import raidenImg  from '../assets/raiden.jpg'
import nahidaImg  from '../assets/nahida.jpg'
import furinaImg  from '../assets/furina.jpeg'
import mauvikaImg from '../assets/mauvika.jpeg'
// import ayakaImg from '../assets/ayaka.png'   ← add new imports here

// ─────────────────────────────────────────────────────────────

export const CHARACTERS = [

  createCharacter({
    id:            'venti',
    name:          'Venti',
    title:         'Venti · Wine-Sighted Bard',
    archon:        'Barbatos',
    region:        'Mondstadt',
    vision:        'Anemo',
    weapon:        'Bow',
    rarity:        5,
    constellation: 'Carmen Dei',
    img:           ventiImg,
    accent:        '#72d9c0',

    // Custom particles that match the character's personality
    particleSymbols: ['♪', '♫', '✦', '♬', '◆'],

    quote: '"Come on, Traveler, let\'s go! The world is full of songs we haven\'t heard yet."',
    lore:  "A carefree, wine-loving bard who wanders the streets of Mondstadt. He is actually the mortal vessel of Barbatos, the Anemo Archon. 2,600 years ago, he led the revolution that freed Mondstadt from the tyrant Decarabian, establishing a land where 'freedom' is the only law.",
    tags:  ['Crowd Control', 'Battery', 'Anemo Enabler', 'Exploration'],

    stats: [
      { label: 'EM',  val: 95,  color: '#72d9c0' },
      { label: 'ER',  val: 85,  color: '#8aeedc' },
      { label: 'CC',  val: 100, color: '#50b09a' },
      { label: 'ATK', val: 70,  color: '#b0fff0' },
    ],

    abilities: [
      {
        name: 'Skyward Sonnet',
        type: 'Elemental Skill',
        desc: "Summons a Wind Domain at the enemy's location that deals AoE Anemo DMG and launches them into the air. Holding the skill summons a larger domain around Venti and creates an upcurrent for gliding.",
      },
      {
        name: "Wind's Grand Ode",
        type: 'Elemental Burst',
        desc: 'Fires an arrow that creates a massive Stormeye. It sucks in nearby objects and enemies, dealing continuous Anemo DMG. If it comes into contact with Hydro/Pyro/Cryo/Electro, it deals additional Elemental DMG of that type.',
      },
      {
        name: 'Stormeye',
        type: 'Passive',
        desc: "Regenerates 15 Energy to Venti after the effects of Wind's Grand Ode end. If an Elemental Absorption occurred, it also restores 15 Energy to all party members of that absorbed element.",
      },
    ],
  }),

  // ──────────────────────────────────────────────────────────

  createCharacter({
    id:            'zhongli',
    name:          'Zhongli',
    title:         'Zhongli · Vago Mundo',
    archon:        'Morax',
    region:        'Liyue',
    vision:        'Geo',
    weapon:        'Polearm',
    rarity:        5,
    constellation: 'Lapis Dei',
    img:           zhongliImg,
    accent:        '#E2AD5C',

    particleSymbols: ['🔶', '◇', '⟡', '✦', '▪'],

    quote: '"Osmanthus wine tastes the same as I remember... but where are those who share the memory?"',
    lore:  "The consultant of the Wangsheng Funeral Parlor who is actually the vessel for the Geo Archon, Morax. Having reigned over Liyue for millennia as the God of Contracts, he staged his own 'death' to test if his city was ready to move into the age of mortals.",
    tags:  ['Shielder', 'Universal Shred', 'CC', 'Geo Construct'],

    stats: [
      { label: 'HP',     val: 100, color: '#E2AD5C' },
      { label: 'ATK',    val: 60,  color: '#D19B4C' },
      { label: 'DEF',    val: 85,  color: '#BF8A3D' },
      { label: 'SHIELD', val: 99,  color: '#E2AD5C' },
    ],

    abilities: [
      {
        name: 'Dominus Lapidis',
        type: 'Elemental Skill',
        desc: 'Creates a Jade Shield that possesses 150% DMG Absorption against all Elemental and Physical DMG. Additionally, characters protected by the shield decrease the Elemental and Physical RES of opponents in a small AoE by 20%.',
      },
      {
        name: 'Planet Befall',
        type: 'Elemental Burst',
        desc: 'Summons a falling meteor that deals massive Geo DMG to opponents caught in its AoE and applies the Petrification status to them, rendering them unable to move.',
      },
      {
        name: 'Dominance of Earth',
        type: 'Passive',
        desc: 'Zhongli deals bonus DMG based on his Max HP, including his Normal Attacks, Stone Stele resonance, and Planet Befall DMG.',
      },
    ],
  }),

  // ──────────────────────────────────────────────────────────

  createCharacter({
    id:            'raiden',
    name:          'Raiden Shogun',
    title:         'Raiden Shogun · Plane of Euthymia',
    archon:        'Beelzebul',
    region:        'Inazuma',
    vision:        'Electro',
    weapon:        'Polearm',
    rarity:        5,
    constellation: 'Imperatrix Umbrosa',
    img:           raidenImg,
    accent:        '#b06aff',

    particleSymbols: ['⚡', '✦', '◆', '⟡', '▪'],

    quote: '"Inactivity serves no purpose whatsoever. Hmph. Tell me, what is it you wish to do?"',
    lore:  "The Almighty Shogun, the undisputed ruler of Inazuma. While the puppet Shogun governs the nation, the true Electro Archon, Ei (Beelzebul), meditates within the Plane of Euthymia. Seeking to preserve an 'Eternity' that never changes, she once isolated her nation from the world.",
    tags:  ['Burst DPS', 'Battery', 'Electro Enabler', 'Buffer'],

    stats: [
      { label: 'HP',   val: 80,  color: '#b06aff' },
      { label: 'ATK',  val: 85,  color: '#b06aff' },
      { label: 'ER',   val: 150, color: '#b06aff' },
      { label: 'CRIT', val: 60,  color: '#b06aff' },
    ],

    abilities: [
      {
        name: 'Transcendence: Baleful Omen',
        type: 'Elemental Skill',
        desc: "Unveils the Eye of Stormy Judgment, dealing Electro DMG and performing coordinated attacks. It also increases the Elemental Burst DMG of all party members based on their Burst's Energy cost.",
      },
      {
        name: 'Secret Art: Musou Shinsetsu',
        type: 'Elemental Burst',
        desc: 'Unleashes the Musou no Hitotachi, dealing massive AoE Electro DMG and entering the Musou Isshin state. While in this state, Raiden uses her Tachi and regenerates Energy for all nearby party members when she hits enemies.',
      },
      {
        name: 'Enlightened One',
        type: 'Passive',
        desc: 'Each 1% above 100% Energy Recharge that the Raiden Shogun possesses grants her 0.6% greater Energy restoration from Musou Isshin and 0.4% Electro DMG Bonus.',
      },
    ],
  }),

  // ──────────────────────────────────────────────────────────

  createCharacter({
    id:            'nahida',
    name:          'Nahida',
    title:         'Nahida · Physic of Purity',
    archon:        'Buer',
    region:        'Sumeru',
    vision:        'Dendro',
    weapon:        'Catalyst',
    rarity:        5,
    constellation: 'Sapientia Oromasdis',
    img:           nahidaImg,
    accent:        '#7acb5a',

    particleSymbols: ['🌿', '✦', '◆', '⟡', '▪'],

    quote: '"The world is but a dream, and I am the one who must wake it."',
    lore:  "Known as Lesser Lord Kusanali and the avatar of Irminsul, Nahida is the Dendro Archon (Buer). After being confined in the Sanctuary of Surasthana for centuries, she was freed by the Traveler. She now guides Sumeru with her vast wisdom, acting as the moon that reflects the sun's light.",
    tags:  ['Sub-DPS', 'Dendro Application', 'EM Buffer', 'Enabler'],

    stats: [
      { label: 'HP',   val: 70,  color: '#7acb5a' },
      { label: 'ATK',  val: 65,  color: '#7acb5a' },
      { label: 'EM',   val: 150, color: '#7acb5a' },
      { label: 'CRIT', val: 80,  color: '#7acb5a' },
    ],

    abilities: [
      {
        name: 'All Schemes to Know',
        type: 'Elemental Skill',
        desc: "Enters an aiming mode to mark enemies with the Seed of Skandha. Marked enemies are linked; triggering Elemental Reactions on them deals Tri-Karma Purification Dendro DMG based on Nahida's ATK and EM.",
      },
      {
        name: 'Illusory Heart',
        type: 'Elemental Burst',
        desc: 'Manifests the Shrine of Maya. Depending on the Elements present in the party (Pyro, Electro, Hydro), provides various buffs to the Tri-Karma Purification effects while within the field.',
      },
      {
        name: 'Compassion Illuminated',
        type: 'Passive',
        desc: 'When unleashing Illusory Heart, the Shrine of Maya will increase the active character\'s Elemental Mastery by 25% of the EM of the party member with the highest EM (up to 250 EM).',
      },
    ],
  }),

  // ──────────────────────────────────────────────────────────

  createCharacter({
    id:            'furina',
    name:          'Furina',
    title:         'Furina · Soloist of Solitary Eternity',
    archon:        'Focalors',
    region:        'Fontaine',
    vision:        'Hydro',
    weapon:        'Sword',
    rarity:        5,
    constellation: 'Animula Choragi',
    img:           furinaImg,
    accent:        '#4fa0ff',

    particleSymbols: ['💧', '✦', '◆', '⟡', '▪'],

    quote: '"The world is but a stage, and I shall be its most dazzling star!"',
    lore:  'The former Hydro Archon who spent 500 years playing a part to save Fontaine from a prophecy of ruin. Now a celebrated performer, Furina has regained her freedom and lives as a human, though she still commands the power of the tides through her vision and the memories of Focalors.',
    tags:  ['Support', 'Off-field DPS', 'Buff', 'Healer'],

    stats: [
      { label: 'HP',   val: 95, color: '#4fa0ff' },
      { label: 'ATK',  val: 65, color: '#4fa0ff' },
      { label: 'ER',   val: 85, color: '#4fa0ff' },
      { label: 'CRIT', val: 70, color: '#4fa0ff' },
    ],

    abilities: [
      {
        name: 'Salon Solitaire',
        type: 'Elemental Skill',
        desc: 'Invites the Salon Members (Ousia) to attack enemies and drain party HP, or the Singer of Many Waters (Pneuma) to heal the active character.',
      },
      {
        name: 'Let the People Rejoice',
        type: 'Elemental Burst',
        desc: 'Creates a stage of foam that causes the party to enter the Universal Revelry state, granting DMG bonuses based on HP changes (Fanfare).',
      },
      {
        name: 'Endless Waltz',
        type: 'Passive',
        desc: 'When the active character receives healing from a source other than Furina and is already at full HP, Furina will heal nearby party members over time.',
      },
    ],
  }),

  // ──────────────────────────────────────────────────────────

  createCharacter({
    id:            'mavuika',
    name:          'Mavuika',
    title:         'Mavuika · Kiongozi',
    archon:        'Haborym',
    region:        'Natlan',
    vision:        'Pyro',
    weapon:        'Claymore',
    rarity:        5,
    constellation: 'Ignis Dea',
    img:           mauvikaImg,
    accent:        '#ff6a6a',

    particleSymbols: ['🔥', '✦', '◆', '⟡', '▪'],

    quote: '"A warrior should always feel fortunate to meet their match on the battlefield."',
    lore:  'Mavuika is the current Pyro Archon of Natlan, governing under the divine name Haborym. Originally a human who claimed the Archon\'s seat through a martial tournament, she sacrificed her life 500 years ago to the Sacred Flame to save Natlan from the Abyss, resurrecting in the present era to lead her people to victory.',
    tags:  ['Main DPS', 'Sub-DPS', 'Pyro Application', 'Nightsoul'],

    stats: [
      { label: 'HP',   val: 92, color: '#ff6a6a' },
      { label: 'ATK',  val: 95, color: '#ff6a6a' },
      { label: 'CRIT', val: 80, color: '#ff6a6a' },
      { label: 'ER',   val: 75, color: '#ff6a6a' },
    ],

    abilities: [
      {
        name: 'The Named Moment',
        type: 'Elemental Skill',
        desc: 'Summons a Flamestrider and Ring of Searing Radiance, dealing Nightsoul-aligned AoE Pyro DMG and performing coordinated attacks alongside the active character.',
      },
      {
        name: 'Hour of Burning Skies',
        type: 'Elemental Burst',
        desc: 'Consumes accumulated Fighting Spirit to unleash a devastating Sunfell Slice from her Flamestrider, dealing massive Nightsoul-aligned AoE Pyro DMG.',
      },
      {
        name: 'Gift of Flaming Flowers',
        type: 'Passive',
        desc: "When a nearby party member triggers a Nightsoul Burst, Mavuika's ATK increases by 30% for 10s.",
      },
    ],
  }),

  // ──────────────────────────────────────────────────────────
  // ADD YOUR NEXT CHARACTER HERE — copy the block above,
  // replace the values, and import your image at the top.
  // ──────────────────────────────────────────────────────────

]