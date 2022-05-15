import {default as WTT} from './wtt';

// Utility types
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact';
export type MagicItemCategory = 'Armor' | 'Potion' | 'Ring' | 'Rod' | 'Scroll' | 'Staff' | 'Wand' | 'Weapon' | 'Wondrous Item'
export type Ability = 'Strength' | 'Dexterity' | 'Constitution' | 'Intelligence' | 'Wisdom' | 'Charisma';
export type Skill = 'Acrobatics' | 'Animal Handling' | 'Arcana' | 'Athletics' |'Deception' |'History' |'Insight' |'Intimidation' |'Investigation' |'Medicine' |'Nature' |'Perception' |'Performance' |'Persuasion' |'Religion' |'Sleight of Hand' |'Stealth' |'Survival';
export type Alignment = {Order:AlignOrder,Moral:AlignMoral};
export type AlignOrder =  'Lawful'|'Neutral'|'Chaotic'|'Any';
export type AlignMoral = 'Good'|'Neutral'|'Evil'|'Any';
export type CreatureSize = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
export type DamageType = 'Acid' | 'Bludgeoning' | 'Cold' | 'Fire' | 'Force' | 'Lightning' | 'Necrotic' | 'Piercing' | 'Poison' | 'Psychic' | 'Radiant' | 'Slashing' | 'Thunder';
export type DiceRoll = `${number}d${number}`;
export type WTTclass = `${'M'|''}${'X'|''}${keyof typeof WTT}`;


// Text types for item descriptions, etc.

export class AbilityText implements TextBlock {
    type: 'Ability';
    content:{name:string,text:string};

    constructor(n:string,t:string) {
        this.content = {name:n,text:t};
        return this;
    }

    render() : HTMLElement {
        let p = document.createElement('p');
        let bold = document.createElement('b');
        bold.innerText = this.content.name;
        p.appendChild(bold);
        p.innerText = this.content.text;
        return p;
    }
};

export class Paragraph implements TextBlock {
    type:'Paragraph';
    content:string;

    constructor(c:string) {
        this.content = c;
        return this;
    }

    render() : HTMLElement {
        let p = document.createElement('p');
        p.innerText = this.content;
        return p;
    }
};

export class TextList implements TextBlock {
    type:'UnorderedList'|'OrderedList';
    content:string[];

    constructor(t:'UnorderedList'|'OrderedList',...c:string[]) {
        this.type = t;
        this.content = c;
        return this;
    }

    render() : HTMLElement {
        let p = document.createElement('p');
        this.content.forEach((block) => {
            if (this.type === 'UnorderedList') {
                let ul = document.createElement('ul');
                ul.innerText = block;
                p.appendChild(ul);
            } else {
                let li = document.createElement('li');
                li.innerText = block;
                p.appendChild(li);
            }
        })
        return p;
    }
};

export class TextSubheading implements TextBlock {
    type:'Subheading';
    content:string;

    constructor(c:string) {
        
        this.content = c;
        return this;
    }

    render() : HTMLElement {
        let sh = document.createElement('h5');
        sh.innerText = this.content;
        return sh;
    }
};


export interface TextBlock {
    type:string;
    content:any;
    render() : HTMLElement;
}

export function enblockify(block:any) : TextBlock {
    let x;
    switch (block.type) {
        case 'Paragraph': {x = new Paragraph(block.content); break;}
        case 'Ability': {x = new AbilityText(block.content.name,block.content.text); break;}
        case 'Subheading': {x = new TextSubheading(block.content); break;}
        case 'UnorderedList': {x = new TextList('UnorderedList',block.content); break;}
        case 'OrderedList': {x = new TextList('OrderedList',block.content); break;}
    }

    return x;
}