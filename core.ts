import {Ability, AbilityText, Alignment, CreatureSize, DamageType, DiceRoll, enblockify, MagicItemCategory, Paragraph, Rarity, Skill, TextBlock, TextList, WTTclass} from './types';
import { ParentageUpbringing } from './parentage';
import * as fs from 'fs';
import { randomInt } from 'crypto';

// Primary classes
export class Sourcebook {
    Title: string; // Player's Handbook
    Author: string = ""; // Wizards of the Coast
    Shortform: string = ""; //PHB
    Ruleset: '5e';
    Version: string = ""; // v1.0
    URL?: string;
    Description: string = "";
    Wares?: Ware[] = [];
    Parentages?: ParentageUpbringing[] = [];
    Spells?: Spell[] = [];

    // Content types which may eventually be included, but not yet implemented 
    
    Backgrounds?: Array<any>;
    Bestiary?: Array<any>;
    CharClasses?: Array<any>;
    Favors?: Array<any>;
    Feats?: Array<any>;
    Generators?: Generator[];
    Locations?: Array<any>;
    NPCs?: Array<any>;
    RandomTables?: RandomTable[];
    Rules?: Array<any>;
    SubClasses?: Array<any>;
    Trinkets?: Array<any>;
    Upbringings?: ParentageUpbringing[];    


    /**
     * Creates a new sourcebook object.
     * @param {String} t The book's title. Example: Player's Handbook
     * @param s The book's abbreviation. Example: PHB
     */
    constructor(t: string,s: string) {
        this.Title = t;
        this.Shortform = s;
    };

    /**
     * Sets the description of the sourcebook.
     * @param d The description.
     * @returns Sourcebook
     */
    desc(d:string) : this {
        this.Description = d;
        return this;
    };

    /**
     * Sets the book's author.
     * @param a The author or publisher. Example: Wizards of the Coast
     * @returns Sourcebook
     */

    author(a:string) : this {
        this.Author = a;
        return this;
    }

    /**
     * Assigns a citation URL to this sourcebook -- usually where it can be downloaded or purchased.
     * @param url The URL to assign.
     * @returns Sourcebook
     */
    link(url:string) : this {
        this.URL = url;
        return this;
    }

    /**
     * Sets the book's version ID.
     * @param v The version. If this is an adaptation of a published work, it's best to use the version number from the copy you're adapting.
     * @returns Sourcebook
     */
    version(v:string) : this {
        this.Version = v;
        return this;
    }

    /**
    * Adds an array of Wares to the sourcebook. See Ware() for a starting point to create new Wares.
    * @param w The array of wares to be added.
    * @returns Sourcebook
    */
    stock(w:Ware[]) : this {
        w.forEach((x) => {
            let y = x;
            y.Source = this.Title;
            y.Shortform = this.Shortform;
            this.Wares.push(y);
        })
        return this;
    };

    /**
     * Adds an array of Parentage objects to the sourcebook. See ParentageUpbringing() for a starting point to create them. These are distinct from player races, as they use a different ruleset for character creation. For more on that ruleset, see "An Elf and an Orc Had a Little Baby" by Adam Hancock and V.J. Harris.
     * @param p The array of parentages to be added.
     * @returns Sourcebook
     * @alpha
     */

    parentages(p:ParentageUpbringing[]) : this {
        p.forEach((P) => {
            let cur = P;
            cur.Source = this.Title;
            cur.Shortform = this.Shortform;
            this.Parentages.push(cur);
        })
        return this;
    }

    /**
     * Adds an array of Spell objects to the sourcebook. See Spell() for a starting point to create them. 
     * @param spellbook The array of spells to add.
     * @returns Sourcebook
     * @alpha
     */

    cast(spellbook:Spell[]) : this {
        spellbook.forEach((s) => {
            let S = s;
            S.Shortform = this.Shortform;
            S.Source = this.Title;
            this.Spells.push(S);
        });
        return this;
    }

    /**
     * Searches the sourcebook for any wares which have classifications beginning with the provided parameter.
     * @param searchterm The term to search the sourcebook's Wares for.
     * @returns Ware[]
     */

    public shop(searchterm:string) : Ware[] {
        let w = [];
        this.Wares.forEach((i) => {
            i.Classifications.forEach((c) => {
                if (c.startsWith(searchterm)) {
                    w.push(i)
                }
            })
        });
        return w;
    }

    /**
     * Writes the sourcebook as a file into the 'sourcebooks' subdirectory of the current directory. The file name will be Sourcebook.Title + .json.
     */
    write() : void {
        fs.writeFile('./sourcebooks/'+this.Title+'.json',JSON.stringify(this),(() => {}))
    }

    /**
     * Overwrites this Sourcebook object with the contents of a .json file from the 'sourcebooks' subdirectory.
     * @param title The title of the book you wish to read into the current object.
     * @param confirmation An extra parameter I added because I'm a dumbass and wanted a double-check to make sure I didn't accidentally overwrite something at the wrong time by read() instead of write(). I should probably remove this.
     * @returns Sourcebook
     */
    read(title:string,confirmation:"Yes I'm sure") : this {
        let book = require('./sourcebooks/'+title);
        Object.assign(this,book);
        return this;
    }
};

export class Ware {
    Name: string;
    Description?: TextBlock[] = [];
    Lore?: TextBlock[] = [];
    Classifications: WTTclass[] = []; //[AC420.69,BR549]
    Category: string = 'Ware';
    Prices?: Price[] = [];
    Rarity?: Rarity;
    Page: string = ''; // 38, XI, V2p28, NA
    Weight?: number;
    WeightMeasure: string = "";
    Advantages?: string[] = []; // List of roll types granted advantage to the user of this item.
    Disadvantages?: string[] = []; // List of roll types granted disadvantage to the user of this item.
    Consumable: boolean = false;
    Attunement: boolean | string = false;
    MagicItemCategory?: MagicItemCategory;
    // Needs an Icon property, could possibly be used for report grouping?

    // These are assigned at stock-time.
    Source?: string;
    Shortform?: string;

    /**
     * Creates a new Ware object.
     * @param n The name of the Ware.
     * @param p If adapting from a published source, provides the page number within that source where this Ware may be found. May be a string or number.
     * @example new Ware('Bastard Sword',157)
     * @example new Ware('Greatshield', 'XXI')
     * @returns Ware
     */
    constructor(name: string,page?: string | number) {
        this.Name = name;
        if (page) {this.Page = page.toString()};
    };

    /**
     * Automatically prices this Ware according to TheAngryGM's magic item pricing formula, found here: {@link https://theangrygm.com/how-to-price-an-item/}
     * @param rarity The rarity of this item. @options Common | Uncommon | Rare | Very Rare | Legendary | Artifact
     * @param impact How impactful to the game this item should be. @options Major | Minor
     * @param use How many times, or how frequently, the item may be used for its primary purpose. See TheAngryGM for more detail on these options. @options Single | Limited | Charged | Permanent
     * @returns this
     */
    autoprice(rarity:Rarity,impact:'Major'|'Minor',use:'Single'|'Limited'|'Charged'|'Permanent') : this {
        this.sell(new Price().autoprice(rarity,impact,use));
        return this;
    }

    /**
     * Adds a paragraph to the Ware's description.
     * @param d Can be a string, or a TextBlock object. If a string, will be converted to a Paragraph TextBlock automatically.
     * @returns this
     */

    desc(d: string | TextBlock ) : this {
        if (d.toString() === d) {this.Description.push(new Paragraph(d));}
        else {this.Description.push(<TextBlock> d)}
        return this;
    };

    /**
     * Adds a paragraph to the Ware's lore.
     * @param l The paragraph to add, as a string.
     * @returns this
     */

    lore(l: string) : this {
        this.Lore.push(new Paragraph(l));
        return this;
    }

    /**
     * Tags this item with classification headings taken from the Waterdeep Trade Taxonomy. Can take as many headings as you want. See the WTT for a list of valid classification headings.
     * @param c Headings under which this item should be classified.
     * @returns this
     */
    classify(...c: WTTclass[]) : this {
        c.forEach((s) => {
            this.Classifications.push(s);
        });
        return this;
    };

    /**
     * Removes all classification headings from this item.
     * @returns this
     */
    declassify() : this {
        this.Classifications = [];
        return this;
    }

    /**
     * Sets the rarity of this Ware.
     * @param r The rarity to set. @options Common | Uncommon | Rare | Very Rare | Legendary | Artifact
     * @returns this
     */
    rarity(r:Rarity) : this {
        this.Rarity = r;
        return this;
    };

    /**
     * Indicates that this item requires attunement.
     * @param by Optional string. If provided, this item will require attunement under the described conditions. Otherwise, it may be attuned using the standard rules. 
     * @example attune()
     * @example attune('a wizard, sorcerer, or druid')
     * @example attune('spending a week without speaking')
     * @example attune('severing your right hand and attaching this item to your wrist')
     * @returns this
     */
    attune(by?:string) : this {
        if (by) {
            this.Attunement = by;
        } else {
            this.Attunement = true;
        }

        return this;
    }

    /**
     * Sets the standard item category for a magic item.
     * @param c The category to set. @options Armor | Potion | Ring | Rod | Scroll | Staff | Wand | Weapon | Wondrous Item
     * @returns this
     */
    mic(c:MagicItemCategory) : this {
        this.MagicItemCategory = c;
        return this;
    }

// Weight methods 

/**
 * Sets the weight of this Ware. Shorthand methods exist if you're using a common unit of measure for this weight: lb(), oz(), and ton().
 * @param w The weight of this item, as a number.
 * @param m The measure or unit of this item's weight.
 * @returns this
 * @example weighs(3,'lb.')
 */

    weighs(w:number,m:string) : this {
        this.Weight = w;
        this.WeightMeasure = m;
        return this;
    }
/**
 * Sets this Ware's weight, in pounds.
 * @param n The number of pounds this Ware weighs.
 * @returns this
 */
    lb(n:number) : this {
        this.Weight = n;
        this.WeightMeasure = 'lb.'
        return this;
    }

    /**
     * Sets this Ware's weight, in ounces.
     * @param n The number of ounces this Ware weighs.
     * @returns this
     */

    oz(n:number) : this {
        this.Weight = n;
        this.WeightMeasure = 'oz.';
        return this;
    }

    /**
     * Sets this Ware's weight, in tons.
     * @param n The number of tons this Ware weighs.
     * @returns this
     */

    ton(n:number) : this {
        this.Weight = n;
        this.WeightMeasure = 'ton';
        return this;
    }

    /**
     * Returns a string describing this Ware's weight.
     * @returns String
     */
    weight() : string {
        if (this.Weight) {return `${this.Weight} ${this.WeightMeasure}`}
        else {return `--`}
    }

// Price-setting methods

/**
 * Adds a list price to this Ware. A Ware may have multiple prices -- for more on why this might be useful, see the documentation on the Price class.
 * @param p May be a number, or a Price object. If a number, will automatically generate a list price equal to that number of gold pieces. If a Price object, pushes that object to the Price[] directly.
 * @returns this
 */

    sell(p:Price | number) : this {
        if (p instanceof Price) {this.Prices.push(p)} else {this.Prices.push(GP(p))};
        return this;
    }

// Other stuff

/**
 * If this item provides advantage on any kind of roll, you may indicate that using this method.
 * @param s The type of roll this item provides advantage for.
 * @returns this
 * @experimental
 */
    advantage(s:string) : this {
        this.Advantages.push(s);
        return this;
    }
/**
 * If this item provides disadvantage on any kind of roll, you may indicate that using this method.
 * @param s The type of roll this item provides disadvantage for.
 * @returns this
 * @experimental
 */
    disadvantage(s:string) : this {
        this.Disadvantages.push(s);
        return this;
    }

    /**
     * Used to obtain a string indicated the source and (if applicable) page number from which this item was adapted.
     * @returns string
     * @example citation() --> 'PHB35'
     */
    citation() : string {
        return this.Shortform + this.Page;
    }

    // Display methods

    showcase() : HTMLElement {
        let sc = document.createElement('div');
        let header = document.createElement('h2');
        header.innerText = this.Name;
        sc.appendChild(header);

        this.Description.forEach((block) => {
            sc.appendChild(enblockify(block).render())
        })

        return sc;
    }
}

export class Price {
    cp: number = 0;
    sp: number = 0;
    ep: number = 0;
    gp: number = 0;
    pp: number = 0;
    Measure: string = "";
    Modifier?: string; // 1 hr; 20 ft; 1 week

    /**
     * Returns a new Price object.
     * @param c The number of copper pieces in this price.
     * @param s The number of silver pieces in this price.
     * @param e The number of electrum pieces in this price.
     * @param g The number of gold pieces in this price.
     * @param p The number of platinum pieces in this price.
     * @returns Price
     */
    constructor(c?: number, s?: number, e?: number, g?: number, p?: number) {
        if (c) {this.cp = c;}
        if (s) {this.sp = s;}
        if (e) {this.ep = e;}
        if (g) {this.gp = g;}
        if (p) {this.pp = p;}
    }

    /**
     * Auto-pricing intended for magical items, based on TheAngryGM's work here: {@link https://theangrygm.com/how-to-price-an-item/}
     * @param rarity The item's rarity as a string. @options Common | Uncommon | Rare | Very Rare | Legendary | Artifact
     * @param impact The item's degree of impact on the game. @options Major | Minor
     * @param use How many times, or how frequently, the item may be used for its primary purpose. See TheAngryGM for more detail on these options. @options Single | Limited | Charged | Permanent
     * @returns this
     */
    autoprice(rarity:Rarity,impact:'Major'|'Minor',use:'Single'|'Limited'|'Charged'|'Permanent') : this {

        // Start by assuming common
        let pricing = {
                Single:[50,70],
                Limited:[60,80],
                Charged:[70,90],
                Permanent:[80,100]
        }

        if (rarity === 'Uncommon') {
            pricing = {
                Single:[250,350],
                Limited:[300,400],
                Charged:[350,450],
                Permanent:[400,500]
        }
    }

        if (rarity === 'Rare') {
            pricing = {
                Single:[2500,3500],
                Limited:[3000,4000],
                Charged:[3500,4500],
                Permanent:[4000,5000]
        }
    }

        if (rarity === 'Very Rare') {
            pricing = {
                Single:[25000,35000],
                Limited:[30000,40000],
                Charged:[35000,45000],
                Permanent:[40000,50000]
        }
    }

        if (rarity === 'Legendary') {
            pricing = {
                Single:[125000,175000],
                Limited:[150000,200000],
                Charged:[175000,225000],
                Permanent:[200000,250000]
        }    
    }
        if (rarity === 'Artifact') {
            pricing = {
                Single:[1250000,1750000],
                Limited:[1500000,2000000],
                Charged:[1750000,2250000],
                Permanent:[2000000,2500000]
            }
        }

        if (impact === 'Minor') {
            this.gp = pricing[use][0]
        } else {
            this.gp = pricing[use][1]
        }

        return this;
    }

    /**
     * Sets the number of copper pieces for this price.
     * @param n The number of copper pieces.
     * @returns this
     */
    CP(n:number) : this {
        this.cp = n;
        return this;
    }

    /**
     * Sets the number of silver pieces for this price.
     * @param n The number of silver pieces.
     * @returns this
     */
    SP(n:number) : this {
        this.sp = n;
        return this;
    }

    /**
     * Sets the number of electrum pieces for this price.
     * @param n The number of electrum pieces.
     * @returns this
     */
    EP(n:number) : this {
        this.ep = n;
        return this;
    }
    /**
     * Sets the number of gold pieces for this price.
     * @param n The number of gold pieces.
     * @returns this
     */
    GP(n:number) : this {
        this.gp = n;
        return this;
    }
    /**
     * Sets the number of platinum pieces for this price.
     * @param n The number of platinum pieces.
     * @returns this
     */
    PP(n:number) : this {
        this.pp = n;
        return this;
    }

    /**
     * Sets the unit of measure for this price.
     * @param m The unit of measure, as a string.
     * @returns this
     * @example measure('day')
     * @example measure('dozen')
     */
    measure(m:string) : this {
        this.Measure = m;
        return this;
    }

    /**
     * Converts this price object to a readable string.
     * @returns string
     */
    out() : string {
        let arr : string[] = [];
        if (this.pp > 0) {arr.push(this.pp + "pp")}
        if (this.gp > 0) {arr.push(this.gp + "gp")}
        if (this.ep > 0) {arr.push(this.ep + "ep")}
        if (this.sp > 0) {arr.push(this.sp + "sp")}
        if (this.cp > 0) {arr.push(this.cp + "cp")}
        
        let x = arr.join(",");
        if (x.length === 0) { x += '0cp'};
        if (this.Measure.length > 0) {
            x +=" / "+this.Measure
        }
        return x
    }

    /**
     * Sets a modifier for this price in addition to the weight and/or measure. For instance, an item may be more or less expensive in an urban setting, or at a particular time of year.
     * @param modifier The circumstances under which this price applies.
     * @returns this
     */
    modify(modifier:string) : this {
        this.Modifier = modifier;
        return this;
    }
};

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

    /**
     * Creates a new Roll object.
     * @param d4 The number of d4 for this roll.
     * @param d6 The number of d6 for this roll.
     * @param d8 The number of d8 for this roll.
     * @param d10 The number of d10 for this roll.
     * @param d12 The number of d12 for this roll.
     * @param d20 The number of d20 for this roll.
     * @param d100 The number of d100 for this roll.
     * @param mod A fixed modifier added to the roll.
     * @param adv Whether this roll is being made at advantage or disadvantage.
     * @param mult A fixed multiplier applied to the roll after its result.
     * @returns Roll
     */
    constructor(d4?:number,d6?:number,d8?:number,d10?:number,d12?:number,d20?:number,d100?:number,mod?:number,adv?:'Advantage'|'Disadvantage'|'None',mult?:number) {
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
            if(adv === 'Advantage') {
                this.adv = true;
            }
            if(adv === 'Disadvantage') {
                this.disadv = true;
            }
        }
        return this;
    }

    /**
     * Adds or subtracts d4 to the roll.
     * @param d The number of d4 to add/subtract.
     * @returns this
     */
    D4 (d?:number) : this {
        if(d){this.d4 += d} else {this.d4 += 1};
        return this;
    }

    /**
     * Adds or subtracts d6 to the roll.
     * @param d The number of d6 to add/subtract.
     * @returns this
     */
    D6 (d?:number) : this {
        if(d){this.d6 += d} else {this.d6 += 1};
        return this;
    }

    /**
     * Adds or subtracts d8 to the roll.
     * @param d The number of d8 to add/subtract.
     * @returns this
     */
    D8 (d?:number) : this {
        if(d) {this.d8 += d} else {this.d8 += 1};
        return this;
    }

    /**
     * Adds or subtracts d10 to the roll.
     * @param d The number of d10 to add/subtract.
     * @returns this
     */
    D10 (d?:number) : this {
        if(d) {this.d10 += d} else {this.d10 += 1};
        return this;
    }

    /**
     * Adds or subtracts d12 to the roll.
     * @param d The number of d12 to add/subtract.
     * @returns this
     */
    D12 (d?:number) : this {
        if(d) {this.d12 += d} else {this.d12 += 1};
        return this;
    }

    /**
     * Adds or subtracts d20 to the roll.
     * @param d The number of d20 to add/subtract.
     * @returns this
     */
    D20 (d?:number) : this {
        if(d) {this.d20 += d} else {this.d20 += 1};
        return this;
    }

    /**
     * Adds or subtracts d100 to the roll.
     * @param d The number of d100 to add/subtract.
     * @returns this
     */
    D100 (d?:number) : this {
        if(d) {this.d100 += d} else {this.d100 += 1};
        return this;
    }

    /**
     * Alters the flat modifier for this roll.
     * @param m The number to add or subtract to the roll's current modifier.
     * @returns this
     */
    MOD (m:number) : this {
        this.mod += m;
        return this;
    }

    /**
     * Grants advantage on this roll.
     * @returns this
     */
    ADV () : this {
        this.adv = true;
        return this;
    }

    /**
     * Grants disadvantage on this roll.
     * @returns this
     */
    DISADV () : this {
        this.disadv = true;
        return this;
    }

    /**
     * Sets the multiplier for this roll.
     * @param m The multiplier to set.
     * @returns this
     */
    MULTIPLY (m:number) : this {
        this.multiplier = m;
        return this;
    }

    /**
     * Converts the roll object into a readable string with standard XdY notation.
     * @returns string
     */
    out() : string {
        let arr : string[] = [];
        if (this.d4 != 0) {arr.push(this.d4.toString()+"d4")};
        if (this.d6 != 0) {arr.push(this.d6.toString()+"d6")};
        if (this.d8 != 0) {arr.push(this.d8.toString()+"d8")};
        if (this.d10 != 0) {arr.push(this.d10.toString()+"d10")};
        if (this.d12 != 0) {arr.push(this.d12.toString()+"d12")};
        if (this.d20 != 0) {arr.push(this.d20.toString()+"d20")};
        if (this.d100 != 0) {arr.push(this.d100.toString()+"d100")};
        if (this.mod != 0) {arr.push(this.mod.toString())};

        let V : string = '';
        if (this.adv) {V = ' w/ advantage'}
        if (this.disadv) {V = ' w/ disadvantage'}
        if (this.adv === this.disadv) {V = ''}

        let M : string = '';
        if (this.multiplier != 1) {M = ', x'+this.multiplier}

        let S : string = arr.join(' + ');
        S = S.replace(`+ -`,'- ');
        S += V;
        S += M;

        return S;
    }

    /**
     * Helper function to determine whether the final roll is made at advantage/disadvantage.
     * @returns 'D' | 'A' | 'Standard'
     */
    pool() : 'D' | 'A' | 'Standard' { 
        // Determines whether the roll is at advantage or disadvantage. Helper method for result().
        if (this.adv === this.disadv) {return 'Standard'}
        else if (this.adv) {return 'A'}
        else if (this.disadv) {return 'D'}
    }

    /**
     * Rolls these dice and provides the result as a number or number[].
     * @param mode If provided as 'detail', will output an array of each die's value instead of the aggregated result.
     * @returns number or number[]
     */
    result(mode?: 'detail') : number | number[] {
        
        let pool = this.pool();
        if (pool === 'A') {
            let first  =  <number[]> this.roll('detail');
            let second =  <number[]> this.roll('detail');
            let multfirst = [];
            let multsecond = [];

            let f : number = this.mod;
            first.forEach((a) => {f += a * this.multiplier; multfirst.push(a*this.multiplier)});

            let s : number = this.mod;
            second.forEach((a) => {s += a * this.multiplier; multsecond.push(a*this.multiplier)})

            multfirst.push(this.mod);
            multsecond.push(this.mod);

            if (f > s) {
                if (mode === 'detail') {return multfirst} else {return f}
            }
            else {
                if (mode === 'detail') {return multsecond} else {return s}
            }
            
        }
        else if (pool === 'D') {
            let first  =  <number[]> this.roll('detail');
            let second =  <number[]> this.roll('detail');
            let multfirst = [];
            let multsecond = [];
            
            let f : number = this.mod;
            first.forEach((a) => {f += a * this.multiplier; multfirst.push(a*this.multiplier)});

            let s : number = this.mod;
            second.forEach((a) => {s += a * this.multiplier; multsecond.push(a*this.multiplier)})

            multfirst.push(this.mod);
            multsecond.push(this.mod);

            if (f < s) {
                if (mode === 'detail') {return multfirst} else {return f}
            }
            else {
                if (mode === 'detail') {return multsecond} else {return s}
            }
        }
        else {
            if (mode === 'detail') {
                let first = <number[]> this.roll('detail');
                let multfirst = [];

                first.forEach((a) => {multfirst.push(a*this.multiplier)});
                multfirst.push(this.mod);
                return multfirst;
            } else {
                let first = <number> this.roll();
                first *= this.multiplier;
                first += this.mod;
                return first;
            }
        }
    }

    /**
     * Helper function for result(). Prefer to use result().
     * @param mode If provided as 'detail', will output an array of each die's value instead of the aggregated result.
     * @returns number or number[]
     */
    roll(mode?:'detail') : number | number[] {

        // This method does NOT take into account advantage, mods, or multipliers. For those, use result().
        const adds : number[] = [];
        let subs : number[] = [];
        
        if (this.d4 > 0) {
            for (let i=0; i<this.d4;i++) {adds.push(randomInt(1,5))};
        } else {
            for (let i=0; i<this.d4*-1;i++) {subs.push(randomInt(1,5))}
        }

        if (this.d6 > 0) {
            for (let i=0; i<this.d6;i++) {adds.push(randomInt(1,7))};
        } else {
            for (let i=0; i<this.d6*-1;i++) {subs.push(randomInt(1,7))}
        }

        if (this.d8 > 0) {
            for (let i=0; i<this.d8;i++) {adds.push(randomInt(1,9))};
        } else {
            for (let i=0; i<this.d8*-1;i++) {subs.push(randomInt(1,9))}
        }

        if (this.d10 > 0) {
            for (let i=0; i<this.d10;i++) {adds.push(randomInt(1,11))};
        } else {
            for (let i=0; i<this.d10*-1;i++) {subs.push(randomInt(1,11))}
        }

        if (this.d12 > 0) {
            for (let i=0; i<this.d12;i++) {adds.push(randomInt(1,13))};
        } else {
            for (let i=0; i<this.d12*-1;i++) {subs.push(randomInt(1,13))}
        }

        if (this.d20 > 0) {
            for (let i=0; i<this.d20;i++) {adds.push(randomInt(1,21))};
        } else {
            for (let i=0; i<this.d20*-1;i++) {subs.push(randomInt(1,21))}
        }

        if (this.d100 > 0) {
            for (let i=0; i<this.d100;i++) {adds.push(randomInt(1,101))};
        } else {
            for (let i=0; i<this.d100*-1;i++) {subs.push(randomInt(1,101))}
        }

        // Get simple number;

        let r = 0;
        adds.forEach((a) => {r += a});
        subs.forEach((s) => {r += s * -1});

        // Return roll 

        if (mode === 'detail') {
            let combo = [];
            adds.forEach((a) => {combo.push(a)});
            subs.forEach((s) => {combo.push(s*-1)});
            return combo;
        } else {
            return r;
        }
    }

    // Methods or functionality still needed: keep()
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
        this.Category = 'Armor';
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
        this.Category='Container';
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
        this.Category = 'Mount';
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
        this.Category = 'Shield';
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
        this.Category = 'Weapon';
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

/**
 * Takes an object which has been read from file and reassigns it to the appropriate data type, so that its member methods are available again.
 * @param obj The object to reconstitute.
 * @returns Ware or a Ware-extending class.
 */
export function reconstitute(obj:any) : any {
    let x;

    switch (obj.Category) {
        case 'Ware': {x = new Ware(''); Object.assign(x,obj); break;}
        case 'Container': {x = new Container('','',''); Object.assign(x,obj); break;}
        case 'Weapon': {x = new Weapon('',''); Object.assign(x,obj); break;}
        case 'Armor': {x = new Armor('',''); Object.assign(x,obj); break;}
        case 'Shield': {x = new Shield('',''); Object.assign(x,obj); break;}
        case 'Creature': {x = new SellableCreature('',''); Object.assign(x,obj); break;}
        case 'Mount': {x = new Mount('','',0); Object.assign(x,obj); break;}
        case 'Service': {x = new Service('',''); Object.assign(x,obj); break;}
        default: {x = new Ware(''); Object.assign(x,obj); break;}
    }

    return x;
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
    Title: string;
}

export class Spell {
    Name: string;
    Page?: string;
    Level: number;
    School: string;
    CastingTime: string;
    Range: number | 'Hearing' | 'Self' | 'Touch' | 'Vision';
    S: boolean = false;
    V: boolean = false;
    M: string = '';
    Ritual: boolean = false;
    Duration: string = 'Instantaneous';
    Description: TextBlock[] = [];
    Source?: string; // Set at time of sourcebook integration
    Shortform?: string; // Set at time of sourcebook integration

    constructor(name:string,page:string,level:number,school:string) {
        this.Name = name;
        this.Page = page;
        this.Level = level;
        this.School = school;
        return this;
    }

    action() : this {
        this.CastingTime = '1 action';
        return this;
    }

    AHL(t:string) : this {
        this.Description.push(new AbilityText('At Higher Levels',t));
        return this;
    }

    bonus() : this {
        this.CastingTime = '1 bonus action';
        return this;
    }

    concentrate(max:string) : this {
        this.Duration = 'Concentration, up to ' + max + '.';
        return this;
    }

    desc(d:string) : this {
        this.Description.push(new Paragraph(d));
        return this;
    }

    instant() : this {
        this.CastingTime = 'Instantaneous';
        return this;
    }

    lasts(duration:string) : this {
        this.Duration = duration;
        return this;
    }

    m(material:string) : this {
        this.M = material;
        return this;
    }

    range(r:number) : this {
        this.Range = r;
        return this;
    }

    reaction() : this {
        this.CastingTime = '1 reaction';
        return this;
    }

    ritual() : this {
        this.Ritual = true;
        return this;
    }

    s() : this {
        this.S = true;
        return this;
    }

    self() : this {
        this.Range = 'Self';
        return this;
    }

    takes(CastTime: string) : this {
        this.CastingTime = CastTime;
        return this;
    }

    touch() : this {
        this.Range = 'Touch';
        return this;
    }

    v() : this {
        this.V = true;
        return this;
    }
}



