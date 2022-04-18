import {Ability, Alignment, CreatureSize, DamageType, DiceRoll, Rarity, Skill, WTTclass} from './types';
import * as fs from 'fs';
import wtt from './wtt';

// Primary classes
export class Sourcebook {
    Title: string; // Player's Handbook
    Author: string; // Wizards of the Coast
    Shortform: string; //PHB
    Ruleset: '5e';
    Version: string; // v1.0
    Description: string;
    Wares?: Ware[];

    // Content types not yet implemented 

    CharClasses?: Array<any>;
    SubClasses?: Array<any>;
    Races?: Parentage[]; // Plan to use "An Orc And An Elf Had A Baby" rules
    Backgrounds?: Array<any>;
    Spells?: Array<any>;
    Feats?: Array<any>;
    Locations?: Array<any>;
    NPCs?: Array<any>;
    Bestiary?: Array<any>;
    Favors?: Array<any>;
    Rules?: Array<any>;
    Generators?: Generator[];
    RandomTables?: RandomTable[];
    

    constructor(t: string,s: string) {
        this.Title = t;
        this.Author = "";
        this.Shortform = s;
        this.Description = "";
        this.Wares = []
    };

    desc(d:string) : this {
        this.Description = d;
        return this;
    };

    author(a:string) : this {
        this.Author = a;
        return this;
    }

    version(v:string) : this {
        this.Version = v;
        return this;
    }

    stock(w:Ware) : this {
        let y = w;
        y.Source = this.Title;
        y.Shortform = this.Shortform;
        this.Wares.push(y);
        return this;
    };

    multistock(w:Ware[]) : this {
        w.forEach((x) => {
            let y = x;
            y.Source = this.Title;
            y.Shortform = this.Shortform;
            this.Wares.push(y);
        })
        return this;
    };

    public shop(s:string) : Ware[] {
        let w = [];
        this.Wares.forEach((i) => {
            i.Classifications.forEach((c) => {
                if (c.startsWith(s)) {
                    w.push(i)
                }
            })
        });
        return w;
    }

    write() : void {
        fs.writeFile('./sourcebooks/'+this.Shortform+'.json',JSON.stringify(this),(() => {}))
    }

    read(s:string,confirmation:"Yes I'm sure") : this {
        let book = require('./sourcebooks/'+s+'.json');
        Object.assign(this,book);
        return this;
    }
};

export class Ware {
    Name: string;
    Description: string;
    Classifications: WTTclass[]; //[AC420.69,BR549]
    Category: 'Service' | 'Object' | 'Creature' ;
    Prices?: Price[];
    PriceModifiers?: PriceModifier[];
    Rarity?: Rarity;
    Page: string; // 38, XI, V2p28, NA
    Weight?: number;
    WeightMeasure: string = "";
    Advantages?: string[] = [];
    Disadvantages?: string[] = [];
    Consumable: boolean = false;
    // Needs an Attunement property.
    // Needs an Icon property, could possibly be used for report grouping?

    // These are assigned at stock-time.
    Source?: string;
    Shortform?: string;

    constructor(n: string,p: string) {
        this.Name = n;
        this.Description = "";
        this.Classifications = [];
        this.Category = 'Object';
        this.Prices = [];
        this.Page = p;
    };

    desc(d: string) : this {
        this.Description = d;
        return this;
    };

    classify(...c: WTTclass[]) : this {
        c.forEach((s) => {
            this.Classifications.push(s);
        });
        return this;
    };

    declassify() : this {
        this.Classifications = [];
        return this;
    }

    rarity(r:Rarity) : this {
        this.Rarity = r;
        return this;
    };

// Weight methods 

    weigh(w:number,m:string) : this {
        this.Weight = w;
        this.WeightMeasure = m;
        return this;
    }

    lb(n:number) : this {
        this.Weight = n;
        this.WeightMeasure = 'lb.'
        return this;
    }

    oz(n:number) : this {
        this.Weight = n;
        this.WeightMeasure = 'oz.';
        return this;
    }

    ton(n:number) : this {
        this.Weight = n;
        this.WeightMeasure = 'ton';
        return this;
    }

    weight() : string {
        if (this.Weight) {return `${this.Weight} ${this.WeightMeasure}`}
        else {return `--`}
    }

// Sub-type conversion methods
    creature() : SellableCreature {
        this.Category = 'Creature';
        return <SellableCreature> <unknown> this;
    }

    service() : Service {
        this.Category = 'Service';
        return <Service> <unknown> this;
    }

    weapon() : Weapon {
        return <Weapon> <unknown> this;
    }

    armor() : Armor {
        return <Armor> <unknown> this;
    }

// Price-setting methods

    sell(p:Price | number) : this {
        if (p instanceof Price) {this.Prices.push(p)} else {this.Prices.push(GP(p))};
        return this;
    }

    modify(m:string,c:string) : this {
        this.PriceModifiers.push({
            Modifier: m,
            Circumstance: c
        });
        return this;
    }

// Other stuff

    advantage(s:string) : this {
        this.Advantages.push(s);
        return this;
    }

    disadvantage(s:string) : this {
        this.Disadvantages.push(s);
        return this;
    }

    citation() : string {
        return this.Shortform + this.Page;
    }

}

export class Price {
    cp: number = 0;
    sp: number = 0;
    ep: number = 0;
    gp: number = 0;
    pp: number = 0;
    Measure: string = ""; // 1 lb; 3 oz; 5; 1 hr; 20 ft

    constructor(c: number, s: number, e: number, g: number, p: number) {
        this.cp = c;
        this.sp = s;
        this.ep = e;
        this.gp = g;
        this.pp = p;
    }

    CP(n:number) : this {
        this.cp = n;
        return this;
    }

    SP(n:number) : this {
        this.sp = n;
        return this;
    }

    EP(n:number) : this {
        this.ep = n;
        return this;
    }

    GP(n:number) : this {
        this.gp = n;
        return this;
    }

    PP(n:number) : this {
        this.pp = n;
        return this;
    }

    measure(m:string) : Price {
        this.Measure = m;
        return this;
    }

    out() : string {
        let arr : string[] = [];
        if (this.pp > 0) {arr.push(this.pp + "pp")}
        if (this.gp > 0) {arr.push(this.gp + "gp")}
        if (this.ep > 0) {arr.push(this.ep + "ep")}
        if (this.sp > 0) {arr.push(this.sp + "sp")}
        if (this.cp > 0) {arr.push(this.cp + "cp")}
        
        let x = arr.join(",");
        if (this.Measure.length > 0) {
            x +=" / "+this.Measure
        }
        return x
    }
};

export class PriceModifier {
    Modifier: string; // x2 ; +5 gp
    Circumstance: string; // In the summer; Over the weekend; In a mountain range; On short notice; During a drought; In bulk

    constructor(m:string,c:string) {
        this.Modifier = m;
        this.Circumstance = c;
    }
}

export class Roll {
    d4: number = 0;
    d6: number = 0;
    d8: number = 0;
    d10: number = 0;
    d12: number = 0;
    d20: number = 0;
    d100: number = 0;
    mod: number = 0;
    multiplier: number = 1;
    adv: boolean = false;
    disadv: boolean = false;

    constructor(d4?:number,d6?:number,d8?:number,d10?:number,d12?:number,d20?:number,d100?:number,mod?:number,adv?:'Advantage'|'Disadvantage',mult?:number) {
        if(d4){this.d4 = d4};
        if(d6){this.d6 = d6};
        if(d8){this.d8 = d8};
        if(d10){this.d10 = d10};
        if(d12){this.d12 = d12};
        if(d20){this.d20 = d20};
        if(d100){this.d100 = d100};
        if(mod){this.mod = mod};
        if(mult){this.multiplier = mult};
        if(adv){
            if(adv = 'Advantage') {
                this.adv = true;
            }
            if(adv = 'Disadvantage') {
                this.disadv = true;
            }
        }
        return this;
    }

    D4 (d?:number) : this {
        if(d){this.d4 += d} else {this.d4 += 1};
        return this;
    }

    D6 (d?:number) : this {
        if(d){this.d6 += d} else {this.d6 += 1};
        return this;
    }

    D8 (d?:number) : this {
        if(d) {this.d8 += d} else {this.d8 += 1};
        return this;
    }

    D10 (d?:number) : this {
        if(d) {this.d10 += d} else {this.d10 += 1};
        return this;
    }

    D12 (d?:number) : this {
        if(d) {this.d12 += d} else {this.d12 += 1};
        return this;
    }

    D20 (d?:number) : this {
        if(d) {this.d20 += d} else {this.d20 += 1};
        return this;
    }

    D100 (d?:number) : this {
        if(d) {this.d100 += d} else {this.d100 += 1};
        return this;
    }

    MOD (m:number) : this {
        this.mod += m;
        return this;
    }

    ADV () : this {
        this.adv = true;
        return this;
    }

    DISADV () : this {
        this.disadv = true;
        return this;
    }

    MULTIPLY (m:number) : this {
        this.multiplier = m;
        return this;
    }

    // Methods still needed: toString(), result(), keep()
}

// Ware sub-classes
export class Armor extends Ware {
    BaseAC?: number
    ACMod?: Ability
    MaxMod?: number
    ArmorType: 'Light' | 'Medium' | 'Heavy' | 'Shield'
    StrengthReq?: number

    constructor(n:string,p:string,at?:Armor["ArmorType"]) {
        super(n,p);
        if (at) {this.ArmorType=at};
        return this;
    }

    strReq(n:number) : this {
        this.StrengthReq=n;
        return this;
    }

    ac(base:number,mod?:Ability,max?:number) : this {
        this.BaseAC = base;
        if (mod) {this.ACMod = mod};
        if (max) {this.MaxMod = max};
        return this;
    }

    light() : this {
        this.ArmorType = 'Light';
        return this;
    }

    medium() : this {
        this.ArmorType = 'Medium';
        return this;
    }

    heavy() : this {
        this.ArmorType = 'Heavy';
        return this;
    }

    shield() : Shield {
        this.ArmorType = 'Shield';
        return <Shield> <unknown> this;
    }
}

export class Container extends Ware {
    Capacity: string;

    constructor(n:string,p:string,c:string) {
        super(n,p);
        this.Capacity=c;
        return this;
    }

    capacity(c:string) : this {
        this.Capacity=c;
        return this;
    }
}

export class SellableCreature extends Ware {

    AC?: number;
    HP?: number;
    STR?: number;
    DEX?: number;
    CON?: number;
    INT?: number;
    WIS?: number;
    CHA?: number;
    Aligned: boolean = true;
    Alignment: Alignment = {Order:'Any',Moral:'Any'};
    Speed: string = "30ft";
    Size: CreatureSize = 'Medium';
    // Needs Resistance and Immunity properties + methods.

    constructor(n:string,p:string) {
        super(n,p);
        this.Category = 'Creature';
        return this;
    }

    // Basic stat functions
    stat(str: number,dex: number,con: number,int: number,wis: number,cha: number) : this {
        this.STR = str;
        this.DEX = dex;
        this.CON = con;
        this.INT = int;
        this.WIS = wis;
        this.CHA = cha;
        return this;
    }

    str(n?: number) : this | number {
        if(n){
            this.STR = n; 
            return this;
        } else {
            return this.STR;
        }
    }

    dex(n: number) : this {
        this.DEX = n;
        return this;
    }

    con(n: number) : this {
        this.CON = n;
        return this;
    }

    int(n: number) : this {
        this.INT = n;
        return this;
    }

    wis(n: number) : this {
        this.WIS = n;
        return this;
    }

    cha(n: number) : this {
        this.CHA = n;
        return this;
    }

    ac(n: number) : this {
        this.AC = n;
        return this;
    }

    hp(n: number) : this {
        this.HP = n;
        return this;
    }

// Alignment functions
    //Setters
    evil() : this {
        this.Alignment.Moral = 'Evil';
        return this;
    }

    good() : this {
        this.Alignment.Moral = 'Good';
        return this;
    }

    lawful() : this {
        this.Alignment.Order = 'Lawful';
        return this;
    }

    chaotic() : this {
        this.Alignment.Order = 'Chaotic';
        return this;
    }

    neutral() : this {
        if (this.Alignment.Moral = 'Any') {
            this.Alignment.Moral = 'Neutral'
        };
        if (this.Alignment.Order = 'Any') {
            this.Alignment.Order = 'Neutral'
        };
        return this;
    }

    unaligned() : this {
        this.Aligned = false;
        return this;
    }
    //Getters
    alignment() : string {
        if (this.Aligned) {
            return this.Alignment.Moral + ' ' + this.Alignment.Order
        } else {
            return 'Unaligned'
        }
    }

    axis(a:'Order' | 'Moral') : string {
        if (this.Aligned = false) {
            return 'Unaligned'
        } else {
                if (a = 'Order') {
                    return this.Alignment.Order
                } else {
                    return this.Alignment.Moral
                }
        }
    }
    // Speed and size functions
    speed(s:string) : this {
        this.Speed = s;
        return this;
    }

    tiny() : this {
        this.Size = 'Tiny';
        return this;
    }

    small() : this {
        this.Size = 'Small';
        return this;
    }

    medium() : this {
        this.Size = 'Medium';
        return this;
    }

    large() : this {
        this.Size = 'Large';
        return this;
    }

    huge() : this {
        this.Size = 'Huge';
        return this;
    }

    gargantuan() : this {
        this.Size = 'Gargantuan';
        return this;
    }

    size(s:CreatureSize) : this {
        this.Size = s;
        return this;
    }
}

export class Mount extends SellableCreature {
    CarryCapacity: {Weight:number,Measure:string}

    constructor(n:string,p:string,c:number) {
        super(n,p);
        this.CarryCapacity = {Weight:c,Measure:'lb.'};
        return this;
    }

    capacity(w:number,m:string) : this {
        this.CarryCapacity = {Weight: w, Measure: m};
        return this;
    }
}

export class Service extends Ware {
    constructor(t:string,p:string) {
        super(t,p);
        this.Category = 'Service';
        return this;
    }
}

export class Shield extends Armor {
    BonusAC?: number

    constructor(n:string,p:string) {
        super(n,p,'Shield');
        return this;
    }

    bonusAC(n:number) : this {
        this.BonusAC=n;
        return this;
    }
}

export class Weapon extends Ware {
    Damage?: Roll;
    DamageType? : string;
    Properties?: Record<string,boolean>
    Range?: `${number}/${number}`
    Simplicity?: 'Simple' | 'Martial'

    // Special Properties

    Ammunition? : boolean
    Finesse? : boolean
    Heavy? : boolean
    Light? : boolean
    Loading? : boolean
    Reach? : boolean
    Special?: string
    Thrown?: boolean
    TwoHanded?: boolean
    Versatile?: Roll

    constructor(t:string,p:string) {
        super(t,p);
        return this;
    }

    dmgtype(d:DamageType) : this {
        this.DamageType = d;
        return this;
    }

    dmg(d:Roll|4|6|8|10|12|20|100,t?:DamageType) : this {
        if(d instanceof Roll) {this.Damage = d} else {
            if(d=4){this.Damage = new Roll().D4()};
            if(d=6){this.Damage = new Roll().D6()};
            if(d=8){this.Damage = new Roll().D8()};
            if(d=10){this.Damage = new Roll().D10()};
            if(d=12){this.Damage = new Roll().D12()};
            if(d=20){this.Damage = new Roll().D20()};
            if(d=100){this.Damage = new Roll().D100()};
        };
        if (t) {
            this.DamageType = t
        }
        return this
    }

    simple() : this {
        this.Simplicity = 'Simple';
        return this
    }

    martial() : this {
        this.Simplicity = 'Martial';
        return this
    }

    // Special Properties

    ammunition(r:Weapon["Range"]) : this {
        this.Ammunition = true;
        this.Range = r;
        return this;
    }

    finesse() : this {
        this.Finesse = true;
        return this
    }

    heavy() : this {
        this.Heavy = true;
        return this
    }

    light(): this {
        this.Light = true;
        return this
    }

    loading(): this {
        this.Loading = true;
        return this;
    }

    range(r:Weapon["Range"]) : this {
        this.Range = r;
        return this;
    }

    reach(): this {
        this.Reach = true;
        return this;
    }

    special(s:string): this {
        this.Special = s;
        return this
    }

    thrown(r: Weapon["Range"]): this {
        this.Thrown = true;
        this.Range = r;
        return this
    }

    twohanded(): this {
        this.TwoHanded = true;
        return this
    }

    versatile(d:Roll|4|6|8|10|12|20|100) : this {
        if(d instanceof Roll){this.Versatile = d} else {
            if(d=4){this.Versatile = new Roll().D4()};
            if(d=6){this.Versatile = new Roll().D6()};
            if(d=8){this.Versatile = new Roll().D8()};
            if(d=10){this.Versatile = new Roll().D10()};
            if(d=12){this.Versatile = new Roll().D12()};
            if(d=20){this.Versatile = new Roll().D20()};
            if(d=100){this.Versatile = new Roll().D100()};
        };
        return this
    }
}

// Player Options
export class Parentage {
    Name: string

}

// Simple price generation helpers
export function CP(n:number) : Price {
    return new Price(n,0,0,0,0)
}

export function SP(n:number) : Price {
    return new Price(0,n,0,0,0)
}

export function EP(n:number) : Price {
    return new Price(0,0,n,0,0)
}

export function GP(n:number) : Price {
    return new Price(0,0,0,n,0)
}

export function PP(n:number) : Price {
    return new Price(0,0,0,0,n)
}

// Experimental bullshit

export class Generator {
    ID: string;
    Lists: Record<string,string[]>
    Template: string | string[];

    constructor(i:string,t?:string|string[]) {
        this.ID = i;
        this.Lists = {};
        this.Template = []
        
        return this;
    }
}

export class RandomTable {

}