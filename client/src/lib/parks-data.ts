import { type InsertPark } from "@shared/schema";

// Extract park data from the Wikipedia content
export function initializeParksData(): InsertPark[] {
  return [
    {
      id: "namadgi-national-park",
      name: "Namadgi National Park",
      state: "Australian Capital Territory",
      coordinates: "35°40′00″S148°57′00″E",
      establishedDate: "1984",
      description: "A pristine wilderness area in the Australian Capital Territory featuring subalpine environments, Aboriginal heritage sites, and diverse wildlife.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240"
    },
    {
      id: "blue-mountains-national-park",  
      name: "Blue Mountains National Park",
      state: "New South Wales",
      coordinates: "33°58′04″S150°18′15″E",
      establishedDate: "1959",
      description: "Famous for its dramatic scenery, including steep cliffs, eucalyptus forests, waterfalls and charming villages.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240"
    },
    {
      id: "royal-national-park",
      name: "Royal National Park", 
      state: "New South Wales",
      coordinates: "34°04′S151°03′E",
      establishedDate: "1879",
      description: "The world's second oldest national park, featuring coastal cliffs, beaches, rainforest and heathland.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240"
    },
    {
      id: "kosciuszko-national-park",
      name: "Kosciuszko National Park",
      state: "New South Wales", 
      coordinates: "36°27′S148°16′E",
      establishedDate: "1967",
      description: "Home to Australia's highest peak and alpine environments, popular for skiing and bushwalking.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240"
    },
    {
      id: "kakadu-national-park",
      name: "Kakadu National Park",
      state: "Northern Territory",
      coordinates: "12°20′S132°50′E", 
      establishedDate: "1981",
      description: "Australia's largest national park, featuring ancient Aboriginal rock art, diverse wildlife and spectacular landscapes.",
      imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240"
    },
    {
      id: "uluru-kata-tjuta-national-park",
      name: "Uluru-Kata Tjuta National Park", 
      state: "Northern Territory",
      coordinates: "25°20′S131°02′E",
      establishedDate: "1958",
      description: "Home to the iconic Uluru (Ayers Rock) and Kata Tjuta (The Olgas), sacred sites of the Anangu people.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240"
    },
    {
      id: "daintree-national-park",
      name: "Daintree National Park",
      state: "Queensland", 
      coordinates: "16°10′S145°25′E",
      establishedDate: "1988",
      description: "Ancient rainforest ecosystem dating back 180 million years, home to unique flora and fauna.",
      imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240"
    },
    {
      id: "great-barrier-reef-marine-park",
      name: "Great Barrier Reef Marine Park",
      state: "Queensland",
      coordinates: "18°17′S147°42′E",
      establishedDate: "1975", 
      description: "The world's largest coral reef system, supporting incredible marine biodiversity.",
      imageUrl: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240"
    },
    {
      id: "cradle-mountain-lake-st-clair",
      name: "Cradle Mountain-Lake St Clair National Park",
      state: "Tasmania",
      coordinates: "41°40′S146°07′E", 
      establishedDate: "1922",
      description: "Pristine wilderness featuring ancient rainforests, alpine landscapes and diverse wildlife.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240"
    },
    {
      id: "grampians-national-park",
      name: "Grampians National Park", 
      state: "Victoria",
      coordinates: "37°15′S142°30′E",
      establishedDate: "1984",
      description: "Rugged mountain ranges with Aboriginal rock art, waterfalls and spectacular wildflower displays.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240"
    }
  ];
}
