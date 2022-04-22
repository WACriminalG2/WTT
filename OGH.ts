import { ParentageUpbringing, PorUTrait } from "./parentage";
import { Spell, Sourcebook } from "./core";

// Sourcebook creation
let sb = new Sourcebook("Old Gus' Heroes of the Multiverse","OGH");
sb.version('v2.60');

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

    let Quillen = new ParentageUpbringing('Quillen','44','Spiny Protectors','Quillen resemble hedgehogs and porcupines. Their furry bodies are adorned by patches of sharp quills, which they can bristle and use as a natural defense. When a quillen is angry or upset, their speech becomes punctuated by huffed breathing and a displeasured tut-tut of a clicked tongue. Quillen do not see very well compared to other folk, and primarily rely on their keen senses of hearing and smell to guide them through their lives.',).multitrait([ImprovedQuills,KeenSmellAndHearing,Little25,PoorEyesight,Quills]);

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

function scribe(name:string,page:string,level:number,school:string) {
    let x = new Spell(name,page,level,school);
    return x;
}

let spellbook : Spell[] = [

scribe('Acidic Exudation','205',2,'Transmutation').takes('1 action').self().v().s().m('a pinch of saltpeter').concentrate('1 minute').desc('Your palm secretes a volatile gel, which you can use as a weapon. For the duration, you can use a bonus action to throw a globule of the substance up to 30 feet. The globule explodes upon impact, creating a shower of hissing acid in a 5-foot-radius sphere. Creatures in the area must make a Dexterity saving throw, taking 2d6 acid damage on a failed save, or half as much damage on a successful one.').desc('At Higher Levels: When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd.'),

scribe('Age Plant','205',4,'Transmutation').takes('1 minute').range(60).v().s().concentrate('1 minute').desc('You increase or decrease the aging of a nonmagical and immobile plant, seed, or tree by up to ten years. The spell has no effect on plant creatures.').desc('The process can operate either forward or backward, causing flowers to blossom, seeds to sprout and grow, and trees to bear fruit; or fruit to turn to blossoms, trees to become saplings, and new shoots to turn to seeds. The extent of the changes are entirely up to you.').desc('The spell does not alter the appearance or characteristics of a plant except those that result from normal aging (or regression).').desc('At Higher Levels: When you cast this spell using a spell slot of 5th level, aging effect increases to 25 years. If you use a spell slot of 6th level, the aging effect increases to 100 years. If you use a spell slot of 7th level or higher, the aging effect increases to 1,000 years.')

]

// Finish Sourcebook
sb.parentages([Apelong,Bullywug,Ludai,Quillen,Rhinox,Skiouros,Thanoi]);
sb.Spells = spellbook;
sb.write();

