/**     The Waterdeep Trade Taxonomy (WTT) - A collaborative work of classification by the various trade guilds of Waterdeep as
*       a means to standardize transactional records, systems of inventory, and boundaries of interest between different guilds.
*/
export default {
    "A": "Armor",
        "AA": "Arms and Hands",
        "AB": "Full-Body",    
        "AC": "Chest and Torso",
        "AH": "Head and Neck",
        "AL": "Legs and Feet",
        "AN": "Non-Humanoid",
        "AS": "Shields",
        "AW": "Wing and other Appendage",

    "B": "Books and Other Written Materials",
        "BA": "Arcana",
        "BE": "Encyclopedias and Reference Works",
        "BF": "Fiction",
            "BF000": "Children's Stories and Nursery Rhymes",
            "BF100": "Great Literature",
            "BF200": "Drama",
            "BF300": "Tragedy",
            "BF400": "Comedy",
            "BF500": "Horror",
            "BF600": "Speculative Fiction",
            "BF700": "Folklore, Fables, and Mythology",
            "BF800": "Romance",
            "BF900": "Poetry",
        "BG": "Geography",
        "BH": "History",
        "BL": "Linguistics",
        "BM": "Music",
        "BP": "Politics and Law",
        "BR": "Religion and Philosophy",
        "BS": "Science",
        "BT": "Technology and Engineering",
        "BV": "Current Events",

    "C": "Creatures",
        "CA": "Abberation",
        "CB": "Beast",
        "CC": "Celestial",
        "CD": "Dragon",
        "CE": "Elemental",
        "CF": "Fiend",
        "CG": "Giant",
        "CH": "Humanoid",
        "CM": "Monstrosity",
        "CN": "Construct",
        "CO": "Ooze",
        "CP": "Plant",
        "CU": "Undead",
        "CY": "Fey",

    // D currently unassigned

    "E": "Expressive Works",
        "EC": "Carpentry and Woodworking",
        "ED": "Drawing",
        "EP": "Painting",
        "ES": "Sculpture",
        "EW": "Weaving",

    "F": "Foodstuffs",
        "FA": "Alcoholic Drinks",
        "FC": "Fish and Seafood",
        "FD": "Dairy",
        "FE": "Equipment, Dishes, and Utensils",
        "FF": "Fruits",
        "FG": "Grains and Flours",
        "FL": "Non-Alcholic Drinks",
        "FM": "Meat, Game, and Poultry",
        "FN": "Nuts",
        "FP": "Prepared Dishes",
            "FP000": "Baked Goods",
                "FP010": "Baked Goods - Bread",
                "FP020": "Baked Goods - Pies and Pastries",
            "FP100": "Soups and Stews",
                "FP110": "Soups and Stews - Cold",
                "FP120": "Soups and Stews - Hot",
        "FS": "Spices and Seasonings",
            "FS000": "Salts",
        "FV": "Vegetables",

    "G": "Games, Leisure, and Vice",
        "GB": "Game Boards",
        "GC": "Card Games",
        "GD": "Drugs",
        "GG": "Gambling Paraphernalia",
        "GP": "Puzzles",
        "GT": "Toys",

    "H": "Housewares and Furniture",

    // I currently unassigned.

    // J currently unassigned.

    // K currently unassigned.

    "L": "Land and Construction",
        "LC": "Commercial Property",
        "LE": "Empty Land",
        "LR": "Residential Property",

    // M designated as meta-classification for magic items which would otherwise fit in other categories.

    // N currently unassigned.

    "O": "Outfits and Clothing",
        "OB": "Boots and Footwear",
        "OC": "Costuming and Uniforms",
        "OF": "Formal Attire",
        "OG": "Gloves and Handwear",
        "OH": "Headwear",
        "OJ": "Jewelry",
        "OL": "Pants and Legwear",
        "OO": "Outerwear",
        "OS": "Shirts and Tunics",
        "OU": "Undergarments",

    "P": "Alchemical Materials",
        "PE": "Equipment",
        "PI": "Ingredients and Reagents",
        "PO": "Oils",
        "PP": "Potions", // This category should only be used for technically mundane substances; true magic potions should be classified under 'MPP'.
        "PS": "Poisons",

    // Q currently unassigned.

    "R": "Raw Materials and Trade Goods",
        "RC": "Crystals and Gems",
        "RL": "Leathers and Anatomical Materials",
        "RM": "Metals",
        "RS": "Stones",
        "RT": "Textiles",
        "RW": "Woods",

    "S": "Services",
        "SA": "Artistic",
            "SA000": "Performance",
                "SA010": "Performance - Dramatic",
                "SA020": "Performance - Comedic",
                "SA030": "Performance - Dance",
                "SA040": "Performance - Speaking",
                "SA050": "Performance - Musical",
        "SE": "Enchantment and Spellcasting",
        "SI": "Illegal, Illicit, or Taboo",
            "SI000": "Prostitution",
            "SI100": "Clandestine Transportation or Storage",
            "SI200": "Violence",
            "SI300": "Information",
            "SI400": "Theft and Arson",
        "SL": "Lodging, Room and Board",
        "SM": "Medical",
        "SR": "Religious Services and Blessings",
        "SS": "Smithing",
        "ST": "Training and Teaching",
        
    "T": "Tools",
        "TA": "Artisan Tools (Individual)",
        "TB": "Tools of Construction and Destruction",
        "TC": "Clerical Tools",
        "TK": "Tool Kits/Sets",
        "TL": "Lighting and Illumination",
        "TM": "Musical Instruments",
        "TN": "Navigational and Timekeeping Aids",
        "TS": "Storage and Transport",

    // U currently unassigned.

    "V": "Vehicles",
        "VA": "Airborne",
        "VI": "Interplanar",
        "VM": "Multipurpose",
        "VN": "Nautical",
        "VO": "Overland",
        "VU": "Underground",

    "W": "Weaponry",
        "WA": "Ammunition",
        "WB": "Blade Weapons",
            "WB000": "Swords",
        "WC": "Clubs and Blunt Weaponry",
        "WF": "Foci and Symbols",
            "WF000": "Arcane Foci",
            "WF100": "Druidic Foci",
            "WF200": "Holy Symbols",
        "WG": "Siege Weaponry",
        "WH": "Hammers",
        "WP": "Polearms",
            "WP000": "Spears and Javelins",
        "WR": "Ranged Weapons",
            "WR000": "Archery",
            "WR100": "Firearms",
        "WT": "Thrown Weapons",
        "WV": "Staves",
        "WX": "Axes",
        "WZ": "Placeholder",

    // X currently unassigned.

    // Y currently unassigned.

    "Z": "Adventuring Supplies",
        "ZC": "Containers",
        "ZL": "Lighting and Illumination",
        "ZM": "Medicines",
        "ZR": "Ropes and Chains",
        "ZS": "Sheltering Tools and Materials",
        "ZT": "Traps and Tricks"
}