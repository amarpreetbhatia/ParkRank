import { type InsertPark } from "@shared/schema";

// Comprehensive dataset of major Australian national parks across all states and territories
// This represents a significant selection from Australia's 600+ national parks system
export function initializeParksData(): InsertPark[] {
  return [
    // Australian Capital Territory (1 park - unique in having only one national park)
    {
      id: "namadgi-national-park",
      name: "Namadgi National Park",
      state: "Australian Capital Territory",
      coordinates: "35°40′00″S148°57′00″E",
      establishedDate: "1984",
      description: "Covers 46% of the ACT with subalpine environments, Aboriginal heritage sites, and diverse wildlife.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // New South Wales (Sample from 200+ parks - one of the largest state collections)
    {
      id: "abercrombie-river-national-park",
      name: "Abercrombie River National Park",
      state: "New South Wales",
      coordinates: "34°05′38″S149°42′29″E",
      establishedDate: "1995",
      description: "Historic gold mining area with limestone caves and diverse native vegetation.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "bald-rock-national-park",
      name: "Bald Rock National Park",
      state: "New South Wales",
      coordinates: "28°51′09″S152°03′20″E",
      establishedDate: "1971",
      description: "Features the largest granite monolith in Australia and spectacular views.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "barrington-tops-national-park",
      name: "Barrington Tops National Park",
      state: "New South Wales",
      coordinates: "32°03′10″S151°29′38″E",
      establishedDate: "1969",
      description: "World Heritage subtropical and temperate rainforest with ancient Antarctic beech trees.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "blue-mountains-national-park",  
      name: "Blue Mountains National Park",
      state: "New South Wales",
      coordinates: "33°58′04″S150°18′15″E",
      establishedDate: "1959",
      description: "World Heritage area famous for dramatic cliffs, eucalyptus forests, and the Three Sisters.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Australia_-_Part_3_%2827446932621%29.jpg/330px-Australia_-_Part_3_%2827446932621%29.jpg"
    },
    {
      id: "boonoo-boonoo-national-park",
      name: "Boonoo Boonoo National Park",
      state: "New South Wales",
      coordinates: "28°49′03″S152°10′42″E",
      establishedDate: "1982",
      description: "Features spectacular waterfalls and granite landscapes on the NSW-Queensland border.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "border-ranges-national-park",
      name: "Border Ranges National Park",
      state: "New South Wales", 
      coordinates: "28°21′35″S152°59′10″E",
      establishedDate: "1979",
      description: "Part of Gondwana Rainforests World Heritage Area protecting ancient rainforest.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "botany-bay-national-park",
      name: "Kamay Botany Bay National Park",
      state: "New South Wales",
      coordinates: "34°01′14″S151°13′29″E",
      establishedDate: "1984",
      description: "Historic site of Captain Cook's first landing with coastal headlands and Aboriginal sites.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "bouddi-national-park",
      name: "Bouddi National Park",
      state: "New South Wales",
      coordinates: "33°31′00″S151°24′00″E",
      establishedDate: "1967",
      description: "Coastal park with pristine beaches, headlands, and rich Aboriginal cultural heritage.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "budawang-national-park",
      name: "Budawang National Park",
      state: "New South Wales",
      coordinates: "35°25′12″S150°02′42″E",
      establishedDate: "1977",
      description: "Wilderness area with dramatic rock formations, deep valleys and pristine forests.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "bundjalung-national-park",
      name: "Bundjalung National Park",
      state: "New South Wales",
      coordinates: "29°14′51″S153°19′43″E",
      establishedDate: "1980",
      description: "Coastal park preserving Aboriginal cultural sites and diverse marine and terrestrial habitats.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "kosciuszko-national-park",
      name: "Kosciuszko National Park",
      state: "New South Wales", 
      coordinates: "36°27′S148°16′E",
      establishedDate: "1967",
      description: "Home to Australia's highest peak and largest national park in NSW with alpine environments.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "royal-national-park",
      name: "Royal National Park", 
      state: "New South Wales",
      coordinates: "34°04′S151°03′E",
      establishedDate: "1879",
      description: "World's second oldest national park featuring coastal cliffs, beaches, and heathland.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Late_Afternoon_at_North_%26_South_Era.jpg/330px-Late_Afternoon_at_North_%26_South_Era.jpg"
    },
    
    // Northern Territory (17 parks total - significant selection)
    {
      id: "kakadu-national-park",
      name: "Kakadu National Park",
      state: "Northern Territory",
      coordinates: "12°20′S132°50′E", 
      establishedDate: "1981",
      description: "Australia's largest national park featuring ancient Aboriginal rock art and diverse ecosystems.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kakadu_2431.jpg/330px-Kakadu_2431.jpg"
    },
    {
      id: "uluru-kata-tjuta-national-park",
      name: "Uluru-Kata Tjuta National Park", 
      state: "Northern Territory",
      coordinates: "25°20′S131°02′E",
      establishedDate: "1958",
      description: "UNESCO World Heritage site home to iconic Uluru and Kata Tjuta, sacred to Anangu people.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/UluruClip3ArtC1941.jpg/330px-UluruClip3ArtC1941.jpg"
    },
    {
      id: "litchfield-national-park",
      name: "Litchfield National Park",
      state: "Northern Territory",
      coordinates: "13°10′S130°45′E",
      establishedDate: "1986",
      description: "Tropical park famous for waterfalls, swimming holes, and massive termite mounds.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "nitmiluk-national-park",
      name: "Nitmiluk National Park",
      state: "Northern Territory",
      coordinates: "14°11′S132°23′E",
      establishedDate: "1989",
      description: "Features the spectacular Katherine Gorge system with dramatic sandstone cliffs.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // Queensland (Sample from 237+ parks - Australia's largest state collection)
    {
      id: "daintree-national-park",
      name: "Daintree National Park",
      state: "Queensland", 
      coordinates: "16°10′S145°25′E",
      establishedDate: "1988",
      description: "World Heritage rainforest dating back 180 million years, the world's oldest surviving rainforest.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Daintree_National_Park.jpg/330px-Daintree_National_Park.jpg"
    },
    {
      id: "great-barrier-reef-marine-park",
      name: "Great Barrier Reef Marine Park",
      state: "Queensland",
      coordinates: "18°17′S147°42′E",
      establishedDate: "1975", 
      description: "World's largest coral reef system and UNESCO World Heritage marine park.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "lamington-national-park",
      name: "Lamington National Park",
      state: "Queensland",
      coordinates: "28°12′S153°08′E",
      establishedDate: "1915",
      description: "Part of Gondwana Rainforests World Heritage Area with ancient rainforest and diverse wildlife.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "springbrook-national-park",
      name: "Springbrook National Park",
      state: "Queensland",
      coordinates: "28°14′S153°17′E", 
      establishedDate: "1990",
      description: "Ancient rainforest remnant featuring spectacular waterfalls and the famous Natural Bridge.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "girraween-national-park",
      name: "Girraween National Park",
      state: "Queensland",
      coordinates: "28°50′S151°57′E",
      establishedDate: "1932",
      description: "Granite landscape park known for spectacular wildflower displays and unique rock formations.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "carnarvon-national-park",
      name: "Carnarvon National Park",
      state: "Queensland",
      coordinates: "25°18′S148°11′E",
      establishedDate: "1932",
      description: "Features spectacular Carnarvon Gorge with ancient Aboriginal rock art and diverse ecosystems.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "fraser-island-national-park",
      name: "K'gari (Fraser Island) National Park",
      state: "Queensland",
      coordinates: "25°15′S153°10′E",
      establishedDate: "1992",
      description: "World's largest sand island with unique ecosystems, freshwater lakes, and rainforest.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "glass-house-mountains-national-park",
      name: "Glass House Mountains National Park",
      state: "Queensland",
      coordinates: "26°56′S152°58′E",
      establishedDate: "1994",
      description: "Dramatic volcanic peaks offering spectacular views and rock climbing opportunities.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // South Australia (28 parks total - focused on nationally significant sites)
    {
      id: "flinders-ranges-national-park",
      name: "Flinders Ranges National Park",
      state: "South Australia",
      coordinates: "31°36′S138°39′E",
      establishedDate: "1970",
      description: "Ancient mountain ranges with Aboriginal rock art, gorges, and the iconic Wilpena Pound.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "kangaroo-island-wilderness-protection-area",
      name: "Kangaroo Island Wilderness Protection Area",
      state: "South Australia",
      coordinates: "35°46′S137°13′E",
      establishedDate: "1919",
      description: "Pristine wilderness on Kangaroo Island with diverse ecosystems and native wildlife sanctuary.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "simpson-desert-national-park",
      name: "Munga-Thirri-Simpson Desert National Park",
      state: "South Australia",
      coordinates: "25°00′S137°00′E",
      establishedDate: "2021",
      description: "Australia's largest national park covering vast desert landscapes and unique ecosystems.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "coffin-bay-national-park",
      name: "Coffin Bay National Park",
      state: "South Australia",
      coordinates: "34°50′S135°28′E",
      establishedDate: "1970",
      description: "Coastal wilderness with pristine beaches, mallee scrublands, and diverse marine life.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // Tasmania (19 parks total - complete major representation)
    {
      id: "cradle-mountain-lake-st-clair",
      name: "Cradle Mountain-Lake St Clair National Park",
      state: "Tasmania",
      coordinates: "41°40′S146°07′E", 
      establishedDate: "1922",
      description: "World Heritage wilderness featuring ancient rainforests, alpine landscapes, and diverse wildlife.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Cradle_Mountain_Behind_Dove_Lake.jpg/330px-Cradle_Mountain_Behind_Dove_Lake.jpg"
    },
    {
      id: "freycinet-national-park",
      name: "Freycinet National Park",
      state: "Tasmania",
      coordinates: "42°08′S148°18′E",
      establishedDate: "1916",
      description: "Famous for Wineglass Bay, pink granite peaks, and pristine beaches on the east coast.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "mount-field-national-park",
      name: "Mount Field National Park",
      state: "Tasmania", 
      coordinates: "42°41′S146°36′E",
      establishedDate: "1916",
      description: "Tasmania's first national park featuring temperate rainforest, alpine areas, and Russell Falls.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "southwest-national-park",
      name: "Southwest National Park",
      state: "Tasmania",
      coordinates: "43°00′S146°00′E",
      establishedDate: "1955",
      description: "Tasmania's largest park covering 10% of the state in pristine wilderness and World Heritage area.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "tasman-national-park",
      name: "Tasman National Park",
      state: "Tasmania",
      coordinates: "43°08′S147°57′E",
      establishedDate: "1972",
      description: "Famous for dramatic sea cliffs, rock formations, and thriving marine life near Hobart.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "franklin-gordon-wild-rivers",
      name: "Franklin-Gordon Wild Rivers National Park",
      state: "Tasmania",
      coordinates: "42°20′S145°50′E",
      establishedDate: "1981",
      description: "World Heritage wilderness protecting wild rivers, ancient rainforest, and untouched landscapes.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // Victoria (Significant selection from state parks)
    {
      id: "grampians-national-park",
      name: "Grampians National Park", 
      state: "Victoria",
      coordinates: "37°15′S142°30′E",
      establishedDate: "1984",
      description: "Rugged mountain ranges with Aboriginal rock art, waterfalls, and spectacular wildflower displays.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Grampians.jpg/330px-Grampians.jpg"
    },
    {
      id: "wilsons-promontory-national-park",
      name: "Wilsons Promontory National Park",
      state: "Victoria",
      coordinates: "39°01′S146°19′E",
      establishedDate: "1898",
      description: "Southernmost tip of mainland Australia known for pristine beaches and diverse wildlife.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "port-campbell-national-park",
      name: "Port Campbell National Park",
      state: "Victoria",
      coordinates: "38°37′S143°06′E",
      establishedDate: "1964",
      description: "Home to the famous Twelve Apostles limestone stacks along the Great Ocean Road.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "alpine-national-park",
      name: "Alpine National Park",
      state: "Victoria",
      coordinates: "36°52′S147°44′E",
      establishedDate: "1989",
      description: "Victoria's largest park extending into alpine regions with snow gums and mountain streams.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "croajingolong-national-park",
      name: "Croajingolong National Park",
      state: "Victoria",
      coordinates: "37°30′S149°15′E",
      establishedDate: "1979",
      description: "UNESCO Biosphere Reserve protecting coastal wilderness and diverse ecosystems.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // Western Australia (Major selection from extensive state system)
    {
      id: "karijini-national-park",
      name: "Karijini National Park",
      state: "Western Australia",
      coordinates: "22°25′S118°29′E",
      establishedDate: "1969",
      description: "Ancient red rock gorges, waterfalls, and diverse ecosystems in the Pilbara region.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Dales_Gorge%2C_WA.jpg/330px-Dales_Gorge%2C_WA.jpg"
    },
    {
      id: "purnululu-national-park",
      name: "Purnululu National Park",
      state: "Western Australia",
      coordinates: "17°31′S128°25′E",
      establishedDate: "1987",
      description: "UNESCO World Heritage site home to iconic Bungle Bungle Range with beehive-shaped formations.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "stirling-range-national-park",
      name: "Stirling Range National Park",
      state: "Western Australia",
      coordinates: "34°23′S118°04′E",
      establishedDate: "1913",
      description: "Known for spectacular wildflower displays, rugged peaks, and unique flora in southwestern Australia.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "kalbarri-national-park",
      name: "Kalbarri National Park",
      state: "Western Australia",
      coordinates: "27°43′S114°09′E",
      establishedDate: "1963",
      description: "Spectacular river gorges, coastal cliffs, and diverse wildflower displays.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "fitzgerald-river-national-park",
      name: "Fitzgerald River National Park",
      state: "Western Australia",
      coordinates: "33°56′S119°23′E",
      establishedDate: "1973",
      description: "UNESCO Biosphere Reserve with exceptional wildflower diversity and rugged coastal landscapes.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "shark-bay-marine-park",
      name: "Shark Bay Marine Park",
      state: "Western Australia",
      coordinates: "26°00′S113°30′E",
      establishedDate: "1990",
      description: "World Heritage marine park famous for stromatolites, dugongs, and diverse marine ecosystems.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    }
  ];
}
