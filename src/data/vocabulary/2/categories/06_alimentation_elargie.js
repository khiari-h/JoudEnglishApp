export const vocab = {
  title: "Alimentation Élargie",
  words: [
    // Aliments par catégories (plus spécifiques que A1)
    { word: "dairy product", translation: "produit laitier", example: "Cheese and yogurt are dairy products." },
    { word: "grain", translation: "céréale", example: "Rice and wheat are common grains." },
    { word: "legume", translation: "légumineuse", example: "Beans and lentils are nutritious legumes." },
    { word: "nut", translation: "noix/fruit à coque", example: "Almonds and walnuts are healthy nuts." },
    { word: "seed", translation: "graine", example: "Sunflower seeds are a popular snack." },
    { word: "herb", translation: "herbe aromatique", example: "Basil is my favorite herb for Italian cooking." },
    { word: "spice", translation: "épice", example: "Cinnamon is a common spice used in desserts." },

    { word: "poultry", translation: "volaille", example: "Chicken and turkey are types of poultry." },
    { word: "processed food", translation: "aliment transformé", example: "It's healthier to avoid processed foods." },
    { word: "frozen food", translation: "surgelé", example: "Frozen food is convenient when you're in a hurry." },
    { word: "canned food", translation: "conserve", example: "I always keep some canned food in the pantry." },
    { word: "organic food", translation: "aliment bio", example: "Organic food is grown without chemical pesticides." },
    { word: "whole food", translation: "aliment complet", example: "A diet rich in whole foods is generally healthier." },
    { word: "junk food", translation: "malbouffe", example: "Try to limit your consumption of junk food." },
    { word: "appetizer", translation: "entrée/amuse-bouche", example: "We ordered several appetizers to share." },
    { word: "side dish", translation: "accompagnement", example: "Rice is a common side dish with curry." },
    { word: "condiment", translation: "condiment", example: "Ketchup and mustard are popular condiments." },

    // Préparation des aliments
    { word: "to chop", translation: "hacher", example: "Chop the onions finely." },
    { word: "to slice", translation: "trancher", example: "Slice the bread before serving." },
    { word: "to dice", translation: "couper en dés", example: "Dice the potatoes into small cubes." },
    { word: "to grate", translation: "râper", example: "Grate the cheese over the pasta." },
    { word: "to peel", translation: "éplucher", example: "You need to peel the potatoes first." },
    { word: "to mix", translation: "mélanger", example: "Mix all the ingredients in a bowl." },
    { word: "to stir", translation: "remuer", example: "Stir the sauce constantly while it's cooking." },
    { word: "to bake", translation: "cuire au four", example: "I like to bake cakes on weekends." },
    { word: "to fry", translation: "frire", example: "Don't fry food too often; it's not very healthy." },
    { word: "to grill", translation: "griller", example: "We'll grill the fish for dinner." },
    { word: "to boil", translation: "faire bouillir", example: "Boil the water before adding the pasta." },
    { word: "to steam", translation: "cuire à la vapeur", example: "Steaming vegetables preserves more nutrients." },
    { word: "to roast", translation: "rôtir", example: "I'm going to roast a chicken for Sunday lunch." },
    { word: "to marinate", translation: "mariner", example: "Marinate the meat for at least two hours." },
    { word: "to season", translation: "assaisonner", example: "Season the dish with salt and pepper." },

    { word: "to reheat", translation: "réchauffer", example: "You can reheat the leftovers in the microwave." },

    // Goûts & textures (plus avancés que A1)
    { word: "savory", translation: "salé/relevé", example: "I prefer savory snacks to sweet ones." },
    { word: "tangy", translation: "acidulé", example: "Lemon gives a tangy flavor to the dish." },
    { word: "bland", translation: "fade", example: "The soup was too bland; it needed more seasoning." },
    { word: "rich", translation: "riche (en goût)", example: "Chocolate cake is rich in flavor." },

    { word: "flavorful", translation: "savoureux", example: "Fresh herbs make the dish more flavorful." },
    { word: "aromatic", translation: "aromatique", example: "Cinnamon has a very aromatic smell." },
    { word: "creamy", translation: "crémeux", example: "I love the creamy texture of this sauce." },
    { word: "crunchy", translation: "croquant", example: "These cookies are nicely crunchy." },
    { word: "crispy", translation: "croustillant", example: "The fried chicken has a crispy coating." },
    { word: "chewy", translation: "moelleux", example: "These caramels are quite chewy." },
    { word: "tender", translation: "tendre", example: "The meat was perfectly cooked, very tender." },
    { word: "juicy", translation: "juteux", example: "These oranges are really juicy." },

    { word: "moist", translation: "moelleux/humide", example: "This bread is still moist." },

    // Recettes simples

    { word: "ingredient", translation: "ingrédient", example: "Make sure you have all the ingredients before starting." },
    { word: "measurement", translation: "mesure", example: "The recipe includes precise measurements." },
    { word: "portion", translation: "portion", example: "This recipe serves four portions." },
    { word: "instruction", translation: "instruction", example: "Follow the instructions carefully." },
    { word: "step", translation: "étape", example: "The recipe has five easy steps." },
    { word: "preparation time", translation: "temps de préparation", example: "The preparation time is about 20 minutes." },
    { word: "cooking time", translation: "temps de cuisson", example: "The cooking time is 45 minutes." },
    { word: "batter", translation: "pâte (liquide)", example: "Pour the batter into the pan." },
    { word: "dough", translation: "pâte", example: "Knead the dough until it's smooth." },
    { word: "sauce", translation: "sauce", example: "This pasta dish has a delicious tomato sauce." },
    { word: "garnish", translation: "garniture", example: "Use fresh herbs as a garnish." },
    { word: "homemade", translation: "fait maison", example: "I prefer homemade meals to restaurant food." },
    { word: "cookbook", translation: "livre de cuisine", example: "My grandmother gave me her cookbook." },
    { word: "family recipe", translation: "recette de famille", example: "This is a family recipe passed down for generations." },

    // Régimes alimentaires basiques
    { word: "vegetarian", translation: "végétarien", example: "She's vegetarian; she doesn't eat meat." },
    { word: "vegan", translation: "végétalien", example: "Vegans don't eat any animal products." },
    { word: "gluten-free", translation: "sans gluten", example: "People with celiac disease need a gluten-free diet." },
    { word: "dairy-free", translation: "sans produits laitiers", example: "He follows a dairy-free diet due to lactose intolerance." },
    { word: "low-carb", translation: "pauvre en glucides", example: "She's on a low-carb diet to lose weight." },
    { word: "sugar-free", translation: "sans sucre", example: "I prefer sugar-free drinks." },
    { word: "organic", translation: "biologique", example: "They only buy organic fruits and vegetables." },
    { word: "balanced diet", translation: "alimentation équilibrée", example: "A balanced diet includes a variety of foods." },
    { word: "healthy eating", translation: "alimentation saine", example: "Healthy eating is important for your well-being." },
    { word: "nutrition", translation: "nutrition", example: "He studied nutrition at university." },
    { word: "protein", translation: "protéine", example: "Eggs are a good source of protein." },
    { word: "carbohydrate", translation: "glucide", example: "Pasta and bread are rich in carbohydrates." },

    { word: "vitamin", translation: "vitamine", example: "Oranges are high in vitamin C." },
    { word: "mineral", translation: "minéral", example: "Bananas are a good source of minerals like potassium." },

    // Ustensiles de cuisine
    { word: "cutlery", translation: "couverts", example: "Place the cutlery on the table." },
    { word: "cooking pot", translation: "casserole", example: "Use a large cooking pot for the soup." },
    { word: "frying pan", translation: "poêle à frire", example: "Heat oil in the frying pan." },
    { word: "saucepan", translation: "casserole", example: "Heat the milk in a small saucepan." },
    { word: "baking tray", translation: "plaque de cuisson", example: "Place the cookies on the baking tray." },
    { word: "mixing bowl", translation: "bol mélangeur", example: "Mix the ingredients in a large mixing bowl." },
    { word: "colander", translation: "passoire", example: "Drain the pasta in a colander." },
    { word: "grater", translation: "râpe", example: "Use a grater for the cheese." },
    { word: "peeler", translation: "éplucheur", example: "I need a peeler for these carrots." },
    { word: "chopping board", translation: "planche à découper", example: "Always use a chopping board for cutting." },

    { word: "measuring cup", translation: "tasse à mesurer", example: "Use a measuring cup for precise quantities." },
    { word: "measuring spoon", translation: "cuillère à mesurer", example: "The recipe calls for one measuring spoon of spice." },
    { word: "whisk", translation: "fouet", example: "Use a whisk to beat the eggs." },
    { word: "spatula", translation: "spatule", example: "Flip the pancake with a spatula." },
    { word: "ladle", translation: "louche", example: "Use a ladle to serve the soup." },
    { word: "tongs", translation: "pince de cuisine", example: "Use tongs to turn the meat." },

    // Restaurants & services alimentaires

    { word: "café", translation: "café", example: "We'll meet at the café at 10 am." },
    { word: "bistro", translation: "bistro", example: "This little bistro serves excellent French food." },

    { word: "takeaway", translation: "plat à emporter", example: "Let's get a takeaway instead of cooking tonight." },
    { word: "delivery", translation: "livraison", example: "Many restaurants offer food delivery." },
    { word: "self-service", translation: "self-service", example: "The cafeteria is self-service." },
    { word: "buffet", translation: "buffet", example: "The hotel offers a breakfast buffet." },

    { word: "specials", translation: "plats du jour", example: "The chef's specials change daily." },

    { word: "waiter", translation: "serveur", example: "The waiter brought our drinks." },
    { word: "waitress", translation: "serveuse", example: "The waitress recommended the fish." },

    { word: "tip", translation: "pourboire", example: "We left a generous tip for the excellent service." },

    { word: "service", translation: "service", example: "The service in this restaurant is excellent." }
  ]
};
