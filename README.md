# gamebook
Simple gamebook engine.
You can test it on http://yirikus.cz/x/story/

## TODO:
* consumable items
* equipment
* continue the sample story!
* enable saving using serialization to base64 string (pageId + character)

# Documentation

## How to write a story
Engine accepts stories in a 'json' format. 
In case you are getting errors, please validate your json in any online json validator

### basic structure
Simplest story looks like this:
```
{
    "title": "Awesome gamebook",
    "startItems": [], 
    "1" : {
        "text" : "You woke up, what are you going to do? [Brush teeth|2], [Continue sleeping|3]",
    },
    "2" : {
        "text" : "You are brushing your teeth.",
        "end": true
    },
    "3" : {
        "text" : "You went back to bed.",
        "end": true
    },
};
```
'title' is a name of the story.
The rest of the attributes are story parts. in this example we have three story parts called '1','2' and '3'. 
'startItems' are items that player will get at the start of the game.

### Images
You can show image with any story part like this:
```
img: "img/guard.jpg",
```
Ie to show image with story part #3:
```
"2" : {
        "text" : "You are brushing your teeth.",
        "img": "img/guard.jpg",
        "end": true
    },
```

### Story part structure
Story part is an object that contain current part of the story and options for the player what he/she can do. 
You can also specify if this is the story end or give and take items from player.
This is an exaple with all the features. How to use each of the features will be described in the next chapters
```
"1" : {
        "text" : "You woke up, what are you going to do? {B}{B:-1}",
        "options": ["[Option 1|1]", "[Option 2:5|2]"],
        "gain": {itemId: "MONEY", description: "Měšec", count: -10},
        "end": true/false
    },
"1.B": { "text": "B", "options": "[xyz|8]" },
"1.B:-1": { "text": "B", "options": "[xyz|8]" }
```

### Navigation
In each story part you have to give a player options what he can do unless it is an end. Options look like this: 
```
[Player option|next story part]
```
Options are enclosed in `[]` on the left of the separator `|` is a story label, on the right is a name of the
 next story part. Note that story label *must* be a *number*. 

You can either inline options in main text, or add it as a separate attribute like this:
```
"1" : {
        "text" : "You woke up, what are you going to do? ",
        "options": ["[Brush teeth|2]", "[Continue sleeping|3]"]
    }
```
In this case 'options' can contain both string or array.

#### Conditional navigation
You can require the player to have some skill, item or status by using ':' like this 
```
[Brush teeth:TOOTHPASTE|5]
```
. This means that player can go to '5' only if they have item, status or skill with id 'TOOTHPASTE'. Probably item in this case :)
If you require a minimum amount you can do so by adding one more ':' like this:
```
[Brush teeth:TOOTHPASTE:2|5]
```
This will require player to have two tooth pastes. 
In a case you want to check that player does not have something, you use -1, ie:
```
[Brush teeth:TOOTHPASTE:-1|5]
```
This means "player have less than 1", you can check for any number. For example:
```
[Brush teeth:TOOTHPASTE:-2|5]
```
This means "player must have less than 2 tooth pastes"

### Giving and taking items from player
If you want to give or take something to/from player you use `gain` attribute. For example:
```
"gain": {"itemId": "TOOTPASTE", "description": "Your awesome paste", "count": 3},
```
This will give player a toothpaste. **itemId** is the most important part as this is used in conditions. **Description** is what will player see in his player section. **count** specifies how many items of this type player should get. This can be negative.

### giving removing player statuses
In a similiar way like items, you can give player a status. The main difference is that these are secret. ie player can do something good or bad and you want to alter story without him knowing:
```
"gain": {"itemId": "KING_SLAYER", "type": "STATUS"}
```
As you see the only thing that is difference is that we used `"type": "STATUS"`.
To take it away, you use `count:-1`

### Conditional text blocks
Like with navigation you can have conditional text blocks that will display only if user satisfies the condition. Like this:
```
"1" : { "text" : "You woke up. {PARTNER}{PARTNER:-1}" }
"1.PARTNER" : { "text" : "Your partner is lying next to you. " }
"1.PARTNER:-1" : { "text" : "There is nobody else in your bed." }
```
Conditional text parts are enclosed in `{}` and they will be replaced with a text part with a name like this 'original text part' DOT 'CONDITION'. These text parts can have everything that other text parts can have. Options, gain, end, etc.

### Ending a story
To mark an end of a story, you simply add end:true and no options.
```
"500" : {
        "text" : "You are dead ",
        "end": true
    }
```

## Adding enemies
## Adding abilities

# Known bugs

