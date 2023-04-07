const HEIST ={
    "title": "Heist story",
    "startItems": [],
    "1" : {
    "text" : "You are a thief and you have been hired to steal a valuable artifact from a treasure. You are standing outside the entrance to the treasure. What do you do?",
        "options": ["[Try to pick the lock|2]", "[Look for a key|3]"]
},
    "2" : {
    "text" : "You try to pick the lock, but it's too complicated. You need to find another way inside.",
        "options": ["[Go back to the entrance|1]"]
},
    "3" : {
    "text" : "You search the area and find a guard who has the key. What do you do?",
        "options": ["[Sneak up and pickpocket the key|4]", "[Take the guard out|5]"]
},
    "4" : {
    "text" : "You sneak up to the guard and pickpocket the key. You make your way into the treasure.",
        "options": ["[Search for the artifact|6]"]
},
    "5" : {
    "text" : "You take the guard out, but the noise attracts attention. You are caught and sent to jail.",
        "end": true
},
    "6" : {
    "text" : "You search the treasure and find the artifact. But it's guarded by a trap. What do you do?",
        "options": ["[Try to disarm the trap|7]", "[Take your chances and grab the artifact|8]"]
},
    "7" : {
    "text" : "You successfully disarm the trap and take the artifact.",
        "gain": {"itemId": "ARTIFACT", "description": "A valuable artifact", "count": 1},
    "end": true
},
    "8" : {
    "text" : "You take your chances and grab the artifact. You trigger the trap and are caught.",
        "end": true
}
}