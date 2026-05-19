export interface FoodSpot {
  id: string;
  name: string;
  address: string;
  priceRange?: string;
  recommendation: string;
  reason: string;
  photos?: string[];
  videoUrl: string;
  emoji: string;
  iconUrl?: string;
  position: { lat: number; lng: number };
}

export const myFavoriteSpots: FoodSpot[] = [
  {
    id: 'school',
    name: 'Friends Seminary',
    address: '222 East 16th Street',
    recommendation: '',
    reason: '',
    videoUrl: '',
    emoji: '',
    position: { lat: 40.73402386970733, lng: -73.98507122585129 }
  },
  {
    id: '1',
    name: 'Nishaan',
    address: '160 1st Avenue',
    priceRange: '$15-20',
    recommendation: 'The Pakistani Chopped Cheese',
    reason: 'The chopped cheese. The staple of any New York deli. While there are many great chopped cheeses in the Union Square area, we wanted to find something special. When we saw Nishaan advertising itself as <em>Home of the Pakistani Chopped Cheese</em> we knew we had found it. After losing his job in 2024, founder and owner Zeeshan created a delicious fusion, blending Pakistani flavors and seasoning from his heritage with a New York staple he grew up with. His take on the classic chopped cheese is tangy, perfectly spiced, and cheesy; in a word, delicious. Their buffalo tandoori loaded fries packed similarly powerful flavors and could easily be a meal of their own. The mango guava fizz drink was both gorgeous and refreshing, especially on a humid spring day. Finally, we tried maybe the best chocolate chip cookie we\'ve ever had, which was rich and buttery thanks to being made with ghee (clarified butter). These cookies are baked for Nishaan by Zeeshan\'s friend Maymuna (@fortheloveof.spice on Instagram). This is an absolute must-try for any Friends student, faculty member, or person who ever goes to the East Village.',
    photos: [
      '/Nishaan/Nishaan1.jpg',
      '/Nishaan/Nishaan2.jpg',
      '/Nishaan/Nishaan3.jpg',
      '/Nishaan/Nishaan4.jpg',
      '/Nishaan/Nishaan5.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🇵🇰',
    position: { lat: 40.72849298137547, lng: -73.98440293426675 }
  },
  {
    id: '2',
    name: 'Pizzazz',
    address: '38 Union Square East',
    priceRange: '$12-16',
    recommendation: 'Sweet & Spicy Pizza',
    reason: 'Tired of Joe\'s Pizza? Pizzazz blows it out of the water. Their unique business model involves fresh Neopolitan-style personal pizzas, made to order from scratch every time. Zoran, the owner, believes that great pizza starts with great dough, and let us tell you, the dough is certainly the heart of his pizza. The dough, along with fresh ingredients makes this pizza like no other. We loved the sweet and spicy pizza, which has thinly-sliced salami, ricotta, and Calabrian hot honey, which come together for the perfect bite. But the margarita is also an all-time classic and allows you to taste the delicious foundation for any of their pizzas: the perfect dough, flavorful sauce, and fresh mozzarella. However, the food isn\'t the only thing that makes Pizzazz stand out. Zoran\'s hospitality-first approach drives his business forward, and on Emmett\'s first time there, Zoran made him and his friends instantly feel at home, striking up a conversation and even baking them a fresh dessert on the house. Zoran cares deeply for his customers, which is evident both in the warm environment he has created at Pizzazz, and the boldness of every pizza he serves, both of which keep us coming back for more. This is exactly the kind of local business that Neighborhood Niche aims to highlight, and we couldn\'t have been happier with the food and the story we found at Pizzazz.',
    photos: [
      '/Pizzazz/Pizza1.jpg',
      '/Pizzazz/Pizza2.jpg',
      '/Pizzazz/Pizza3.jpg',
      '/Pizzazz/Pizza4.jpg',
      '/Pizzazz/Pizza5.jpg',
      '/Pizzazz/Pizza6.jpg',
      '/Pizzazz/Pizza7.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🍕',
    position: { lat: 40.7361089920068, lng: -73.98908279210966 }
  },
  {
    id: '3',
    name: 'Mini Gourmet Deli',
    address: '230 E 14th Street',
    priceRange: '$3-10',
    recommendation: 'Beef Empanada',
    reason: 'The spot that started it all. On a walk down 14th Street to grab a quick dollar slice during lunch, Eli noticed a tiny sign on a window advertising $3 empanadas. He decided to try it out, and was blown away by how good it was. Mini Gourmet Deli quickly became a favorite among our friends, so we gave it the nickname <em>Niche Empanada</em> based on it\'s easy-to-miss storefront, and the name went on to inspire this entire project. The empanada menu is short and sweet: chicken, beef, and beef and cheese. Our favorite is definitely the classic beef which is crispy, flavorful, and surprisingly big given the low price. We recommend topping it with a little hot sauce. Niche Empanada also serves smoothies and açaí bowls that we recommend as well. They say their mission is "making food that feels fresh, simple, and satisfying." Over the past year, we have gotten to know Mulin and Murat, who make a clear effort to create community in the neighborhood. Murat, the owner, says, "we have many regular customers who became close to us over time. Our neighbors from the comedy club next door have been really supportive– they\'re not only customers, they\'re also our friends." Niche Empanada is perfect any time of day for a meal or a quick snack, especially given it\'s proximity to Friends. In our opinion, it should be a staple in any student\'s lunch rotation.',
    photos: [
      '/Niche/Niche1.jpg',
      '/Niche/Niche2.jpg',
      '/Niche/Niche3.jpg',
      '/Niche/Niche4.JPG',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '⭐',
    position: { lat: 40.73263188911167, lng: -73.98600731605971 }
  },
  {
    id: '4',
    name: 'Smashy',
    address: '42 Union Square East',
    priceRange: '$5-10',
    recommendation: 'Double House Cheeseburger ($6.99 + tax)',
    reason: 'While there are smashburgers abound in the Union Square area, we have concluded that the greatest of them all is found at Smashy. This is one of the cheapest full-size smashburgers around, without sacrificing any flavor. Their house sauce is a must, and adds a delicious, tangy touch to the burger. Their buns are not over-greased, as smashburgers can sometimes be, and their thin fries are the perfect side, thanks to the clear instructions on the wall for employees on how to make the perfect fry. Smashy is close enough and quick enough to be a collab grab-and-go snack. Make sure to wave through the portal on the wall to the people in their Budapest location. Maybe you\'ll even make a new friend!',
    photos: [
      '/Smashy/Smashy1.jpg',
      '/Smashy/Smashy2.jpg',
      '/Smashy/Smashy3.JPG',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🍔',
    position: { lat: 40.736200584185504, lng: -73.98905820009233 }
  },
  {
    id: '5',
    name: 'Loong Noodles',
    address: '28 St Marks Pl',
    priceRange: '$10-15',
    recommendation: 'Beef Noodle Soup ($13 + tax)',
    reason: 'Looking for a tasty and affordable bowl of noodles? Well, we\'ve got what you\'ve been loong-ing for! Located on St. Mark\'s Place, Loong Noodles has some of the best noodles around. We got the Taiwanese-style beef noodle soup, and it was absolutely superb. The star of the show was the braised beef shank: it was tender and juicy so that it melts in your mouth, and it had soaked in the delicious flavor of the broth, which was tangy and aromatic with a slight kick to it. We went for the mild spice level and thought it was the perfect amount. We also ordered the scallion pancakes, which had scrambled egg folded into them. The restaurant itself had a bright, lively interior perfect for sitting down and enjoying your hot noodles, but they also offered takeout. Any Kendrick Lamar fan will certainly enjoy the music there. Try it out, you won\'t regret it.',
    photos: [
      '/Loong/Loong1.JPG',
      '/Loong/Loong2.JPG',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🍜',
    position: { lat: 40.72884125940006, lng: -73.98860475688663 }
  },
  {
    id: '6',
    name: 'Anytime Street',
    address: '34 St Marks Pl',
    priceRange: '$14-20',
    recommendation: 'Combo 1 with Teriyaki Chicken',
    reason: 'Anytime is the right time for a lunch at Anytime Street! This Korean street food spot on St Marks offers rice bowls, dumplings, spring rolls, and more. They have a selection of various fruit-ades, perfect to pair with one of their three combo meals. The combos come with 1-3 proteins over rice and a spring lettuce mix. The rice was seasoned nicely, and our teriyaki chicken also tasted good. The kimchi also added a nice pickley flavor to the bowl. This was a good spot for a healthy meal, and we would definitely consider going back to try some of the other proteins. If you\'re in the area and are wanting a filling, healthy meal, it might be time for Anytime.',
    photos: [
      '/Anytime/Anytime1.JPG',
      '/Anytime/Anytime2.jpg',
      '/Anytime/Anytime3.JPG',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🍱',
    position: { lat: 40.728635797295325, lng: -73.98806128247728 }
  },
  {
    id: '7',
    name: 'MooMooChaa',
    address: '227 E 14th St',
    priceRange: '$6-8',
    recommendation: 'Earl Grey Milk Tea with Boba',
    reason: 'MooMooChaa is the classic Friends Seminary boba spot. They have a wide selection of milk teas, fruit teas, and milkshakes, with some of our favorites being the earl grey milk tea and the passionfruit fruit tea. For fruit teas, we recommend getting both boba and lychee jelly. This hole-in-the-wall boba shop is the perfect place to grab a refreshing drink during collab, and their 3% student discount (with ID) is sure to keep the cost down. Friends lifers have been coming here since Kindergarten, and for a good reason. There are still post-its on the wall that some of us made in lower school. Make sure to check it out if you haven\'t already.',
    photos: [
      '/MooMooChaa/MooMooChaa1.jpg',
      '/MooMooChaa/MooMooChaa2.jpg',
      '/MooMooChaa/MooMooChaa3.jpg',
      '/MooMooChaa/MooMooChaa4.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🧋',
    position: { lat: 40.73295702872633, lng: -73.98597333616225 }
  },
  {
    id: '8',
    name: 'Jo\'s Taco',
    address: '226 E 14th St',
    priceRange: '$11-16',
    recommendation: 'Birria Tacos ($11 + tax for 2)',
    reason: '14th Street is packed with little hole-in-the-wall gems, and one of those is our new go-to taco spot: Jo\'s Taco. We got an order of the birria tacos which were juicy and packed with flavor, especially after dipping them in the complementary birria broth, as well as the carne asada tacos, which we also enjoyed. We were also surprised by how nice the plating was for such a small establishment. While many Friends students still miss Tacombi\'s Taco Tuesday specials, we are sure that Jo\'s will fill that want. The 2 for $11 deal and short walk from Friends is hard to beat!',
    photos: [
      '/Jos/Jo1.JPG',
      '/Jos/Jo2.jpg',
      '/Jos/Jo3.jpg',
      '/Jos/Jo4.jpg',
      '/Jos/Jo5.jpg',
      '/Jos/Jo6.JPG',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🌮',
    position: { lat: 40.73267516573976, lng: -73.98617097347972 }
  },
  {
    id: '9',
    name: 'Rainbow Falafel',
    address: '26 E 17th St',
    priceRange: '$7-12',
    recommendation: 'Falafel Sandwich ($7.25 + tax)',
    reason: 'Upon starting this project, we were bombarded by recommendations for Rainbow Falafel (shout-out to Neil Desai and Eli\'s dad!) After our first visit, we understood why. We don\'t think it\'s an exaggeration to say that this is the best falafel in the city. Soft, perfectly-spiced, with tangy sauce to balance it out, this falafel is unmatched. It did start to fall apart, becoming a little hard to eat in sandwich form, so next time we might go for the platter instead. The shawarma left a little to be desired, but we can forgive that based solely on how good the falafel was. We highly recommend taking a trip across Union Square to try this New York institution.',
    photos: [
      '/RainbowFalafel/rainbow.jpg',
      '/RainbowFalafel/rainbow2.JPG',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🥙',
    position: { lat: 40.73726981694557, lng: -73.99088010899419 }
  },
  {
    id: '10',
    name: 'Mimi Cheng\'s',
    address: '179 2nd Ave',
    priceRange: '$15-20',
    recommendation: 'Pork and Chive Dumplings',
    reason: 'Sisters Hannah and Marian opened Mimi Cheng\'s in 2014 to share the joyful feeling their mom\'s food gave them with the people of New York. Their pan-fried pork and chive dumplings are some of the best we\'ve had, and their dumpling sauce also surprisingly impressed us. We also ordered the cucumber salad, which was made with fresh, crunchy Chinese cucumbers and seasoned in a delicious garlic-y marinade. Hannah and Marian shared that "Mimi taught us the difference that farm-fresh vegetables, family-raised chicken, and pasture-raised pork can make." Well, whatever they\'re doing is definitely working. This spot is especially close to school, and is the perfect place to grab a quick order of 8 dumplings as a snack or a meal. Make sure to check it out!',
    photos: [
      '/MimiChengs/Mimi1.jpg',
      '/MimiChengs/Mimi2.jpg',
      '/MimiChengs/Mimi3.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🥟',
    position: { lat: 40.730755555932994, lng: -73.98634559201483 }
  },
  {
    id: '11',
    name: 'Caffetto',
    address: '211 E 14th St',
    priceRange: '$7-13',
    recommendation: 'Iced Maple Brown Sugar Latte',
    reason: 'Caffetto is the new neighborhood coffee shop go-to. They have high-quality Colombian coffee as well as pastries and sandwiches. Our favorite drink was the Iced Maple Brown Sugar latte, which was the perfect mix of sweetness and flavorful coffee. The sandwiches were a big highlight; we got the Cubano, which was served on perfectly toasted bread and tasted great. Cupsol regulars should be sure to give Caffetto a try. Who knows, you might find your new favorite coffee spot, and it\`s also extremely close to school! They just opened under a month ago (April 2026), so be sure to give them a try and support a new business!',
    photos: [
      '/Caffetto/Caffetto1.jpg',
      '/Caffetto/Caffetto2.jpg',
      '/Caffetto/Caffetto3.jpg',
      '/Caffetto/Caffetto4.jpg',
      '/Caffetto/Caffetto5.JPG',
      '/Caffetto/Caffetto6.JPG',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '☕',
    position: { lat: 40.73309102953999, lng: -73.98623609719532 }
  },
  {
    id: '12',
    name: 'Whits',
    address: '34 St Marks Pl',
    priceRange: '$4-9',
    recommendation: 'Ripper Hotdog ($5.99 + tax)',
    reason: 'Looking for an authentic and affordable hotdog/burger joint? Look no further than one of our new favorites: Whits. With cheese sliders for $4.50 and hotdogs for $6, this locally owned business lives by the motto displayed on their menu: <em>Inflation\'s a b****</em>. Everything they serve is tender, juicy, and packed with flavor, well worth the low price and short walk from school. Unfortunately, since it\'s a relatively small operation, their hours are pretty dependent on when the owner can be there, so check the hours on Google Maps. Friends students looking for a quick lunch that won\'t break the bank will be able to enjoy Whits on Thursday or Fridays for lunch.',
    photos: [
      '/Whits/Whits1.jpg',
      '/Whits/Whits2.jpg',
      '/Whits/Whits3.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🌭',
    position: { lat: 40.72876335829786, lng: -73.98830959631654 }
  },
  {
    id: '13',
    name: 'Pastasole',
    address: '192 1st Ave',
    priceRange: '$10-15',
    recommendation: 'Lunch Special with Pomodoro Sauce ($13.90 + tax)',
    reason: 'Located on 1st Ave between 11th and 12th St, Pastasole is our new go-to pasta spot for lunch. Their lunch special (12-3 pm) includes a bowl of fettuccine in a creamy alfredo sauce, one additional sauce, and a soda. We got ours with pomodoro and pesto, and slightly preferred the pomodoro. The fettuccini is cooked homemade to order, and is tossed in the giant pecorino romano wheel perched in the window. The pasta was cooked to a perfect al dente, and the sauce was creamy and light, the perfect mid-day lunch. They also offer a wide range of appetizers, such as garlic bread, meatballs, mini calzones, and you can add shrimp, chicken, meatballs, lobster, or burrata to any pasta bowl. Pastasole is a must-try for any pasta lover.',
    photos: [
      '/Pastasole/Pasta1.jpg',
      '/Pastasole/Pasta2.jpg',
      '/Pastasole/Pasta3.jpg',
      '/Pastasole/Pasta4.jpg',
      '/Pastasole/Pasta5.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🍝',
    position: { lat: 40.72971127757616, lng: -73.98350881068798 }
  },
  {
    id: '14',
    name: 'Onigiri Tanakaya',
    address: '171 3rd Ave',
    priceRange: '$5-15',
    recommendation: 'Spicy Tuna Roll',
    reason: 'Sushi lovers will be thrilled with the recent opening of Onigiri Tanakaya. No longer do you have to go to the food court or Westside Market to buy overpriced sushi; Onigiri Tanakaya is closer, better, and cheaper than either! Both their sushi rolls and onigiris go for as low as $5, with fancier options including shrimp tempura and salmon. These really are the classic sushi roll, and are perfect for anyone with a sushi craving, whether it\'s for a quick snack or a full meal. They also sell various Japanese snacks that are sure to have options for everyone. As the closest spot on our map to Friends, there is no reason not to try this place out!',
    photos: [
      '/Onigiri/Sushi1.jpg',
      '/Onigiri/Sushi2.jpg',
      '/Onigiri/Sushi3.jpg',
      '/Onigiri/Sushi4.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    emoji: '🍙',
    position: { lat: 40.73473836211174, lng: -73.98590831117468 }
  },
];