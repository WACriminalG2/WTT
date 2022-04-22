import { ParentageUpbringing, PorUTrait } from "./parentage";
import { Shield, Spell, Sourcebook, Ware, Weapon, Roll, CP, SP, EP, GP, PP } from "./core";

/* 
    This is an adaptation of Partario Flynn's "Old Gus' Heroes of the Multiverse", one of my favorite D&D 5th Edition supplements. The intention is to present its contents within the WTT app. However, it should be noted that the adaptation is not 100% faithful in every aspect -- in particular, the player races have been merged, modified, simplified, and reworked as needed in order to fit them within the player race system WTT uses, which is the Parentage + Upbringing system published in "An Orc and An Elf Had A Little Baby". It is my hope that these adaptations are suitable and not overly invasive or disrespectful of the effort and skill that has been poured into Flynn's work.

    For the latest updates and PDF downloads of the original work, please visit https://drive.google.com/drive/u/0/folders/1Qv-U43kH066mbaeu9dLNeqmDpsdQW6CW
*/

// Sourcebook creation

let sb = new Sourcebook("Old Gus' Heroes of the Multiverse","OGH");
sb.author('Partario Flynn');
sb.version('v2.60');
sb.URL = 'https://drive.google.com/drive/u/0/folders/1Qv-U43kH066mbaeu9dLNeqmDpsdQW6CW';

// Trait definitions

let Amorphous = new PorUTrait('Amorphous','You can squeeze a space two sizes smaller than your size, and moving through spaces 1 size smaller does not cost you additional movement. While squeezing through a space two sizes smaller than your size, your speed is reduced to 5 feet, and you cannot perform actions other than moving. You cannot use this trait if you are wearing medium or heavy armor.',2)
let AmphibiousDependency = new PorUTrait('Amphibious Dependency','You can breathe air and water. You must submerge yourself fully in water or mud once per day or suffer one level of exhaustion, which cannot be removed until you complete a long rest while submerged.',1)
let ApelongSpeed = new PorUTrait('Ozo Locomotion','You have a base walking speed of 35 feet when your hands are unoccupied, 30 feet when one hand is occupied, and 25 feet when both hands are occupied.',0)
let ApelongWeapons = new PorUTrait('Apelong Weapons',' You can use your teeth or hands to make unarmed strikes. If you hit with them, you deal bludgeoning (fists) or piercing (bite) damage equal to 1d6 + your Strength modifier.',2)
let BullywugLegs = new PorUTrait('Standing Leap','Your long jump is up to 20 ft. and your high jump is up to 10 ft., with or without a running start. You can make a standing leap using your bonus action.',2)
let BullywugMetabolism = new PorUTrait('Bullywug Metabolism','You have disadvantage on any Constitution saving throws to avoid intoxication from ingesting alcohol.',-2)
let BullywugSpeed = new PorUTrait('Built To Swim','You have a base walking speed of 20 feet, and a swimming speed of 30 feet.',-1)
let BullywugStrike = new PorUTrait('Leaping Strike','When an ally of yours that you can see hits a creature with a melee weapon attack, you can use your reaction to immediately make a standing leap, and make one melee weapon attack against the same target if it is within your reach. You use this ability twice, and regain expended uses of it when you finish a long rest.',3)
let BullywugTeeth = new PorUTrait('Bite','You can use your teeth to make unarmed strikes. If you hit with them, you deal piercing damage equal to 1d4 + your Strength modifier.',1)
let BullywugToadspeaker = new PorUTrait('Speak with Frogs and Toads','You can communicate simple concepts to frogs and toads when you speak in Bullywug.',2)
let Climber = new PorUTrait("Climber","You have a climbing speed of 30 ft, and when you aren't wearing medium or heavy armor, you can descend headfirst.",4)
let Darkvision60 = new PorUTrait("Darkvision","You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",4)
let FeyAncestry = new PorUTrait("Fey Ancestry",". You have advantage on saving throws you make to avoid or end the charmed condition on yourself.",2)
let HoldBreath15 = new PorUTrait("Hold Breath","You can hold your breath for up to 15 minutes at a time.",1)
let IkwiikwiiSpeed = new PorUTrait('Ikwiikwii Movement','Your base walking speed is 25 feet. If both of your hands are unoccupied, you can run on all fours at a speed of 35 feet.',0)
let IkwiikwiiTalons = new PorUTrait('Owlbear Talons','You have sharp talons, which grant you a climbing speed of 20 feet. In addition, your claws and beak are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier.',2)
let ImposingStature = new PorUTrait("Ozo Stature","You are proficient in the Intimidation skill.",2)
let ImprovedQuills = new PorUTrait("Improved Quills","The damage your quills deal is increased to twice your proficiency bonus. In addition, you can make ranged attacks with proficiency using your spines, that deal 1d8 piercing damage with a range of 60 feet. You can make a number of these attacks equal to your Constitution modifier (minimum 1). You regain expended uses of your spine attacks when you complete a short or long rest.",6)
let KeenSight = new PorUTrait('Keen Sight','You have advantage on Wisdom (Perception) checks made that rely on sight.',6)
let KeenSmellAndHearing = new PorUTrait("Keen Smell and Hearing","You have advantage on checks you make with the Wisdom (Perception) skill that rely on smell or hearing.",4);
let Leverage = new PorUTrait('Leverage','You can wield weapons with the "heavy" property without the penalty usually applied to Small creatures.',3)
let Little25 = new PorUTrait("Little","Your base speed is reduced to 25 ft. If you also inherit this trait from your other parent, your size is Small.",-2);
let Little30 = new PorUTrait("Little","If you also inherit this trait from your other parent, your size is Small.",0);
let LudaiAppearance = new PorUTrait('Repugnant','Due to your unorthodox appearance, you have disadvantage on Charisma (Persuasion) checks you make against humanoid races.',-6)
let LudaiHardiness = new PorUTrait('Ludai Hardiness','You have advantage on saving throws against poison and disease, and you have resistance to poison damage.',10)
let LudaiRegeneration = new PorUTrait('Regenerative Cells','You have the uncanny ability to regenerate. Increase your Constitution score by 1, to a maximum of 20. Whenever you take the Dodge action in combat, you can spend one Hit Die to heal yourself. Roll the die, add your Constitution modifier, and regain a number of hit points equal to the total (minimum of 1).',6)
let LudaiSlime = new PorUTrait('Arcane Slime','You know the "poison spray" cantrip. When you reach 3rd level, you can cast the "grease" spell as a 1st-level spell once with this trait, and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the "spider climb" spell once with this trait using yourself as the target, and regain the ability to do so when you finish a long rest. Constitution is your spellcasting ability for these spells.',6)
let LudaiSpeed = new PorUTrait('Ludai Movement','Ludai do not have legs, but a propulsive organ under their tail that secretes a slime to ease their propulsion. The slime evaporates after 10 minutes in most conditions. Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.',0);
let NaturalClimber = new PorUTrait("Natural Climber",'You have a climbing speed equal to your movement speed.',2);
let Nimbleness = new PorUTrait("Nimbleness","You can move through the space of any creature that is of a size larger than yours.",2)
let PanzuMight = new PorUTrait("Panzu Might","You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",1);
let PanzuSize = new PorUTrait('Panzu Stature','Your muscle is much denser and more compact. Your size is small.',0)
let PoorEyesight = new PorUTrait("Poor Eyesight","You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when the target of your attack, or whatever you are trying to perceive is not in bright light or direct sunlight.",-3);
let PowerfulBuild = new PorUTrait("Powerful Build","You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",1);
let Quills = new PorUTrait("Quills","Portions of your body are covered in hard, sharp quills. When a creature you can see hits you with a melee attack that lacks the reach property or attempts to grapple you, you can use your reaction to deal piercing damage to your attacker equal to your proficiency bonus. You can poison your spines as if they were a weapon.",2);
let RhinoxArmor = new PorUTrait("Pachyderm","You have thick, leathery skin. When you aren’t wearing armor, your AC is 13 + your Dexterity modifier. If you are using a shield, you can apply the shield's bonus as normal.",3)
let RhinoxCharge = new PorUTrait("Trampling Charge","If you move at least 20 feet in a straight line toward a Large or smaller creature and hit them with a horn attack, they must succeed a Strength saving throw DC 8 + your proficiency bonus + your Strength modifier or be knocked prone.",3);
let RhinoxHide = new PorUTrait("Thick Hide","Your hide is even thicker than usual. You can use your reaction to position your plates advantageously, granting you resistance to an incoming attack that would deal piercing or slashing damage to you.",12);
let RhinoxHorn = new PorUTrait("Horn","You have a large single horn on your head, with which you can make gore attacks, dealing 1d6 + your Strength modifier in piercing damage.",2);
let RhinoxSmell = new PorUTrait("Keen Smell","You have advantage on checks you make with the Wisdom (Perception) or Intelligence (Investigation) skills that rely on smell.",4);
let StunningMight = new PorUTrait('Stunning Might','When you hit a creature a melee attack, you can attempt to stun the creature with a bonus action. The target makes a Constitution saving throw DC 8 + your proficiency bonus + your Strength modifier or it is stunned until the start of its next turn. You can use this trait once, and must finish a short or long rest before you can use it again.',2)
let SuxiuAgility = new PorUTrait('Suxiu Agility',"Your reflexes and agility allow you to move with a burst of speed. When you move on your turn, you can double your speed. Once you use this trait, you can't use it again until you move 0 feet on your turn.",4)
let SuxiuTail = new PorUTrait('Suxiu Tail','You can make object interactions using your tail and if you are not wearing medium or heavy armor, you can suspend your body from it.',2)
let ThanoiBlubber = new PorUTrait("Blubber","You have resistance to cold damage. You're also acclimated to cold climates as described in Chapter 5 of the Dungeon Master's Guide. You are uncomfortable in warmer climates. In hot climates, you have disadvantage on saving throws against exhaustion.",3)
let ThanoiFlippers = new PorUTrait("Flippers"," Your clawed flipper-like feet grant you a swimming speed of 30 feet. Difficult terrain due to ice or snow doesn't cost you extra movement.",4)
let ThanoiTusks = new PorUTrait("Tusks","Your long tusks are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal piercing damage equal to 1d6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",2)
let TypeMonstrosity = new PorUTrait('Monstrous','Your creature type is Monstrosity.',2)
let Walk25 = new PorUTrait("Slow","You have a base walking speed of 25 feet.",-2)


// Parentage definitions

// BEASTFOLK
    // Aaratica

    let Apelong = new ParentageUpbringing('Apelong','25','Out of the Forests','Like humans, apelong are varied, clever, and highly adaptable. Those that leave their troops and native jungles behind are rare enough to turn heads when encountered by the unfamiliar, and at first glance, a naked greater ape is almost indistinguishable from their beastly counterparts. This has led to more than a few unfortunate misunderstandings and members of this proud people have been kept imprisoned by charlatans and circuses who show off their talking ape as a curiosity for passing travelers.').multitrait([ApelongSpeed,ApelongWeapons,Climber,SuxiuAgility,SuxiuTail,PanzuSize,StunningMight,PanzuMight,ImposingStature])

    let Bullywug = new ParentageUpbringing('Bullywug','29','Masters of the Swamp','Bullywugs live in primitive groups, hunting and fishing together. The hierarchy is based on strength, with the strongest being the leaders. Bullywugs are very territorial, and mostly will attack anyone who trespasses. Oddly enough, they tend not to fight within the tribe, but rival bullywug tribes will fight with each other.').multitrait([BullywugLegs,BullywugMetabolism,BullywugSpeed,BullywugStrike,BullywugTeeth,BullywugToadspeaker,AmphibiousDependency])

    // Cha'pa
    // Elkin
    // Giff
    // Gnolls
    // Grimalkin
    // Grung
    // Haashir
    // Kangaren
    // Kamelon
    // Kunek
    // Madra
    // Nychterids
    // Pangolo
    // Opsu

    let Quillen = new ParentageUpbringing('Quillen','44','Spiny Protectors','Quillen resemble hedgehogs and porcupines. Their furry bodies are adorned by patches of sharp quills, which they can bristle and use as a natural defense. When a quillen is angry or upset, their speech becomes punctuated by huffed breathing and a displeasured tut-tut of a clicked tongue. Quillen do not see very well compared to other folk, and primarily rely on their keen senses of hearing and smell to guide them through their lives.').multitrait([ImprovedQuills,KeenSmellAndHearing,Little25,PoorEyesight,Quills]);

    let Rhinox = new ParentageUpbringing('Rhinox','45','Gentle Giants','The rhinox are a group of humanoids with the thick hides, and heads of a rhinoceros, complete with a large single horn protruding from the tops of their head. A rhinox is not born with a horn. The horn begins to grow at when a young rhinox reach adolescence, usually at around six years of age, and reaches full size around the time a rhinox reaches adulthood two years later.').multitrait([FeyAncestry,PowerfulBuild,RhinoxArmor,RhinoxHide,RhinoxHorn,RhinoxSmell,RhinoxCharge]);

    let Skiouros = new ParentageUpbringing('Skiouros','46','Shadow Tails','The skiouros are a race of beady-eyed, bushy tailed crepuscular people that prefer to live in dark woods. Skiouros have luxurious patches of color in their fur: usually inky blues, deep reds, or royal purples, especially on their tails and the tips of their ears. Their unique colorations often see them becoming prized prey for ursine, gnoll or orc tribes who use their pelts as signifiers of position or prestige.').multitrait([Climber,Darkvision60,Little30,Nimbleness]);

    let Thanoi = new ParentageUpbringing('Thanoi','47','Warrior Walrusfolk','The thanoi, or “walrus-men”, as they are sometimes known to outsiders, patrol arctic coasts. They make these patrols both above the water in boats, and below the water as powerful swimmers, and they are rarely welcoming to outsiders to their lands.').multitrait([PowerfulBuild,ThanoiBlubber,ThanoiFlippers,HoldBreath15,ThanoiTusks,Walk25])

    // Ursine
    // Varkinds
    // Vulpini

// FEY FOLK
    // Boggles
    // Darklings
    // Dryads
    // Gelfling
    // Korreds
    // Nockers
    // Pixies
    // Podlings
    // Pooka
    // Redcaps
    // Satyrs
    // Sirens
    // Sluagh
    // Stone Trolls

// MONSTROUS FOLK
    // Fejervar
    // Harpies
    
    let Ikwiikwii = new ParentageUpbringing('Ikwiikwii','75','Instinct, Evolved','Ikwiikwii resemble bipedal owls with no wings and short, talon-fingered hands. Some suspect they are descendants of the first owlbears, or part of the same set of experiments that created them. They are short, stocky and share the enhanced musculature of owlbears.').multitrait([TypeMonstrosity,Little30,IkwiikwiiSpeed,Darkvision60,KeenSight,Leverage,IkwiikwiiTalons])

    // Kumon

    let Ludai = new ParentageUpbringing('Ludai','77','Secretive Farmers','Ludai are an agricultural species native to grasslands near forests and mountains. They build their villages in hidden valleys or in plains protected by thick woods. These humanoid mollusks often bring discomfort to  other humanoids, with their alien legs, ever-shifting torso and thick stalks that carry curious, bulbous eyes. Ludai enjoy living in their simple settlements, exercising agrarian professions and being close to their family. The slime they travel upon contains a natural fertilizer, increasing the growth of many kinds of plants.').multitrait([LudaiSpeed,Amorphous,LudaiHardiness,LudaiSlime,LudaiAppearance,LudaiRegeneration])

    // Rakeesh
    // Rakshasas
    // Stheno
    // Yetifolk
    // Zanzaro

// PLANTFOLK
    // Drosera
    // Gwaloth
    // Olassi
    // Myconids
    // Tan'Dalu

// UNDEAD
    // Bound Spirits
    // Ghouls
    // Mummies
    // Skeletons
    // Wights
    // Zombies

// OUTSIDERS
    // Gillen
    // Golem
    // Irvikuva
    // Strange Visitor


// SPELLS

function spell(name:string,page:string,level:number,school:string) {
    let x = new Spell(name,page,level,school);
    return x;
}

let spellbook : Spell[] = [

spell('Acidic Exudation','205',2,'Transmutation').takes('1 action').self().v().s().m('a pinch of saltpeter').concentrate('1 minute').desc('Your palm secretes a volatile gel, which you can use as a weapon. For the duration, you can use a bonus action to throw a globule of the substance up to 30 feet. The globule explodes upon impact, creating a shower of hissing acid in a 5-foot-radius sphere. Creatures in the area must make a Dexterity saving throw, taking 2d6 acid damage on a failed save, or half as much damage on a successful one.').AHL('When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd.'),

spell('Age Plant','205',4,'Transmutation').takes('1 minute').range(60).v().s().concentrate('1 minute').desc('You increase or decrease the aging of a nonmagical and immobile plant, seed, or tree by up to ten years. The spell has no effect on plant creatures.').desc('The process can operate either forward or backward, causing flowers to blossom, seeds to sprout and grow, and trees to bear fruit; or fruit to turn to blossoms, trees to become saplings, and new shoots to turn to seeds. The extent of the changes are entirely up to you.').desc('The spell does not alter the appearance or characteristics of a plant except those that result from normal aging (or regression).').AHL('When you cast this spell using a spell slot of 5th level, aging effect increases to 25 years. If you use a spell slot of 6th level, the aging effect increases to 100 years. If you use a spell slot of 7th level or higher, the aging effect increases to 1,000 years.'),

spell('Allergen Cloud','205',1,'Conjuration').takes('1 action').range(60).v().m('a pinch of ragweed').concentrate('1 minute').desc("A cloud of irritating dust and pollen fills a 15-foot-radius, 10-foot-high cylinder centered on a point you can see within range. For the duration, the area is lightly obscured. When creature enters the spell's area for the first time on a turn or starts its turn there, it must succeed on a Constitution saving throw or be poisoned for 1 minute, experiencing watering of the eyes and fits of coughs and sneezing. Undead, constructs, and creatures that do not need to breathe succeed their saving throw automatically.").desc("An affected creature makes a new saving throw at the end of each of their turns, ending the effects on a success, and becoming immune to spell for 24 hours.").desc("The cloud lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.").AHL("When you cast this spell using a spell slot of 2nd level or higher, the cylinder’s radius increases by 15 feet, and its height increases by 5 feet for each spell slot above 1st."),

spell('Alter Fortune','206',3,'Divination').takes('1 reaction').range(30).s().m('a set of weighted bone dice').lasts('Instantaneous').desc("When a creature you can see within range makes an ability check, attack roll or saving throw, the results of with you wish to alter, you attempt to alter the course of fate. An unwilling target makes a Wisdom save, and if they succeed, the spell fails. On a failure (or if the target is willing), the target can immediately reroll the triggering roll, accepting the new result instead."),

spell('Amanuensis','206',2,'Transmutation').ritual().takes('1 minute').range(30).v().s().m('fine ink worth at least 1 gp').concentrate('1 hour').desc("You cause writing from one source (such as a book) to be copied onto parchment you provide. This spell copies 250 words per minute, creating a perfect transcription of the original. The spell only copies nonmagical text, ignoring illustrations and magical writing, leaving empty space where those items appear in the original.").desc("Alternatively, you can also use this spell to dictate verbally, and have your dictation transcribed onto a page.").desc("The spell automatically turns to the next blank page and continues its transcription until it completes the transcription, or it runs out of available pages."),

spell('Anterograde Amnesia','206',6,'Enchantment').action().range(60).v().s().concentrate('1 minute').desc("You attempt to suppress the short-term memory of a creature you can see within range. The target makes a Wisdom saving throw. On a failure, they become unable to form new memories, although their long-term memory remains perfectly intact.").desc("For the duration, at the start of each of the target’s turns, they forget all events that have transpired since the start of their last turn. Roll 1d2. On a 1, the creature is incapacitated until the end of their turn.").desc("If the affected target attempts to cast a spell, they must first succeed a spellcasting ability check contested by your spell save DC.").desc("At the end of each of the creature’s turns, it can repeat the saving throw, ending the effect on a success."),

spell('Antipathetic Field','206',3,'Enchantment').action().range(60).s().concentrate('1 minute').desc("You attempt to invade the mind of a creature, filling it with rage and anger toward you. The target makes a Wisdom saving throw, taking 2d8 psychic damage on a failure, and half as much on a success.").desc("If the target fails the saving throw, a palpable field of mutual enmity is created in a line that stretches between you and the target. The field is so strong enough that creatures inside it are damaged by your mutual enmity. Each creature in a line between you and the target must make a Wisdom saving throw, taking 1d8 psychic damage on a failure, or half as much on a success. Undead, constructs, and creatures with an Intelligence score of 4 or lower are unaffected by the spell.").desc("For the duration, both you and the target have disadvantage on attack rolls made against targets other than one another, and neither of you can willingly move further apart from the other. Additionally, you can use an action to repeat the spell’s effects, damaging the target and each creature that stands between you.").desc("The target can repeat its saving throw at the end of each of its turns, ending the spell on a success.").AHL("When you cast this spell using a spell slot of 4th level or higher, the damage for each of its effects increases by 1d8 for each slot level above 3rd."),

spell("Arcane Strike",'207',1,'Evocation').action().range(10).v().s().m('a melee weapon made of metal worth at least 10 gp').lasts('Instantaneous').desc("You lunge at a creature, striking them with arcane force. As part of the action used to cast this spell, you must make a melee attack with a weapon against one creature within the spell’s range, otherwise the spell fails. On a hit, the target suffers the attack’s normal effects, and up to two of the following effects of your choice:").desc("* The target takes an additional 1d8 force damage.").desc("* You force a Large or smaller target to make a Strength saving throw. If they fail, they are pushed 10 feet away from you.").desc("* The target can't take reactions until the start of its next turn.").AHL("When you cast this spell using a spell slot of 2nd level or higher, the additional force damage increases by 1d8 and the distance the creature is pushed increases by 5 feet for each slot level above 1st."),

spell("Arcane Razor",'207',3,'Evocation').action().self().v().s().m('a melee weapon made of metal worth at least 10 gp that deals slashing damage').instant().desc("You infuse your weapon with arcane energy and whirl it in a circle, unleashing a wave of razor-thin magic out in all directions. Make a melee weapon attack roll. All creatures withing 15 feet of you whose an AC is less than your attack roll suffer the attack’s normal damage plus an additional 4d10 slashing damage. The spell also damages any objects in the area that aren’t being worn or carried.").AHL(". When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d10 for each slot level above 3rd."),

spell("Avalanche",'207',7,'Evocation').action().range(300).v().s().m('a quartz crystal').instant().desc("Choose a point you can see on the ground within range. A torrent of ice, rock and snow fall in a 30-foot-radius, 40-foot-high cylinder centered on that point. Each creature in that area must make a Dexterity saving throw. On a failure, a creature takes 4d10 cold and 4d10 bludgeoning damage on a failed save and is knocked prone. Creatures that fail their saving throw by 5 or more are restrained by the rubble. A creature can use an action to pull itself or another buried creature free by making a Strength check with a DC equal to your spell save DC.").desc("Additionally, objects in the area take 4d10 bludgeoning damage, and the area becomes difficult terrain until cleared. Each 5-foot-square portion of the area requires at least 1 minute to clear by hand. The ice and rocks melt away over the course of the next 24 hours.").AHL("When you cast this spell using a spell slot of 8th level or higher, the damage increases by 1d10 for each of its effects.")
]

// Items

let poisons : Ware[] = [
    new Ware('Arsenic','290').sell(1500).desc('Arsenic is a particularly dastardly poison because it is tasteless, colorless, and odorless. A few grains of the stuff can kill a person. The symptoms of arsenic poisoning are often initially misdiagnosed as food poisoning, and include sweating, confusion, cramping muscles, and stomach pain.').desc('Arsenic powder must be refined from 500 gp worth of copper or iron ore, spending 8 hours in preparation, and making a successful DC 16 Intelligence check with alchemist’s supplies to produce a single dose of arsenic powder grains.').desc("10 minutes after a creature ingests arsenic powder, they must make a DC 18 Constitution saving throw. On a failure, they take 2d10 poison damage and vomit prodigiously and become poisoned for 24 hours. On a success, they take half the amount of damage and suffer no other effects.").desc("For the duration, a creature poisoned creature must repeat their saving throw every 1 hour. On a failure, they take 2d10 poison damage, lose their next turn vomiting or excreting and take one level of exhaustion. On a success, they take half the amount of damage but suffer no other effects. If the creature succeeds on six saving throws, the poison passes through their system and they are no longer poisoned.").classify('PS0'),
    new Ware('Belladonna','290').sell(500).desc('The belladonna plant is a an extremely poisonous plant which produces toxic leaves and red-black berries. The plant is notoriously difficult to cultivate, requiring a successful DC 14 check with an herbalist’s kit to successfully transplant a wild belladonna plant elsewhere.').desc(`One minute after a creature ingests belladonna poison, it must succeed on a DC 11 Constitution saving throw or be poisoned for 1 hour. Their pupils dilate, their pulsequickens, and they begin to hallucinate.`).desc(`For the duration, the poisoned creature makes a new saving throw at the start of each of their turns. On a failure, they spend their turn doing nothing, lost in their hallucinations. If they fail their saving throw by 5 or more, they vomit, taking 1d4 poison damage. On a success, they take no damage and suffer no other effects.`).desc(`In addition to potable liquid, the berries can be used to produce dye, make-up or refined into eyedrops, allowing
    the poison to be applied by contact as well as ingested. A refined infusion of belladonna poison has similar effects. A creature proficient with the poisoner's kit or alchemist's supplies can spend 1 hour to refine the poison from the plant’s leaves or berries by making an Intelligence check with their tools and adding one quarter of the resulting roll to the DC of the Constitution saving throw.`).desc(`Belladona has a natural antidote derived from the pilocarpus or jaborandi plant.`).classify('PS0')
]

let weapons : Ware[] = [
    new Weapon('Chain Whip','289').martial().reach().sell(10).lb(4).desc('A chain whip is made of interlocking links of metal, usually with a weight at the end of the chain to improve control.').dmg(new Roll(2),'Bludgeoning').classify('WW'),
    new Weapon('Longbow, Composite','289').martial().ammunition('100/400').heavy().twohanded().sell(75).lb(6).desc("This reinforced longbow is especially difficult to draw. If your Strength score is lower than 16, you have a penalty on attack rolls you make with this weapon equal to the difference. For example, if your Strength score is 13, you have a -3 penalty. You can add your Strength modifier instead of your Dexterity modifier to this weapon's damage rolls.").dmg(new Roll(0,2),'Piercing').classify('WR0'),
    new Weapon('Greatshield','289').martial().heavy().twohanded().sell(50).lb(10).desc("A greatshield is made from wood or metal and is carried with two hands. If your Strength score is less than 13, equipping a greatshield reduces your movement speed by 5 feet. You can add a greatshield's AC bonus to Strength (Athletics) checks you make to shove a creature. On a hit, it deals 1d8 bludgeoning damage.").dmg(8,'Bludgeoning').classify('AS'),
    new Weapon('Katana','289').martial().finesse().versatile(8).dmg(6,'Slashing').desc('A katana is an especially light type of longsword. In addition to being a martial weapon, the katana is also a monk weapon.').classify('WB0'),
    new Weapon('Kusarigama','289').martial().twohanded().reach().sell(15).lb(4).dmg(4,'Slashing').desc('A kusarigama consists of a long metal chain with a sickle on one end, and a heavy weight at the other. A monk or other individual trained in kusarigamajutsu can perform the following maneuvers with it in combat:').desc('Grapple. Once on your turn, you can make an attack with the weighted end of the weapon. If you hit, the weapon deals damage equal to your Strength modifier (or Dexterity modifier if you are a monk and you choose to use your martial arts feature), and if the target is no more than one size category larger than you, the target must make a Strength (Athletics) check, contested by your attack roll. If you win the contest, the creature is grappled by you, and has disadvantage on the first weapon attack roll they make on the next turn. You can only grapple one creature at a time when using the kusarigama to grapple.').desc('Pull. You can shove a creature grappled by your kusarigama. When you do, you must choose between shoving them prone or pulling them 5 feet toward you.').desc('Disarm. You can make a special melee attack against a creature you are grappling with your kusarigama. If you are able to make multiple attacks with the attack action, this replaces one of them. You release your grapple, and the target must succeed on a Strength saving throw. The DC of the saving throw is your Ki save DC or 8 + your Strength modifier, whichever is higher. On a failed save, it drops the object you choose. The object lands at its feet, and you can use your reaction to move it up to 10 feet away.').classify('WB')
];

// Finish Sourcebook

sb.parentages([Apelong,Bullywug,Ikwiikwii,Ludai,Quillen,Rhinox,Skiouros,Thanoi]);
sb.cast(spellbook);
sb.multistock(weapons).multistock(poisons);

sb.write();

