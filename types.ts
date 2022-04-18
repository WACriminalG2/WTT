import {default as WTT} from './wtt';

// Utility types
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact';
export type Ability = 'Strength' | 'Dexterity' | 'Constitution' | 'Intelligence' | 'Wisdom' | 'Charisma';
export type Skill = 'Acrobatics' | 'Animal Handling' | 'Arcana' | 'Athletics' |'Deception' |'History' |'Insight' |'Intimidation' |'Investigation' |'Medicine' |'Nature' |'Perception' |'Performance' |'Persuasion' |'Religion' |'Sleight of Hand' |'Stealth' |'Survival';
export type Alignment = {Order:AlignOrder,Moral:AlignMoral};
export type AlignOrder =  'Lawful'|'Neutral'|'Chaotic'|'Any';
export type AlignMoral = 'Good'|'Neutral'|'Evil'|'Any';
export type CreatureSize = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
export type DamageType = 'Acid' | 'Bludgeoning' | 'Cold' | 'Fire' | 'Force' | 'Lightning' | 'Necrotic' | 'Piercing' | 'Poison' | 'Psychic' | 'Radiant' | 'Slashing' | 'Thunder';
export type DiceRoll = `${number}d${number}`;
export type WTTclass = `${'M'|''}${keyof typeof WTT}`;

export type Paragraph = {type:'Paragraph',content:string};
export type TextList = {type:'UnorderedList'|'OrderedList',content:string[]};
export type TextSubheading = {type:'Subheading',content:string};


export type TextBlock = Paragraph | TextSubheading | TextList