import { type InsertPark } from "@shared/schema";

// Comprehensive park data from Australian national parks system
export function initializeParksData(): InsertPark[] {
  return [
    // Australian Capital Territory
    {
      id: "namadgi-national-park",
      name: "Namadgi National Park",
      state: "Australian Capital Territory",
      coordinates: "35°40′00″S148°57′00″E",
      establishedDate: "1984",
      description: "A pristine wilderness area in the Australian Capital Territory featuring subalpine environments, Aboriginal heritage sites, and diverse wildlife.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // New South Wales
    {
      id: "blue-mountains-national-park",  
      name: "Blue Mountains National Park",
      state: "New South Wales",
      coordinates: "33°58′04″S150°18′15″E",
      establishedDate: "1959",
      description: "Famous for its dramatic scenery, including steep cliffs, eucalyptus forests, waterfalls and charming villages.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "royal-national-park",
      name: "Royal National Park", 
      state: "New South Wales",
      coordinates: "34°04′S151°03′E",
      establishedDate: "1879",
      description: "The world's second oldest national park, featuring coastal cliffs, beaches, rainforest and heathland.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "kosciuszko-national-park",
      name: "Kosciuszko National Park",
      state: "New South Wales", 
      coordinates: "36°27′S148°16′E",
      establishedDate: "1967",
      description: "Home to Australia's highest peak and alpine environments, popular for skiing and bushwalking.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "barrington-tops-national-park",
      name: "Barrington Tops National Park",
      state: "New South Wales",
      coordinates: "32°03′10″S151°29′38″E",
      establishedDate: "1969",
      description: "World Heritage subtropical rainforest and cool temperate rainforest with ancient Antarctic beech trees.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "border-ranges-national-park",
      name: "Border Ranges National Park",
      state: "New South Wales", 
      coordinates: "28°21′35″S152°59′10″E",
      establishedDate: "1979",
      description: "Part of the Gondwana Rainforests of Australia World Heritage Area, protecting ancient rainforest.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // Northern Territory
    {
      id: "kakadu-national-park",
      name: "Kakadu National Park",
      state: "Northern Territory",
      coordinates: "12°20′S132°50′E", 
      establishedDate: "1981",
      description: "Australia's largest national park, featuring ancient Aboriginal rock art, diverse wildlife and spectacular landscapes.",
      imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "uluru-kata-tjuta-national-park",
      name: "Uluru-Kata Tjuta National Park", 
      state: "Northern Territory",
      coordinates: "25°20′S131°02′E",
      establishedDate: "1958",
      description: "Home to the iconic Uluru (Ayers Rock) and Kata Tjuta (The Olgas), sacred sites of the Anangu people.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "litchfield-national-park",
      name: "Litchfield National Park",
      state: "Northern Territory",
      coordinates: "13°10′S130°45′E",
      establishedDate: "1986",
      description: "Known for its waterfalls, swimming holes, and massive termite mounds in tropical woodland.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // Queensland
    {
      id: "daintree-national-park",
      name: "Daintree National Park",
      state: "Queensland", 
      coordinates: "16°10′S145°25′E",
      establishedDate: "1988",
      description: "Ancient rainforest ecosystem dating back 180 million years, home to unique flora and fauna.",
      imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "great-barrier-reef-marine-park",
      name: "Great Barrier Reef Marine Park",
      state: "Queensland",
      coordinates: "18°17′S147°42′E",
      establishedDate: "1975", 
      description: "The world's largest coral reef system, supporting incredible marine biodiversity.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "lamington-national-park",
      name: "Lamington National Park",
      state: "Queensland",
      coordinates: "28°12′S153°08′E",
      establishedDate: "1915",
      description: "Part of Gondwana Rainforests World Heritage Area, famous for its ancient rainforest and wildlife.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "springbrook-national-park",
      name: "Springbrook National Park",
      state: "Queensland",
      coordinates: "28°14′S153°17′E", 
      establishedDate: "1990",
      description: "Ancient rainforest remnant with spectacular waterfalls and the famous Natural Bridge.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // South Australia
    {
      id: "flinders-ranges-national-park",
      name: "Flinders Ranges National Park",
      state: "South Australia",
      coordinates: "31°36′S138°39′E",
      establishedDate: "1970",
      description: "Ancient mountain ranges with Aboriginal rock art, gorges, and the famous Wilpena Pound.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "kangaroo-island-wilderness-protection-area",
      name: "Kangaroo Island Wilderness Protection Area",
      state: "South Australia",
      coordinates: "35°46′S137°13′E",
      establishedDate: "1919",
      description: "Pristine wilderness on Kangaroo Island with diverse ecosystems and native wildlife.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // Tasmania
    {
      id: "cradle-mountain-lake-st-clair",
      name: "Cradle Mountain-Lake St Clair National Park",
      state: "Tasmania",
      coordinates: "41°40′S146°07′E", 
      establishedDate: "1922",
      description: "Pristine wilderness featuring ancient rainforests, alpine landscapes and diverse wildlife.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
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
      description: "Tasmania's first national park, featuring temperate rainforests, alpine areas and Russell Falls.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    
    // Victoria
    {
      id: "grampians-national-park",
      name: "Grampians National Park", 
      state: "Victoria",
      coordinates: "37°15′S142°30′E",
      establishedDate: "1984",
      description: "Rugged mountain ranges with Aboriginal rock art, waterfalls and spectacular wildflower displays.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "wilsons-promontory-national-park",
      name: "Wilsons Promontory National Park",
      state: "Victoria",
      coordinates: "39°01′S146°19′E",
      establishedDate: "1898",
      description: "The southernmost tip of mainland Australia, known for pristine beaches and diverse wildlife.",
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
    
    // Western Australia
    {
      id: "karijini-national-park",
      name: "Karijini National Park",
      state: "Western Australia",
      coordinates: "22°25′S118°29′E",
      establishedDate: "1969",
      description: "Ancient red rock gorges, waterfalls and diverse ecosystems in the Pilbara region.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "purnululu-national-park",
      name: "Purnululu National Park",
      state: "Western Australia",
      coordinates: "17°31′S128°25′E",
      establishedDate: "1987",
      description: "Home to the iconic Bungle Bungle Range with distinctive beehive-shaped rock formations.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    },
    {
      id: "stirling-range-national-park",
      name: "Stirling Range National Park",
      state: "Western Australia",
      coordinates: "34°23′S118°04′E",
      establishedDate: "1913",
      description: "Known for its wildflowers, rugged peaks and unique flora in southwestern Australia.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240&q=80"
    }
  ];
}
